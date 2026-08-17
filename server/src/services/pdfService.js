const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const PDF_DIR = path.join(__dirname, '../../data/pdf');

// Ensure PDF directory exists
const ensurePdfDir = () => {
  if (!fs.existsSync(PDF_DIR)) {
    fs.mkdirSync(PDF_DIR, { recursive: true });
  }
};

/**
 * Generates a professional PDF report for a single enquiry.
 * @param {Object} enquiry - The enquiry object from DB.
 * @returns {Promise<string>} The absolute path to the generated PDF file.
 */
const generateEnquiryPDF = (enquiry) => {
  return new Promise((resolve, reject) => {
    try {
      ensurePdfDir();
      const filename = `enquiry-${enquiry._id || Date.now()}.pdf`;
      const filePath = path.join(PDF_DIR, filename);

      const doc = new PDFDocument({
        margin: 50,
        size: 'A4',
      });

      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);

      // --- BRANDING HEADER ---
      // Primary color accent bar
      doc.rect(0, 0, 595.28, 15).fill('#2563eb');
      doc.y = 35;

      // Brand Title
      doc.fontSize(24).font('Helvetica-Bold').fillColor('#0f172a').text('IFTECLABS', { letterSpacing: 1 });
      
      // Subtitle
      doc.fontSize(9).font('Helvetica').fillColor('#64748b').text('Intelligent Engineering & Technology Solutions', { lineGap: 15 });

      // Header Divider Line
      doc.moveTo(50, doc.y).lineTo(545.28, doc.y).strokeColor('#cbd5e1').lineWidth(1).stroke();
      doc.moveDown(1.5);

      // --- DOCUMENT TITLE ---
      doc.fontSize(16).font('Helvetica-Bold').fillColor('#0f172a').text('Project Enquiry Report');
      
      // Metadata grid (2 columns)
      const currentY = doc.y;
      
      doc.fontSize(10).font('Helvetica-Bold').fillColor('#475569').text('Enquiry ID:', 50, currentY + 10);
      doc.font('Helvetica').fillColor('#0f172a').text(`#${enquiry._id || 'N/A'}`, 150, currentY + 10);

      doc.font('Helvetica-Bold').fillColor('#475569').text('Submitted Date:', 300, currentY + 10);
      const dateString = enquiry.createdAt 
        ? new Date(enquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) 
        : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      doc.font('Helvetica').fillColor('#0f172a').text(dateString, 400, currentY + 10);

      doc.font('Helvetica-Bold').fillColor('#475569').text('Current Status:', 50, currentY + 28);
      doc.font('Helvetica-Bold').fillColor('#16a34a').text(enquiry.status || 'New', 150, currentY + 28);

      doc.moveDown(3);

      // --- SECTION: CLIENT DETAILS ---
      doc.rect(50, doc.y, 495.28, 20).fill('#eff6ff');
      doc.fillColor('#1e40af').font('Helvetica-Bold').fontSize(10).text('1. CLIENT CONTACT INFORMATION', 60, doc.y - 15);
      doc.moveDown(0.8);

      const clientY = doc.y;
      doc.fontSize(10).fillColor('#475569').font('Helvetica-Bold').text('Client Name:', 60, clientY);
      doc.font('Helvetica').fillColor('#0f172a').text(enquiry.name || 'N/A', 160, clientY);

      doc.font('Helvetica-Bold').fillColor('#475569').text('Email Address:', 60, clientY + 18);
      doc.font('Helvetica').fillColor('#1d4ed8').text(enquiry.email || 'N/A', 160, clientY + 18);

      doc.font('Helvetica-Bold').fillColor('#475569').text('Phone Number:', 60, clientY + 36);
      doc.font('Helvetica').fillColor('#0f172a').text(enquiry.phone || 'N/A', 160, clientY + 36);

      doc.font('Helvetica-Bold').fillColor('#475569').text('Organization:', 60, clientY + 54);
      doc.font('Helvetica').fillColor('#0f172a').text(enquiry.organization || 'Individual / Not Specified', 160, clientY + 54);

      doc.font('Helvetica-Bold').fillColor('#475569').text('Pref. Contact:', 60, clientY + 72);
      doc.font('Helvetica').fillColor('#0f172a').text(enquiry.preferredContact || 'Email', 160, clientY + 72);

      doc.y = clientY + 95;
      doc.moveDown();

      // --- SECTION: PROJECT SPECIFICATIONS ---
      doc.rect(50, doc.y, 495.28, 20).fill('#eff6ff');
      doc.fillColor('#1e40af').font('Helvetica-Bold').fontSize(10).text('2. PROJECT DETAILS & CLASSIFICATION', 60, doc.y - 15);
      doc.moveDown(0.8);

      const projY = doc.y;
      doc.fontSize(10).fillColor('#475569').font('Helvetica-Bold').text('Service Domain:', 60, projY);
      doc.font('Helvetica').fillColor('#0f172a').text(enquiry.service || 'N/A', 160, projY);

      doc.font('Helvetica-Bold').fillColor('#475569').text('Enquiry Type:', 60, projY + 18);
      doc.font('Helvetica').fillColor('#0f172a').text(enquiry.enquiryType || 'N/A', 160, projY + 18);

      doc.font('Helvetica-Bold').fillColor('#475569').text('Project Budget:', 60, projY + 36);
      doc.font('Helvetica').fillColor('#0f172a').text(enquiry.budget || 'Not specified', 160, projY + 36);

      doc.y = projY + 60;
      doc.moveDown();

      // --- SECTION: MESSAGE / REQUIREMENTS ---
      doc.rect(50, doc.y, 495.28, 20).fill('#eff6ff');
      doc.fillColor('#1e40af').font('Helvetica-Bold').fontSize(10).text('3. PROJECT REQUIREMENTS / MESSAGE', 60, doc.y - 15);
      doc.moveDown(0.8);

      doc.fontSize(10).font('Helvetica').fillColor('#334155').text(enquiry.message || 'No description provided.', 60, doc.y, {
        width: 475.28,
        align: 'justify',
        lineGap: 4
      });

      // --- FOOTER BRANDING ---
      // Line divider
      doc.moveTo(50, 780).lineTo(545.28, 780).strokeColor('#cbd5e1').lineWidth(0.5).stroke();
      
      doc.fontSize(8).font('Helvetica').fillColor('#94a3b8').text('This is an official document generated by the IFTECLABS Enquiry Management System.', 50, 788, {
        align: 'center',
        width: 495.28
      });

      doc.end();

      writeStream.on('finish', () => {
        resolve(filePath);
      });

      writeStream.on('error', (err) => {
        reject(err);
      });

    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generateEnquiryPDF,
  PDF_DIR,
};
