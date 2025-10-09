import React, { useState } from 'react';
import { X } from 'lucide-react';

interface RecordData {
  id: number;
  Name: string;
  Phone: string;
  IDNumber: string;
  Gender: string;
  CheckIn: string;
  CheckOut: string;
  Date: string;
  Status: string;
  Department: string;
  Email?: string;
  Address?: string;
  EmergencyContact?: string;
  Position?: string;
  Salary?: string;
  Notes?: string;
}

interface ViewRecordModalProps {
  isOpen: boolean;
  record: RecordData | null;
  onClose?: () => void;
}

export default function ViewRecordModal({ isOpen, record, onClose }: ViewRecordModalProps) {
  const [formData, setFormData] = useState({
    Name: record?.Name || '',
    Phone: record?.Phone || '',
    Email: record?.Email || '',
    Address: record?.Address || '',
    Gender: record?.Gender || '',
    Status: record?.Status || '',
    Department: record?.Department || '',
    EmergencyContact: record?.EmergencyContact || '',
    Position: record?.Position || '',
    Salary: record?.Salary || '',
    Notes: record?.Notes || ''
  });
  
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Update form data when record changes
  React.useEffect(() => {
    if (record) {
      setFormData({
        Name: record.Name || '',
        Phone: record.Phone || '',
        Email: record.Email || '',
        Address: record.Address || '',
        Gender: record.Gender || '',
        Status: record.Status || '',
        Department: record.Department || '',
        EmergencyContact: record.EmergencyContact || '',
        Position: record.Position || '',
        Salary: record.Salary || '',
        Notes: record.Notes || ''
      });
    }
  }, [record]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  if (!isOpen || !record) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div 
        className="rounded-lg shadow-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
        style={{ 
          backgroundColor: "#ffffff",
          color: "#374151"
        }}
      >
        {/* Modal Header */}
        <div 
          className="flex items-center justify-between p-3 border-b"
          style={{ borderColor: "#e5e7eb" }}
        >
          <h2 
            className="text-lg font-semibold"
            style={{ color: "#0072a7" }}
          >
            Edit Record Details
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                // Handle update logic here
                alert(`Updating record for ${formData.Name}`);
                // Close modal after update
                if (onClose) onClose();
              }}
              className="px-3 py-1.5 rounded-lg font-medium transition-colors text-sm"
              style={{
                backgroundColor: "#0072a7",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#005b8a"}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#0072a7"}
            >
              Update
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full transition-colors"
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#6b7280",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#f3f4f6"}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "transparent"}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-3">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            {/* Profile Image Section */}
            <div className="col-span-1">
              <h3 
                className="text-sm font-semibold mb-2"
                style={{ color: "#0072a7" }}
              >
                Profile Image
              </h3>
              <div className="space-y-2">
                <div 
                  className="w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors"
                  style={{ 
                    borderColor: "#0072a7",
                    backgroundColor: "#f8fafc"
                  }}
                  onClick={triggerFileUpload}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e6f4fa")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover mb-1"
                    />
                  ) : (
                    <div 
                      className="w-16 h-16 rounded-full mb-1 flex items-center justify-center text-sm font-bold"
                      style={{ 
                        backgroundColor: "#e6f4fa",
                        color: "#0072a7"
                      }}
                    >
                      {formData.Name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <span 
                    className="text-xs font-medium text-center"
                    style={{ color: "#6b7280" }}
                  >
                    {profileImage ? 'Click to change' : 'Click to upload'}
                  </span>
                </div>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                
                <button
                  onClick={triggerFileUpload}
                  className="w-full py-1.5 px-2 rounded-lg font-medium transition-colors text-xs"
                  style={{
                    backgroundColor: "#0072a7",
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#005b8a"}
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#0072a7"}
                >
                  {profileImage ? 'Change Image' : 'Upload Image'}
                </button>
                
                {profileImage && (
                  <button
                    onClick={() => setProfileImage(null)}
                    className="w-full py-1.5 px-2 rounded-lg font-medium transition-colors text-xs"
                    style={{
                      backgroundColor: "#dc2626",
                      color: "white",
                      border: "none",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#b91c1c"}
                    onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#dc2626"}
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>

            {/* Form Fields Section */}
            <div className="col-span-1 lg:col-span-3">
              <h3 
                className="text-sm font-semibold mb-2"
                style={{ color: "#0072a7" }}
              >
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Column 1 */}
              <div className="space-y-2">
                <div>
                  <label 
                    className="block text-xs font-medium mb-1"
                    style={{ color: "#0072a7" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.Name}
                    onChange={(e) => handleInputChange('Name', e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg border text-xs"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "#d1d5db",
                      color: "#374151"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0072a7";
                      e.target.style.boxShadow = "0 0 0 2px rgba(0, 114, 167, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label 
                    className="block text-xs font-medium mb-1"
                    style={{ color: "#0072a7" }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.Phone}
                    onChange={(e) => handleInputChange('Phone', e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg border text-xs"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "#d1d5db",
                      color: "#374151"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0072a7";
                      e.target.style.boxShadow = "0 0 0 2px rgba(0, 114, 167, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label 
                      className="block text-xs font-medium mb-1"
                      style={{ color: "#0072a7" }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.Email}
                      onChange={(e) => handleInputChange('Email', e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border text-xs"
                      style={{
                        backgroundColor: "#ffffff",
                        borderColor: "#d1d5db",
                        color: "#374151"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#0072a7";
                        e.target.style.boxShadow = "0 0 0 2px rgba(0, 114, 167, 0.2)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="Enter email"
                    />
                  </div>

                  <div>
                    <label 
                      className="block text-xs font-medium mb-1"
                      style={{ color: "#0072a7" }}
                    >
                      Gender
                    </label>
                    <select
                      value={formData.Gender}
                      onChange={(e) => handleInputChange('Gender', e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border text-xs"
                      style={{
                        backgroundColor: "#ffffff",
                        borderColor: "#d1d5db",
                        color: "#374151"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#0072a7";
                        e.target.style.boxShadow = "0 0 0 2px rgba(0, 114, 167, 0.2)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>                {/* Column 2 */}
                <div className="space-y-2">
                  <div>
                    <label 
                      className="block text-xs font-medium mb-1"
                      style={{ color: "#0072a7" }}
                    >
                      Department
                    </label>
                    <input
                      type="text"
                      value={formData.Department}
                      onChange={(e) => handleInputChange('Department', e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border text-xs"
                      style={{
                        backgroundColor: "#ffffff",
                        borderColor: "#d1d5db",
                        color: "#374151"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#0072a7";
                        e.target.style.boxShadow = "0 0 0 2px rgba(0, 114, 167, 0.2)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div>
                    <label 
                      className="block text-xs font-medium mb-1"
                      style={{ color: "#0072a7" }}
                    >
                      Status
                    </label>
                    <select
                      value={formData.Status}
                      onChange={(e) => handleInputChange('Status', e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border text-xs"
                      style={{
                        backgroundColor: "#ffffff",
                        borderColor: "#d1d5db",
                        color: "#374151"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#0072a7";
                        e.target.style.boxShadow = "0 0 0 2px rgba(0, 114, 167, 0.2)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <option value="">Select Status</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}