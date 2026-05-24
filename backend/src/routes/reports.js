const express = require('express');
const router = express.Router();
const { analyzeReport } = require('../utils/aiEngine');
const { insertOne } = require('../utils/db');

// Simulate OCR + AI analysis without actual file parsing for demo
router.post('/analyze', (req, res) => {
  try {
    const { reportType = 'general', fileName = 'report', extractedText = '' } = req.body;

    // Mock OCR extraction based on report type
    const mockExtracted = getMockExtraction(reportType);
    const analysis = analyzeReport(reportType, mockExtracted.values);

    const result = {
      success: true,
      disclaimer: '⚠️ AI-assisted analysis only. Not a medical diagnosis. Consult your doctor.',
      fileName,
      reportType,
      extractedData: mockExtracted,
      analysis,
      severity: analysis.severity,
      severityLabel: getSeverityLabel(analysis.severity),
      recommendations: getRecommendations(analysis.severity, reportType),
      timestamp: new Date().toISOString()
    };

    res.json(result);
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

function getMockExtraction(type) {
  const extractions = {
    blood: { values: { hemoglobin: '11.2', glucose: '132', cholesterol: '215', wbc: '7800', platelets: '1.8 lakh' }, labels: [{ name: 'Hemoglobin', value: '11.2 g/dL', normal: '12–16 g/dL', status: 'low' }, { name: 'Fasting Glucose', value: '132 mg/dL', normal: '70–100 mg/dL', status: 'high' }, { name: 'Total Cholesterol', value: '215 mg/dL', normal: '<200 mg/dL', status: 'borderline' }, { name: 'WBC Count', value: '7800 /μL', normal: '4500–11000 /μL', status: 'normal' }] },
    eye: { values: { iop: '24', vision: '6/18', axialLength: '24.5' }, labels: [{ name: 'IOP (Eye Pressure)', value: '24 mmHg', normal: '10–21 mmHg', status: 'high' }, { name: 'Visual Acuity', value: '6/18', normal: '6/6', status: 'reduced' }, { name: 'Axial Length', value: '24.5 mm', normal: '22–25 mm', status: 'normal' }] },
    mri: { values: {}, labels: [{ name: 'Scan Type', value: 'MRI Brain (T2)', normal: 'N/A', status: 'info' }, { name: 'Finding', value: 'Mild periventricular changes noted', normal: 'Clear', status: 'attention' }] },
    general: { values: {}, labels: [{ name: 'Report Detected', value: 'Lab Report', normal: 'N/A', status: 'info' }, { name: 'Status', value: 'Values extracted', normal: 'N/A', status: 'normal' }] }
  };
  return extractions[type] || extractions.general;
}

function getSeverityLabel(severity) {
  const map = { normal: { label: '✅ Normal', color: 'green' }, needs_attention: { label: '⚠️ Needs Attention', color: 'yellow' }, critical: { label: '🔴 Critical', color: 'red' } };
  return map[severity] || map.normal;
}

function getRecommendations(severity, type) {
  const base = ['Share this report with your doctor', 'Keep a copy in your Health Vault'];
  if (severity === 'needs_attention') return [...base, 'Schedule a follow-up within 1–2 weeks', 'Do not ignore highlighted values'];
  if (severity === 'critical') return ['Seek medical attention immediately', 'Do not delay — consult a specialist today', ...base];
  return [...base, 'Continue regular health check-ups'];
}

module.exports = router;
