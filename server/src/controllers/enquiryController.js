const Enquiry = require('../models/Enquiry');
const { addEnquiryToExcel, exportEnquiriesToExcel } = require('../services/excelService');
const { sendAdminNotification, sendUserConfirmation } = require('../services/emailService');

// Create new enquiry
const createEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, organization, enquiryType, service, budget, message, preferredContact } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !enquiryType || !service || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        required: ['name', 'email', 'phone', 'enquiryType', 'service', 'message'],
      });
    }

    // Create enquiry in MongoDB (fastest - does validation)
    const enquiry = new Enquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      organization: organization?.trim() || '',
      enquiryType,
      service,
      budget: budget?.trim() || '',
      message: message.trim(),
      preferredContact: preferredContact || 'Email',
    });

    // Save to MongoDB
    await enquiry.save();
    const enquiryId = enquiry._id.toString();

    // Send responses in parallel (non-blocking)
    // Excel update
    const excelResult = addEnquiryToExcel({
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      organization: enquiry.organization,
      enquiryType: enquiry.enquiryType,
      service: enquiry.service,
      budget: enquiry.budget,
      message: enquiry.message,
      preferredContact: enquiry.preferredContact,
    }).catch((error) => {
      console.error('Excel error:', error);
      return { success: false };
    });

    // Admin email notification
    const adminEmailResult = sendAdminNotification(enquiry).catch((error) => {
      console.error('Admin email error:', error);
      return { success: false };
    });

    // User confirmation email
    const userEmailResult = sendUserConfirmation(enquiry, enquiryId).catch((error) => {
      console.error('User email error:', error);
      return { success: false };
    });

    // Don't wait for these - return immediately to user
    Promise.all([excelResult, adminEmailResult, userEmailResult]);

    // Send immediate response
    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: {
        enquiryId,
        name: enquiry.name,
        email: enquiry.email,
        service: enquiry.service,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating enquiry:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error submitting enquiry. Please try again later.',
    });
  }
};

// Get all enquiries (for admin - no auth for now)
const getAllEnquiries = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Enquiry.countDocuments();

    return res.status(200).json({
      success: true,
      data: enquiries,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching enquiries',
    });
  }
};

// Get single enquiry
const getEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    console.error('Error fetching enquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching enquiry',
    });
  }
};

// Update enquiry status
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['New', 'Read', 'In Progress', 'Closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry status updated',
      data: enquiry,
    });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating enquiry',
    });
  }
};

// Export all enquiries to Excel
const exportEnquiriesToExcelFile = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();

    if (enquiries.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No enquiries to export',
      });
    }

    const result = await exportEnquiriesToExcel(enquiries);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Error exporting to Excel',
        error: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Successfully exported ${result.count} enquiries to Excel`,
      data: {
        count: result.count,
        filePath: result.filePath,
      },
    });
  } catch (error) {
    console.error('Error exporting enquiries:', error);
    return res.status(500).json({
      success: false,
      message: 'Error exporting enquiries',
    });
  }
};

// Download single enquiry PDF
const downloadEnquiryPDF = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }

    const { generateEnquiryPDF } = require('../services/pdfService');
    const filePath = await generateEnquiryPDF(enquiry);

    return res.download(filePath, `enquiry-${id}.pdf`, (err) => {
      if (err) {
        console.error('Error downloading PDF file:', err);
        if (!res.headersSent) {
          res.status(500).json({ success: false, message: 'Could not download PDF' });
        }
      }
    });
  } catch (error) {
    console.error('Error in downloadEnquiryPDF:', error);
    return res.status(500).json({
      success: false,
      message: 'Error generating or downloading PDF',
    });
  }
};

// Download consolidated Excel sheet
const downloadEnquiriesExcel = async (req, res, next) => {
  try {
    const { EXCEL_FILE, exportEnquiriesToExcel } = require('../services/excelService');
    const fs = require('fs');
    
    // Refresh export sheet
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
    await exportEnquiriesToExcel(enquiries);

    if (!fs.existsSync(EXCEL_FILE)) {
      return res.status(404).json({
        success: false,
        message: 'Excel export file not found',
      });
    }

    return res.download(EXCEL_FILE, 'IFTECLABS-Enquiries.xlsx', (err) => {
      if (err) {
        console.error('Error downloading Excel file:', err);
        if (!res.headersSent) {
          res.status(500).json({ success: false, message: 'Could not download Excel file' });
        }
      }
    });
  } catch (error) {
    console.error('Error in downloadEnquiriesExcel:', error);
    return res.status(500).json({
      success: false,
      message: 'Error exporting or downloading Excel file',
    });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiry,
  updateEnquiryStatus,
  exportEnquiriesToExcelFile,
  downloadEnquiryPDF,
  downloadEnquiriesExcel,
};
