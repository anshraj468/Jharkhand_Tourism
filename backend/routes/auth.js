const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // User model ko import karein
const router = express.Router();

// --- SIGNUP ROUTE --- (Ismein koi badlav nahi)
router.post('/signup', async (req, res) => {
  // ... (aapka signup code jaisa tha waisa hi rahega)
});

// --- LOGIN ROUTE ---
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // <<-- YEH NAYA ADMIN LOGIN LOGIC HAI -->>
    // Step 1: Sabse pehle admin credentials check karein
    if (email === 'admin@jharkhand.gov.in' && password === 'admin') {
      if (role !== 'admin') {
        return res.status(400).json({ msg: 'Please select the Admin role to log in.' });
      }
      
      // Step 2: Admin ke liye ek naya token banayein
      const payload = {
        user: {
          id: 'admin_user_001', // Ek dummy ID
          role: 'admin'
        }
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

      // Step 3: Token aur user data wapas bhejein
      return res.json({
        token,
        user: {
          name: 'Platform Admin',
          email: 'admin@jharkhand.gov.in',
          role: 'admin'
        }
      });
    }
    // <<-- ADMIN LOGIC KHATAM -->>


    // --- Normal User Login Logic ---
    // Step 4: Agar admin nahi hai, to database mein user ko dhundhein
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    
    if (user.role !== role) {
      return res.status(400).json({ msg: 'Role mismatch. Please select the correct role.' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;