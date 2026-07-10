# GrowX Fashion Backend Configuration
# File: backend/config.py

from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "GrowX Fashion API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Supabase Credentials
    SUPABASE_URL: str = "https://your-supabase-project.supabase.co"
    SUPABASE_SERVICE_ROLE_KEY: str = "your-supabase-service-role-key"
    SUPABASE_JWT_SECRET: str = "your-supabase-jwt-secret" # Used to decode user tokens locally
    
    # Payments
    STRIPE_SECRET_KEY: Optional[str] = "sk_test_..."
    STRIPE_WEBHOOK_SECRET: Optional[str] = "whsec_..."
    
    RAZORPAY_KEY_ID: Optional[str] = "rzp_test_..."
    RAZORPAY_KEY_SECRET: Optional[str] = "rzp_secret_..."
    
    # Admin Panel Settings
    ADMIN_EMAIL: str = "admin@growxfashion.com"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
