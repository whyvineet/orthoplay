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
    <nav className={`${darkMode ? 'bg-slate-900' : 'bg-white'} border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* logo */}
          <Link to={"/"} className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">3D</span>
            </div>
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Orthoplay</span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((navLink) => (
              <Link
                key={navLink.text}
                to={navLink.redirectTo}
                className={`text-sm font-medium transition-colors duration-200 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
              >
                {navLink.text}
              </Link>
            ))}
          </div>

          {/* Right side - API Status & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <div className={`flex items-center text-sm px-3 py-1.5 rounded-full border ${
              darkMode
                ? 'border-slate-600 bg-slate-800/50'
                : 'border-gray-300 bg-gray-50'
            }`}>
              <span className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>API Status:</span>
              <span className={`flex items-center font-medium ${apiStatus === "connected" ? "text-green-500" : "text-red-500"}`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${apiStatus === "connected" ? "bg-green-500" : "bg-red-500"}`}></div>
                {apiStatus === "connected" ? "Connected" : "Disconnected"}
              </span>
            </div>

            {/* Theme Toggle Button - Desktop */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-colors duration-200 ${darkMode ? 'text-gray-400 hover:text-white hover:bg-slate-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>
          </div>
          {/* Mobile navbar controls */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme Toggle Button - Mobile */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-colors duration-200 ${darkMode ? 'text-gray-400 hover:text-white hover:bg-slate-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Hamburger menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors duration-200 ${darkMode ? 'text-gray-400 hover:text-white hover:bg-slate-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
            >
              <Menu size={16} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`md:hidden absolute top-full left-0 w-full shadow-lg z-50 ${darkMode ? 'bg-slate-900 border-t border-slate-700' : 'bg-white border-t border-gray-200'}`}>
            <div className="px-4 py-2 space-y-1">
              {navLinks.map((navLink) => (
                <Link
                  key={navLink.text}
                  to={navLink.redirectTo}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${darkMode ? 'text-gray-300 hover:text-white hover:bg-slate-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  {navLink.text}
                </Link>
              ))}
              <div className={`flex items-center mx-3 my-2 px-3 py-1.5 text-sm rounded-full border ${
                darkMode
                  ? 'border-slate-600 bg-slate-800/50 text-gray-400'
                  : 'border-gray-300 bg-gray-50 text-gray-500'
              }`}>
                <span className="mr-2">API Status:</span>
                <span className={`flex items-center font-medium ${apiStatus === "connected" ? "text-green-500" : "text-red-500"}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${apiStatus === "connected" ? "bg-green-500" : "bg-red-500"}`}></div>
                  {apiStatus === "connected" ? "Connected" : "Disconnected"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;