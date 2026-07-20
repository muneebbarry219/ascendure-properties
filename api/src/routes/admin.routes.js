import express from 'express';
import Property from '../models/Property.js';
import Inquiry from '../models/Inquiry.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/admin/stats
router.get('/stats', requireAuth, async (req, res) => {
  try {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    // Totals
    const [totalProps, saleCount, rentCount, lastMonthProps, totalInquiries] = await Promise.all([
      Property.countDocuments({}),
      Property.countDocuments({ purpose: { $in: ['buy', 'off-plan'] } }),
      Property.countDocuments({ purpose: 'rent' }),
      Property.countDocuments({ createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } }),
      Inquiry.countDocuments({})
    ]);

    // Monthly counts for this year
    const monthlyAgg = await Property.aggregate([
      { $match: { createdAt: { $gte: startOfYear } } },
      { $project: { month: { $month: '$createdAt' }, purpose: 1 } },
      { $group: {
          _id: { month: '$month', purpose: '$purpose' },
          count: { $sum: 1 }
      } },
    ]);

    const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const sale = Array(12).fill(0);
    const rent = Array(12).fill(0);
    monthlyAgg.forEach(({ _id, count }) => {
      const idx = (_id.month - 1);
      if (_id.purpose === 'rent') rent[idx] += count; else sale[idx] += count;
    });
    const total = sale.map((v,i)=> v + rent[i]);

    // Regions (by country -> to broad regions)
    const countryAgg = await Property.aggregate([
      { $group: { _id: { $toLower: { $ifNull: ['$country',''] } }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 100 }
    ]);

    const regionMap = (c) => {
      if (!c) return 'Other';
      const s = c.toLowerCase();
      if (['uae','united arab emirates','saudi arabia','ksa','qatar','oman','bahrain','kuwait'].some(k=>s.includes(k))) return 'Asia';
      if (['uk','united kingdom','england','spain','france','germany','italy','montenegro','portugal'].some(k=>s.includes(k))) return 'Europe';
      if (['usa','united states','america','canada'].some(k=>s.includes(k))) return 'America';
      if (['australia','new zealand'].some(k=>s.includes(k))) return 'Australia';
      if (['nigeria','south africa','egypt','morocco','kenya'].some(k=>s.includes(k))) return 'Africa';
      return 'Other';
    };

    const regionsCount = {};
    countryAgg.forEach(({ _id, count }) => {
      const r = regionMap(_id);
      regionsCount[r] = (regionsCount[r] || 0) + count;
    });
    const regions = Object.entries(regionsCount)
      .map(([name, count])=>({ name, count }))
      .sort((a,b)=> b.count-a.count);

    const salePct = totalProps ? Math.round((saleCount/totalProps)*100) : 0;
    const rentPct = 100 - salePct;

    res.json({
      totals: {
        properties: totalProps,
        sale: saleCount,
        rent: rentCount,
        lastMonthProperties: lastMonthProps,
        inquiries: totalInquiries
      },
      monthly: { labels, sale, rent, total },
      composition: { salePct, rentPct },
      regions,
      meta: { updatedAt: new Date().toISOString() }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
