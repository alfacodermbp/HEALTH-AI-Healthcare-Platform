const express = require('express');
const router = express.Router();
const { analyzeSymptoms } = require('../utils/aiEngine');
const { readCollection } = require('../utils/db');

router.post('/analyze', (req, res) => {
  try {
    const { symptoms, language } = req.body;
    if (!symptoms || symptoms.trim().length < 3) return res.status(400).json({ success: false, message: 'Please describe your symptoms in more detail.' });
    const analysis = analyzeSymptoms(symptoms);
    const doctors = readCollection('doctors').filter(d => d.specialtyKey === analysis.specialtyKey).slice(0, 4);
    const hospitals = readCollection('hospitals').filter(h => h.specialties.some(s => s.toLowerCase().includes(analysis.detectedCategory))).slice(0, 4);
    res.json({ success: true, analysis, suggestedDoctors: doctors, suggestedHospitals: hospitals });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
