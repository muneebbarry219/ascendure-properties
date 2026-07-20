import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Property from '../models/Property.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Multer storage to local uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  }
});

const upload = multer({ storage });

// Helper to get base URL from request
const getBaseUrl = (req) => {
  const protocol = req.protocol || 'http';
  const host = req.get('host') || 'localhost:4000';
  return `${protocol}://${host}`;
};

// Helper to convert image paths to absolute URLs
const normalizeImageUrls = (property, baseUrl) => {
  if (!property) return property;
  const prop = property.toObject ? property.toObject() : property;
  if (prop.images && Array.isArray(prop.images)) {
    prop.images = prop.images.map(img => {
      if (img.startsWith('http://') || img.startsWith('https://')) {
        return img; // Already absolute
      }
      if (img.startsWith('/uploads/')) {
        return `${baseUrl}${img}`;
      }
      return img;
    });
  }
  return prop;
};

// Public: list with filters
router.get('/', async (req, res) => {
  try {
    const { city, purpose, minPrice, maxPrice, bedrooms, verified, lifestyle, category, subType, ready, minArea, maxArea } = req.query;
    const q = {};
    if (purpose) q.purpose = purpose;
    if (category) q.category = category;
    if (subType) q.subType = new RegExp('^' + subType + '$', 'i');
    if (city) q.city = new RegExp(city, 'i');
    if (verified) q.verified = verified === 'true';
    if (ready) q.readyToMove = ready === 'true';
    if (lifestyle) q.lifestyle = { $in: [lifestyle] };
    if (bedrooms) q.bedrooms = { $gte: Number(bedrooms) };
    if (minPrice || maxPrice) q.price = { $gte: Number(minPrice || 0), $lte: Number(maxPrice || 1e12) };
    if (minArea || maxArea) q.sqft = { $gte: Number(minArea || 0), $lte: Number(maxArea || 1e12) };

    const items = await Property.find(q).sort({ createdAt: -1 });
    const baseUrl = getBaseUrl(req);
    const normalizedItems = items.map(item => normalizeImageUrls(item, baseUrl));
    res.json(normalizedItems);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Public: get by slug or id
router.get('/:id', async (req, res) => {
  try {
    const param = req.params.id;
    let item = null;

    // Try by Mongo ObjectId
    if (param && /^[0-9a-fA-F]{24}$/.test(param)) {
      item = await Property.findById(param);
    }

    // If not found by id, try by slug
    if (!item) {
      item = await Property.findOne({ slug: param });
    }

    if (!item) return res.status(404).json({ error: 'Not found' });

    // Increment views
    if (item.analytics && typeof item.analytics.views === 'number') {
      item.analytics.views += 1;
      await item.save();
    }

    const baseUrl = getBaseUrl(req);
    const normalizedItem = normalizeImageUrls(item, baseUrl);
    res.json(normalizedItem);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Admin: create
router.post('/', requireAuth, async (req, res) => {
  try {
    const body = req.body;
    const created = await Property.create(body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Admin: update
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Admin: delete
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Admin: upload images
router.post('/upload', requireAuth, upload.array('images', 15), async (req, res) => {
  const files = req.files || [];
  const protocol = req.protocol || 'http';
  const host = req.get('host') || 'localhost:4000';
  const baseUrl = `${protocol}://${host}`;
  const urls = files.map((f) => `${baseUrl}/uploads/${f.filename}`);
  res.json({ urls });
});

export default router;
