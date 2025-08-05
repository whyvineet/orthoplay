import React, { useContext } from "react";
import { Volume2, CheckCircle, XCircle } from "lucide-react";
import Chatbot from "../components/Chatbot";
import { ThemeContext } from "../context/ThemeContext";

const StartPage = ({ isLoading, startGame, apiStatus }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen pt-12 ${
      darkMode 
        ? "bg-gradient-to-br from-gray-900 to-blue-900" 
        : "bg-gradient-to-br from-slate-50 to-blue-50"
    }`}>
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-6 group">
            <img
              src="/icon.png"
              alt="Orthoplay Logo"
              className="mr-4 md:w-24 w-20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
            <div>
              <h1 className={`text-3xl sm:text-5xl font-bold mb-4 tracking-tight transition-colors duration-300 group-hover:text-blue-600 ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}>
                Orthoplay
              </h1>
              <p className={`text-sm sm:text-xl font-medium transition-colors duration-300 group-hover:text-blue-500 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                Hear it. Guess it. Spell it right.
              </p>
            </div>
          </div>
        </header>

        {/* Start Game Card */}
        <div className="max-w-2xl mx-auto">
          <div className={`rounded-3xl shadow-xl p-12 text-center hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${
            darkMode 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-gray-100"
          }`}>
            <div className="mb-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all duration-300 hover:scale-110 group ${
                darkMode ? "bg-blue-900" : "bg-blue-100"
              }`}>
                <Volume2 className={`h-10 w-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`} />
              </div>
              <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 hover:text-blue-600 ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}>
                Ready to Play?
              </h2>
              <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                darkMode 
                  ? "text-gray-300 hover:text-gray-200" 
                  : "text-gray-600 hover:text-gray-700"
              }`}>
                Listen to the word, guess its length, then spell it correctly!
              </p>
            </div>

            <button
              onClick={startGame}
              disabled={isLoading || apiStatus !== "connected"}
              className={`inline-flex items-center justify-center px-8 py-4 text-white text-lg font-semibold rounded-2xl hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg active:scale-95 min-w-48 group ${
                darkMode 
                  ? "bg-blue-700 hover:bg-blue-600" 
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Starting..." : "Start Game"}
            </button>

            {/* API Status */}
            <div className={`mt-8 pt-6 border-t ${
              darkMode ? "border-gray-700" : "border-gray-100"
            }`}>
              <div className="flex items-center justify-center text-sm">
                <span className={`mr-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}>API Status:</span>
                <span
                  className={`flex items-center font-medium transition-all duration-300 ${
                    apiStatus === "connected"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
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
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default StartPage;