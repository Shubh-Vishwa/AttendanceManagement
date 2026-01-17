from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, employee, attendance

app = FastAPI(title="HRMS Backend API")

# -------------------------------
# CORS Middleware
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Register Routers
# -------------------------------
app.include_router(auth.router)
app.include_router(employee.router)
app.include_router(attendance.router)

# -------------------------------
# Create admin once
# -------------------------------
auth.init_admin()
