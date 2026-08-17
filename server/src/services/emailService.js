const { createTransporter } = require('../config/email');
const { generateEnquiryPDF } = require('./pdfService');
const { EXCEL_FILE } = require('./excelService');
const fs = require('fs');
const path = require('path');

// Send email notification to admin
const sendAdminNotification = async (enquiry) => {
  try {
    // Generate the PDF first
    let pdfPath = null;
    try {
      pdfPath = await generateEnquiryPDF(enquiry);
      console.log(`✅ PDF generated for admin email attachment: ${pdfPath}`);
    } catch (pdfError) {
      console.error('❌ Failed to generate PDF for email attachment:', pdfError);
    }

    const transporter = createTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || 'iftechsystems@gmail.com';
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const enquiryId = enquiry._id ? enquiry._id.toString() : 'N/A';

    // Clickable download links
    const pdfDownloadUrl = `${backendUrl}/api/enquiries/download/pdf/${enquiryId}`;
    const excelDownloadUrl = `${backendUrl}/api/enquiries/download/excel`;

    // If no SMTP configured, log it
    if (!transporter) {
      console.log('📧 Email notification (SMTP not configured):');
      console.log(`   To: ${adminEmail}`);
      console.log(`   Subject: New IFTECLABS Enquiry - ${enquiry.service}`);
      console.log(`   PDF Link: ${pdfDownloadUrl}`);
      console.log(`   Excel Link: ${excelDownloadUrl}`);
      console.log(`   Details: ${JSON.stringify(enquiry, null, 2)}`);
      return { success: true, logged: true };
    }

    const emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=initial-scale=1.0">
      <title>New Enquiry Received</title>
      <style>
        body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); overflow: hidden; }
        .header { background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); padding: 30px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
        .header p { margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; }
        .content { padding: 30px; }
        .section-title { font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: #2563eb; text-transform: uppercase; margin-bottom: 15px; border-bottom: 2px solid #eff6ff; padding-bottom: 5px; }
        .grid-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
        .grid-table td { padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .grid-table td.label { font-weight: 600; color: #475569; width: 35%; }
        .grid-table td.value { color: #0f172a; }
        .message-box { background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 15px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 25px; white-space: pre-line; }
        .btn-group { display: flex; flex-direction: column; gap: 10px; margin-bottom: 25px; }
        .btn { display: block; text-align: center; padding: 12px 20px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none; transition: background-color 0.2s; }
        .btn-primary { background-color: #2563eb; color: white; border: 1px solid #2563eb; }
        .btn-primary:hover { background-color: #1d4ed8; }
        .btn-secondary { background-color: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; }
        .btn-secondary:hover { background-color: #e2e8f0; }
        .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Project Enquiry</h1>
          <p>IFTECLABS Management Portal</p>
        </div>
        <div class="content">
          <div class="section-title">Enquiry Meta Info</div>
          <table class="grid-table">
            <tr>
              <td class="label">Enquiry ID</td>
              <td class="value"><strong>#${enquiryId}</strong></td>
            </tr>
            <tr>
              <td class="label">Date Received</td>
              <td class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
            </tr>
          </table>

          <div class="section-title">Client Contact Information</div>
          <table class="grid-table">
            <tr>
              <td class="label">Name</td>
              <td class="value">${enquiry.name}</td>
            </tr>
            <tr>
              <td class="label">Email</td>
              <td class="value"><a href="mailto:${enquiry.email}" style="color: #2563eb; text-decoration: none;">${enquiry.email}</a></td>
            </tr>
            <tr>
              <td class="label">Phone</td>
              <td class="value">${enquiry.phone}</td>
            </tr>
            <tr>
              <td class="label">Organization</td>
              <td class="value">${enquiry.organization || 'Not Specified'}</td>
            </tr>
            <tr>
              <td class="label">Preferred Contact</td>
              <td class="value">${enquiry.preferredContact || 'Email'}</td>
            </tr>
          </table>

          <div class="section-title">Project Requirements</div>
          <table class="grid-table">
            <tr>
              <td class="label">Service Required</td>
              <td class="value"><strong>${enquiry.service}</strong></td>
            </tr>
            <tr>
              <td class="label">Enquiry Type</td>
              <td class="value">${enquiry.enquiryType}</td>
            </tr>
            <tr>
              <td class="label">Project Budget</td>
              <td class="value">${enquiry.budget || 'Not specified'}</td>
            </tr>
          </table>

          <div class="section-title">Message / Details</div>
          <div class="message-box">${enquiry.message}</div>

          <div class="section-title">Admin Quick Access</div>
          <p style="font-size: 13px; color: #64748b; margin-top: 0; margin-bottom: 15px;">
            Click the buttons below to download PDF or view the updated Excel spreadsheet containing all enquiries.
          </p>
          <div class="btn-group">
            <a href="${pdfDownloadUrl}" target="_blank" class="btn btn-primary">📥 Download Enquiry PDF</a>
            <a href="${excelDownloadUrl}" target="_blank" class="btn btn-secondary">📊 Download Enquiries Excel (All)</a>
          </div>
        </div>
        <div class="footer">
          <p>This is an automated notification. Reply directly to the client's email at <a href="mailto:${enquiry.email}" style="color: #2563eb; text-decoration: none;">${enquiry.email}</a>.</p>
          <p style="margin-top: 10px; font-size: 11px; opacity: 0.8;">&copy; ${new Date().getFullYear()} IFTECLABS. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Configure attachments
    const attachments = [];
    
    // Attach single enquiry PDF if created successfully
    if (pdfPath && fs.existsSync(pdfPath)) {
      attachments.push({
        filename: `enquiry-${enquiryId}.pdf`,
        path: pdfPath,
      });
    }

    // Attach complete enquiries Excel if created successfully
    if (EXCEL_FILE && fs.existsSync(EXCEL_FILE)) {
      attachments.push({
        filename: `IFTECLABS-Enquiries.xlsx`,
        path: EXCEL_FILE,
      });
    }

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
      to: adminEmail,
      subject: `New IFTECLABS Enquiry [${enquiry.service}] - ${enquiry.name}`,
      html: emailContent,
      attachments: attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Admin notification sent (Message ID: ${info.messageId}) with ${attachments.length} attachments`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending admin notification:', error);
    return { success: false, error: error.message };
  }
};

// Send confirmation email to user
const sendUserConfirmation = async (enquiryData, enquiryId) => {
  try {
    const transporter = createTransporter();

    if (!transporter) {
      console.log('📧 User confirmation (logged only - SMTP not configured)');
      return { success: true, logged: true };
    }

    const emailContent = `
    <h2 style="color: #2563eb;">Thank You for Your Enquiry</h2>
    
    <p>Dear ${enquiryData.name},</p>
    
    <p>We have received your enquiry and will get back to you shortly.</p>
    
    <p><strong>Enquiry ID:</strong> <code style="background: #f8fafc; padding: 5px 10px; border-radius: 4px;">#${enquiryId}</code></p>
    
    <p><strong>Service:</strong> ${enquiryData.service}</p>
    <p><strong>Enquiry Type:</strong> ${enquiryData.enquiryType}</p>
    
    <hr style="border: none; border-top: 1px solid #e2e8f0;">
    
    <p>Our team typically responds within 24-48 hours.</p>
    
    <p>Best regards,<br>
    <strong>IFTECLABS Team</strong></p>
    
    <hr style="border: none; border-top: 1px solid #e2e8f0;">
    <p style="font-size: 12px; color: #64748b;">
      This is an automated confirmation email. Please do not reply to this email.
    </p>
    `;

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
      to: enquiryData.email,
      subject: 'IFTECLABS: Enquiry Received',
      html: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ User confirmation sent to ${enquiryData.email}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending user confirmation:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendAdminNotification,
  sendUserConfirmation,
};
