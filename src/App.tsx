import React, { useState } from 'react';
import './App.css';

// Array of motivational quotes
const quotes: string[] = [
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Your time is limited, don't waste it living someone else's life.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Don't watch the clock; do what it does. Keep going.",
  "Everything you've ever wanted is on the other side of fear.",
  "The best way to predict the future is to create it.",
  "You are never too old to set another goal or to dream a new dream.",
  "The only limit to our realization of tomorrow is our doubts of today."
];

const App: React.FC = () => {
  // State for the current quote
  const [currentQuote, setCurrentQuote] = useState<string>(quotes[0]);
  // State for animation
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Function to get a random quote
  const getRandomQuote = (): void => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
      setIsAnimating(false);
    }, 300); // Match this with CSS animation duration
  };

  // Get today's date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="app">
      <div className="container">
        <h1 className="date">{today}</h1>
        <div className={`quote-card ${isAnimating ? 'fade-out' : 'fade-in'}`}>
          <p className="quote">{currentQuote}</p>
        </div>
        <button 
          className="inspire-button"
          onClick={getRandomQuote}
        >
          Get Inspired
        </button>
      </div>
    </div>
  );
};

export default App; 