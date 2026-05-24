const express = require('express');
const router = express.Router();
const { chatResponse } = require('../utils/aiEngine');

router.post('/', (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ success: false, message: 'Message is required' });
    const response = chatResponse(message, history || []);
    res.json({ success: true, ...response, timestamp: new Date().toISOString() });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
