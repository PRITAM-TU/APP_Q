// Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [games, setGames] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Define games
    const mockGames = [
      {
        id: 1,
        title: "Math Challenge",
        description: "Test your math skills with fun problems",
        icon: "🧮",
        path: "/login/home/MathGame",
        color: "from-blue-500 to-blue-700"
      },
      {
        id: 2,
        title: "Vocabulary Builder",
        description: "Expand your vocabulary with exciting word games",
        icon: "📚",
        path: "/login/home/VocabGame",
        color: "from-green-500 to-green-700"
      },
      {
        id: 3,
        title: "Science Quiz",
        description: "Explore the wonders of science",
        icon: "🔬",
        path: "/login/home/ScienceQuiz",
        color: "from-purple-500 to-purple-700"
      },
      {
        id: 4,
        title: "Geography Adventure",
        description: "Travel the world from your device",
        icon: "🌎",
        path: "/login/home/GeographyGame",
        color: "from-yellow-500 to-yellow-700"
      },
      {
        id: 5,
        title: "Memory Match",
        description: "Improve your memory with this matching game",
        icon: "🧠",
        path: "/login/home/MemoryGame",
        color: "from-red-500 to-red-700"
      },
      {
        id: 6,
        title: "Coding Challenges",
        description: "Learn programming concepts through games",
        icon: "💻",
        path: "/login/home/CodingGame",
        color: "from-indigo-500 to-indigo-700"
      }
    ];

    setGames(mockGames);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">EduPlay</h1>
          <div className="flex items-center space-x-4">
            {user ? (
              <span className="text-gray-700">Welcome, {user.name}</span>
            ) : (
              <div>
                <Link to="/login" className="text-indigo-600 hover:text-indigo-800 mr-4">
                  Login
                </Link>
                <Link to="/signup" className="text-indigo-600 hover:text-indigo-800">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            Learn Through Play
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover fun educational games that make learning an adventure!
          </p>
          <div className="animate-bounce">
            <svg className="w-12 h-12 text-indigo-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Educational Games</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <div 
                key={game.id} 
                className={`transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl overflow-hidden shadow-md bg-gradient-to-r ${game.color}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link to={game.path} className="block p-6 h-full">
                  <div className="text-white">
                    <div className="text-4xl mb-4">{game.icon}</div>
                    <h4 className="text-xl font-bold mb-2">{game.title}</h4>
                    <p className="opacity-90">{game.description}</p>
                    <div className="mt-4 flex items-center text-sm font-medium">
                      Play Now
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose EduPlay?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">🏆</div>
              <h4 className="text-xl font-bold mb-2">Track Progress</h4>
              <p className="text-gray-600">Monitor your learning journey with detailed progress reports</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-xl font-bold mb-2">Adaptive Learning</h4>
              <p className="text-gray-600">Games adjust to your skill level for optimal learning</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-xl font-bold mb-2">Performance Analytics</h4>
              <p className="text-gray-600">Get insights into your strengths and areas for improvement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 EduPlay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;