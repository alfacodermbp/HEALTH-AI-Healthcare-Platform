const express = require('express');
const router = express.Router();
const { readCollection, insertOne } = require('../utils/db');

router.get('/:doctorId', (req, res) => {
  try {
    const reviews = readCollection('reviews').filter(r => r.doctorId === req.params.doctorId);
    res.json({ success: true, reviews });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.post('/', (req, res) => {
  try {
    const { doctorId, userName, rating, comment } = req.body;
    if (!doctorId || !rating || !comment) return res.status(400).json({ success: false, message: 'doctorId, rating and comment required' });
    const review = insertOne('reviews', { doctorId, userName: userName || 'Anonymous', rating: parseInt(rating), comment, verified: false, date: new Date().toISOString().split('T')[0] });
    res.json({ success: true, review });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
