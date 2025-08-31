import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PreLoginPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    // Trigger enter animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden flex flex-col items-center justify-center relative p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-20 bg-white ${isLoaded ? 'animate-pulse' : 'opacity-0'}`}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${Math.random() * 5 + 5}s`
            }}
          />
        ))}
      </div>

      {/* Animated title/text */}
      <div className={`relative z-10 text-center mb-16 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Welcome to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">
            ChatRim
          </span>
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
          Discover a new experience with our platform. Sign in or create an account to get started.
        </p>
      </div>

      {/* Animated buttons container */}
      <div className={`relative z-10 flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <button
          className={`relative px-8 py-4 rounded-full text-lg font-semibold transition-all duration-500 transform ${hoveredButton === 'login' ? 'scale-110' : 'scale-100'} bg-white text-indigo-900 hover:bg-gray-100 shadow-lg hover:shadow-xl`}
          onMouseEnter={() => setHoveredButton('login')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <Link to="/login" className="relative z-10">Login</Link>
          <span className={`absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-500 ${hoveredButton === 'login' ? 'opacity-100' : ''}`}></span>
        </button>

        <button
          className={`relative px-8 py-4 rounded-full text-lg font-semibold transition-all duration-500 transform ${hoveredButton === 'signup' ? 'scale-110' : 'scale-100'} bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-xl`}
          onMouseEnter={() => setHoveredButton('signup')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <Link to="/signup" className="relative z-10">Sign Up</Link>
          <span className={`absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-500 ${hoveredButton === 'signup' ? 'opacity-20' : ''}`}></span>
        </button>
      </div>

      {/* Decorative animated elements */}
      <div className={`absolute bottom-10 left-10 w-24 h-24 rounded-full bg-cyan-400 opacity-30 mix-blend-overlay transform transition-all duration-1000 ${isLoaded ? 'animate-bounce' : 'opacity-0'}`}></div>
      <div className={`absolute top-10 right-10 w-16 h-16 rounded-full bg-pink-400 opacity-30 mix-blend-overlay transform transition-all duration-1000 ${isLoaded ? 'animate-pulse' : 'opacity-0'}`}></div>
      <div className={`absolute top-1/3 left-1/4 w-20 h-20 rounded-full bg-blue-400 opacity-30 mix-blend-overlay transform transition-all duration-1000 ${isLoaded ? 'animate-ping' : 'opacity-0'}`}></div>

      {/* Animated footer */}
      <div className={`absolute bottom-8 text-center text-gray-300 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <p>© 2025 AppName. All rights reserved.</p>
      </div>
    </div>
  );
};

export default PreLoginPage;