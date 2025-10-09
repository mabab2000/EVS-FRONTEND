import { Download, FileSpreadsheet, FileText, Database, Code, FileType } from 'lucide-react';
import { 
  exportToExcel, 
  exportToPDF, 
  exportToCSV, 
  exportToJSON, 
  exportToXML, 
  exportToTSV
} from '../utils/exportUtils';
import type { ExportRecord } from '../utils/exportUtils';

interface ExportButtonsProps {
  data: ExportRecord[];
  filename?: string;
  className?: string;
}

export default function ExportButtons({ data, filename = 'EVS_Report', className = '' }: ExportButtonsProps) {
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
    },
    {
      name: 'JSON',
      icon: Code,
      handler: () => exportToJSON(data, filename),
      color: 'bg-yellow-600 hover:bg-yellow-700',
      description: 'Export to JSON (.json)'
    },
    {
      name: 'XML',
      icon: FileType,
      handler: () => exportToXML(data, filename),
      color: 'bg-purple-600 hover:bg-purple-700',
      description: 'Export to XML (.xml)'
    },
    {
      name: 'TSV',
      icon: FileType,
      handler: () => exportToTSV(data, filename),
      color: 'bg-gray-600 hover:bg-gray-700',
      description: 'Export to TSV (.tsv)'
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
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <div className="flex items-center gap-1 text-xs text-gray-600 mb-2 w-full">
        <Download size={14} />
        <span className="font-medium">Export Data ({data.length} records):</span>
      </div>
      
      {exportOptions.map((option) => {
        const IconComponent = option.icon;
        return (
          <button
            key={option.name}
            onClick={() => handleExport(option.handler, option.name)}
            disabled={data.length === 0}
            className={`
              flex items-center gap-1 px-2 py-1 text-xs font-medium text-white rounded
              transition-all duration-200 transform hover:scale-105 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              ${option.color}
              shadow-sm hover:shadow-md
            `}
            title={option.description}
          >
            <IconComponent size={12} />
            <span>{option.name}</span>
          </button>
        );
      })}
      
      {data.length === 0 && (
        <div className="text-xs text-gray-500 italic w-full mt-1">
          No data available for export
        </div>
      )}
    </div>
  );
}