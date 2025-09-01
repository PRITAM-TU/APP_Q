// ScienceQuiz.jsx
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ScienceQuiz = () => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [time, setTime] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const navigate = useNavigate();

  const scienceQuestions = [
    {
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      correctAnswer: "Au"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Platinum"],
      correctAnswer: "Diamond"
    },
    {
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correctAnswer: "Carbon Dioxide"
    },
    {
      question: "What is the smallest unit of life?",
      options: ["Atom", "Cell", "Molecule", "Organelle"],
      correctAnswer: "Cell"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (gameActive) {
        setTime(prev => prev + 1);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameActive]);

  const handleAnswer = () => {
    if (selectedOption === scienceQuestions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    if (currentQuestionIndex < scienceQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption('');
    } else {
      endGame();
    }
  };

  const endGame = async () => {
    try {
      // Get user data from localStorage
      // Prepare the data to send
      const gameData = {
        gameId: 'Science Game',
        gameName: 'Science Quiz',
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Science Quiz</h2>
        
        {gameActive ? (
          <>
            <div className="flex justify-between mb-6">
              <div className="text-lg font-semibold">Score: {score}</div>
              <div className="text-lg font-semibold">Time: {time}s</div>
              <div className="text-lg font-semibold">Question: {currentQuestionIndex + 1}/{scienceQuestions.length}</div>
            </div>
            
            <div className="mb-8">
              <p className="text-xl font-bold mb-4">{scienceQuestions[currentQuestionIndex].question}</p>
              
              <div className="space-y-3">
                {scienceQuestions[currentQuestionIndex].options.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="science-quiz"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => setSelectedOption(option)}
                      className="mr-2"
                    />
                    <label htmlFor={`option-${index}`} className="text-lg">{option}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleAnswer}
              disabled={!selectedOption}
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
            >
              {currentQuestionIndex < scienceQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Quiz Completed!</h3>
            <p className="text-lg mb-2">Final Score: {score}/{scienceQuestions.length}</p>
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
                className="mt-4 py-2 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScienceQuiz;