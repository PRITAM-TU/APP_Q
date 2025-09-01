// // routes/gameResults.js
// const express = require('express');
// const router = express.Router();
// const GameResult = require('../models/GameResult');

// // Save game result
// router.post('/GameResult', async (req, res) => {
//   try {
//     const {
//       userId,
//       gameId,
//       gameName,
//       score,
//       totalQuestions,
//       correctAnswers,
//       timeSpent
//     } = req.body;

//     const gameResult = new GameResult({
//       userId,
//       gameId,
//       gameName,
//       score,
//       totalQuestions,
//       correctAnswers,
//       timeSpent
//     });

//     await gameResult.save();
//     res.status(201).json({ 
//       message: 'Game result saved successfully', 
//       data: gameResult 
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// module.exports = router;