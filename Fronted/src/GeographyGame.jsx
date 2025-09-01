// GeographyGame.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GeographyGame = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const navigate = useNavigate();

  const geographyQuestions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      question: "Which is the longest river in the world?",
      options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
      correctAnswer: "Nile"
    },
    {
      question: "Which continent is the largest by area?",
      options: ["Africa", "North America", "Asia", "Europe"],
      correctAnswer: "Asia"
    },
    {
      question: "Which country has the largest population in the world?",
      options: ["India", "United States", "China", "Russia"],
      correctAnswer: "China"
    },
    {
      question: "What is the highest mountain in the world?",
      options: ["K2", "Mount Everest", "Kilimanjaro", "Matterhorn"],
      correctAnswer: "Mount Everest"
    }
  ];

  useEffect(() => {
    generateQuestion();
    const timer = setInterval(() => {
      if (gameActive) {
        setTime(prev => prev + 1);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameActive]);

  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * geographyQuestions.length);
    setCurrentQuestion(geographyQuestions[randomIndex]);
  };

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    generateQuestion();
  };

  const endGame = async () => {
   try {
      // Get user data from localStorage
      // Prepare the data to send
      const gameData = {
        gameId: 'geography-game',
        gameName: 'Geography Adventure',
        score: score,
        correctAnswers: score,
        timeSpent: time
      };

      // Send data to backend
      const response = await axios.post('http://localhost:5000/GameResult', gameData);
      
      console.log('API response:', response.data);
      
    } catch (error) {
      console.error('API error:', error);
      
      // More detailed error logging
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }

    setGameActive(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6">Geography Adventure</h2>
        
        {gameActive ? (
          <>
            <div className="flex justify-between mb-6">
              <div className="text-lg font-semibold">Score: {score}</div>
              <div className="text-lg font-semibold">Time: {time}s</div>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-xl font-bold mb-4">{currentQuestion?.question}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="py-3 px-4 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold rounded-lg transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
            
            <button
              onClick={endGame}
              className="mt-6 w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
            >
              End Game
            </button>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Game Over!</h3>
            <p className="text-lg mb-2">Final Score: {score}</p>
            <p className="text-lg mb-4">Time: {time} seconds</p>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => navigate('/login/home')}
                className="mt-4 py-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 py-2 px-6 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeographyGame;