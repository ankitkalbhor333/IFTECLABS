const express = require('express');
const {
  createEnquiry,
  getAllEnquiries,
  getEnquiry,
  updateEnquiryStatus,
  exportEnquiriesToExcelFile,
  downloadEnquiryPDF,
  downloadEnquiriesExcel,
} = require('../controllers/enquiryController');

const router = express.Router();

// Public route - create enquiry (from frontend form)
router.post('/', createEnquiry);

// Admin routes (no auth for MVP)
router.get('/', getAllEnquiries);
router.get('/export/excel', exportEnquiriesToExcelFile);
router.get('/download/excel', downloadEnquiriesExcel);
router.get('/download/pdf/:id', downloadEnquiryPDF);
router.get('/:id', getEnquiry);
router.patch('/:id/status', updateEnquiryStatus);

module.exports = router;
