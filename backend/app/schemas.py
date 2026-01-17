from pydantic import BaseModel, EmailStr
from datetime import date


class EmployeeCreate(BaseModel):
    name: str
    email: EmailStr
    role: str


class EmployeeResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True   # Pydantic v2 (ORM mode)


class AttendanceCreate(BaseModel):
    employee_id: int
    date: date
    status: str


class AttendanceResponse(BaseModel):
    id: int
    employee_id: int
    date: date
    status: str

    class Config:
        from_attributes = True
