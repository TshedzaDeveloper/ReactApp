import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Updated: May 12, 2025 - Enhanced version with Todo functionality and UI improvements

// Todo component directly in App.js to avoid import issues
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">Daily Tasks</h2>
      
      <div className="todo-input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button onClick={handleAddTodo} className="todo-add-button">
          Add
        </button>
      </div>
      
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span 
              className="todo-text" 
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.text}
            </span>
            <div className="todo-actions">
              <button 
                className="todo-toggle-button" 
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.completed ? '↩️' : '✓'}
              </button>
              <button 
                className="todo-delete-button" 
                onClick={() => deleteTodo(todo.id)}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && (
        <p className="todo-empty-message">No tasks yet. Add some to get started!</p>
      )}
    </div>
  );
};

// Main App component
const App = () => {
  // Array of motivational quotes with matching image URLs
  const quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      imageUrl: "https://source.unsplash.com/1200x800/?success,passion",
      author: "Steve Jobs"
    },
    {
      text: "Believe you can and you're halfway there.",
      imageUrl: "https://source.unsplash.com/1200x800/?motivation,belief",
      author: "Theodore Roosevelt"
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      imageUrl: "https://source.unsplash.com/1200x800/?perseverance,courage",
      author: "Winston Churchill"
    },
    {
      text: "Your time is limited, don't waste it living someone else's life.",
      imageUrl: "https://source.unsplash.com/1200x800/?authentic,freedom",
      author: "Steve Jobs"
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      imageUrl: "https://source.unsplash.com/1200x800/?dreams,future",
      author: "Eleanor Roosevelt"
    }
  ];

  // States
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showTodo, setShowTodo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);
  
  // References
  const welcomeAudioRef = useRef(null);
  const notificationAudioRef = useRef(null);
  
  // Effect for welcome animation
  useEffect(() => {
    // Play welcome sound
    if (welcomeAudioRef.current) {
      welcomeAudioRef.current.volume = 0.3;
      welcomeAudioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Hide welcome screen after delay
    const timer = setTimeout(() => {
      setShowWelcome(false);
      
      // Show confetti after welcome screen
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Effect for dark mode
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  // Function to get a random quote
  const getRandomQuote = () => {
    setIsAnimating(true);
    setImageLoaded(false);
    
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
      
      // Hide confetti after some time
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }, 300);
  };

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Get today's date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    
    // Show confetti when toggling dark mode
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 2000);
  };
  
  // Toggle between views
  const toggleView = () => {
    setShowTodo(!showTodo);
    
    if (notificationAudioRef.current) {
      notificationAudioRef.current.currentTime = 0;
      notificationAudioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  return (
    <>
      {/* Welcome screen */}
      {showWelcome && (
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1 className="welcome-title">Welcome!</h1>
            <p className="welcome-subtitle">Your Daily Inspiration App</p>
            <div className="welcome-loading">
              <div className="welcome-loading-bar"></div>
            </div>
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
        
        {/* View toggle button */}
        <button 
          className="view-toggle-button"
          onClick={toggleView}
        >
          {showTodo ? "Show Quote" : "Show Tasks"}
        </button>
        
        <div className="container">
          <h1 className="date">{today}</h1>
          
          {showTodo ? (
            <Todo />
          ) : (
            <div className={`quote-container ${isAnimating ? 'fade-out' : 'fade-in'}`}>
              <div className="quote-card">
                <p className="quote">{currentQuote.text}</p>
                <p className="quote-author">— {currentQuote.author}</p>
              </div>
              
              <div className="quote-image-container">
                {!imageLoaded && <div className="image-loader"></div>}
                <img 
                  src={currentQuote.imageUrl} 
                  alt="Inspirational" 
                  className={`quote-image ${imageLoaded ? 'loaded' : ''}`}
                  onLoad={handleImageLoad}
                />
              </div>
              
              <button 
                className="inspire-button"
                onClick={getRandomQuote}
              >
                Get Inspired
              </button>
            </div>
          )}
        </div>
        
        {/* Audio elements */}
        <audio ref={welcomeAudioRef} src="assets/sounds/welcome.mp3" />
        <audio ref={notificationAudioRef} src="assets/sounds/notification.mp3" />
        
        {/* Confetti effect */}
        {showConfetti && (
          <div className="confetti">
            {[...Array(100)].map((_, i) => (
              <div 
                key={i} 
                className="confetti-piece" 
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
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