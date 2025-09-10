const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @route   GET /api/admin/verifiable-users
// @desc    Get all guides and sellers for verification
// @access  Private (Sirf Admin ke liye)
router.get('/verifiable-users', auth, async (req, res) => {
    try {
        // <<-- YAHAN BADLAV KIYA GAYA HAI -->>
        // Ab hum seedhe token se role check karenge, database call ki zaroorat nahi
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Only for admins.' });
        }

        const users = await User.find({ role: { $in: ['guide', 'seller'] } }).select('-password');
        res.json(users);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/admin/verify/:userId
// @desc    Ek guide ya seller ko verify karein
// @access  Private (Sirf Admin ke liye)
router.put('/verify/:userId', auth, async (req, res) => {
    try {
        // <<-- YAHAN BHI BADLAV KIYA GAYA HAI -->>
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Only for admins.' });
        }

        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.isVerified = true;
        await user.save();
        
        res.json({ msg: 'User has been verified successfully', user });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/admin/transactions
// @desc    Get all transactions for the admin panel
// @access  Private (Admin only)
router.get('/transactions', auth, async (req, res) => {
    try {
        // <<-- YAHAN BHI BADLAV KIYA GAYA HAI -->>
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied' });
        }

        const transactions = await Transaction.find()
            .populate('from', 'name')
            .populate('to', 'name')
            .populate('product', 'name')
            .sort({ createdAt: -1 });

        res.json(transactions);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
