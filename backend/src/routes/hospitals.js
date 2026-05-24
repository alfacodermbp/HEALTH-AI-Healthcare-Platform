const express = require('express');
const router = express.Router();
const { readCollection } = require('../utils/db');

router.get('/', (req, res) => {
  try {
    const { type, city, specialty, search, sort, limit = 20, page = 1 } = req.query;
    let hospitals = readCollection('hospitals');
    if (type) hospitals = hospitals.filter(h => h.type === type);
    if (city) hospitals = hospitals.filter(h => h.city.toLowerCase().includes(city.toLowerCase()));
    if (specialty) hospitals = hospitals.filter(h => h.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase())));
    if (search) hospitals = hospitals.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.city.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'rating') hospitals.sort((a, b) => b.rating - a.rating);
    const total = hospitals.length;
    const paginated = hospitals.slice((page - 1) * limit, page * limit);
    res.json({ success: true, hospitals: paginated, total });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.get('/compare', (req, res) => {
  try {
    const { specialty, city } = req.query;
    let hospitals = readCollection('hospitals');
    if (specialty) hospitals = hospitals.filter(h => h.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase())));
    if (city) hospitals = hospitals.filter(h => h.city.toLowerCase().includes(city.toLowerCase()));
    const govt = hospitals.filter(h => h.type === 'govt').sort((a, b) => b.rating - a.rating).slice(0, 3);
    const priv = hospitals.filter(h => h.type === 'private').sort((a, b) => b.rating - a.rating).slice(0, 3);
    res.json({ success: true, government: govt, private: priv });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.get('/:id', (req, res) => {
  try {
    const hospital = readCollection('hospitals').find(h => h.id === req.params.id);
    if (!hospital) return res.status(404).json({ success: false, message: 'Hospital not found' });
    const doctors = readCollection('doctors').filter(d => d.hospitalId === req.params.id);
    res.json({ success: true, hospital, doctors });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
