import { useState } from "react";
import VerticalSidebar from "../../components/VerticalSidebar";
import TopNavbar from "../../components/TopNavbar";
import DataTable from "react-data-table-component";
import { Eye } from "lucide-react";
import ViewRecordModal from "../../components/ViewRecordModal";

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
      center: true,
    },
    { 
      name: "Name", 
      selector: (row: any) => row.Name, 
      sortable: true,
      grow: 1,
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
      center: true,
    },
    { 
      name: "In/Out", 
      selector: (row: any) => row.CheckOut && row.CheckOut !== "Not yet" ? "Out" : "In",
      width: "70px",
      center: true,
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
      center: true,
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
            className="col-span-1 lg:col-span-1 p-3 rounded shadow-lg flex items-center justify-center border"
            style={{ 
              backgroundColor: "#ffffff",
              borderColor: "#93c5fd"
            }}
          >
            <div 
              className="w-full h-48 border border-dashed rounded flex items-center justify-center"
              style={{ 
                borderColor: "#0072a7",
                backgroundColor: "#e6f4fa"
              }}
            >
              <span 
                style={{ 
                  color: "#0072a7", 
                  fontWeight: "500",
                  fontFamily: "'Roboto Slab', serif" 
                }} 
                className="text-xs"
              >
                Image Preview Area
              </span>
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
              Retrieved information
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
                  </label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => handleOcrFieldChange(idx, e.target.value)}
                    placeholder={`Enter ${field.label}`}
                    className="w-full px-2 py-1.5 rounded border text-xs"
                    style={{
                      border: "1px solid #d1d5db",
                      backgroundColor: "#ffffff",
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