import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, CheckCircle, XCircle, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Navigation = ({ apiStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const navLinks = [
    {
      text: "How to Play",
      redirectTo: "/how-to-play"
    },
    {
      text: "Leaderboard",
      redirectTo: "/leaderboard"
    },
    {
      text: "About",
      redirectTo: "/about"
    },
    {
      text: "Our Contributors",
      redirectTo: "/our-contributors"
    }
  ];

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b shadow-sm flex items-center justify-between px-2 hover:shadow-md transition-shadow duration-300 ${darkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'}`}>
      <div className="mx-auto md:px-4 flex items-center justify-between w-full p-1 md:h-16 h-12">
        {/* logo */}
        <Link to={"/"} className="flex items-center group">
          <img 
            src="/icon.png" 
            alt="Orthoplay Logo" 
            className="w-8 h-8 mr-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" 
          />
          <span className={`text-xl font-bold transition-colors duration-300 group-hover:text-blue-600 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Orthoplay</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="items-center space-x-6 hidden md:flex">
          {navLinks.map((navLink) => (
            <Link
              key={navLink.text}
              to={navLink.redirectTo}
              className={`hover:text-blue-600 transition-all duration-300 cursor-pointer relative group ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {navLink.text}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          <div className="flex items-center text-sm">
            <span className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>API Status:</span>
            <span
              className={`flex items-center font-medium transition-all duration-300 ${apiStatus === "connected" ? "text-green-600" : "text-red-600"}`}
            >
              {apiStatus === "connected" ? (
                <CheckCircle className="h-4 w-4 mr-1 transition-transform duration-300 hover:scale-110" />
              ) : (
                <XCircle className="h-4 w-4 mr-1 transition-transform duration-300 hover:scale-110" />
              )}
              {apiStatus === "connected" ? "Connected" : "Disconnected"}
            </span>
          </div>
          
          {/* Theme Toggle Button - Desktop */}
          <button 
            onClick={toggleTheme}
            className={`flex items-center gap-2 p-2 rounded-full transition-all duration-300 hover:bg-opacity-80 ${darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun size={18} className="transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon size={18} className="transition-transform duration-300 hover:rotate-12" />
            )}
          </button>
        </div>

        {/* Mobile navbar controls */}
        <div className="md:hidden flex items-center gap-2">
          {/* Theme Toggle Button - Mobile */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-blue-100 text-blue-700'}`}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          {/* Hamburger menu */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`cursor-pointer p-2 rounded-lg transition-colors duration-200 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <Menu className="transition-transform duration-300 hover:scale-110" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`md:hidden absolute top-full left-0 w-full p-4 flex flex-col gap-y-4 rounded-b-md shadow-lg z-50 text-sm items-center animate-in slide-in-from-top-2 duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {navLinks.map((navLink) => (
              <Link
                onClick={() => setIsOpen(false)}
                className={`cursor-pointer hover:text-blue-600 transition-all duration-300 hover:scale-105 w-full text-center py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-blue-50'}`}
                key={navLink.text}
                to={navLink.redirectTo}>
                {navLink.text}
              </Link>
            ))}
            <div className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-200 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
              <span className={darkMode ? 'text-gray-300' : ''}>API Status:</span>
              <span
                className={`flex items-center font-medium transition-all duration-300 ${apiStatus === "connected" ? "text-green-600" : "text-red-600"}`}
              >
                {apiStatus === "connected" ? (
                  <CheckCircle className="h-4 w-4 mr-1 transition-transform duration-300 hover:scale-110" />
                ) : (
                  <XCircle className="h-4 w-4 mr-1 transition-transform duration-300 hover:scale-110" />
                )}
                {apiStatus === "connected" ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;