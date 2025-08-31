// models/QuizResult.js
const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  answers: {
    type: Object,
    default: {}
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to your User model if you have one
    required: false // Optional: if you want to associate results with users
  },
  userName: {
    type: String,
    required: false // Optional: store user name for easier reference
  },
  userEmail: {
    type: String,
    required: false // Optional: store user email
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('QuizResult', quizResultSchema);