from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.get("/")
def get_employees(db: Session = Depends(get_db)):
    return db.query(User).filter(User.role == "employee").all()
