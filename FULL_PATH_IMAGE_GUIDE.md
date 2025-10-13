# 🖼️ Image Path Implementation Guide

## ✅ Frontend Image URL Configuration

Based on your API response, the frontend now constructs the full image path and sends it to the backend:

### **API Response:**
```json
{
  "folder": "D:\\ocr",
  "results": [
    {
      "filename": "WhatsApp Image 2025-10-10 at 15.31.52.jpeg"
    }
  ]
}
```

### **Constructed Full Path:**
```
D:\ocr\WhatsApp Image 2025-10-10 at 15.31.52.jpeg
```

### **Image URL:**
```
http://localhost:8000/image/D%3A%5Cocr%5CWhatsApp%20Image%202025-10-10%20at%2015.31.52.jpeg
```

## 🔧 **Required Backend Endpoint:**

You need to add this image serving endpoint to your OCR backend:

### **Endpoint:**
```
GET /image/{full_path}
```

### **Backend Implementation Examples:**

#### **FastAPI Implementation:**
```python
from fastapi import FastAPI, HTTPException, Path
from fastapi.responses import FileResponse
import os
from urllib.parse import unquote

@app.get("/image/{full_path:path}")
async def get_image(full_path: str = Path(..., description="Full file path")):
    # Decode the URL-encoded path
    decoded_path = unquote(full_path)
    
    # Security check - ensure path is within expected directory
    if not decoded_path.startswith("D:\\ocr"):
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Check if file exists
    if not os.path.exists(decoded_path):
        raise HTTPException(status_code=404, detail="Image not found")
    
    # Check if it's actually a file (not a directory)
    if not os.path.isfile(decoded_path):
        raise HTTPException(status_code=400, detail="Path is not a file")
    
    # Determine media type based on file extension
    filename = os.path.basename(decoded_path)
    ext = filename.lower().split('.')[-1]
    media_types = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'bmp': 'image/bmp',
        'webp': 'image/webp'
    }
    media_type = media_types.get(ext, 'image/jpeg')
    
    # Return the image file
    return FileResponse(
        decoded_path,
        media_type=media_type,
        headers={"Content-Disposition": f"inline; filename={filename}"}
    )
```

#### **Flask Implementation:**
```python
from flask import Flask, send_file, abort
import os
from urllib.parse import unquote

@app.route("/image/<path:full_path>", methods=["GET"])
def get_image(full_path):
    # Decode the URL-encoded path
    decoded_path = unquote(full_path)
    
    # Security check - ensure path is within expected directory
    if not decoded_path.startswith("D:\\ocr"):
        abort(403, "Access denied")
    
    # Check if file exists
    if not os.path.exists(decoded_path):
        abort(404, "Image not found")
    
    # Check if it's actually a file (not a directory)
    if not os.path.isfile(decoded_path):
        abort(400, "Path is not a file")
    
    # Return the image file
    return send_file(decoded_path, as_attachment=False)
```

#### **Alternative - Path Parameter Handling:**
```python
# If you prefer a different approach, you can use base64 encoding
import base64

@app.get("/image/{encoded_path}")
async def get_image_base64(encoded_path: str):
    try:
        # Decode base64 path
        decoded_path = base64.b64decode(encoded_path).decode('utf-8')
        
        # Security and existence checks...
        if not decoded_path.startswith("D:\\ocr"):
            raise HTTPException(status_code=403, detail="Access denied")
        
        if not os.path.exists(decoded_path):
            raise HTTPException(status_code=404, detail="Image not found")
        
        return FileResponse(decoded_path)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid path encoding")
```

## 🔒 **Security Considerations:**

1. **Path Validation**: Always validate that the path starts with your expected directory (`D:\ocr`)
2. **URL Decoding**: Properly decode URL-encoded paths
3. **File Type Check**: Ensure it's actually a file, not a directory
4. **Extension Validation**: Only allow image file extensions

## 🧪 **Testing the Endpoint:**

### **Direct Browser Test:**
```
http://localhost:8000/image/D%3A%5Cocr%5CWhatsApp%20Image%202025-10-10%20at%2015.31.52.jpeg
```

### **PowerShell Test:**
```powershell
$encodedPath = [System.Web.HttpUtility]::UrlEncode("D:\ocr\WhatsApp Image 2025-10-10 at 15.31.52.jpeg")
$url = "http://localhost:8000/image/$encodedPath"
Invoke-WebRequest -Uri $url -OutFile "test_image.jpeg"
```

### **Python Test:**
```python
import requests
from urllib.parse import quote

full_path = r"D:\ocr\WhatsApp Image 2025-10-10 at 15.31.52.jpeg"
encoded_path = quote(full_path, safe='')
url = f"http://localhost:8000/image/{encoded_path}"

response = requests.get(url)
if response.status_code == 200:
    with open("test_image.jpeg", "wb") as f:
        f.write(response.content)
    print("Image downloaded successfully")
else:
    print(f"Error: {response.status_code}")
```

## 🎯 **Expected Result:**

Once you implement the image endpoint, the OCR page will:

- ✅ **Construct full path**: `D:\ocr\WhatsApp Image 2025-10-10 at 15.31.52.jpeg`
- ✅ **Display the actual image** in the preview area
- ✅ **Show image overlay** with extracted name and ID
- ✅ **Auto-fill form fields** with the API data
- ✅ **Handle errors gracefully** if image fails to load

## 📝 **Frontend Implementation:**

The frontend now:
- ✅ **Combines folder + filename** from your API response
- ✅ **URL encodes the full path** properly
- ✅ **Sends to backend** as: `/image/{encoded_full_path}`
- ✅ **Handles loading errors** with fallback display

**The frontend is ready and will display the image as soon as you add the `/image/{full_path}` endpoint to your backend!**