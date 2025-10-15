from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File, Form
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
from passlib.context import CryptContext
import base64
import json

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ============ Models ============

class DriverApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    city: str
    platform: str  # "Uber", "Lyft", or "Both"
    vehicle_year: str
    vehicle_make: str
    vehicle_model: str
    photo_id: Optional[str] = None
    status: str = "pending"  # pending, contacted, approved, rejected
    submitted_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class DriverApplicationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    city: str
    platform: str
    vehicle_year: str
    vehicle_make: str
    vehicle_model: str

class AdvertiserSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company_name: str
    contact_name: str
    email: EmailStr
    budget_range: str
    cities: str
    ad_formats: str  # "video", "static", "interactive" or combinations
    creative_id: Optional[str] = None
    status: str = "pending"
    submitted_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class AdvertiserSubmissionCreate(BaseModel):
    company_name: str
    contact_name: str
    email: EmailStr
    budget_range: str
    cities: str
    ad_formats: str

class FileUpload(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    filename: str
    content: str  # base64 encoded
    content_type: str
    uploaded_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminLoginResponse(BaseModel):
    success: bool
    message: str
    token: Optional[str] = None

class UpdateStatusRequest(BaseModel):
    status: str

class ContentBlock(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    page: str  # "home", "drivers", "advertisers", "about"
    section_id: str  # "hero", "stats", "testimonials", "cta", etc.
    content: Dict[str, Any]  # JSON content with title, body, images, etc.
    order: int = 0
    is_active: bool = True
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContentBlockUpdate(BaseModel):
    content: Dict[str, Any]
    is_active: Optional[bool] = None

class MediaFile(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    filename: str
    data: str  # base64 encoded
    content_type: str
    size: int = 0
    uploaded_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class EmailLog(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    log_type: str  # "driver_application", "advertiser_inquiry"
    recipient: str
    subject: str
    body: str
    form_data: Dict[str, Any]
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    status: str = "logged"  # logged, sent, failed

# ============ Helper Functions ============

async def log_email(log_type: str, recipient: str, subject: str, body: str, form_data: Dict[str, Any]):
    """Log email instead of sending for now"""
    email_log = EmailLog(
        log_type=log_type,
        recipient=recipient,
        subject=subject,
        body=body,
        form_data=form_data
    )
    
    doc = email_log.model_dump()
    await db.email_logs.insert_one(doc)
    
    logger.info(f"📧 EMAIL LOGGED: {log_type} - {subject}")
    logger.info(f"   To: {recipient}")
    logger.info(f"   Body: {body[:100]}...")
    
    return email_log

# ============ Routes ============

@api_router.get("/")
async def root():
    return {"message": "RideMedia API"}

# Driver Application Routes
@api_router.post("/drivers/apply", response_model=DriverApplication)
async def submit_driver_application(application: DriverApplicationCreate):
    app_dict = application.model_dump()
    app_obj = DriverApplication(**app_dict)
    
    doc = app_obj.model_dump()
    await db.driver_applications.insert_one(doc)
    
    # Log email notification
    email_body = f"""
New Driver Application Received

Name: {application.name}
Email: {application.email}
Phone: {application.phone}
City: {application.city}
Platform: {application.platform}
Vehicle: {application.vehicle_year} {application.vehicle_make} {application.vehicle_model}

Application ID: {app_obj.id}
Submitted: {app_obj.submitted_at}
    """
    
    await log_email(
        log_type="driver_application",
        recipient="nurettinerzen@gmail.com",
        subject=f"New Driver Application - {application.name}",
        body=email_body,
        form_data=app_dict
    )
    
    logger.info(f"New driver application from {application.email} in {application.city}")
    return app_obj

@api_router.get("/drivers/applications", response_model=List[DriverApplication])
async def get_driver_applications():
    apps = await db.driver_applications.find({}, {"_id": 0}).to_list(1000)
    return apps

# Advertiser Submission Routes
@api_router.post("/advertisers/contact", response_model=AdvertiserSubmission)
async def submit_advertiser_contact(submission: AdvertiserSubmissionCreate):
    sub_dict = submission.model_dump()
    sub_obj = AdvertiserSubmission(**sub_dict)
    
    doc = sub_obj.model_dump()
    await db.advertiser_submissions.insert_one(doc)
    
    logger.info(f"New advertiser inquiry from {submission.company_name} - {submission.email}")
    return sub_obj

@api_router.get("/advertisers/submissions", response_model=List[AdvertiserSubmission])
async def get_advertiser_submissions():
    subs = await db.advertiser_submissions.find({}, {"_id": 0}).to_list(1000)
    return subs

# File Upload Routes
@api_router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        base64_content = base64.b64encode(contents).decode('utf-8')
        
        file_obj = FileUpload(
            filename=file.filename,
            content=base64_content,
            content_type=file.content_type
        )
        
        doc = file_obj.model_dump()
        await db.file_uploads.insert_one(doc)
        
        return {"success": True, "file_id": file_obj.id, "filename": file.filename}
    except Exception as e:
        logger.error(f"File upload error: {str(e)}")
        raise HTTPException(status_code=500, detail="File upload failed")

@api_router.get("/upload/{file_id}")
async def get_file(file_id: str):
    file_doc = await db.file_uploads.find_one({"id": file_id}, {"_id": 0})
    if not file_doc:
        raise HTTPException(status_code=404, detail="File not found")
    return file_doc

# Admin Routes
@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(credentials: AdminLogin):
    # Simple password check (for MVP - can enhance with JWT later)
    admin_password = os.environ.get('ADMIN_PASSWORD', 'admin123')
    
    if credentials.username == "admin" and credentials.password == admin_password:
        # Generate a simple token (UUID for now)
        token = str(uuid.uuid4())
        return AdminLoginResponse(
            success=True,
            message="Login successful",
            token=token
        )
    else:
        return AdminLoginResponse(
            success=False,
            message="Invalid credentials"
        )

@api_router.put("/admin/drivers/{application_id}/status")
async def update_driver_status(application_id: str, update: UpdateStatusRequest):
    result = await db.driver_applications.update_one(
        {"id": application_id},
        {"$set": {"status": update.status}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")
    
    return {"success": True, "message": "Status updated"}

@api_router.put("/admin/advertisers/{submission_id}/status")
async def update_advertiser_status(submission_id: str, update: UpdateStatusRequest):
    result = await db.advertiser_submissions.update_one(
        {"id": submission_id},
        {"$set": {"status": update.status}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Submission not found")
    
    return {"success": True, "message": "Status updated"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()