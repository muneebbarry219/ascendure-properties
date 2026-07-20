import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

const router = Router();

// Seed single admin from env if not exists
router.post('/seed-admin', async (req, res) => {
  try {
    const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) return res.status(400).json({ error: 'Missing ADMIN_EMAIL or ADMIN_PASSWORD' });

    let user = await AdminUser.findOne({ email });
    const passwordHash = await bcrypt.hash(password, 10);
    if (!user) {
      user = await AdminUser.create({ email, passwordHash });
    } else {
      user.passwordHash = passwordHash;
      await user.save();
    }
    return res.json({ ok: true, updated: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  const email = (req.body?.email || '').trim().toLowerCase();
  const password = req.body?.password || '';
  try {
    const user = await AdminUser.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ sub: user._id, role: 'admin', email: user.email }, process.env.JWT_SECRET, { expiresIn: '12h' });
    return res.json({ token });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

export default router;
