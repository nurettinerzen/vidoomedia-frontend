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

@api_router.post("/admin/initialize-cms")
async def initialize_cms():
    """Initialize default CMS content blocks - run once"""
    # Check if already initialized
    existing = await db.content_blocks.count_documents({})
    if existing > 0:
        return {"message": "CMS already initialized", "blocks_count": existing}
    
    default_blocks = [
        # Homepage blocks
        {
            "id": str(uuid.uuid4()),
            "page": "home",
            "section_id": "hero",
            "order": 1,
            "is_active": True,
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "content": {
                "title": "Transform Your",
                "subtitle": "Rideshare Vehicle",
                "subtitle2": "Into Revenue",
                "description": "Join 500+ drivers earning extra income with in-vehicle digital advertising. We connect brands with passengers through engaging, targeted ads.",
                "cta_primary_text": "Become a Driver Partner",
                "cta_primary_link": "/drivers",
                "cta_secondary_text": "Advertise With Us",
                "cta_secondary_link": "/advertisers",
                "image_url": "https://images.unsplash.com/photo-1688457462495-1440d81f4ddb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxjYXIlMjB0YWJsZXQlMjB0ZWNobm9sb2d5fGVufDB8fHx8MTc2MDUwNzA5Mnww&ixlib=rb-4.1.0&q=85"
            }
        },
        {
            "id": str(uuid.uuid4()),
            "page": "home",
            "section_id": "stats",
            "order": 2,
            "is_active": True,
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "content": {
                "stats": [
                    {"label": "Active Vehicles", "value": "500+", "icon": "Users"},
                    {"label": "Digital Screens", "value": "500+", "icon": "Monitor"},
                    {"label": "Monthly Impressions", "value": "2M+", "icon": "TrendingUp"},
                    {"label": "Cities", "value": "12", "icon": "MapPin"}
                ]
            }
        },
        {
            "id": str(uuid.uuid4()),
            "page": "home",
            "section_id": "value_proposition",
            "order": 3,
            "is_active": True,
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "content": {
                "title": "Why Choose RideMedia?",
                "subtitle": "We're revolutionizing how brands connect with consumers through innovative in-vehicle advertising",
                "cards": [
                    {
                        "icon": "Users",
                        "title": "For Drivers",
                        "description": "Earn $400-600 extra per month with minimal effort. Quick setup, no impact on your rideshare status."
                    },
                    {
                        "icon": "Monitor",
                        "title": "For Advertisers",
                        "description": "Reach your target audience with unskippable, high-engagement ads in a captive environment."
                    },
                    {
                        "icon": "TrendingUp",
                        "title": "Measurable Results",
                        "description": "Track impressions, engagement, and ROI with our comprehensive analytics dashboard."
                    }
                ]
            }
        },
        {
            "id": str(uuid.uuid4()),
            "page": "home",
            "section_id": "testimonials",
            "order": 4,
            "is_active": True,
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "content": {
                "title": "What People Say",
                "subtitle": "Hear from our drivers and advertising partners",
                "testimonials": [
                    {
                        "name": "Sarah Johnson",
                        "role": "Uber Driver",
                        "content": "RideMedia has been a game-changer! I earn an extra $400-500 per month just by having the screen in my car.",
                        "rating": 5
                    },
                    {
                        "name": "Mike Chen",
                        "role": "Marketing Director, TechCorp",
                        "content": "The engagement rates are incredible. Our brand awareness increased by 45% in targeted markets.",
                        "rating": 5
                    },
                    {
                        "name": "Jessica Martinez",
                        "role": "Lyft Driver",
                        "content": "Installation was quick and easy. Passengers often comment on how cool the setup looks!",
                        "rating": 5
                    }
                ]
            }
        },
        # Drivers page blocks
        {
            "id": str(uuid.uuid4()),
            "page": "drivers",
            "section_id": "hero",
            "order": 1,
            "is_active": True,
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "content": {
                "title": "Earn More With Your Vehicle",
                "description": "Join 500+ drivers already earning extra income through in-vehicle digital advertising",
                "background_image": "https://images.unsplash.com/photo-1664209448379-732f0dac59bd"
            }
        },
        # Advertisers page blocks
        {
            "id": str(uuid.uuid4()),
            "page": "advertisers",
            "section_id": "hero",
            "order": 1,
            "is_active": True,
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "content": {
                "title": "Reach Passengers On the Move",
                "description": "Connect with 2M+ monthly passengers through high-engagement, in-vehicle digital advertising",
                "background_image": "https://images.unsplash.com/photo-1700411882249-1bc16dc3b9e9"
            }
        },
        # About page blocks
        {
            "id": str(uuid.uuid4()),
            "page": "about",
            "section_id": "hero",
            "order": 1,
            "is_active": True,
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "content": {
                "title": "Our Mission",
                "description": "To create a win-win ecosystem where drivers earn more income, brands reach engaged audiences, and passengers enjoy relevant content during their rides."
            }
        }
    ]
    
    await db.content_blocks.insert_many(default_blocks)
    
    return {
        "success": True,
        "message": "CMS initialized with default content",
        "blocks_created": len(default_blocks)
    }

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
    
    # Log email notification
    email_body = f"""
New Advertiser Inquiry Received

Company: {submission.company_name}
Contact: {submission.contact_name}
Email: {submission.email}
Budget Range: {submission.budget_range}
Target Cities: {submission.cities}
Ad Formats: {submission.ad_formats}

Inquiry ID: {sub_obj.id}
Submitted: {sub_obj.submitted_at}
    """
    
    await log_email(
        log_type="advertiser_inquiry",
        recipient="nurettinerzen@gmail.com",
        subject=f"New Advertiser Inquiry - {submission.company_name}",
        body=email_body,
        form_data=sub_dict
    )
    
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

