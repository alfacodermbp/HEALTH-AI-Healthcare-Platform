const express = require('express');
const router = express.Router();
const { readCollection, insertOne } = require('../utils/db');
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
  try {
    const { userId } = req.query;
    let reports = readCollection('vaultReports');
    if (userId) reports = reports.filter(r => r.userId === userId);
    res.json({ success: true, reports });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.post('/save', (req, res) => {
  try {
    const { userId, name, type, analysisResult, date } = req.body;
    const report = insertOne('vaultReports', { userId: userId || 'guest', name, type, analysisResult, date: date || new Date().toISOString() });
    res.json({ success: true, report });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.get('/insights/:userId', (req, res) => {
  try {
    const reports = readCollection('vaultReports').filter(r => r.userId === req.params.userId);
    const insights = [];
    if (reports.length > 2) insights.push({ type: 'trend', message: `You have uploaded ${reports.length} reports. Regular monitoring is great for your health!` });
    if (reports.some(r => r.analysisResult && r.analysisResult.severity === 'needs_attention')) insights.push({ type: 'alert', message: 'Some past reports had values needing attention. Please ensure you have followed up with a doctor.' });
    res.json({ success: true, insights, reportCount: reports.length });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
