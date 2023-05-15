import React, { useState } from 'react';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
      
      // Play a sound effect
      const audio = new Audio('assets/sounds/notification.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
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

export default Todo; 