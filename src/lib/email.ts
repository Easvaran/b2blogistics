import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEnquiryEmail = async (data: any) => {
  const mailOptions = {
    from: `"B2BLOGISTICS" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Logistics Enquiry: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Enquiry Received</h2>
        <p>You have a new enquiry from the B2BLOGISTICS website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background: #f8fafc;">
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #eee;">Field</th>
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #eee;">Details</th>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Service</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.service}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Subject</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.subject}</td>
          </tr>
        </table>
        
        <div style="margin-top: 20px; background: #f1f5f9; padding: 15px; border-radius: 8px;">
          <h4 style="margin-top: 0;">Message:</h4>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
        
        <div style="margin-top: 30px; text-align: center; color: #64748b; font-size: 12px;">
          <p>This is an automated notification from B2BLOGISTICS Admin Panel.</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export const sendOTPEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: `"B2BLOGISTICS" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Password Reset OTP - B2BLOGISTICS',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #2563eb; text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Password Reset Request</h2>
        <p>You requested to reset your password for the B2BLOGISTICS Admin Panel.</p>
        <p>Please use the following One-Time Password (OTP) to proceed with the reset. This OTP is valid for 10 minutes.</p>
        
        <div style="margin: 30px 0; text-align: center;">
          <div style="display: inline-block; padding: 15px 30px; background: #f1f5f9; border-radius: 12px; font-size: 32px; font-weight: 900; letter-spacing: 5px; color: #2563eb; border: 2px dashed #cbd5e1;">
            ${otp}
          </div>
        </div>
        
        <p style="color: #64748b; font-size: 14px;">If you didn't request this, you can safely ignore this email. Your password will remain unchanged.</p>
        
        <div style="margin-top: 30px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #eee; pt-10;">
          <p>© ${new Date().getFullYear()} B2BLOGISTICS State Forwarding. All Rights Reserved.</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export const sendContactMessageEmail = async (data: any) => {
  const mailOptions = {
    from: `"B2BLOGISTICS" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Message from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">New Contact Message</h2>
        <p>A user has contacted you through the Contact Us form.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background: #fef2f2;">
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #eee;">Field</th>
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #eee;">Details</th>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>City</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.city}</td>
          </tr>
        </table>
        
        <div style="margin-top: 20px; background: #fef2f2; padding: 15px; border-radius: 8px;">
          <h4 style="margin-top: 0;">Message:</h4>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
        
        <div style="margin-top: 30px; text-align: center; color: #64748b; font-size: 12px;">
          <p>This is an automated notification from B2BLOGISTICS Admin Panel.</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
