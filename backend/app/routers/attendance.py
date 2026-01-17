from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Attendance
from app.schemas import AttendanceCreate, AttendanceResponse

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=AttendanceResponse, status_code=201)
def mark_attendance(data: AttendanceCreate, db: Session = Depends(get_db)):
    # Optional: check if attendance already exists for that date
    existing = db.query(Attendance).filter(
        Attendance.employee_id == data.employee_id,
        Attendance.date == data.date
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Attendance already marked for this date")

    attendance = Attendance(**data.dict())
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance


@router.get("/", response_model=list[AttendanceResponse])
def get_attendance(db: Session = Depends(get_db)):
    records = db.query(Attendance).all()
    if not records:
        raise HTTPException(status_code=404, detail="No attendance records found")
    return records
