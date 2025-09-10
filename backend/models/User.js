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
  // <<-- YEH NAYI FIELD ADD KAREIN -->>
  govtId: { 
    type: String,
    default: null // Yeh zaroori nahi hai, isliye default null hai
  },
}, { 
  timestamps: true 
});

module.exports = mongoose.model('User', UserSchema);
