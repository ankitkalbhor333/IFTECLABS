const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs').promises;

const EXCEL_DIR = path.join(__dirname, '../../data');
const EXCEL_FILE = path.join(EXCEL_DIR, 'IFTECLABS-Enquiries.xlsx');

// Ensure data directory exists
const ensureDataDir = async () => {
  try {
    await fs.mkdir(EXCEL_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
};

// Get or create workbook
const getWorkbook = async () => {
  await ensureDataDir();
  
  let workbook;
  try {
    // Try to load existing file
    workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_FILE);
  } catch (error) {
    // Create new workbook if file doesn't exist
    workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Enquiries', {
      properties: { tabColor: { argb: 'FF2563eb' } },
    });

    // Add headers
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 8 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Organization', key: 'organization', width: 20 },
      { header: 'Enquiry Type', key: 'enquiryType', width: 15 },
      { header: 'Service', key: 'service', width: 25 },
      { header: 'Budget', key: 'budget', width: 15 },
      { header: 'Message', key: 'message', width: 40 },
      { header: 'Preferred Contact', key: 'preferredContact', width: 15 },
    ];

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2563eb' } };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
  }

  return workbook;
};

// Add enquiry to Excel
const addEnquiryToExcel = async (enquiryData) => {
  try {
    const workbook = await getWorkbook();
    const worksheet = workbook.getWorksheet('Enquiries');

    const rowCount = worksheet.rowCount;
    const id = rowCount; // ID starts from 1 (row 2)
    const date = new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    // Add data row
    worksheet.addRow({
      id,
      date,
      name: enquiryData.name,
      phone: enquiryData.phone,
      email: enquiryData.email,
      organization: enquiryData.organization || '-',
      enquiryType: enquiryData.enquiryType,
      service: enquiryData.service,
      budget: enquiryData.budget || '-',
      message: enquiryData.message,
      preferredContact: enquiryData.preferredContact || 'Email',
    });

    // Save file
    await workbook.xlsx.writeFile(EXCEL_FILE);
    console.log(`✅ Enquiry added to Excel (Row ${rowCount})`);

    return { success: true, id };
  } catch (error) {
    console.error('Error adding enquiry to Excel:', error);
    return { success: false, error: error.message };
  }
};

// Get all enquiries from Excel (for backup/reporting)
const getAllEnquiriesFromExcel = async () => {
  try {
    const workbook = await getWorkbook();
    const worksheet = workbook.getWorksheet('Enquiries');

    const enquiries = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header
      enquiries.push(row.values);
    });

    return enquiries;
  } catch (error) {
    console.error('Error reading Excel:', error);
    return [];
  }
};

// Export all MongoDB enquiries to Excel
const exportEnquiriesToExcel = async (mongoEnquiries) => {
  try {
    await ensureDataDir();
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Enquiries', {
      properties: { tabColor: { argb: 'FF2563eb' } },
    });

    // Add headers
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 8 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Organization', key: 'organization', width: 20 },
      { header: 'Enquiry Type', key: 'enquiryType', width: 15 },
      { header: 'Service', key: 'service', width: 25 },
      { header: 'Budget', key: 'budget', width: 15 },
      { header: 'Message', key: 'message', width: 40 },
      { header: 'Preferred Contact', key: 'preferredContact', width: 15 },
      { header: 'Status', key: 'status', width: 12 },
    ];

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2563eb' } };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

    // Add data rows
    mongoEnquiries.forEach((enquiry, index) => {
      worksheet.addRow({
        id: index + 1,
        date: new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
        name: enquiry.name,
        phone: enquiry.phone,
        email: enquiry.email,
        organization: enquiry.organization || '-',
        enquiryType: enquiry.enquiryType,
        service: enquiry.service,
        budget: enquiry.budget || '-',
        message: enquiry.message,
        preferredContact: enquiry.preferredContact || 'Email',
        status: enquiry.status || 'New',
      });
    });

    // Save file
    await workbook.xlsx.writeFile(EXCEL_FILE);
    console.log(`✅ Exported ${mongoEnquiries.length} enquiries to Excel`);

    return { success: true, count: mongoEnquiries.length, filePath: EXCEL_FILE };
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  addEnquiryToExcel,
  getAllEnquiriesFromExcel,
  exportEnquiriesToExcel,
  EXCEL_FILE,
};
