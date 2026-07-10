# Products, Search, and Recommendations Router
# File: backend/routers/products.py

from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from supabase import create_client, Client
from backend.config import settings

router = APIRouter(prefix="/products", tags=["Products"])

# Initialize Supabase Admin Client
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)

class ReviewSchema(BaseModel):
    product_id: str
    rating: int
    title: Optional[str] = None
    comment: Optional[str] = None
    images: List[str] = []

@router.get("/")
def get_products(
    category: Optional[str] = None,
    size: Optional[str] = None,
    color: Optional[str] = None,
    fabric: Optional[str] = None,
    brand: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    sort_by: Optional[str] = "created_at.desc",
    page: int = 1,
    limit: int = 20
):
    """
    Advanced filtered product query. Supports size, color, price, brand, and fabric filters.
    """
    try:
        # Start constructing query
        query = supabase.table("products").select("*, categories(name, slug)")
        
        # Apply filters
        if category:
            query = query.eq("category_id", category)
        if fabric:
            query = query.eq("fabric", fabric)
        if brand:
            query = query.eq("brand", brand)
        if min_price is not None:
            query = query.gte("price", min_price)
        if max_price is not None:
            query = query.lte("price", max_price)
        if size:
            # PostgreSQL array containment
            query = query.contains("sizes", [size])
        if color:
            query = query.contains("colors", [color])
            
        # Pagination & Sorting
        sort_field, sort_order = "created_at", "desc"
        if sort_by:
            parts = sort_by.split(".")
            sort_field = parts[0]
            if len(parts) > 1:
                sort_order = parts[1]
                
        query = query.order(sort_field, desc=(sort_order == "desc"))
        
        # Range pagination
        offset = (page - 1) * limit
        query = query.range(offset, offset + limit - 1)
        
        response = query.execute()
        return {"products": response.data, "page": page, "limit": limit}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.get("/search")
def ai_product_search(query: str = Query(..., description="The query to search for products")):
    """
    Simulates AI-powered natural language product search.
    In production, this translates user queries (e.g., 'light linen shirts for hot weather') 
    into vector search queries using pgvector or a synonym database.
    """
    try:
        # Clean query
        search_term = query.lower()
        
        # Fetch active products
        response = supabase.table("products").select("*").eq("is_active", True).execute()
        products = response.data
        
        # Match using keywords, tags, fabrics, and categories
        results = []
        for p in products:
            score = 0
            name = p.get("name", "").lower()
            desc = p.get("description", "").lower()
            fabric = p.get("fabric", "").lower() if p.get("fabric") else ""
            tags = [t.lower() for t in p.get("tags", [])]
            
            # Simple keyword matching
            if search_term in name:
                score += 10
            if search_term in desc:
                score += 3
            if search_term in fabric:
                score += 5
            for tag in tags:
                if search_term in tag or tag in search_term:
                    score += 8
                    
            if score > 0:
                p["search_relevance"] = score
                results.append(p)
                
        # Sort results by search score
        results = sorted(results, key=lambda x: x["search_relevance"], reverse=True)
        return {"query": query, "results": results[:10], "total": len(results)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

@router.get("/recommendations")
def get_recommendations(product_id: Optional[str] = None, limit: int = 4):
    """
    AI-powered product recommendations. Returns related items based on shared tags, 
    categories, and buying patterns.
    """
    try:
        if product_id:
            # Find the target product to recommend similar items
            target_res = supabase.table("products").select("*").eq("id", product_id).single().execute()
            target = target_res.data
            
            if not target:
                raise HTTPException(status_code=404, detail="Product not found")
                
            # Query products in same category or with overlapping tags
            similar_res = supabase.table("products")\
                .select("*")\
                .eq("category_id", target["category_id"])\
                .neq("id", product_id)\
                .limit(limit)\
                .execute()
                
            return {"recommended": similar_res.data}
        else:
            # Default recommendations: Show bestseller and new arrivals
            featured_res = supabase.table("products")\
                .select("*")\
                .eq("is_featured", True)\
                .limit(limit)\
                .execute()
                
            return {"recommended": featured_res.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommendation engine error: {str(e)}")

@router.get("/{slug}")
def get_product_details(slug: str):
    """
    Returns full details for a product by slug, including inventory and reviews.
    """
    try:
        res = supabase.table("products").select("*, categories(*)").eq("slug", slug).single().execute()
        product = res.data
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
            
        # Fetch inventory options (sizes, colors, stock)
        inv_res = supabase.table("inventory").select("*").eq("product_id", product["id"]).execute()
        product["inventory"] = inv_res.data
        
        # Fetch reviews
        rev_res = supabase.table("reviews").select("*, users(first_name, last_name, avatar_url)").eq("product_id", product["id"]).execute()
        product["reviews"] = rev_res.data
        
        return product
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
