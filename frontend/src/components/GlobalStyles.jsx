import { useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

// This component doesn't render anything, it just applies global styles
const GlobalStyles = () => {
  const { darkMode } = useContext(ThemeContext);
  
  useEffect(() => {
    // Apply theme to document element
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    
    // Apply theme class to body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);
  
  return null;
};

export default GlobalStyles;