// routes/quizQuestions.js
import express from 'express';
import QuizQuestion from '../models/QuizQuestion.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get questions for a game
router.get('/:gameId', auth, async (req, res) => {
  try {
    const { difficulty } = req.query;
    let query = { gameId: req.params.gameId };
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    const questions = await QuizQuestion.find(query);
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new question (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { gameId, question, options, correctAnswer, difficulty } = req.body;
    
    const quizQuestion = new QuizQuestion({
      gameId,
      question,
      options,
      correctAnswer,
      difficulty
    });
    
    await quizQuestion.save();
    res.status(201).json(quizQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;