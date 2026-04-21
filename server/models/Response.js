const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Response', ResponseSchema);
