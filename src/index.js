import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Add our Todo.css styles
import './components/Todo.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 