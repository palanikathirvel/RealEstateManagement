const twilio = require('twilio');

// Twilio Configuration for WhatsApp
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

// Initialize Twilio client only if credentials are provided
let client = null;
if (accountSid && authToken) {
  try {
    client = twilio(accountSid, authToken);
  } catch (error) {
    console.warn('Twilio initialization failed:', error.message);
    console.warn('WhatsApp OTP functionality will be disabled');
  }
} else {
  console.warn('Twilio credentials not found. WhatsApp OTP functionality will be disabled.');
  console.warn('Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in your .env file');
  // For Vercel deployment, suppress the error to prevent deployment failure
  if (process.env.VERCEL) {
    console.log('Running on Vercel - Twilio functionality disabled but not blocking deployment');
  }
}

const sendWhatsAppOTP = async (to, otp) => {
  // Check if Twilio client is available
  if (!client) {
    console.warn('Twilio client not available. Using mock OTP sending for development.');
    // In development, we can simulate successful OTP sending
    console.log(`Mock WhatsApp OTP sent to ${to}: ${otp}`);
    return { success: true, messageSid: 'mock_message_id', mock: true };
  }

  try {
    const message = await client.messages.create({
      body: `🏠 Real Estate Management System
      
Your OTP for accessing property owner details: ${otp}

This OTP is valid for 5 minutes only.

Do not share this OTP with anyone.`,
      from: twilioWhatsAppNumber,
      to: `whatsapp:${to}`
    });

    console.log(`WhatsApp OTP sent successfully: ${message.sid}`);
    return { success: true, messageSid: message.sid };

  } catch (error) {
    console.error('WhatsApp OTP sending error:', error);
    return { success: false, error: error.message };
  }
};

const validatePhoneNumber = (phone) => {
  // Indian phone number validation
  const phoneRegex = /^\+91[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

module.exports = {
  sendWhatsAppOTP,
  validatePhoneNumber
};