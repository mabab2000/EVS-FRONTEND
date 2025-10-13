// OCR Utility Functions

export interface OCRResult {
  filename: string;
  document_type: string;
  names: string;
  id: string;
  preprocessing_method: string;
  success: boolean;
}

export interface OCRResponse {
  folder: string;
  total_images: number;
  successful: number;
  failed: number;
  results: OCRResult[];
}

export class OCRProcessor {
  static formatName(name: string): string {
    if (!name) return '';
    
    // Clean up the name - remove extra spaces, capitalize properly
    return name
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  static formatID(id: string): string {
    if (!id) return '';
    
    // Remove any non-numeric characters and format
    const cleanId = id.replace(/\D/g, '');
    
    // Format ID with spaces for readability (e.g., 1199 9800 6483 0381)
    if (cleanId.length >= 12) {
      return cleanId.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    
    return cleanId;
  }

  static detectGender(name: string): string {
    if (!name) return '';
    
    const nameLower = name.toLowerCase();
    
    // Common male name patterns
    const malePatterns = [
      'francois', 'audace', 'john', 'mike', 'david', 'alex', 'tom', 'chris',
      'pierre', 'jean', 'paul', 'antoine', 'bernard', 'claude'
    ];
    
    // Common female name patterns
    const femalePatterns = [
      'marie', 'anne', 'claire', 'sophie', 'emma', 'lisa', 'sarah', 'jane',
      'francoise', 'sylvie', 'nathalie', 'isabelle', 'catherine'
    ];
    
    for (const pattern of malePatterns) {
      if (nameLower.includes(pattern)) {
        return 'Male';
      }
    }
    
    for (const pattern of femalePatterns) {
      if (nameLower.includes(pattern)) {
        return 'Female';
      }
    }
    
    return ''; // Unknown
  }

  static getDocumentTypeDisplay(type: string): string {
    const typeMap: { [key: string]: string } = {
      'id_card': 'ID Card',
      'passport': 'Passport',
      'driving_license': 'Driving License',
      'national_id': 'National ID',
      'other': 'Other Document'
    };
    
    return typeMap[type] || type;
  }

  static getPreprocessingMethodDisplay(method: string): string {
    const methodMap: { [key: string]: string } = {
      'denoised': 'Noise Reduction',
      'enhanced': 'Enhanced Quality',
      'cropped': 'Auto-Cropped',
      'rotated': 'Rotation Corrected',
      'original': 'Original'
    };
    
    return methodMap[method] || method;
  }

  static processOCRResult(result: OCRResult): {
    formattedName: string;
    formattedID: string;
    detectedGender: string;
    documentType: string;
    processingMethod: string;
  } {
    return {
      formattedName: this.formatName(result.names),
      formattedID: this.formatID(result.id),
      detectedGender: this.detectGender(result.names),
      documentType: this.getDocumentTypeDisplay(result.document_type),
      processingMethod: this.getPreprocessingMethodDisplay(result.preprocessing_method)
    };
  }
}

export default OCRProcessor;