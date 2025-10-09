import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';

// Define the type for record data
export interface ExportRecord {
  id: number;
  Name: string;
  Phone: string;
  Gender: string;
  InOut: string;
  Time: string;
  Date: string;
  Purpose: string;
  [key: string]: any;
}

// Export to Excel (XLSX)
export const exportToExcel = (data: ExportRecord[], filename: string = 'EVS_Report') => {
  try {
    // Prepare data for Excel
    const exportData = data.map(record => ({
      ID: record.id,
      Name: record.Name,
      Phone: record.Phone,
      Gender: record.Gender,
      'In/Out': record.InOut,
      Time: record.Time,
      Date: record.Date,
      Purpose: record.Purpose
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Auto-size columns
    const colWidths = [
      { wch: 8 },  // ID
      { wch: 20 }, // Name
      { wch: 15 }, // Phone
      { wch: 10 }, // Gender
      { wch: 10 }, // In/Out
      { wch: 12 }, // Time
      { wch: 12 }, // Date
      { wch: 25 }, // Purpose
    ];
    ws['!cols'] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'EVS Report');

    // Generate file and download
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${filename}.xlsx`);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    alert('Error exporting to Excel. Please try again.');
  }
};

// Export to PDF
export const exportToPDF = (data: ExportRecord[], filename: string = 'EVS_Report') => {
  try {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.setTextColor(0, 114, 167); // Blue color
    doc.text('EVS Report', 14, 20);

    // Add date
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // Prepare table data
    const tableData = data.map(record => [
      record.id.toString(),
      record.Name,
      record.Phone,
      record.Gender,
      record.InOut,
      record.Time,
      record.Date,
      record.Purpose
    ]);

    // Add table
    autoTable(doc, {
      head: [['ID', 'Name', 'Phone', 'Gender', 'In/Out', 'Time', 'Date', 'Purpose']],
      body: tableData,
      startY: 40,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [0, 114, 167], // Blue header
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251], // Light gray
      },
      columnStyles: {
        0: { cellWidth: 15 }, // ID
        1: { cellWidth: 25 }, // Name
        2: { cellWidth: 20 }, // Phone
        3: { cellWidth: 15 }, // Gender
        4: { cellWidth: 15 }, // In/Out
        5: { cellWidth: 18 }, // Time
        6: { cellWidth: 18 }, // Date
        7: { cellWidth: 30 }, // Purpose
      },
    });

    // Save the PDF
    doc.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    alert('Error exporting to PDF. Please try again.');
  }
};

// Export to CSV
export const exportToCSV = (data: ExportRecord[], filename: string = 'EVS_Report') => {
  try {
    // Prepare CSV headers
    const headers = ['ID', 'Name', 'Phone', 'Gender', 'In/Out', 'Time', 'Date', 'Purpose'];
    
    // Prepare CSV data
    const csvData = data.map(record => [
      record.id,
      record.Name,
      record.Phone,
      record.Gender,
      record.InOut,
      record.Time,
      record.Date,
      record.Purpose
    ]);

    // Combine headers and data
    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${filename}.csv`);
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    alert('Error exporting to CSV. Please try again.');
  }
};

// Export to JSON
export const exportToJSON = (data: ExportRecord[], filename: string = 'EVS_Report') => {
  try {
    // Prepare JSON data with metadata
    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        recordCount: data.length,
        generatedBy: 'EVS System'
      },
      records: data.map(record => ({
        id: record.id,
        name: record.Name,
        phone: record.Phone,
        gender: record.Gender,
        inOut: record.InOut,
        time: record.Time,
        date: record.Date,
        purpose: record.Purpose
      }))
    };

    // Create and download file
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    saveAs(blob, `${filename}.json`);
  } catch (error) {
    console.error('Error exporting to JSON:', error);
    alert('Error exporting to JSON. Please try again.');
  }
};

// Export to XML
export const exportToXML = (data: ExportRecord[], filename: string = 'EVS_Report') => {
  try {
    // Create XML content
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlContent += '<evsReport>\n';
    xmlContent += `  <metadata>\n`;
    xmlContent += `    <exportDate>${new Date().toISOString()}</exportDate>\n`;
    xmlContent += `    <recordCount>${data.length}</recordCount>\n`;
    xmlContent += `    <generatedBy>EVS System</generatedBy>\n`;
    xmlContent += `  </metadata>\n`;
    xmlContent += '  <records>\n';

    data.forEach(record => {
      xmlContent += '    <record>\n';
      xmlContent += `      <id>${record.id}</id>\n`;
      xmlContent += `      <name><![CDATA[${record.Name}]]></name>\n`;
      xmlContent += `      <phone>${record.Phone}</phone>\n`;
      xmlContent += `      <gender>${record.Gender}</gender>\n`;
      xmlContent += `      <inOut>${record.InOut}</inOut>\n`;
      xmlContent += `      <time>${record.Time}</time>\n`;
      xmlContent += `      <date>${record.Date}</date>\n`;
      xmlContent += `      <purpose><![CDATA[${record.Purpose}]]></purpose>\n`;
      xmlContent += '    </record>\n';
    });

    xmlContent += '  </records>\n';
    xmlContent += '</evsReport>';

    // Create and download file
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    saveAs(blob, `${filename}.xml`);
  } catch (error) {
    console.error('Error exporting to XML:', error);
    alert('Error exporting to XML. Please try again.');
  }
};

// Export to TSV (Tab-Separated Values)
export const exportToTSV = (data: ExportRecord[], filename: string = 'EVS_Report') => {
  try {
    // Prepare TSV headers
    const headers = ['ID', 'Name', 'Phone', 'Gender', 'In/Out', 'Time', 'Date', 'Purpose'];
    
    // Prepare TSV data
    const tsvData = data.map(record => [
      record.id,
      record.Name,
      record.Phone,
      record.Gender,
      record.InOut,
      record.Time,
      record.Date,
      record.Purpose
    ]);

    // Combine headers and data with tabs
    const tsvContent = [headers, ...tsvData]
      .map(row => row.join('\t'))
      .join('\n');

    // Create and download file
    const blob = new Blob([tsvContent], { type: 'text/tab-separated-values' });
    saveAs(blob, `${filename}.tsv`);
  } catch (error) {
    console.error('Error exporting to TSV:', error);
    alert('Error exporting to TSV. Please try again.');
  }
};