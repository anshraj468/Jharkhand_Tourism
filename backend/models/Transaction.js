const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Agar product kharida gaya ho
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  transactionHash: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);

