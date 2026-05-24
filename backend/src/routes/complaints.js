const express = require('express');
const router = express.Router();
const { insertOne, readCollection } = require('../utils/db');

router.post('/', (req, res) => {
  try {
    const { doctorName, hospitalName, type, description, contactEmail } = req.body;
    if (!description) return res.status(400).json({ success: false, message: 'Description is required' });
    const complaint = insertOne('complaints', { doctorName, hospitalName, type: type || 'other', description, contactEmail, status: 'pending' });
    res.json({ success: true, complaint, message: 'Complaint submitted. Our team will review within 48 hours.' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.get('/', (req, res) => {
  try {
    const complaints = readCollection('complaints');
    res.json({ success: true, complaints });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
