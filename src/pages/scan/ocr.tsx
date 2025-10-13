import { useState, useEffect } from "react";
import VerticalSidebar from "../../components/VerticalSidebar";
import TopNavbar from "../../components/TopNavbar";
import DataTable from "react-data-table-component";
import { Eye, Loader2, RefreshCw } from "lucide-react";
import ViewRecordModal from "../../components/ViewRecordModal";
import { API_ENDPOINTS } from "../../config/api";

export default function OCRPreview() {
  const [originalRecords] = useState([
    { id: 1, Name: "John Doe", Phone: "123456789", IDNumber: "ID12345", Gender: "Male", CheckIn: "9:00 AM", CheckOut: "5:00 PM", Date: "2025-10-01", Status: "Completed", Department: "HR" },
    { id: 2, Name: "Jane Smith", Phone: "987654321", IDNumber: "ID54321", Gender: "Female", CheckIn: "9:30 AM", CheckOut: "Not yet", Date: "2025-10-01", Status: "Pending", Department: "Finance" },
    { id: 3, Name: "Mike Johnson", Phone: "555666777", IDNumber: "ID11111", Gender: "Male", CheckIn: "8:30 AM", CheckOut: "4:30 PM", Date: "2025-10-02", Status: "Completed", Department: "IT" },
    { id: 4, Name: "Sarah Wilson", Phone: "444555666", IDNumber: "ID22222", Gender: "Female", CheckIn: "10:00 AM", CheckOut: "Not yet", Date: "2025-10-02", Status: "In Progress", Department: "Marketing" },
    { id: 5, Name: "David Brown", Phone: "333444555", IDNumber: "ID33333", Gender: "Male", CheckIn: "9:15 AM", CheckOut: "5:15 PM", Date: "2025-10-03", Status: "Completed", Department: "Sales" },
    { id: 6, Name: "Lisa Davis", Phone: "222333444", IDNumber: "ID44444", Gender: "Female", CheckIn: "8:45 AM", CheckOut: "Not yet", Date: "2025-10-03", Status: "Pending", Department: "HR" },
     { id: 7, Name: "Alex Johnson", Phone: "123456789", IDNumber: "ID12345", Gender: "Male", CheckIn: "9:00 AM", CheckOut: "5:00 PM", Date: "2025-10-01", Status: "Completed", Department: "HR" },
    { id: 8, Name: "Emma Wilson", Phone: "987654321", IDNumber: "ID54321", Gender: "Female", CheckIn: "9:30 AM", CheckOut: "Not yet", Date: "2025-10-01", Status: "Pending", Department: "Finance" },
    { id: 9, Name: "Tom Anderson", Phone: "555666777", IDNumber: "ID11111", Gender: "Male", CheckIn: "8:30 AM", CheckOut: "4:30 PM", Date: "2025-10-02", Status: "Completed", Department: "IT" },
    { id: 10, Name: "Maria Garcia", Phone: "444555666", IDNumber: "ID22222", Gender: "Female", CheckIn: "10:00 AM", CheckOut: "Not yet", Date: "2025-10-02", Status: "In Progress", Department: "Marketing" },
    { id: 11, Name: "Chris Lee", Phone: "333444555", IDNumber: "ID33333", Gender: "Male", CheckIn: "9:15 AM", CheckOut: "5:15 PM", Date: "2025-10-03", Status: "Completed", Department: "Sales" },
    { id: 12, Name: "Sophie Chen", Phone: "222333444", IDNumber: "ID44444", Gender: "Female", CheckIn: "8:45 AM", CheckOut: "Not yet", Date: "2025-10-03", Status: "Pending", Department: "HR" },
  ]);
  
  const [filteredRecords, setFilteredRecords] = useState(originalRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const handleView = (index: number) => {
    setSelectedRecord(filteredRecords[index]);
    setIsModalOpen(true);
  };

  const columns = [
    { 
      name: "ID", 
      selector: (row: any) => row.id, 
      sortable: true, 
      width: "60px",
      style: { textAlign: "center" as const },
    },
    { 
      name: "Name", 
      selector: (row: any) => row.Name, 
      sortable: true,
      width: "150px",
    },
    { 
      name: "Phone", 
      selector: (row: any) => row.Phone,
      width: "110px",
    },
    { 
      name: "Gender", 
      selector: (row: any) => row.Gender,
      width: "80px",
      style: { textAlign: "center" as const },
    },
    { 
      name: "In/Out", 
      selector: (row: any) => row.CheckOut && row.CheckOut !== "Not yet" ? "Out" : "In",
      width: "70px",
      style: { textAlign: "center" as const },
      cell: (row: any) => {
        const status = row.CheckOut && row.CheckOut !== "Not yet" ? "Out" : "In";
        return (
          <span 
            style={{
              padding: "2px 8px",
              borderRadius: "12px",
              fontSize: "10px",
              fontWeight: "600",
              backgroundColor: status === "Out" ? "#fecaca" : "#dcfce7",
              color: status === "Out" ? "#dc2626" : "#16a34a"
            }}
          >
            {status}
          </span>
        );
      },
    },
    { 
      name: "Time", 
      selector: (row: any) => `${row.CheckIn} - ${row.CheckOut}`,
      width: "140px",
      wrap: true,
    },
    { 
      name: "Date", 
      selector: (row: any) => row.Date,
      width: "100px",
    },
    { 
      name: "Status", 
      selector: (row: any) => row.Status,
      width: "100px",
      cell: (row: any) => (
        <span 
          style={{
            padding: "2px 6px",
            borderRadius: "12px",
            fontSize: "10px",
            fontWeight: "500",
            backgroundColor: row.Status === "Completed" ? "#dcfce7" : 
                           row.Status === "Pending" ? "#fef3c7" : "#dbeafe",
            color: row.Status === "Completed" ? "#166534" : 
                   row.Status === "Pending" ? "#92400e" : "#1e40af"
          }}
        >
          {row.Status}
        </span>
      ),
    },
    {
      name: "Action",
      width: "70px",
      style: { textAlign: "center" as const },
      cell: (_row: any, index: number) => (
        <button
          onClick={() => handleView(index)}
          style={{
            padding: "2px",
            backgroundColor: "#dcfce7",
            borderRadius: "4px",
            border: "none",
            color: "#16a34a",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#bbf7d0"}
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#dcfce7"}
        >
          <Eye size={12} />
        </button>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#0072a7",
        color: "white",
        fontSize: "12px",
        fontWeight: "bold",
        minHeight: "32px",
        fontFamily: "'Roboto Slab', serif",
      },
    },
    headCells: {
      style: {
        color: "white",
        backgroundColor: "#0072a7",
        paddingLeft: "6px",
        paddingRight: "6px",
        fontFamily: "'Roboto Slab', serif",
        fontWeight: "600",
      },
    },
    rows: {
      style: {
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        color: "#374151",
        minHeight: "30px",
        fontFamily: "'Roboto Slab', serif",
        "&:nth-of-type(odd)": {
          backgroundColor: "#f9fafb",
        },
      },
    },
    cells: {
      style: {
        color: "#374151",
        fontSize: "12px",
        paddingLeft: "6px",
        paddingRight: "6px",
        paddingTop: "4px",
        paddingBottom: "4px",
        fontFamily: "'Roboto Slab', serif",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#ffffff",
        color: "#374151",
        borderTop: "1px solid #e5e7eb",
        fontSize: "11px",
        padding: "8px",
        fontFamily: "'Roboto Slab', serif",
        "& .pagination__button": {
          backgroundColor: "#ffffff",
          color: "#0072a7",
          border: "1px solid #d1d5db",
          fontSize: "11px",
          padding: "4px 8px",
          fontFamily: "'Roboto Slab', serif",
          "&:hover": {
            backgroundColor: "#f0f8ff",
            color: "#005b8a",
          },
          "&:disabled": {
            backgroundColor: "#f3f4f6",
            color: "#9ca3af",
          },
        },
        "& .pagination__button--active": {
          backgroundColor: "#0072a7",
          color: "#ffffff",
          border: "1px solid #0072a7",
        },
        "& select": {
          backgroundColor: "#ffffff",
          color: "#0072a7",
          border: "1px solid #0072a7",
          borderRadius: "4px",
          padding: "2px 6px",
          fontSize: "11px",
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 2px rgba(0, 114, 167, 0.2)",
          },
        },
      },
    },
    subHeader: {
      style: {
        backgroundColor: "#ffffff",
        color: "#374151",
        padding: "8px",
      },
    },
  };

  const [ocrFields, setOcrFields] = useState([
    { label: "Name", value: "" },
    { label: "Phone", value: "" },
    { label: "ID Number", value: "" },
    { label: "Gender", value: "" },
    { label: "Date of Birth", value: "" },
    { label: "Address", value: "" },
  ]);

  // OCR API Integration State
  const [isScanning, setIsScanning] = useState(true); // Start with loading state
  const [scanResults, setScanResults] = useState<any>(null);
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-load OCR data when component mounts
  useEffect(() => {
    handleScanFolder();
  }, []);

  // OCR API Call Function
  const handleScanFolder = async () => {
    setIsScanning(true);
    setError(null);
    
    console.log('🔍 Starting OCR scan...');
    console.log('📡 API Endpoint:', API_ENDPOINTS.OCR.SCAN_FOLDER);
    
    try {
      const response = await fetch(API_ENDPOINTS.OCR.SCAN_FOLDER, {
        method: 'GET',
        // Removed Content-Type header to avoid CORS preflight
      });

      console.log('📊 Response status:', response.status);
      console.log('✅ Response OK:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📄 API Response:', data);
      setScanResults(data);

      // Process the first successful result
      if (data.results && data.results.length > 0) {
        console.log('🎯 Found results:', data.results.length);
        const firstResult = data.results.find((result: any) => result.success);
        console.log('✅ First successful result:', firstResult);
        
        if (firstResult) {
          // Auto-fill form with OCR data directly from API response
          const updatedFields = [...ocrFields];
          
          // Find and update Name field with the names from API
          const nameIndex = updatedFields.findIndex(field => field.label === "Name");
          if (nameIndex !== -1 && firstResult.names) {
            updatedFields[nameIndex].value = firstResult.names;
            console.log('👤 Set name field:', firstResult.names);
          }
          
          // Find and update ID Number field with the id from API
          const idIndex = updatedFields.findIndex(field => field.label === "ID Number");
          if (idIndex !== -1 && firstResult.id) {
            updatedFields[idIndex].value = firstResult.id;
            console.log('🆔 Set ID field:', firstResult.id);
          }
          
          setOcrFields(updatedFields);
          
          // Set image source for display using the folder path and filename
          if (firstResult.filename && data.folder) {
            const imagePath = `${data.folder}\\${firstResult.filename}`;
            const imageUrl = `http://localhost:8000/image/${encodeURIComponent(firstResult.filename)}`;
            setScannedImage(imagePath);
            console.log('🖼️ Set image path:', imagePath);
            console.log('🌐 Image URL will be:', imageUrl);
          }
        } else {
          console.log('❌ No successful results found');
          setError("No successful OCR results found in the response");
        }
      } else {
        console.log('❌ No results array found');
        setError("No OCR results found in the response");
      }

    } catch (err) {
      console.error('OCR scan error:', err);
      setError(err instanceof Error ? err.message : 'Failed to scan folder');
    } finally {
      setIsScanning(false);
    }
  };

  const handleOcrFieldChange = (index: number, value: string) => {
    const updatedFields = [...ocrFields];
    updatedFields[index].value = value;
    setOcrFields(updatedFields);
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <VerticalSidebar />
      <TopNavbar />
      <div 
        className="p-3 ml-[225px] pt-16"
        style={{ 
          backgroundColor: "#ffffff",
          color: "#374151"
        }}
      >
        <h1 
          className="text-lg font-bold mb-4 text-center" 
          style={{ 
            color: "#0072a7",
            fontFamily: "'Roboto Slab', serif",
            fontWeight: "600"
          }}
        >
          OCR Preview Page
        </h1>

        {/* IMAGE + FORM GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6">
          <div 
            className="col-span-1 lg:col-span-1 p-3 rounded shadow-lg flex flex-col items-center justify-center border"
            style={{ 
              backgroundColor: "#ffffff",
              borderColor: "#93c5fd"
            }}
          >
            {/* Scan Button */}
            <div className="w-full mb-3">
              <button
                onClick={handleScanFolder}
                disabled={isScanning}
                className="w-full px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: isScanning ? "#9ca3af" : "#0072a7",
                  fontFamily: "'Roboto Slab', serif",
                  fontWeight: "600",
                  fontSize: "14px"
                }}
                onMouseEnter={(e) => {
                  if (!isScanning) {
                    (e.target as HTMLButtonElement).style.backgroundColor = "#005b8a";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isScanning) {
                    (e.target as HTMLButtonElement).style.backgroundColor = "#0072a7";
                  }
                }}
              >
                {isScanning ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} />
                    Refresh OCR Data
                  </>
                )}
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="w-full mb-3 p-2 rounded" style={{ backgroundColor: "#fecaca", color: "#dc2626" }}>
                <p className="text-xs" style={{ fontFamily: "'Roboto Slab', serif" }}>
                  Error: {error}
                </p>
              </div>
            )}

            {/* Scan Results Info */}
           
            {/* Image Preview */}
            <div 
              className="w-full h-48 border border-dashed rounded flex items-center justify-center"
              style={{ 
                borderColor: "#0072a7",
                backgroundColor: "#e6f4fa"
              }}
            >
              {scannedImage && scanResults?.results?.[0]?.filename && scanResults?.folder ? (
                <div className="w-full h-full relative">
                  <img 
                    src={`http://localhost:8000/image/${encodeURIComponent(scanResults.results[0].filename)}`}
                    alt="Scanned Document"
                    className="w-full h-full object-contain rounded"
                    onError={(e) => {
                    
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex flex-col items-center justify-center p-4">
                            <div style="background-color: #f0f8ff; border: 1px solid #0072a7; padding: 16px; border-radius: 8px; text-align: center; width: 100%;">
                              <p style="color: #dc2626; font-weight: 500; font-family: 'Roboto Slab', serif; font-size: 12px; margin-bottom: 8px;">
                                ❌ Image Failed to Load
                              </p>
                              <p style="color: #005b8a; font-family: 'Roboto Slab', serif; font-size: 10px; margin-bottom: 4px;">
                                <strong>File:</strong> ${scanResults?.results?.[0]?.filename || 'Unknown'}
                              </p>
                              <p style="color: #005b8a; font-family: 'Roboto Slab', serif; font-size: 10px; margin-bottom: 4px;">
                                <strong>Path:</strong> ${scannedImage}
                              </p>
                              <p style="color: #005b8a; font-family: 'Roboto Slab', serif; font-size: 10px; margin-bottom: 4px;">
                                <strong>URL:</strong> ${e.currentTarget.src}
                              </p>
                              <p style="color: #16a34a; font-family: 'Roboto Slab', serif; font-size: 10px; margin-bottom: 4px;">
                                📋 Type: ${scanResults?.results?.[0]?.document_type || 'Unknown'}
                              </p>
                              <p style="color: #7c3aed; font-family: 'Roboto Slab', serif; font-size: 10px;">
                                🔧 Method: ${scanResults?.results?.[0]?.preprocessing_method || 'Unknown'}
                              </p>
                            </div>
                          </div>
                        `;
                      }
                    }}
                    onLoad={() => {
                      console.log('✅ Image loaded successfully:', scanResults?.results?.[0]?.filename);
                    }}
                  />
                  {/* Image overlay with document info */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 rounded-b"
                    style={{ fontSize: "10px", fontFamily: "'Roboto Slab', serif" }}
                  >
                   
                  </div>
                </div>
              ) : scanResults?.results?.[0]?.filename ? (
                <div className="text-center">
                  <div 
                    className="p-3 rounded mb-2"
                    style={{ backgroundColor: "#f0f8ff", border: "1px solid #0072a7" }}
                  >
                    <p 
                      style={{ 
                        color: "#0072a7", 
                        fontWeight: "500",
                        fontFamily: "'Roboto Slab', serif",
                        fontSize: "12px"
                      }}
                    >
                      Document Processed:
                    </p>
                    <p 
                      style={{ 
                        color: "#005b8a", 
                        fontWeight: "400",
                        fontFamily: "'Roboto Slab', serif",
                        fontSize: "10px",
                        wordBreak: "break-all"
                      }}
                    >
                      {scanResults.results[0].filename}
                    </p>
                    <p 
                      style={{ 
                        color: "#16a34a", 
                        fontWeight: "500",
                        fontFamily: "'Roboto Slab', serif",
                        fontSize: "10px",
                        marginTop: "4px"
                      }}
                    >
                      Type: {scanResults.results[0].document_type}
                    </p>
                    <p 
                      style={{ 
                        color: "#7c3aed", 
                        fontWeight: "500",
                        fontFamily: "'Roboto Slab', serif",
                        fontSize: "10px"
                      }}
                    >
                      Method: {scanResults.results[0].preprocessing_method}
                    </p>
                  </div>
                </div>
              ) : (
                <span 
                  style={{ 
                    color: "#0072a7", 
                    fontWeight: "500",
                    fontFamily: "'Roboto Slab', serif" 
                  }} 
                  className="text-xs text-center"
                >
                  Image Preview Area<br />
                  <span className="text-xs opacity-70">Data will load automatically or click "Refresh OCR Data"</span>
                </span>
              )}
            </div>
          </div>

          <div 
            className="col-span-1 lg:col-span-2 p-3 rounded shadow-lg border"
            style={{ 
              backgroundColor: "#ffffff",
              borderColor: "#0072a7"
            }}
          >
            <h2 
              className="text-sm font-semibold mb-2 border-b pb-2"
              style={{ 
                color: "#005b8a",
                fontFamily: "'Roboto Slab', serif",
                fontWeight: "600"
              }}
            >
              Retrieved Information {scanResults && scanResults.successful > 0 && (
                <span className="text-xs text-green-600 ml-2">
                  ✓ Auto-filled from OCR
                </span>
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ocrFields.map((field, idx) => (
                <div key={idx} className="mb-2">
                  <label 
                    className="block text-xs font-medium mb-1" 
                    style={{ 
                      color: "#0072a7",
                      fontFamily: "'Roboto Slab', serif",
                      fontWeight: "500"
                    }}
                  >
                    {field.label}
                    {(field.label === "Name" || field.label === "ID Number") && scanResults && (
                      <span className="text-green-600 ml-1 text-xs">✓</span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => handleOcrFieldChange(idx, e.target.value)}
                    placeholder={`Enter ${field.label}`}
                    className="w-full px-2 py-1.5 rounded border text-xs"
                    style={{
                      border: "1px solid #d1d5db",
                      backgroundColor: (field.label === "Name" || field.label === "ID Number") && field.value ? "#f0fdf4" : "#ffffff",
                      color: "#374151",
                      fontFamily: "'Roboto Slab', serif"
                    }}
                    onFocus={(e) => {
                      e.target.style.outline = "none";
                      e.target.style.borderColor = "#0072a7";
                      e.target.style.boxShadow = "0 0 0 2px rgba(0, 114, 167, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  const resetFields = ocrFields.map(field => ({ ...field, value: "" }));
                  setOcrFields(resetFields);
                  setScanResults(null);
                  setScannedImage(null);
                  setError(null);
                }}
                className="px-3 py-1.5 rounded border text-xs font-medium transition-all duration-200"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#d1d5db",
                  color: "#6b7280",
                  fontFamily: "'Roboto Slab', serif"
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = "#f9fafb";
                  (e.target as HTMLButtonElement).style.borderColor = "#9ca3af";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = "#ffffff";
                  (e.target as HTMLButtonElement).style.borderColor = "#d1d5db";
                }}
              >
                Clear Form
              </button>
              
              <button
                onClick={() => {
                  // Here you could add save/submit functionality
                  console.log("Form data:", ocrFields);
                  alert("Form data logged to console");
                }}
                className="px-3 py-1.5 rounded text-xs font-medium text-white transition-all duration-200"
                style={{
                  backgroundColor: "#16a34a",
                  fontFamily: "'Roboto Slab', serif"
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = "#15803d";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = "#16a34a";
                }}
              >
                Save Data
              </button>
            </div>
          </div>
        </div>

        {/* DATA TABLE */}
        <div 
          className="rounded-lg shadow-md p-2 overflow-hidden"
          style={{ 
            backgroundColor: "#ffffff",
            color: "#374151"
          }}
        >
          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={filteredRecords}
              pagination
              highlightOnHover
              striped
              responsive
              customStyles={customStyles}
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  placeholder="Search OCR records..."
                  value={searchTerm}
                  style={{
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    padding: "6px 12px",
                    width: "100%",
                    maxWidth: "200px",
                    backgroundColor: "#ffffff",
                    color: "#374151",
                    fontSize: "12px",
                    fontFamily: "'Roboto Slab', serif"
                  }}
                  onFocus={(e) => {
                    e.target.style.outline = "none";
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                  onChange={(e) => {
                    const searchValue = e.target.value;
                    setSearchTerm(searchValue);
                    
                    if (searchValue.trim() === "") {
                      // If search is empty, show all original records
                      setFilteredRecords(originalRecords);
                    } else {
                      // Filter from original records, not current filtered records
                      const filtered = originalRecords.filter((record) =>
                        Object.values(record)
                          .join(" ")
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                      );
                      setFilteredRecords(filtered);
                    }
                  }}
                />
              }
            />
          </div>
        </div>

        {/* View Record Modal */}
        <ViewRecordModal
          isOpen={isModalOpen}
          record={selectedRecord}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}