const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// --- SIGNUP ROUTE ---
router.post('/signup', async (req, res) => {
  // Ab hum govtId ko bhi request se lenge
  const { name, email, password, role, govtId } = req.body;

  try {
    if (role === 'admin') {
      return res.status(400).json({ msg: 'Cannot register as an Admin via this route.' });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Naye user object mein govtId bhi shamil karein
    user = new User({ name, email, password: hashedPassword, role, govtId });
    await user.save();

    res.status(201).json({ msg: 'User registered successfully!' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- LOGIN ROUTE ---
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    // Direct Admin Login Logic
    if (email === 'admin@jharkhand.gov.in' && password === 'admin') {
      if (role !== 'admin') {
        return res.status(400).json({ msg: 'Please select the Admin role to log in.' });
      }
      const payload = { user: { id: 'admin_user_001', role: 'admin' } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
      return res.json({ token, user: { name: 'Platform Admin', email: 'admin@jharkhand.gov.in', role: 'admin' } });
    }
    
    // Normal User Login Logic
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || user.role !== role) {
      return res.status(400).json({ msg: 'Invalid credentials or role mismatch. Please try again.' });
    }
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;