import { Router } from 'express';
import Inquiry from '../models/Inquiry.js';
import Property from '../models/Property.js';
import { requireAuth } from '../middleware/auth.js';
import { consumeVerifiedOtpToken } from '../utils/otpStore.js';

const router = Router();

// Public: submit inquiry for property
router.post('/', async (req, res) => {
  try {
    const { propertyId, name, email, phone, preferredContact, message } = req.body;
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    const inquiry = await Inquiry.create({ property: propertyId, name, email, phone, preferredContact, message });
    property.analytics.inquiries += 1;
    await property.save();
    res.status(201).json(inquiry);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Public: submit general contact form after phone OTP verification
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message, otpToken } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'Name, email, phone, and message are required.' });
    }

    const isOtpVerified = consumeVerifiedOtpToken({ otpToken, phone });
    if (!isOtpVerified) {
      return res.status(403).json({ error: 'Phone OTP verification is required before submitting.' });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      subject,
      message,
      preferredContact: 'phone',
      otpVerified: true
    });

    res.status(201).json(inquiry);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Admin: list inquiries
router.get('/', requireAuth, async (_req, res) => {
  try {
    const items = await Inquiry.find().populate('property').sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
