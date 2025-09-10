const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   POST /api/profile/update
// @desc    Guide ya Seller ki profile update karein (bank, qualifications)
// @access  Private
router.post('/update', auth, async (req, res) => {
  const { qualifications, bankAccount } = req.body;

  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (qualifications !== undefined) user.qualifications = qualifications;
    if (bankAccount) user.bankAccount = bankAccount;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET /api/profile/me
// @desc Get current user's full profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;

