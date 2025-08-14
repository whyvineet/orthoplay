import { Target, RefreshCw } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const SpellingHistory = ({ spellingHistory, lastMessage, resetGame }) => {
    const { darkMode } = useContext(ThemeContext);
    
    const getEmojiForFeedback = (emoji) => {
        if (emoji === '🟩') return 'correct';
        if (emoji === '🟨') return 'present';
        return 'absent';
    };

    const getLetterClass = (emoji) => {
        const feedback = getEmojiForFeedback(emoji);
        switch (feedback) {
            case 'correct':
                return 'bg-green-500 border-green-600 text-white';
            case 'present':
                return 'bg-yellow-500 border-yellow-600 text-white';
            case 'absent':
                return 'bg-gray-500 border-gray-600 text-white';
            default:
                return 'bg-gray-200 border-gray-300 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Your Attempts
            </h3>

            <div className="space-y-4">
                {spellingHistory.map((attempt, index) => (
                    <div key={index} className="flex justify-center gap-2">
                        <span className="text-sm text-gray-500 font-medium w-8 flex items-center justify-center">
                            #{index + 1}
                        </span>
                        {attempt.feedback.map((emoji, i) => (
                            <div
                                key={i}
                                className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold border-2 ${getLetterClass(emoji)}`}
                            >
                                {attempt.guess[i]?.toUpperCase() || ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {lastMessage && (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <p className="text-blue-800 text-sm font-medium text-center">{lastMessage}</p>
                </div>
            )}
            
            {/* Play Again Button */}
            {resetGame && (
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={resetGame}
                        className={`inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md active:scale-95 group ${
                            darkMode
                                ? 'bg-blue-700 hover:bg-blue-600 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                    >
                        <RefreshCw className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:rotate-180" />
                        🔁 Play Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default SpellingHistory;
