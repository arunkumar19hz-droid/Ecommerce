# GrowX Fashion (by varunexa) - FastAPI Backend Main Application
# File: backend/main.py

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.config import settings

# Import routers
from backend.routers import products, orders, payments, admin

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Scalable High-Performance API for GrowX Fashion Premium Clothing E-Commerce Store.",
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Set CORS origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, lock this down to your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(products.router, prefix=settings.API_V1_STR)
app.include_router(orders.router, prefix=settings.API_V1_STR)
app.include_router(payments.router, prefix=settings.API_V1_STR)
app.include_router(admin.router, prefix=settings.API_V1_STR)

@app.get("/", tags=["General"])
def read_root():
    return {
        "brand": "GrowX Fashion",
        "company": "varunexa",
        "status": "Online",
        "message": "Welcome to the premium clothing e-commerce REST API. Ready for client interaction.",
        "documentation": "/docs"
    }

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
