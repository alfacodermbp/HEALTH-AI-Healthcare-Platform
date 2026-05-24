const express = require('express');
const router = express.Router();
const { readCollection, insertOne } = require('../utils/db');
const crypto = require('crypto');

function hashPassword(pw) { return crypto.createHash('sha256').update(pw + 'health_salt').digest('hex'); }
function generateToken(user) {
  const payload = { id: user._id, email: user.email, role: user.role || 'user', exp: Date.now() + 7 * 24 * 60 * 60 * 1000 };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

router.post('/register', (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    const users = readCollection('users');
    if (users.find(u => u.email === email)) return res.status(400).json({ success: false, message: 'Email already registered' });
    const user = insertOne('users', { name, email, phone: phone || '', password: hashPassword(password), role: 'user' });
    const { password: _, ...safeUser } = user;
    res.json({ success: true, message: 'Registration successful', user: safeUser, token: generateToken(user) });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const users = readCollection('users');
    const user = users.find(u => u.email === email && u.password === hashPassword(password));
    if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password' });
    const { password: _, ...safeUser } = user;
    res.json({ success: true, user: safeUser, token: generateToken(user) });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

router.get('/me', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'No token' });
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    if (payload.exp < Date.now()) return res.status(401).json({ success: false, message: 'Token expired' });
    const users = readCollection('users');
    const user = users.find(u => u._id === payload.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const { password: _, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (e) { res.status(401).json({ success: false, message: 'Invalid token' }); }
});

module.exports = router;
