import { FileSpreadsheet, FileText, Database, Filter } from 'lucide-react';
import { 
  exportToExcel, 
  exportToPDF, 
  exportToCSV
} from '../utils/exportUtils';
import type { ExportRecord } from '../utils/exportUtils';

interface SimpleExportButtonsProps {
  data: ExportRecord[];
  filename?: string;
  onFilterClick?: () => void;
  className?: string;
}

export default function SimpleExportButtons({ 
  data, 
  filename = 'EVS_Report', 
  onFilterClick,
  className = '' 
}: SimpleExportButtonsProps) {
  const exportOptions = [
    {
      name: 'Excel',
      icon: FileSpreadsheet,
      handler: () => exportToExcel(data, filename),
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Export to Excel (.xlsx)'
    },
    {
      name: 'PDF',
      icon: FileText,
      handler: () => exportToPDF(data, filename),
      color: 'bg-red-600 hover:bg-red-700',
      description: 'Export to PDF (.pdf)'
    },
    {
      name: 'CSV',
      icon: Database,
      handler: () => exportToCSV(data, filename),
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Export to CSV (.csv)'
    }
  ];

  const handleExport = (handler: () => void, format: string) => {
    if (data.length === 0) {
      alert(`No data available to export to ${format}.`);
      return;
    }
    
    try {
      handler();
    } catch (error) {
      console.error(`Error exporting to ${format}:`, error);
      alert(`Failed to export to ${format}. Please try again.`);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Filter Button */}
      <button
        onClick={onFilterClick}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        title="Filter Reports"
        style={{
          fontFamily: "'Roboto Slab', serif",
          fontWeight: "500"
        }}
      >
        <Filter size={16} />
        Filter
      </button>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-300"></div>

      {/* Export Buttons */}
      <div className="flex items-center gap-2">
        <span 
          className="text-sm text-gray-600 font-medium"
          style={{
            fontFamily: "'Roboto Slab', serif",
            fontWeight: "500"
          }}
        >
          Export:
        </span>
        {exportOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <button
              key={option.name}
              onClick={() => handleExport(option.handler, option.name)}
              disabled={data.length === 0}
              className={`
                flex items-center gap-1 px-3 py-2 text-sm font-medium text-white rounded-lg
                transition-all duration-200 transform hover:scale-105 active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                ${option.color}
                shadow-sm hover:shadow-md
              `}
              title={option.description}
              style={{
                fontFamily: "'Roboto Slab', serif",
                fontWeight: "500"
              }}
            >
              <IconComponent size={14} />
              <span>{option.name}</span>
            </button>
          );
        })}
      </div>

      {/* Record Count */}
      <div className="text-sm text-gray-500 ml-auto">
        {data.length} records
      </div>
    </div>
  );
}