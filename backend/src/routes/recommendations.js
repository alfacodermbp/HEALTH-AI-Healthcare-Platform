const express = require('express');
const router = express.Router();
const { analyzeSymptoms } = require('../utils/aiEngine');
const { readCollection } = require('../utils/db');

router.post('/', (req, res) => {
  try {
    const { symptoms, reportAnalysis, city, budget, preferGovt } = req.body;
    const text = symptoms || (reportAnalysis && reportAnalysis.conditions) || '';
    const analysis = analyzeSymptoms(typeof text === 'string' ? text : text.join(' '));
    let doctors = readCollection('doctors').filter(d => d.specialtyKey === analysis.specialtyKey);
    let hospitals = readCollection('hospitals');

    if (city) {
      const cityDocs = doctors.filter(d => d.city.toLowerCase().includes(city.toLowerCase()));
      if (cityDocs.length >= 2) doctors = cityDocs;
    }
    if (budget === 'low') doctors.sort((a, b) => a.consultFee - b.consultFee);
    else doctors.sort((a, b) => b.rating - a.rating);

    const govtHospitals = hospitals.filter(h => h.type === 'govt').sort((a, b) => b.rating - a.rating).slice(0, 3);
    const privateHospitals = hospitals.filter(h => h.type === 'private').sort((a, b) => b.rating - a.rating).slice(0, 3);

    const categorized = {
      topRated: doctors.filter(d => d.rating >= 4.8).slice(0, 2),
      experienced: doctors.sort((a, b) => b.experience - a.experience).slice(0, 2),
      budgetFriendly: [...doctors].sort((a, b) => a.consultFee - b.consultFee).slice(0, 2),
      diseaseSpecialist: doctors.filter(d => d.tags && d.tags.some(t => t.toLowerCase().includes('specialist'))).slice(0, 2)
    };

    res.json({ success: true, analysis, doctors: doctors.slice(0, 6), categorizedDoctors: categorized, govtHospitals, privateHospitals, comparison: { govt: { cost: 'Free – ₹200', waitTime: '3–10 days', facilities: 'Good', ayushman: true, tag: 'Best for Budget' }, private: { cost: '₹500 – ₹2000+', waitTime: 'Same day', facilities: 'Excellent', ayushman: false, tag: 'Best for Fast Treatment' } } });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
