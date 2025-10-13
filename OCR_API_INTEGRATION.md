# OCR API Integration Documentation

## Overview
The OCR page has been updated to integrate with the specified OCR API endpoint that processes images and extracts information from documents.

## API Endpoint Details

### Endpoint
- **URL**: `http://localhost:8000/scan-folder`
- **Method**: `GET`
- **Content-Type**: `application/json`

### API Response Format
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

## Implementation Details

### 1. API Configuration
The OCR endpoint is configured in `src/config/api.ts`:
```typescript
OCR: {
  SCAN_FOLDER: 'http://localhost:8000/scan-folder',
}
```

### 2. OCR Component Updates
The OCR page (`src/pages/scan/ocr.tsx`) has been updated with:

#### Key Features:
- **GET Request**: Uses GET method instead of POST
- **Auto-Form Filling**: Automatically fills name and ID number fields from API response
- **Image Display**: Shows processed document information in the image preview area
- **Error Handling**: Comprehensive error handling for API failures
- **Loading States**: Visual feedback during API calls

#### Auto-Fill Logic:
```typescript
// Auto-fill Name field
const nameIndex = updatedFields.findIndex(field => field.label === "Name");
if (nameIndex !== -1 && firstResult.names) {
  updatedFields[nameIndex].value = firstResult.names;
}

// Auto-fill ID Number field
const idIndex = updatedFields.findIndex(field => field.label === "ID Number");
if (idIndex !== -1 && firstResult.id) {
  updatedFields[idIndex].value = firstResult.id;
}
```

### 3. Image Display
Since direct file system access from browser is limited, the component displays:
- Document filename
- Full file path
- Document type (e.g., "id_card")
- Preprocessing method (e.g., "denoised")
- Extracted names and ID number

## Usage Instructions

### 1. Start the Backend
Make sure your OCR backend is running on `http://localhost:8000`

### 2. Access the OCR Page
Navigate to the OCR page in the EVS frontend application

### 3. Scan Documents
1. Click the "Scan Folder" button
2. The system will send a GET request to the OCR API
3. If successful, the name and ID fields will be automatically filled
4. Document information will be displayed in the image preview area

### 4. Manual Processing
- You can manually edit any auto-filled fields
- Use "Clear Form" to reset all fields
- Use "Save Data" to process the form data

## Response Handling

### Success Case
- API response is processed automatically
- First successful result is used for auto-filling
- Form fields are populated with extracted data
- Success indicators are shown next to auto-filled fields

### Error Cases
- Network errors are caught and displayed
- API errors (non-200 status) are handled
- Empty or malformed responses are handled gracefully
- User-friendly error messages are shown

## Technical Notes

### Dependencies
- No additional dependencies required
- Uses native fetch API for HTTP requests
- Integrates with existing form state management

### State Management
- `scanResults`: Stores the complete API response
- `scannedImage`: Stores the image path for display
- `error`: Stores any error messages
- `isScanning`: Tracks loading state

### Form Integration
The OCR integration works seamlessly with the existing form fields:
- Name field automatically filled with `names` from API
- ID Number field automatically filled with `id` from API
- Other fields remain available for manual input
- Form validation and submission work normally

## Testing

### Manual Testing
1. Ensure OCR backend is running on port 8000
2. Place test images in the configured OCR folder
3. Click "Scan Folder" in the frontend
4. Verify auto-filling works correctly
5. Test error scenarios (backend down, no images, etc.)

### Error Scenarios to Test
- Backend server not running
- No images in scan folder
- Invalid API response format
- Network connectivity issues

## Future Enhancements

### Possible Improvements
1. **Image Upload**: Add ability to upload images directly
2. **Multiple Images**: Handle multiple images in one scan
3. **Image Preview**: Add actual image display (requires backend image serving)
4. **Batch Processing**: Process multiple documents at once
5. **Advanced OCR**: Support for more document types and fields

### Backend Requirements for Image Display
To show actual images in the browser, the backend would need:
- Image serving endpoint (e.g., `/images/{filename}`)
- Proper CORS headers for image requests
- File access permissions and security considerations