const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/admin/verifiable-users
// @desc    Get all guides and sellers for verification
// @access  Private (Sirf Admin ke liye)
router.get('/verifiable-users', auth, async (req, res) => {
    try {
        // Step 1: Check karein ki request karne wala user admin hai ya nahi
        const admin = await User.findById(req.user.id);
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Only for admins.' });
        }

        // Step 2: Sabhi guides aur sellers ko database se nikalein
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
        // Step 1: Check karein ki request karne wala user admin hai ya nahi
        const admin = await User.findById(req.user.id);
        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Only for admins.' });
        }

        // Step 2: Di gayi ID se user ko dhundhein
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Step 3: User ka status 'verified' karein
        user.isVerified = true;
        await user.save();
        
        res.json({ msg: 'User has been verified successfully', user });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
