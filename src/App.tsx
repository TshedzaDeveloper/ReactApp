import React, { useState, useEffect, useRef } from 'react';
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
  // State for welcome screen
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  // State for dark mode
  const [darkMode, setDarkMode] = useState<boolean>(false);
  // State for confetti
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  
  // References to audio elements
  const welcomeAudioRef = useRef<HTMLAudioElement | null>(null);
  const notificationAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Effect for initial welcome animation
  useEffect(() => {
    // Play welcome sound
    if (welcomeAudioRef.current) {
      welcomeAudioRef.current.volume = 0.3;
      welcomeAudioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Hide welcome screen after delay
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    
    // Apply dark mode from localStorage if exists
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.body.className = savedDarkMode ? 'dark-mode' : '';
    
    return () => clearTimeout(timer);
  }, []);
  
  // Effect for dark mode
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Function to get a random quote
  const getRandomQuote = (): void => {
    setIsAnimating(true);
    
    // Play notification sound
    if (notificationAudioRef.current) {
      notificationAudioRef.current.currentTime = 0;
      notificationAudioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Show confetti
    setShowConfetti(true);
    
    setTimeout(() => {
      let newQuote = currentQuote;
      // Make sure we don't get the same quote twice
      while (newQuote === currentQuote) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        newQuote = quotes[randomIndex];
      }
      setCurrentQuote(newQuote);
      setIsAnimating(false);
      
      // Hide confetti after 2 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
    }, 300); // Match this with CSS animation duration
  };

  // Get today's date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Toggle dark mode
  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      {/* Welcome screen */}
      {showWelcome && (
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1 className="welcome-title">Welcome</h1>
            <p className="welcome-subtitle">Daily Inspiration Awaits</p>
          </div>
        </div>
      )}
      
      {/* Main app */}
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        {/* Dark mode toggle */}
        <button 
          className="dark-mode-toggle"
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        
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
        
        {/* Audio elements */}
        <audio ref={welcomeAudioRef} src="/assets/sounds/welcome.mp3" />
        <audio ref={notificationAudioRef} src="/assets/sounds/notification.mp3" />
        
        {/* Confetti effect */}
        {showConfetti && (
          <div className="confetti">
            {[...Array(50)].map((_, i) => (
              <div 
                key={i} 
                className="confetti-piece" 
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default App; 