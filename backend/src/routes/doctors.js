const express = require('express');
const router = express.Router();
const { readCollection } = require('../utils/db');

router.get('/', (req, res) => {
  try {
    const { specialty, city, state, type, search, sort, limit = 20, page = 1 } = req.query;
    let doctors = readCollection('doctors');
    if (specialty) doctors = doctors.filter(d => d.specialtyKey === specialty || d.specialization.toLowerCase().includes(specialty.toLowerCase()));
    if (state) doctors = doctors.filter(d => d.state && d.state.toLowerCase() === state.toLowerCase());
    if (city) doctors = doctors.filter(d => d.city && d.city.toLowerCase().includes(city.toLowerCase()));
    if (type) doctors = doctors.filter(d => d.type === type);
    if (search) doctors = doctors.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase()) || d.hospital.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'rating') doctors.sort((a, b) => b.rating - a.rating);
    else if (sort === 'experience') doctors.sort((a, b) => b.experience - a.experience);
    else if (sort === 'fee_low') doctors.sort((a, b) => a.consultFee - b.consultFee);
    else if (sort === 'fee_high') doctors.sort((a, b) => b.consultFee - a.consultFee);
    const total = doctors.length;
    const start = (page - 1) * limit;
    const paginated = doctors.slice(start, start + parseInt(limit));
    res.json({ success: true, doctors: paginated, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.get('/:id', (req, res) => {
  try {
    const doctor = readCollection('doctors').find(d => d.id === req.params.id);
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
    const reviews = readCollection('reviews').filter(r => r.doctorId === req.params.id);
    const hospital = readCollection('hospitals').find(h => h.id === doctor.hospitalId);
    res.json({ success: true, doctor, reviews, hospital });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
