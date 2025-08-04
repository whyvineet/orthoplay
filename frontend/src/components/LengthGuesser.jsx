import { Brain } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const LengthGuesser = ({ lengthOptions, lengthFeedback, guessLength, isLoading }) => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={`rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 ${
            darkMode 
                ? "bg-gray-800 border border-gray-700" 
                : "bg-white border border-gray-100"
        }`}>
            <h3 className={`text-xl font-bold mb-6 text-center flex items-center justify-center ${
                darkMode ? "text-gray-100" : "text-gray-900"
            }`}>
                <Brain className={`h-5 w-5 mr-2 transition-transform duration-300 hover:scale-110 ${
                    darkMode ? "text-purple-400" : "text-purple-600"
                }`} />
                How many letters?
            </h3>
            <div className="flex justify-center flex-wrap gap-4 mb-6">
                {lengthOptions.map((option) => (
                    <button
                        key={option}
                        onClick={() => guessLength(option)}
                        disabled={isLoading}
                        className={`px-6 py-3 text-white font-semibold rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md active:scale-95 transform ${
                            darkMode 
                                ? "bg-blue-700 hover:bg-blue-600" 
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {option} letters
                    </button>
                ))}
            </div>
            {lengthFeedback && (
                <div className="text-center">
                    <p className={`text-lg font-medium transition-all duration-300 ${
                        lengthFeedback.correct 
                            ? darkMode ? 'text-green-400' : 'text-green-600'
                            : darkMode ? 'text-red-400' : 'text-red-600'
                    }`}>
                        {lengthFeedback.message}
                    </p>
                </div>
            )}
        </div>
    );
};

export default LengthGuesser;