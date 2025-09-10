const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    required: true, 
    enum: ['tourist', 'guide', 'seller', 'admin']
  },
  govtId: { 
    type: String,
    default: null
  },
  // <<-- NAYE FIELDS -->>
  isVerified: { // Admin dwara verification ke liye
    type: Boolean,
    default: false
  },
  qualifications: { // Guide ke liye
    type: [String],
    default: []
  },
  bankAccount: { // Guide aur Seller ke liye
    accountHolderName: String,
    accountNumber: String,
    ifscCode: String,
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('User', UserSchema);
