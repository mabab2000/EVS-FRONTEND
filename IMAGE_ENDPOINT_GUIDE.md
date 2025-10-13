# 🖼️ Image Endpoint Implementation Guide

## ✅ Frontend Image URL Configuration

Based on your API response format, the frontend now constructs image URLs as:

```
http://localhost:8000/image?folder={folder}&filename={filename}
```

### **Example URL:**
```
http://localhost:8000/image?folder=D%3A%5Cocr&filename=WhatsApp%20Image%202025-10-10%20at%2015.31.52.jpeg
```

## 🔧 **Required Backend Endpoint:**

You need to add this image serving endpoint to your OCR backend:

### **Endpoint:**
```
GET /image?folder={folder}&filename={filename}
```

### **Backend Implementation Examples:**

#### **FastAPI Implementation:**
```python
from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import FileResponse
import os

@app.get("/image")
async def get_image(
    folder: str = Query(..., description="Full folder path"),
    filename: str = Query(..., description="Image filename")
):
    # Construct the full image path
    image_path = os.path.join(folder, filename)
    
    # Security check - ensure path is within expected directory
    if not image_path.startswith("D:\\ocr"):
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Check if file exists
    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="Image not found")
    
    # Determine media type based on file extension
    ext = filename.lower().split('.')[-1]
    media_types = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'bmp': 'image/bmp'
    }
    media_type = media_types.get(ext, 'image/jpeg')
    
    # Return the image file
    return FileResponse(
        image_path,
        media_type=media_type,
        headers={"Content-Disposition": f"inline; filename={filename}"}
    )
```

#### **Flask Implementation:**
```python
from flask import Flask, send_file, request, abort
import os

@app.route("/image", methods=["GET"])
def get_image():
    folder = request.args.get('folder')
    filename = request.args.get('filename')
    
    if not folder or not filename:
        abort(400, "folder and filename parameters are required")
    
    # Construct the full image path
    image_path = os.path.join(folder, filename)
    
    # Security check - ensure path is within expected directory
    if not image_path.startswith("D:\\ocr"):
        abort(403, "Access denied")
    
    # Check if file exists
    if not os.path.exists(image_path):
        abort(404, "Image not found")
    
    # Return the image file
    return send_file(image_path, as_attachment=False)
```

### **Alternative Simple Implementation:**
If you prefer a simpler approach, you could also implement:

```python
@app.get("/image/{filename}")
async def get_image_simple(filename: str):
    # Assumes all images are in D:\ocr folder
    image_path = os.path.join("D:\\ocr", filename)
    
    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="Image not found")
    
    return FileResponse(image_path)
```

And update the frontend to use:
```typescript
src={`http://localhost:8000/image/${encodeURIComponent(scanResults.results[0].filename)}`}
```

## 🔒 **Security Considerations:**

1. **Path Validation**: Always validate that the requested path is within your expected directory
2. **File Extension Check**: Only allow image file extensions
3. **Encoding**: Properly handle URL encoding for filenames with spaces/special characters

## 🧪 **Testing the Endpoint:**

### **Direct Browser Test:**
Open this URL in your browser:
```
http://localhost:8000/image?folder=D%3A%5Cocr&filename=WhatsApp%20Image%202025-10-10%20at%2015.31.52.jpeg
```

### **PowerShell Test:**
```powershell
$url = "http://localhost:8000/image?folder=D%3A%5Cocr&filename=WhatsApp%20Image%202025-10-10%20at%2015.31.52.jpeg"
Invoke-WebRequest -Uri $url -OutFile "test_image.jpeg"
```

## 🎯 **Expected Result:**

Once you implement the image endpoint, the OCR page will:

- ✅ **Display the actual scanned image** instead of text information
- ✅ **Show image overlay** with extracted name and ID
- ✅ **Auto-fill form fields** with the API data
- ✅ **Handle image loading errors** gracefully

## 📝 **Current Frontend Status:**

- ✅ **Image URL Construction**: Using folder + filename from API response
- ✅ **Error Handling**: Fallback to document info if image fails
- ✅ **Form Auto-Fill**: Working with your API data
- ✅ **CORS Ready**: Handles cross-origin image requests

**The frontend is ready and will display images as soon as you add the image endpoint to your backend!**