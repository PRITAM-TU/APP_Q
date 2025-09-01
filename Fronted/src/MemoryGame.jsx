// MemoryGame.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MemoryGame = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const navigate = useNavigate();

  const symbols = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍒', '🥝'];

  useEffect(() => {
    initializeGame();
    const timer = setInterval(() => {
      if (gameActive) {
        setTime(prev => prev + 1);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameActive]);

  const initializeGame = () => {
    const gameCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol, flipped: false }));
    
    setCards(gameCards);
  };

  const handleCardClick = (id) => {
    if (flippedCards.length === 2 || flippedCards.includes(id) || matchedCards.includes(id)) return;
    
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);
      
      if (firstCard.symbol === secondCard.symbol) {
        setMatchedCards(prev => [...prev, firstId, secondId]);
        setScore(prev => prev + 1);
      }
      
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const endGame = async () => {
    try {
      // Get user data from localStorage
      // Prepare the data to send
      const gameData = {
        gameId: 'Memory Game',
        gameName: 'Memory Match',
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
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Memory Match</h2>
        
        {gameActive ? (
          <>
            <div className="flex justify-between mb-6">
              <div className="text-lg font-semibold">Score: {score}</div>
              <div className="text-lg font-semibold">Time: {time}s</div>
            </div>
            
            <div className="grid grid-cols-4 gap-3 mb-6">
              {cards.map(card => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`h-16 flex items-center justify-center text-2xl rounded-lg cursor-pointer ${
                    flippedCards.includes(card.id) || matchedCards.includes(card.id) 
                      ? 'bg-red-200' 
                      : 'bg-red-100'
                  }`}
                >
                  {(flippedCards.includes(card.id) || matchedCards.includes(card.id)) 
                    ? card.symbol 
                    : '?'}
                </div>
              ))}
            </div>
            
            <button
              onClick={endGame}
              className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
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
                className="mt-4 py-2 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
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

export default MemoryGame;