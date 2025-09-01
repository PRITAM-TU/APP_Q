// VocabGame.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VocabGame = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const navigate = useNavigate();

  const vocabWords = [
    { word: "abundant", definition: "existing or available in large quantities", synonyms: ["plentiful", "copious"] },
    { word: "diligent", definition: "having or showing care and conscientiousness in one's work or duties", synonyms: ["industrious", "assiduous"] },
    { word: "eloquent", definition: "fluent or persuasive in speaking or writing", synonyms: ["articulate", "expressive"] },
    { word: "gregarious", definition: "fond of company; sociable", synonyms: ["sociable", "companionable"] },
    { word: "jubilant", definition: "feeling or expressing great happiness and triumph", synonyms: ["overjoyed", "exultant"] },
    { word: "meticulous", definition: "showing great attention to detail; very careful and precise", synonyms: ["careful", "conscientious"] },
    { word: "pragmatic", definition: "dealing with things sensibly and realistically", synonyms: ["practical", "realistic"] },
    { word: "resilient", definition: "able to withstand or recover quickly from difficult conditions", synonyms: ["tough", "durable"] },
    { word: "sagacious", definition: "having or showing keen mental discernment and good judgment", synonyms: ["wise", "perceptive"] },
    { word: "voracious", definition: "wanting or devouring great quantities of food", synonyms: ["insatiable", "ravenous"] }
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
    const randomWordIndex = Math.floor(Math.random() * vocabWords.length);
    const correctWord = vocabWords[randomWordIndex];
    
    // Generate wrong options
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const randomIndex = Math.floor(Math.random() * vocabWords.length);
      if (randomIndex !== randomWordIndex && !wrongOptions.includes(vocabWords[randomIndex].word)) {
        wrongOptions.push(vocabWords[randomIndex].word);
      }
    }
    
    const options = [correctWord.word, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    setCurrentQuestion({
      definition: correctWord.definition,
      correctAnswer: correctWord.word,
      options: options
    });
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
        gameId: 'Vocab Game',
        gameName: 'Vocabulary Builder',
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
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Vocabulary Builder</h2>
        
        {gameActive ? (
          <>
            <div className="flex justify-between mb-6">
              <div className="text-lg font-semibold">Score: {score}</div>
              <div className="text-lg font-semibold">Time: {time}s</div>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-xl font-bold mb-4">Definition:</p>
              <p className="text-lg text-gray-700">{currentQuestion?.definition}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="py-3 px-4 bg-green-100 hover:bg-green-200 text-green-700 font-semibold rounded-lg transition-colors"
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

export default VocabGame;