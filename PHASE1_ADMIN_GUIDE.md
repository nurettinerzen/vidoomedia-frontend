# RideMedia Phase 1 - Admin Guide

## 🔐 Secret Admin Access

**Admin URL:** `https://ridemedia.preview.emergentagent.com/admin-ridemedia-8432`

**Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **Important:** The admin panel is NOT accessible from the public website navigation. Only users who know the secret URL can access it.

---

## 📋 Admin Dashboard Features

### 1. Driver Applications Tab
- View all driver application submissions
- Filter and search applications
- Update application status (pending, contacted, approved, rejected)
- Export data to CSV
- View detailed information including:
  - Personal information
  - City and rideshare platform
  - Vehicle details
  - Submission timestamp

### 2. Advertiser Inquiries Tab
- View all advertiser contact form submissions
- Manage inquiry status
- Export data to CSV
- View details including:
  - Company and contact information
  - Budget range
  - Target cities/markets
  - Preferred ad formats
  - Submission timestamp

### 3. CMS Editor Tab ✨ NEW
Edit all public website content without code deployment!

**Available Content Blocks:**

**Home Page:**
- **Hero Section**: Main headline, subheadlines, description, CTA buttons, hero image
- **Stats Section**: Active vehicles, digital screens, impressions, cities
- **Value Proposition**: Main title, subtitle, and 3 cards (For Drivers, For Advertisers, Measurable Results)
- **Testimonials**: Title, subtitle, and 3 testimonials with ratings

**Drivers Page:**
- **Hero Section**: Page title, description, background image

**Advertisers Page:**
- **Hero Section**: Page title, description, background image

**About Page:**
- **Hero Section**: Mission statement and description

**How to Edit Content:**
1. Click the **CMS Editor** tab
2. Select the page you want to edit (Home, Drivers, Advertisers, About)
3. Find the section you want to modify
4. Click the **Edit** button
5. Modify text fields, descriptions, or JSON arrays
6. Click **Save** to publish changes immediately
7. Refresh your public website to see changes

**Content Types:**
- **Short text fields**: Edit directly in input boxes (titles, labels)
- **Long text fields**: Edit in text areas (descriptions, paragraphs)
- **JSON arrays**: Edit testimonials, stats, cards (use valid JSON format)

### 4. Media Library Tab ✨ NEW
Upload and manage images for your website.

**Features:**
- Upload images (JPG, PNG, GIF, WebP)
- Maximum file size: 10MB per image
- View all uploaded media in a grid
- Copy image URLs for use in CMS
- Delete unused images
- View file sizes and metadata

**How to Upload:**
1. Click the **Media Library** tab
2. Click **Choose File** and select an image
3. Image uploads automatically
4. Copy the URL to use in CMS content

**Using Images in CMS:**
1. Upload your image in Media Library
2. Click **Copy** button to get the image URL
3. Go to CMS Editor
4. Edit a content block that has an `image_url` field
5. Paste the copied URL
6. Save changes

### 5. Email Logs Tab ✨ NEW
View all form submissions and mock email notifications.

**Features:**
- All driver applications are logged
- All advertiser inquiries are logged
- Email recipient: `nurettinerzen@gmail.com`
- View email subject and body
- See full form data submitted
- Check submission timestamps

**Email Types:**
- **Driver Application**: When someone submits the driver form
- **Advertiser Inquiry**: When someone submits the advertiser contact form

**How to Review:**
1. Click the **Email Logs** tab
2. Browse all logged emails
3. Click **View** to see full email details
4. Review form data submitted

---

## 🎨 Content Management Best Practices

### Editing Hero Sections
Hero sections typically contain:
```json
{
  "title": "Main Headline",
  "subtitle": "Supporting Text",
  "description": "Longer description paragraph",
  "cta_primary_text": "Button Text",
  "cta_primary_link": "/destination",
  "image_url": "https://..."
}
```

