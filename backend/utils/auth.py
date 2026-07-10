# Supabase Auth Verification Dependency
# File: backend/utils/auth.py

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from backend.config import settings
from typing import Dict, Any

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict[str, Any]:
    """
    Decodes the Supabase JWT sent in the authorization header.
    Validates signature using SUPABASE_JWT_SECRET and extracts the user metadata.
    """
    token = credentials.credentials
    try:
        # Supabase uses HS256 to sign user tokens with the JWT Secret
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated"
        )
        user_id = payload.get("sub")
        email = payload.get("email")
        role = payload.get("role", "authenticated")
        
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token payload is missing user identification.",
            )
            
        # Get custom app metadata if injected (e.g. admin flags)
        user_metadata = payload.get("user_metadata", {})
        
        return {
            "id": user_id,
            "email": email,
            "role": role,
            "user_metadata": user_metadata
        }
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {str(e)}",
        )

def get_current_admin(user: Dict[str, Any] = Depends(get_current_user)) -> Dict[str, Any]:
    """
    Verifies that the authorized user has an 'admin' role.
    """
    # Check custom user metadata or a check in database (simulated here via custom claims or email config)
    email = user.get("email")
    role = user.get("user_metadata", {}).get("role") or user.get("role")
    
    # Allow local admin email fallback for testing
    if role == "admin" or email == settings.ADMIN_EMAIL:
         return user
         
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="You do not have administrative privileges to access this resource."
    )
