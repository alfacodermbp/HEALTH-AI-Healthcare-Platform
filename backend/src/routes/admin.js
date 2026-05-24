const express = require('express');
const router = express.Router();
const { readCollection, writeCollection, updateOne } = require('../utils/db');

// Simple admin auth middleware
function adminAuth(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (key !== 'health_admin_2024') return res.status(401).json({ success: false, message: 'Admin access required' });
  next();
}

router.get('/stats', adminAuth, (req, res) => {
  try {
    const doctors = readCollection('doctors');
    const hospitals = readCollection('hospitals');
    const reviews = readCollection('reviews');
    const complaints = readCollection('complaints');
    const users = readCollection('users');
    const vault = readCollection('vaultReports');
    res.json({ success: true, stats: { doctors: doctors.length, hospitals: hospitals.length, reviews: reviews.length, complaints: complaints.length, users: users.length, vaultReports: vault.length, pendingComplaints: complaints.filter(c => c.status === 'pending').length } });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.get('/doctors', adminAuth, (req, res) => res.json({ success: true, doctors: readCollection('doctors') }));
router.get('/hospitals', adminAuth, (req, res) => res.json({ success: true, hospitals: readCollection('hospitals') }));
router.get('/reviews', adminAuth, (req, res) => res.json({ success: true, reviews: readCollection('reviews') }));
router.get('/complaints', adminAuth, (req, res) => res.json({ success: true, complaints: readCollection('complaints') }));
router.get('/users', adminAuth, (req, res) => {
  const users = readCollection('users').map(({ password, ...u }) => u);
  res.json({ success: true, users });
});

router.patch('/complaints/:id', adminAuth, (req, res) => {
  try {
    const updated = updateOne('complaints', req.params.id, { status: req.body.status });
    res.json({ success: true, complaint: updated });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.patch('/reviews/:id/verify', adminAuth, (req, res) => {
  try {
    const updated = updateOne('reviews', req.params.id, { verified: true });
    res.json({ success: true, review: updated });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