### Editing Stats
Stats are in JSON array format:
```json
{
  "stats": [
    {
      "label": "Active Vehicles",
      "value": "500+",
      "icon": "Users"
    }
  ]
}
```

### Editing Testimonials
Testimonials array format:
```json
{
  "testimonials": [
    {
      "name": "John Doe",
      "role": "Uber Driver",
      "content": "Quote text here",
      "rating": 5
    }
  ]
}
```

### Available Icons
Use these icon names in content:
- Users
- Monitor
- TrendingUp
- MapPin
- DollarSign
- Zap
- Shield
- Target
- Eye
- BarChart3

---

## 🔒 Security Notes

1. **Admin URL is secret** - Not linked from public site
2. **Password protected** - Requires login credentials
3. **Session-based auth** - Token stored in browser
4. **Logout** - Always logout when finished

---

## 📧 Email Notifications (Current Status)

**Status:** Mock/Logging Mode

All form submissions are currently LOGGED to the database and console, not actually sent via email. This allows you to:
- Review all submissions in the Email Logs tab
- Test the system without email configuration
- See exactly what would be sent

**To enable real email sending (Phase 2):**
- We will integrate Gmail SMTP or another email service
- All logged emails can then be sent retroactively if needed
- Configuration takes approximately 10 minutes

---

## 🚀 Quick Start Workflow

### Daily Operations:
1. Login to admin panel
2. Check **Email Logs** for new submissions
3. Review **Driver Applications** and update statuses
4. Review **Advertiser Inquiries** and follow up
5. Export data to CSV if needed for processing

### Content Updates:
1. Go to **CMS Editor**
2. Edit any text, headlines, or descriptions
3. Save changes
4. Changes are LIVE immediately (no code deploy needed)

### Media Management:
1. Upload new images to **Media Library**
2. Copy image URLs
3. Update image references in **CMS Editor**
4. Delete old/unused images

---

## 📊 Database Collections

All data is stored in MongoDB (`ridemedia_db`):

- `driver_applications` - Driver form submissions
- `advertiser_submissions` - Advertiser form submissions
- `content_blocks` - CMS editable content
- `media_files` - Uploaded images (base64)
- `email_logs` - Form submission notifications
- `file_uploads` - User uploaded files (vehicle photos, ad creatives)

---

## 🛠️ Technical Details

**Backend:**
- FastAPI (Python)
- MongoDB (motor async driver)
- Password hashing with bcrypt
- RESTful API architecture

**Frontend:**
- React with React Router
- Tailwind CSS styling
- Shadcn UI components
- Axios for API calls

**File Storage:**
- Base64 encoding in MongoDB
- No external dependencies (S3 deferred to Phase 2)

---

## 📝 Next Steps (Future Phases)

**Phase 2 - Driver Portal:**
- Driver login system
- Personal dashboard
- Earnings tracking
- Document uploads
- Trip/engagement reporting

**Phase 3 - Advertiser Portal:**
- Advertiser login system
- Campaign creation
- Creative uploads
- Analytics dashboard
- Budget management

**Phase 4 - Impression Tracking:**
- Device event API
- Real-time impression logging
- Analytics and reporting
- Third-party verification

---

## 🆘 Support & Troubleshooting

**Common Issues:**

**Can't access admin panel:**
- Verify you're using the correct secret URL
- Check credentials (username: admin, password: admin123)
- Clear browser cache and try again

**CMS changes not showing:**
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Verify changes were saved (check "Last updated" timestamp)

**Image upload fails:**
- Check file size (must be under 10MB)
- Verify file is an image (JPG, PNG, GIF, WebP)
- Try a different image format

**Form submissions not appearing:**
- Check Email Logs tab
- Verify submission was successful (check browser console)
- Forms save to database immediately

---

**Admin Panel Version:** Phase 1 - CMS Edition  
**Last Updated:** October 15, 2025  
**Status:** Production Ready ✅
