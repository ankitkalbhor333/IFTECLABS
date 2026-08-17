const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
      minlength: [10, 'Phone must be at least 10 digits'],
      maxlength: [20, 'Phone cannot exceed 20 characters'],
    },
    organization: {
      type: String,
      trim: true,
      maxlength: [100, 'Organization cannot exceed 100 characters'],
      default: '',
    },
    enquiryType: {
      type: String,
      required: [true, 'Enquiry type is required'],
      enum: ['Project', 'Consultation', 'Training', 'Support', 'Partnership', 'Other'],
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
      enum: [
        'Electronics Product Development',
        'Industrial Automation & PLC',
        'IoT & Embedded Systems',
        'Robotics',
        'PCB Design & Fabrication',
        'Training & Consultancy',
      ],
    },
    budget: {
      type: String,
      trim: true,
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [5000, 'Message cannot exceed 5000 characters'],
    },
    preferredContact: {
      type: String,
      enum: ['Email', 'Phone', 'WhatsApp'],
      default: 'Email',
    },
    fileAttachment: {
      type: String, // Store file path or URL
      default: null,
    },
    status: {
      type: String,
      enum: ['New', 'Read', 'In Progress', 'Closed'],
      default: 'New',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient querying
enquirySchema.index({ createdAt: -1, status: 1 });
enquirySchema.index({ email: 1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
