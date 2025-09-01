// CodingGame.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CodingGame = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const navigate = useNavigate();

  const codingQuestions = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language"
      ],
      correctAnswer: "Hyper Text Markup Language"
    },
    {
      question: "Which symbol is used for single-line comments in JavaScript?",
      options: ["//", "/*", "#", "--"],
      correctAnswer: "//"
    },
    {
      question: "Which method is used to add an element to the end of an array in JavaScript?",
      options: ["append()", "push()", "add()", "insert()"],
      correctAnswer: "push()"
    },
    {
      question: "What is the output of: console.log(typeof null)?",
      options: ["null", "undefined", "object", "string"],
      correctAnswer: "object"
    },
    {
      question: "Which of these is NOT a JavaScript framework?",
      options: ["React", "Angular", "Vue", "Flask"],
      correctAnswer: "Flask"
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
    const randomIndex = Math.floor(Math.random() * codingQuestions.length);
    setCurrentQuestion(codingQuestions[randomIndex]);
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
           gameId: 'coding-game',
           gameName: 'Coding Challenges',
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Coding Challenges</h2>
        
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
                  className="py-3 px-4 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold rounded-lg transition-colors"
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
                className="mt-4 py-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
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

export default CodingGame;