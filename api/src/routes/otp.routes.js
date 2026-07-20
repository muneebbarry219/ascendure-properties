import { Router } from 'express';
import { createOtpRequest, verifyOtpRequest } from '../utils/otpStore.js';

const router = Router();

router.post('/send', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone || String(phone).replace(/\D/g, '').length < 8) {
      return res.status(400).json({ error: 'Please provide a valid phone number.' });
    }

    const otpRequest = createOtpRequest(phone);

    // Replace this with your SMS/WhatsApp provider call in production.
    // Example providers: Twilio Verify, MessageBird, Vonage, Meta WhatsApp Cloud API.
    console.log(`OTP for ${otpRequest.normalizedPhone}: ${otpRequest.devOtp || '[sent via provider]'}`);

    res.json({
      devOtp: otpRequest.devOtp,
      expiresInSeconds: otpRequest.expiresInSeconds,
      verificationId: otpRequest.verificationId
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { verificationId, phone, otp } = req.body;
    if (!verificationId || !phone || !otp) {
      return res.status(400).json({ error: 'Verification ID, phone, and OTP are required.' });
    }

    const result = verifyOtpRequest({ verificationId, phone, otp });
    if (!result.ok) {
      return res.status(400).json({ error: result.error });
    }

    res.json({ otpToken: result.otpToken, verified: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
