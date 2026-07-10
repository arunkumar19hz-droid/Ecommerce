# Orders and Order Management Router
# File: backend/routers/orders.py

from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from supabase import create_client, Client
from backend.config import settings
from backend.utils.auth import get_current_user

router = APIRouter(prefix="/orders", tags=["Orders"])
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)

class OrderItemInput(BaseModel):
    product_id: str
    size: str
    color: str
    quantity: int

class OrderCreateInput(BaseModel):
    items: List[OrderItemInput]
    shipping_address_id: str
    billing_address_id: Optional[str] = None
    coupon_code: Optional[str] = None
    payment_method: str # 'stripe', 'razorpay', 'cod'

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_order(payload: OrderCreateInput, current_user: Dict[str, Any] = Depends(get_current_user)):
    """
    Creates a new order, verifies inventory, applies coupon code, 
    calculates subtotal, taxes, shipping and finalizes database entry.
    """
    user_id = current_user["id"]
    try:
        subtotal = 0.00
        order_items_to_create = []
        
        # Verify and prepare order items
        for item in payload.items:
            # 1. Get Product
            p_res = supabase.table("products").select("*").eq("id", item.product_id).single().execute()
            product = p_res.data
            if not product or not product.get("is_active"):
                raise HTTPException(status_code=400, detail=f"Product {item.product_id} is unavailable.")
                
            # 2. Get Inventory and Check Quantity
            inv_res = supabase.table("inventory")\
                .select("*")\
                .eq("product_id", item.product_id)\
                .eq("size", item.size)\
                .eq("color", item.color)\
                .single().execute()
            inventory = inv_res.data
            
            if not inventory or inventory["quantity_available"] < item.quantity:
                raise HTTPException(
                    status_code=400, 
                    detail=f"Product {product['name']} in size {item.size} and color {item.color} is out of stock or insufficient."
                )
                
            item_total = float(product["price"]) * item.quantity
            subtotal += item_total
            
            order_items_to_create.append({
                "product_id": item.product_id,
                "product_name": product["name"],
                "size": item.size,
                "color": item.color,
                "sku": inventory["sku"],
                "quantity": item.quantity,
                "unit_price": float(product["price"]),
                "total_price": item_total
            })
            
        # 3. Handle Coupon Discount
        discount = 0.00
        coupon_id = None
        if payload.coupon_code:
            cp_res = supabase.table("coupons").select("*").eq("code", payload.coupon_code).eq("is_active", true).single().execute()
            coupon = cp_res.data
            if coupon:
                coupon_id = coupon["id"]
                if coupon["discount_type"] == "percentage":
                    discount = subtotal * (float(coupon["discount_value"]) / 100.0)
                    if coupon.get("max_discount_amount"):
                        discount = min(discount, float(coupon["max_discount_amount"]))
                elif coupon["discount_type"] == "fixed_amount":
                    discount = float(coupon["discount_value"])
                discount = min(discount, subtotal) # Cannot exceed subtotal
                
        # 4. Tax and Shipping
        tax_amount = round(subtotal * 0.18, 2) # 18% GST/sales tax simulation
        shipping_cost = 0.00 if subtotal > 1500.00 else 100.00 # Free shipping above ₹1500
        total_amount = subtotal - discount + tax_amount + shipping_cost
        
        # 5. Insert Order
        import uuid
        order_number = f"GOWX-{uuid.uuid4().hex[:8].upper()}"
        
        ord_res = supabase.table("orders").insert({
            "user_id": user_id,
            "order_number": order_number,
            "status": "pending",
            "subtotal": subtotal,
            "discount_amount": discount,
            "tax_amount": tax_amount,
            "shipping_cost": shipping_cost,
            "total_amount": total_amount,
            "coupon_id": coupon_id,
            "shipping_address_id": payload.shipping_address_id,
            "billing_address_id": payload.billing_address_id or payload.shipping_address_id
        }).execute()
        
        new_order = ord_res.data[0]
        
        # 6. Insert Order Items & Deduct Inventory
        for ord_item in order_items_to_create:
            ord_item["order_id"] = new_order["id"]
            supabase.table("order_items").insert(ord_item).execute()
            
            # Decrease available inventory, increase reserved
            # In production, wrapped inside a DB transaction or custom RPC function
            supabase.rpc("decrement_inventory", {
                "prod_id": ord_item["product_id"],
                "p_size": ord_item["size"],
                "p_color": ord_item["color"],
                "qty": ord_item["quantity"]
            }).execute()
            
        # 7. Create Payment Entry
        supabase.table("payments").insert({
            "order_id": new_order["id"],
            "payment_method": payload.payment_method,
            "amount": total_amount,
            "status": "pending"
        }).execute()
        
        return {
            "message": "Order initiated successfully.",
            "order_id": new_order["id"],
            "order_number": order_number,
            "total_amount": total_amount
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
def get_user_orders(current_user: Dict[str, Any] = Depends(get_current_user)):
    """
    Returns lists of all orders for the authenticated customer.
    """
    try:
        res = supabase.table("orders")\
            .select("*, order_items(*)")\
            .eq("user_id", current_user["id"])\
            .order("created_at", desc=True)\
            .execute()
        return res.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{order_id}")
def get_order_details(order_id: str, current_user: Dict[str, Any] = Depends(get_current_user)):
    """
    Returns individual order details with tracking details.
    """
    try:
        res = supabase.table("orders")\
            .select("*, order_items(*), addresses(*), payments(*)")\
            .eq("id", order_id)\
            .eq("user_id", current_user["id"])\
            .single().execute()
        if not res.data:
            raise HTTPException(status_code=404, detail="Order not found")
        return res.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
