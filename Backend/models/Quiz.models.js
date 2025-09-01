// models/QuizQuestion.js
const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  }
});

module.exports = mongoose.model('QuizQuestion', quizQuestionSchema);