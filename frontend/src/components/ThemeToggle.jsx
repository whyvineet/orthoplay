import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import '../assets/ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <span className="theme-icon">{darkMode ? '☀️' : '🌙'}</span>
      <span className="theme-text">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
};

export default ThemeToggle;