# CMS Routes
@api_router.get("/cms/blocks", response_model=List[ContentBlock])
async def get_all_content_blocks():
    """Get all content blocks"""
    blocks = await db.content_blocks.find({}, {"_id": 0}).to_list(1000)
    return blocks

@api_router.get("/cms/blocks/{page}", response_model=List[ContentBlock])
async def get_page_content_blocks(page: str):
    """Get content blocks for a specific page"""
    blocks = await db.content_blocks.find(
        {"page": page, "is_active": True}, 
        {"_id": 0}
    ).sort("order", 1).to_list(1000)
    return blocks

@api_router.put("/cms/blocks/{block_id}")
async def update_content_block(block_id: str, update: ContentBlockUpdate):
    """Update a content block"""
    update_data = {"content": update.content, "updated_at": datetime.now(timezone.utc).isoformat()}
    if update.is_active is not None:
        update_data["is_active"] = update.is_active
    
    result = await db.content_blocks.update_one(
        {"id": block_id},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Content block not found")
    
    # Return updated block
    block = await db.content_blocks.find_one({"id": block_id}, {"_id": 0})
    return block

@api_router.post("/cms/blocks")
async def create_content_block(block: ContentBlock):
    """Create a new content block"""
    doc = block.model_dump()
    await db.content_blocks.insert_one(doc)
    return block

@api_router.post("/cms/media", response_model=MediaFile)
async def upload_media(file: UploadFile = File(...)):
    """Upload media file"""
    try:
        contents = await file.read()
        base64_data = base64.b64encode(contents).decode('utf-8')
        
        media_file = MediaFile(
            filename=file.filename,
            data=base64_data,
            content_type=file.content_type,
            size=len(contents)
        )
        
        doc = media_file.model_dump()
        await db.media_files.insert_one(doc)
        
        return media_file
    except Exception as e:
        logger.error(f"Media upload error: {str(e)}")
        raise HTTPException(status_code=500, detail="Media upload failed")

@api_router.get("/cms/media", response_model=List[MediaFile])
async def get_all_media():
    """Get all media files"""
    # Don't include the actual base64 data in list view for performance
    media = await db.media_files.find(
        {}, 
        {"_id": 0, "data": 0}
    ).sort("uploaded_at", -1).to_list(1000)
    return media

@api_router.get("/cms/media/{media_id}", response_model=MediaFile)
async def get_media_file(media_id: str):
    """Get a specific media file with full data"""
    media = await db.media_files.find_one({"id": media_id}, {"_id": 0})
    if not media:
        raise HTTPException(status_code=404, detail="Media file not found")
    return media

@api_router.delete("/cms/media/{media_id}")
async def delete_media_file(media_id: str):
    """Delete a media file"""
    result = await db.media_files.delete_one({"id": media_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Media file not found")
    return {"success": True, "message": "Media file deleted"}

# Email Logs Routes
@api_router.get("/admin/email-logs", response_model=List[EmailLog])
async def get_email_logs():
    """Get all email logs"""
    logs = await db.email_logs.find({}, {"_id": 0}).sort("timestamp", -1).to_list(1000)
    return logs

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

# Start the server
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)
