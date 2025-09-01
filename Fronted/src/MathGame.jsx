import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MathGame = () => {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [time, setTime] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const navigate = useNavigate();

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
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let answer;
    switch(operator) {
      case '+': answer = num1 + num2; break;
      case '-': answer = num1 - num2; break;
      case '*': answer = num1 * num2; break;
      default: answer = num1 + num2;
    }
    
    setCurrentQuestion({
      text: `${num1} ${operator} ${num2}`,
      answer: answer,
      options: generateOptions(answer)
    });
  };

  const generateOptions = (correctAnswer) => {
    const options = [correctAnswer];
    while (options.length < 4) {
      const randomOption = correctAnswer + Math.floor(Math.random() * 10) - 5;
      if (!options.includes(randomOption) && randomOption !== correctAnswer && randomOption > 0) {
        options.push(randomOption);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (selectedAnswer) => {
    setTotalQuestions(prev => prev + 1);
    
    if (selectedAnswer === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
    generateQuestion();
  };

  const endGame = async () => {
    try {
      // Get user data from localStorage
      // Prepare the data to send
      const gameData = {
        gameId: 'math-game',
        gameName: 'Math Challenge',
        score: score,
        totalQuestions: totalQuestions,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Math Challenge</h2>
        
        {gameActive ? (
          <>
            <div className="flex justify-between mb-6">
              <div className="text-lg font-semibold">Score: {score}</div>
              <div className="text-lg font-semibold">Time: {time}s</div>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-xl font-bold mb-4">Solve:</p>
              <p className="text-3xl font-bold text-indigo-700">{currentQuestion?.text}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
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
            <p className="text-lg mb-2">Final Score: {score}/{totalQuestions}</p>
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
                className="mt-4 py-2 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
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

export default MathGame;