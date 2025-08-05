import React, { useState, useContext } from 'react';
import { Trophy, User, Send, CheckCircle, AlertCircle, Crown, Star, Zap } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { apiService } from '../services/apiService';

const ScoreSubmission = ({ gameData, onSubmissionComplete, onSkip }) => {
    const { darkMode } = useContext(ThemeContext);
    const [username, setUsername] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!username.trim()) {
            setError('Please enter a username');
            return;
        }

        if (username.length < 3 || username.length > 20) {
            setError('Username must be between 3 and 20 characters');
            return;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            setError('Username can only contain letters, numbers, and underscores');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const result = await apiService.submitScore({
                username: username.trim(),
                word_id: gameData.wordId,
                completion_time: gameData.completionTime
            });

            setSubmissionResult(result);
            
            // Store username in localStorage for future games
            localStorage.setItem('orthoplay_username', username.trim());
            
            // Call completion callback after a short delay
            setTimeout(() => {
                onSubmissionComplete(result);
            }, 2000);

        } catch (err) {
            setError(err.message || 'Failed to submit score');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSkip = () => {
        onSkip();
    };

    // Load saved username on component mount
    React.useEffect(() => {
        const savedUsername = localStorage.getItem('orthoplay_username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    if (submissionResult) {
        const isTopRank = submissionResult.rank && submissionResult.rank <= 3;

        return (
            <div className={`rounded-2xl shadow-2xl p-10 text-center backdrop-blur-sm border-2 ${
                darkMode
                    ? 'bg-gradient-to-br from-green-900/30 to-blue-900/30 border-green-700/50'
                    : 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200'
            }`}>
                <div className="relative inline-block mb-6">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                        darkMode
                            ? 'bg-gradient-to-br from-green-600 to-emerald-600'
                            : 'bg-gradient-to-br from-green-500 to-emerald-500'
                    } shadow-2xl animate-pulse`}>
                        {isTopRank ? (
                            <Crown className="h-10 w-10 text-white" />
                        ) : (
                            <CheckCircle className="h-10 w-10 text-white" />
                        )}
                    </div>
                    {isTopRank && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
                            <Star className="h-4 w-4 text-white" />
                        </div>
                    )}
                </div>

                <h3 className={`text-3xl font-bold mb-6 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                    {isTopRank ? '🎉 Legendary Performance!' : '✨ Score Submitted!'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className={`p-6 rounded-xl ${
                        darkMode ? 'bg-gray-800/50' : 'bg-white/70'
                    } shadow-lg`}>
                        <div className={`text-4xl font-black mb-2 ${
                            darkMode ? 'text-yellow-400' : 'text-yellow-600'
                        }`}>
                            {submissionResult.score}
                        </div>
                        <div className={`text-sm font-medium ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            Total Points
                        </div>
                    </div>

                    {submissionResult.rank && (
                        <div className={`p-6 rounded-xl ${
                            darkMode ? 'bg-gray-800/50' : 'bg-white/70'
                        } shadow-lg`}>
                            <div className={`text-4xl font-black mb-2 ${
                                isTopRank
                                    ? 'text-yellow-500 animate-pulse'
                                    : darkMode
                                        ? 'text-blue-400'
                                        : 'text-blue-600'
                            }`}>
                                #{submissionResult.rank}
                            </div>
                            <div className={`text-sm font-medium ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                Global Rank
                            </div>
                        </div>
                    )}
                </div>

                <div className={`p-4 rounded-xl ${
                    darkMode ? 'bg-green-900/20' : 'bg-green-100'
                } border-2 border-green-500/30`}>
                    <p className={`text-lg font-medium ${
                        darkMode ? 'text-green-400' : 'text-green-700'
                    }`}>
                        {submissionResult.message}
                    </p>
                    {isTopRank && (
                        <p className={`text-sm mt-2 ${
                            darkMode ? 'text-yellow-400' : 'text-yellow-600'
                        }`}>
                            🏆 You're now in the Hall of Fame!
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={`rounded-2xl shadow-2xl p-10 backdrop-blur-sm border-2 ${
            darkMode
                ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700/50'
                : 'bg-gradient-to-br from-white/90 to-gray-50/90 border-gray-200/50'
        }`}>
            <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        darkMode
                            ? 'bg-gradient-to-br from-yellow-600 to-orange-600'
                            : 'bg-gradient-to-br from-yellow-500 to-orange-500'
                    } shadow-2xl animate-pulse`}>
                        <Trophy className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                        <Zap className="h-3 w-3 text-white" />
                    </div>
                </div>
                <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${
                    darkMode
                        ? 'from-yellow-400 to-orange-400'
                        : 'from-yellow-600 to-orange-600'
                } bg-clip-text text-transparent`}>
                    Join the Champions!
                </h3>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Submit your score and claim your place in the Hall of Fame
                </p>
            </div>

            {/* Game Summary */}
            <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Game Summary
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Word:</span>
                        <span className={`ml-2 font-mono font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {gameData.word}
                        </span>
                    </div>
                    <div>
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Score:</span>
                        <span className={`ml-2 font-bold text-blue-600 dark:text-blue-400`}>
                            {gameData.score}
                        </span>
                    </div>
                    <div>
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Attempts:</span>
                        <span className={`ml-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {gameData.attempts}
                        </span>
                    </div>
                    <div>
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hints:</span>
                        <span className={`ml-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {gameData.hintsUsed}
                        </span>
                    </div>
                    <div className="col-span-2">
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Time:</span>
                        <span className={`ml-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {gameData.completionTime < 60 
                                ? `${gameData.completionTime.toFixed(1)}s`
                                : `${Math.floor(gameData.completionTime / 60)}m ${(gameData.completionTime % 60).toFixed(1)}s`
                            }
                        </span>
                    </div>
                </div>
            </div>

            {/* Username Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                        Username
                    </label>
                    <div className="relative">
                        <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            maxLength={20}
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                                darkMode 
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            disabled={isSubmitting}
                        />
                    </div>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        3-20 characters, letters, numbers, and underscores only
                    </p>
                </div>

                {error && (
                    <div className="flex items-center p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        {error}
                    </div>
                )}

                <div className="flex space-x-3">
                    <button
                        type="submit"
                        disabled={isSubmitting || !username.trim()}
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send className="h-5 w-5 mr-2" />
                                Submit Score
                            </>
                        )}
                    </button>
                    
                    <button
                        type="button"
                        onClick={handleSkip}
                        disabled={isSubmitting}
                        className={`px-6 py-3 font-semibold rounded-lg border transition-colors ${
                            darkMode 
                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        Skip
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ScoreSubmission;
