// models/GameResult.js
const mongoose = require('mongoose');

const gameResultSchema = new mongoose.Schema({

  gameId: {
    type: String,
    required: true
  },
  gameName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
  },
  correctAnswers: {
    type: Number
  },
  timeSpent: {
    type: Number, // in seconds
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GameResult', gameResultSchema);