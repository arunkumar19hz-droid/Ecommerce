# Payments Integration (Razorpay + Stripe) Router
# File: backend/routers/payments.py

from fastapi import APIRouter, HTTPException, Depends, Request, Header
from pydantic import BaseModel
import stripe
import razorpay
from typing import Dict, Any, Optional
from supabase import create_client, Client
from backend.config import settings
from backend.utils.auth import get_current_user

router = APIRouter(prefix="/payments", tags=["Payments"])
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)

# Initialize Payment Clients
stripe.api_key = settings.STRIPE_SECRET_KEY

# Razorpay client (returns None if keys aren't set)
razorpay_client = None
if settings.RAZORPAY_KEY_ID and settings.RAZORPAY_KEY_SECRET:
    razorpay_client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

class StripeCheckoutInput(BaseModel):
    order_id: str
    success_url: str
    cancel_url: str

class RazorpayOrderInput(BaseModel):
    order_id: str

@router.post("/stripe/create-checkout-session")
def create_stripe_checkout(payload: StripeCheckoutInput, current_user: Dict[str, Any] = Depends(get_current_user)):
    """
    Creates a Stripe Checkout Session for the specified order total.
    """
    try:
        # Get Order Details
        order_res = supabase.table("orders").select("*").eq("id", payload.order_id).eq("user_id", current_user["id"]).single().execute()
        order = order_res.data
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
            
        # Amount in Cents/Paise for Stripe
        amount_cents = int(float(order["total_amount"]) * 100)
        
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'inr',
                    'product_data': {
                        'name': f"GrowX Fashion Order {order['order_number']}",
                    },
                    'unit_amount': amount_cents,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=payload.success_url + "?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=payload.cancel_url,
            client_reference_id=order["id"],
            customer_email=current_user["email"]
        )
        
        # Update payment record with Stripe payment gateway id
        supabase.table("payments")\
            .update({"payment_gateway_id": session.id, "status": "pending"})\
            .eq("order_id", order["id"])\
            .execute()
            
        return {"checkout_url": session.url, "session_id": session.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Stripe initialization error: {str(e)}")

@router.post("/razorpay/create-order")
def create_razorpay_order(payload: RazorpayOrderInput, current_user: Dict[str, Any] = Depends(get_current_user)):
    """
    Creates a Razorpay Order ID for frontend checkout pop-up.
    """
    if not razorpay_client:
        raise HTTPException(status_code=500, detail="Razorpay is not configured on the server.")
        
    try:
        # Get Order Details
        order_res = supabase.table("orders").select("*").eq("id", payload.order_id).eq("user_id", current_user["id"]).single().execute()
        order = order_res.data
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
            
        # Amount in paise (Razorpay standard)
        amount_paise = int(float(order["total_amount"]) * 100)
        
        razorpay_order_data = {
            "amount": amount_paise,
            "currency": "INR",
            "receipt": order["order_number"],
            "payment_capture": 1 # Auto capture
        }
        
        rzp_order = razorpay_client.order.create(data=razorpay_order_data)
        
        # Update payment record with Razorpay Order ID
        supabase.table("payments")\
            .update({"payment_gateway_id": rzp_order["id"], "status": "pending"})\
            .eq("order_id", order["id"])\
            .execute()
            
        return {
            "razorpay_order_id": rzp_order["id"],
            "amount": amount_paise,
            "currency": "INR",
            "key_id": settings.RAZORPAY_KEY_ID,
            "company_name": "GrowX Fashion"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Razorpay order creation failed: {str(e)}")

# WEBHOOK HANDLERS FOR TRANSACTION SUCCESS
@router.post("/stripe/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    """
    Stripe Webhook handler to securely finalize transaction.
    """
    payload = await request.body()
    try:
        event = stripe.Webhook.construct_event(
            payload, stripe_signature, settings.STRIPE_WEBHOOK_SECRET
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Webhook verification failed: {str(e)}")
        
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        order_id = session.get('client_reference_id')
        payment_intent_id = session.get('payment_intent')
        
        # Finalize order and payment state in Supabase
        _finalize_order_payment(order_id, payment_intent_id, "captured", "stripe", session)
        
    return {"status": "success"}

@router.post("/razorpay/webhook")
async def razorpay_webhook(request: Request, x_razorpay_signature: str = Header(None)):
    """
    Razorpay Webhook handler to capture secure payment triggers.
    """
    payload = await request.body()
    # Verify signature
    try:
        if not x_razorpay_signature:
             raise Exception("Missing Razorpay Signature header")
        
        razorpay_client.utility.verify_webhook_signature(
            payload.decode("utf-8"),
            x_razorpay_signature,
            settings.RAZORPAY_KEY_SECRET # Razorpay secret used for webhook configuration
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Webhook verification failed: {str(e)}")
        
    import json
    data = json.loads(payload.decode("utf-8"))
    
    if data.get("event") == "payment.captured":
        payment_entity = data["payload"]["payment"]["entity"]
        razorpay_order_id = payment_entity["order_id"]
        razorpay_payment_id = payment_entity["id"]
        
        # Lookup payment record matching the Razorpay Order ID
        pay_res = supabase.table("payments").select("*").eq("payment_gateway_id", razorpay_order_id).single().execute()
        payment = pay_res.data
        if payment:
            _finalize_order_payment(payment["order_id"], razorpay_payment_id, "captured", "razorpay", payment_entity)
            
    return {"status": "success"}

def _finalize_order_payment(order_id: str, txn_id: str, status: str, method: str, raw_response: Any):
    """
    Updates DB when a payment captures. Moves order state to 'processing'.
    """
    # 1. Update Payment Record
    supabase.table("payments")\
        .update({
            "status": status,
            "raw_response": raw_response,
            "payment_gateway_id": txn_id
        })\
        .eq("order_id", order_id)\
        .execute()
        
    # 2. Update Order Status
    supabase.table("orders")\
        .update({"status": "processing"})\
        .eq("id", order_id)\
        .execute()
        
    # 3. Trigger Notification
    order_res = supabase.table("orders").select("user_id, order_number").eq("id", order_id).single().execute()
    order = order_res.data
    if order:
        supabase.table("notifications").insert({
            "user_id": order["user_id"],
            "title": "Payment Confirmed! 🌟",
            "message": f"Your payment for order {order['order_number']} is processed. We are packing your GrowX Fashion premium items!",
            "type": "order_update"
        }).execute()
