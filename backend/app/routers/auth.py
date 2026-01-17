# app/routers/auth.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from passlib.context import CryptContext
import jwt
import os

from app.database import SessionLocal
from app.models import User
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60  # 1 hour

router = APIRouter(prefix="/auth", tags=["Authentication"])

# --------------------------
# Password hashing context
# --------------------------
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --------------------------
# Pydantic Schemas
# --------------------------
class UserLogin(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


# --------------------------
# Dependency
# --------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --------------------------
# Seed admin user (run once)
# --------------------------
def create_admin(db: Session):
    admin = db.query(User).filter(User.email == "admin@hrms.com").first()
    if not admin:
        hashed_password = pwd_context.hash("admin123")  # safe hashing
        admin_user = User(
            name="Admin",
            email="admin@hrms.com",
            password=hashed_password,
            role="admin",
        )
        db.add(admin_user)
        db.commit()
        
        print("Admin user created: admin@hrms.com / admin123")


# --------------------------
# Login Endpoint
# --------------------------
@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Create JWT token
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": db_user.email, "role": db_user.role, "exp": expire}
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return {"access_token": token, "token_type": "bearer"}


# --------------------------
# Initialize admin safely
# --------------------------
def init_admin():
    """
    Call this once in main.py after database tables are created.
    """
    with SessionLocal() as db:
        create_admin(db)
