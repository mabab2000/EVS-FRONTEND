# OCR API Testing Guide

## Server Status
✅ **Frontend**: Running on http://localhost:5175/
⚠️ **Backend**: Make sure your OCR API is running on http://localhost:8000/

## Testing Steps

### 1. Check OCR API Backend
First, verify your OCR API is running by testing the endpoint directly:

**Option A: Browser Test**
- Open browser and go to: `http://localhost:8000/scan-folder`
- You should see a JSON response

**Option B: PowerShell Test**
```powershell
Invoke-RestMethod -Uri "http://localhost:8000/scan-folder" -Method GET
```

**Option C: curl Test**
```bash
curl -X GET http://localhost:8000/scan-folder
```

### 2. Expected API Response Format
Your API should return something like this:
```json
{
  "folder": "D:\\ocr",
  "total_images": 1,
  "successful": 1,
  "failed": 0,
  "results": [
    {
      "filename": "WhatsApp Image 2025-10-10 at 15.31.52.jpeg",
      "document_type": "id_card",
      "names": "DEI Francois Audace",
      "id": "1199980064830381",
      "preprocessing_method": "denoised",
      "success": true
    }
  ]
}
```

### 3. Frontend Testing
1. Open http://localhost:5175/ in your browser
2. Navigate to the OCR page
3. Open browser Developer Tools (F12)
4. Go to Console tab
5. Click "Scan Folder" button
6. Check console logs for debugging information

### 4. What to Look For

**In Console Logs:**
- 🔍 Starting OCR scan...
- 📡 API Endpoint: http://localhost:8000/scan-folder
- 📊 Response status: 200
- ✅ Response OK: true
- 📄 API Response: [your API data]
- 🎯 Found results: [number]
- ✅ First successful result: [result object]
- 👤 Set name field: [name from API]
- 🆔 Set ID field: [ID from API]
- 🖼️ Set image path: [image path]

**On the Page:**
- Green "Scan Results" section should appear
- Blue "Debug - API Response" section should show the raw JSON
- Name and ID Number fields should auto-fill
- Image preview area should show document information

### 5. Common Issues & Solutions

**Issue: "Failed to fetch" error**
- ✅ Make sure OCR backend is running on port 8000
- ✅ Check firewall settings
- ✅ Verify API endpoint URL is correct

**Issue: CORS errors**
- ✅ Backend needs to allow CORS from localhost:5175
- ✅ Add CORS headers to your OCR API

**Issue: API returns empty results**
- ✅ Check if images exist in the OCR folder
- ✅ Verify image processing is working on backend
- ✅ Check backend logs for processing errors

**Issue: Data not displaying on page**
- ✅ Check browser console for JavaScript errors
- ✅ Verify API response format matches expected structure
- ✅ Look at the Debug section on the page to see raw response

### 6. Debug Features Added

The page now includes:
1. **Console Logging**: Detailed logs in browser console
2. **Debug Display**: Raw API response shown on page
3. **Error Messages**: Clear error display if something fails
4. **Status Indicators**: Visual feedback during scanning

## Troubleshooting Commands

**Kill processes on ports (if needed):**
```powershell
# Find process using port 8000
netstat -ano | findstr :8000

# Kill process (replace PID with actual process ID)
taskkill /PID [PID] /F
```

**Test API endpoint directly:**
```powershell
# Test if API is accessible
Test-NetConnection -ComputerName localhost -Port 8000

# Make actual API call
$response = Invoke-RestMethod -Uri "http://localhost:8000/scan-folder" -Method GET
$response | ConvertTo-Json -Depth 10
```

## Next Steps

1. **First**: Test your OCR API directly using one of the methods above
2. **Second**: Open the frontend and check console logs when clicking "Scan Folder"
3. **Third**: Look at the debug information displayed on the page
4. **Report**: Share the console logs and any error messages you see