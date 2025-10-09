import { useState, useMemo } from "react";
import VerticalSidebar from "../../components/VerticalSidebar";
import TopNavbar from "../../components/TopNavbar";
import DataTable from "react-data-table-component";
import { Edit, Trash2 } from "lucide-react";
import SimpleExportButtons from "../../components/SimpleExportButtons";
import FilterModal from "../../components/FilterModal";
import type { FilterOptions } from "../../components/FilterModal";
import type { ExportRecord } from "../../utils/exportUtils";

export default function RecordTable() {
  const [originalRecords] = useState([
    {
      id: 1,
      name: "Ethan Smith",
      mobileNumber: "+1 (907) 220-9019",
      gender: "Male",
      type: "Check Out",
      purpose: "Study",
      date: "Mon 19 Sep. 2022",
      checkin: "09:54 AM",
      checkout: "08:00 PM",
      totalTime: "10H:6M",
      department: "HR",
    },
    {
      id: 2,
      name: "Lea Fox",
      mobileNumber: "+1 (907) 826-3317",
      gender: "Female",
      type: "Check Out",
      purpose: "Event",
      date: "Mon 19 Sep. 2022",
      checkin: "09:49 AM",
      checkout: "08:00 PM",
      totalTime: "10H:11M",
      department: "Finance",
    },
    {
      id: 3,
      name: "Mark Johnson",
      mobileNumber: "+1 (555) 123-4567",
      gender: "Male",
      type: "Check In",
      purpose: "Meeting",
      date: "Tue 20 Sep. 2022",
      checkin: "10:30 AM",
      checkout: "Not yet",
      totalTime: "-",
      department: "IT",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      mobileNumber: "+1 (444) 987-6543",
      gender: "Female",
      type: "Check Out",
      purpose: "Conference",
      date: "Tue 20 Sep. 2022",
      checkin: "08:15 AM",
      checkout: "06:30 PM",
      totalTime: "10H:15M",
      department: "Marketing",
    },
    {
      id: 5,
      name: "David Brown",
      mobileNumber: "+1 (333) 456-7890",
      gender: "Male",
      type: "Check In",
      purpose: "Training",
      date: "Wed 21 Sep. 2022",
      checkin: "09:00 AM",
      checkout: "Not yet",
      totalTime: "-",
      department: "Sales",
    },
    {
      id: 6,
      name: "Lisa Davis",
      mobileNumber: "+1 (222) 789-0123",
      gender: "Female",
      type: "Check Out",
      purpose: "Workshop",
      date: "Wed 21 Sep. 2022",
      checkin: "08:45 AM",
      checkout: "05:15 PM",
      totalTime: "8H:30M",
      department: "Operations",
    },
  ]);
  
  const [filteredRecords, setFilteredRecords] = useState(originalRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: { startDate: '', endDate: '' },
    department: 'All Departments',
    gender: 'All Genders',
    checkInTimeRange: { startTime: '', endTime: '' },
    checkOutTimeRange: { startTime: '', endTime: '' }
  });

  // Apply filters and search
  const applyFiltersAndSearch = useMemo(() => {
    let filtered = [...originalRecords];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((record) =>
        Object.values(record)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Apply department filter
    if (filters.department && filters.department !== 'All Departments') {
      filtered = filtered.filter(record => record.department === filters.department);
    }

    // Apply gender filter  
    if (filters.gender && filters.gender !== 'All Genders') {
      filtered = filtered.filter(record => record.gender === filters.gender);
    }

    setFilteredRecords(filtered);
  }, [originalRecords, searchTerm, filters]);

  // Update filtered records when filters change
  useMemo(() => applyFiltersAndSearch, [applyFiltersAndSearch]);

  // Transform data for export
  const transformDataForExport = (): ExportRecord[] => {
    return filteredRecords.map(record => ({
      id: record.id,
      Name: record.name,
      Phone: record.mobileNumber,
      Gender: record.gender,
      InOut: record.type,
      Time: record.checkin,
      Date: record.date,
      Purpose: record.purpose
    }));
  };

  const handleEdit = (index: number) => {
    alert(`Editing record: ${filteredRecords[index].name}`);
  };

  const handleDelete = (index: number) => {
    const newData = filteredRecords.filter((_: any, i: number) => i !== index);
    setFilteredRecords(newData);
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
      selector: (row: any) => row.name, 
      sortable: true,
      grow: 1,
    },
    { 
      name: "Phone", 
      selector: (row: any) => row.mobileNumber,
      width: "130px",
    },
    { 
      name: "Gender", 
      selector: (row: any) => row.gender,
      width: "80px",
      center: true,
    },
    { 
      name: "In/Out", 
      selector: (row: any) => row.checkout && row.checkout !== "Not yet" ? "Out" : "In",
      width: "70px",
      center: true,
      cell: (row: any) => {
        const status = row.checkout && row.checkout !== "Not yet" ? "Out" : "In";
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
      selector: (row: any) => `${row.checkin} - ${row.checkout}`,
      width: "140px",
      wrap: true,
    },
    { 
      name: "Date", 
      selector: (row: any) => row.date,
      width: "120px",
    },
    { 
      name: "Purpose", 
      selector: (row: any) => row.purpose,
      width: "100px",
    },
    {
      name: "Actions",
      width: "80px",
      center: true,
      cell: (_row: any, index: number) => (
        <div className="flex gap-1">
          <button
            onClick={() => handleEdit(index)}
            style={{
              padding: "2px",
              backgroundColor: "#dbeafe",
              borderRadius: "4px",
              border: "none",
              color: "#2563eb",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#bfdbfe"}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#dbeafe"}
          >
            <Edit size={12} />
          </button>
          <button
            onClick={() => handleDelete(index)}
            style={{
              padding: "2px",
              backgroundColor: "#fecaca",
              borderRadius: "4px",
              border: "none",
              color: "#dc2626",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#fca5a5"}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#fecaca"}
          >
            <Trash2 size={12} />
          </button>
        </div>
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
          fontFamily: "'Roboto Slab', serif",
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

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <VerticalSidebar />
      <TopNavbar />
      <div 
        className="p-3 ml-[225px] pt-16 pb-6"
        style={{ 
          backgroundColor: "#ffffff",
          color: "#374151"
        }}
      >
        {/* TOP CONTAINER - Export Buttons and Search */}
        <div 
          className="mb-4 p-3 rounded shadow-lg border"
          style={{ 
            backgroundColor: "#ffffff",
            borderColor: "#0072a7"
          }}
        >
          <h2 
            className="text-sm font-semibold mb-2 border-b pb-2"
            style={{ color: "#005b8a" }}
          >
            Report Controls
          </h2>
          <div className="flex items-center justify-between gap-4">
            {/* Left: Export Buttons */}
            <SimpleExportButtons 
              data={transformDataForExport()} 
              filename={`EVS_Report_${new Date().toISOString().split('T')[0]}`}
              onFilterClick={() => setIsFilterModalOpen(true)}
            />
            
            {/* Right: Search Input */}
            <div className="flex items-center gap-2">
              <label 
                className="text-xs font-medium" 
                style={{ 
                  color: "#0072a7",
                  fontFamily: "'Roboto Slab', serif",
                  fontWeight: "500"
                }}
              >
                Search:
              </label>
              <input
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-2 py-1.5 rounded border text-xs"
                style={{
                  border: "1px solid #d1d5db",
                  backgroundColor: "#ffffff",
                  color: "#374151",
                  width: "200px",
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
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div 
          className="rounded shadow-lg p-2 overflow-hidden"
          style={{ 
            backgroundColor: "#ffffff",
            color: "#374151"
          }}
        >
          <DataTable
            columns={columns}
            data={filteredRecords}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="400px"
            customStyles={customStyles}
            striped
            highlightOnHover
            pointerOnHover
            responsive
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
          />
        </div>

        {/* Filter Modal */}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApplyFilters={(newFilters) => setFilters(newFilters)}
          currentFilters={filters}
        />
      </div>
    </div>
  );
}
