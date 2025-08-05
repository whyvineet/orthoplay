import React, { useState, useEffect, useContext } from 'react';
import { Trophy, Medal, Award, Clock, Target, Lightbulb, User, RefreshCw, Filter, ArrowUpDown, Crown, Star, Zap, TrendingUp } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { apiService } from '../services/apiService';

const Leaderboard = () => {
    const { darkMode } = useContext(ThemeContext);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userStats, setUserStats] = useState(null);
    const [username, setUsername] = useState('');
    const [timeFilter, setTimeFilter] = useState('all');
    const [sortBy, setSortBy] = useState('score');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        fetchLeaderboard();
    }, [timeFilter, sortBy, sortOrder]);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await apiService.getLeaderboard({
                timeFilter,
                sortBy,
                sortOrder
            });
            setLeaderboardData(data.entries || []);
        } catch (err) {
            setError('Failed to load leaderboard');
            console.error('Error fetching leaderboard:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserStats = async () => {
        if (!username.trim()) return;
        
        try {
            const stats = await apiService.getUserStats(username.trim());
            setUserStats(stats);
        } catch (err) {
            setUserStats(null);
            console.error('Error fetching user stats:', err);
        }
    };

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return (
                    <div className="relative">
                        <Crown className="h-8 w-8 text-yellow-500 drop-shadow-lg animate-pulse" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                    </div>
                );
            case 2:
                return (
                    <div className="relative">
                        <Trophy className="h-7 w-7 text-gray-400 drop-shadow-md" />
                        <Star className="absolute -top-1 -right-1 h-3 w-3 text-gray-300" />
                    </div>
                );
            case 3:
                return (
                    <div className="relative">
                        <Medal className="h-6 w-6 text-amber-600 drop-shadow-md" />
                        <Zap className="absolute -top-1 -right-1 h-3 w-3 text-amber-500" />
                    </div>
                );
            default:
                return (
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm border-2 ${
                        darkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-300'
                            : 'bg-gray-100 border-gray-300 text-gray-600'
                    }`}>
                        {rank}
                    </div>
                );
        }
    };

    const formatTime = (seconds) => {
        if (seconds < 60) {
            return `${seconds.toFixed(1)}s`;
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = (seconds % 60).toFixed(1);
        return `${minutes}m ${remainingSeconds}s`;
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className={`min-h-screen pt-20 ${
                darkMode
                    ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
                    : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
            }`}>
                <div className="container mx-auto px-4">
                    <div className="flex flex-col justify-center items-center h-64">
                        <div className="relative">
                            <div className={`w-16 h-16 rounded-full border-4 border-t-transparent animate-spin ${
                                darkMode ? 'border-blue-400' : 'border-blue-600'
                            }`}></div>
                            <Trophy className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 ${
                                darkMode ? 'text-blue-400' : 'text-blue-600'
                            }`} />
                        </div>
                        <div className="mt-6 text-center">
                            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Loading Champions
                            </h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Fetching the best spelling masters...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen pt-20 ${
            darkMode
                ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
                : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}>
            <div className="container mx-auto px-4 pb-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="relative inline-block">
                        <h1 className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${
                            darkMode
                                ? 'from-yellow-400 via-orange-500 to-red-500'
                                : 'from-blue-600 via-purple-600 to-indigo-600'
                        } bg-clip-text text-transparent animate-pulse`}>
                            Champions Hall
                        </h1>
                        <div className="absolute -top-2 -right-2">
                            <Crown className="h-8 w-8 text-yellow-500 animate-bounce" />
                        </div>
                    </div>
                    <p className={`text-xl font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Where spelling legends are born
                    </p>
                    <div className="mt-4 flex justify-center">
                        <div className={`px-6 py-2 rounded-full ${
                            darkMode
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                                : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                        } text-white font-semibold shadow-lg`}>
                            <TrendingUp className="inline h-4 w-4 mr-2" />
                            Live Rankings
                        </div>
                    </div>
                </div>

                {/* Filter Controls */}
                <div className={`max-w-5xl mx-auto mb-8 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border ${
                    darkMode
                        ? 'bg-gray-800/80 border-gray-700/50'
                        : 'bg-white/80 border-gray-200/50'
                }`}>
                    <div className="flex flex-wrap gap-6 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                                darkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                            }`}>
                                <Filter className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                            </div>
                            <span className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Filter & Sort
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {/* Time Filter */}
                            <div className="relative">
                                <select
                                    value={timeFilter}
                                    onChange={(e) => setTimeFilter(e.target.value)}
                                    className={`px-4 py-3 rounded-xl border-2 text-sm font-medium appearance-none cursor-pointer transition-all duration-200 ${
                                        darkMode
                                            ? 'bg-gray-700/50 border-gray-600 text-white hover:bg-gray-700 focus:border-blue-500'
                                            : 'bg-white/70 border-gray-300 text-gray-900 hover:bg-white focus:border-blue-500'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-lg hover:shadow-xl`}
                                >
                                    <option value="all">🌟 All Time</option>
                                    <option value="daily">⚡ Last 24 Hours</option>
                                    <option value="weekly">📅 Last Week</option>
                                    <option value="monthly">📊 Last Month</option>
                                </select>
                            </div>

                            {/* Sort By */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className={`px-4 py-3 rounded-xl border-2 text-sm font-medium appearance-none cursor-pointer transition-all duration-200 ${
                                        darkMode
                                            ? 'bg-gray-700/50 border-gray-600 text-white hover:bg-gray-700 focus:border-purple-500'
                                            : 'bg-white/70 border-gray-300 text-gray-900 hover:bg-white focus:border-purple-500'
                                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-lg hover:shadow-xl`}
                                >
                                    <option value="score">🏆 Score</option>
                                    <option value="attempts">🎯 Attempts</option>
                                    <option value="completion_time">⏱️ Time</option>
                                    <option value="timestamp">📅 Date</option>
                                </select>
                            </div>

                            {/* Sort Order */}
                            <button
                                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                                className={`px-4 py-3 rounded-xl border-2 text-sm font-medium flex items-center gap-2 transition-all duration-200 transform hover:scale-105 ${
                                    darkMode
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-500 text-white hover:from-indigo-500 hover:to-purple-500'
                                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 border-indigo-400 text-white hover:from-indigo-400 hover:to-purple-400'
                                } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-lg hover:shadow-xl`}
                            >
                                <ArrowUpDown className="h-4 w-4" />
                                {sortOrder === 'desc' ? '↓ High to Low' : '↑ Low to High'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* User Stats Section */}
                <div className={`max-w-lg mx-auto mb-10 p-8 rounded-2xl shadow-2xl backdrop-blur-sm border ${
                    darkMode
                        ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700/50'
                        : 'bg-gradient-to-br from-white/90 to-gray-50/90 border-gray-200/50'
                }`}>
                    <div className="text-center mb-6">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                            darkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                        }`}>
                            <User className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Your Performance
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Track your spelling journey
                        </p>
                    </div>

                    <div className="flex gap-3 mb-6">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && fetchUserStats()}
                                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                                    darkMode
                                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                                        : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-lg`}
                            />
                        </div>
                        <button
                            onClick={fetchUserStats}
                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                                darkMode
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'
                                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400'
                            } text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        >
                            <User className="h-5 w-5" />
                        </button>
                    </div>
                    
                    {userStats && (
                        <div className={`p-6 rounded-xl border-2 ${
                            darkMode
                                ? 'bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-700/50'
                                : 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200'
                        }`}>
                            <div className="text-center mb-4">
                                <h4 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    🎯 {userStats.username}
                                </h4>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Spelling Statistics
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`text-center p-3 rounded-lg ${
                                    darkMode ? 'bg-gray-800/50' : 'bg-white/70'
                                }`}>
                                    <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                        {userStats.total_games}
                                    </div>
                                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Games Played
                                    </div>
                                </div>
                                <div className={`text-center p-3 rounded-lg ${
                                    darkMode ? 'bg-gray-800/50' : 'bg-white/70'
                                }`}>
                                    <div className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                        {userStats.best_score}
                                    </div>
                                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Best Score
                                    </div>
                                </div>
                                <div className={`text-center p-3 rounded-lg ${
                                    darkMode ? 'bg-gray-800/50' : 'bg-white/70'
                                }`}>
                                    <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                                        {userStats.average_score}
                                    </div>
                                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Avg Score
                                    </div>
                                </div>
                                <div className={`text-center p-3 rounded-lg ${
                                    darkMode ? 'bg-gray-800/50' : 'bg-white/70'
                                }`}>
                                    <div className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                                        {formatTime(userStats.average_completion_time)}
                                    </div>
                                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Avg Time
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className={`max-w-2xl mx-auto mb-8 p-6 rounded-2xl border-2 ${
                        darkMode
                            ? 'bg-red-900/20 border-red-700/50 text-red-400'
                            : 'bg-red-50 border-red-200 text-red-700'
                    } shadow-lg`}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${
                                darkMode ? 'bg-red-800/30' : 'bg-red-100'
                            }`}>
                                <RefreshCw className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold">Oops! Something went wrong</p>
                                <p className="text-sm opacity-80">{error}</p>
                            </div>
                        </div>
                        <button
                            onClick={fetchLeaderboard}
                            className={`mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                                darkMode
                                    ? 'bg-red-700 hover:bg-red-600 text-white'
                                    : 'bg-red-600 hover:bg-red-700 text-white'
                            }`}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Leaderboard Table */}
                <div className={`max-w-6xl mx-auto rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm border-2 ${
                    darkMode
                        ? 'bg-gray-800/90 border-gray-700/50'
                        : 'bg-white/90 border-gray-200/50'
                }`}>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className={`${
                                darkMode
                                    ? 'bg-gradient-to-r from-gray-700 to-gray-800'
                                    : 'bg-gradient-to-r from-gray-50 to-gray-100'
                            }`}>
                                <tr>
                                    <th className={`px-8 py-6 text-left text-sm font-bold uppercase tracking-wider ${
                                        darkMode ? 'text-gray-200' : 'text-gray-800'
                                    }`}>
                                        <div className="flex items-center gap-2">
                                            <Trophy className="h-4 w-4" />
                                            Rank
                                        </div>
                                    </th>
                                    <th className={`px-8 py-6 text-left text-sm font-bold uppercase tracking-wider ${
                                        darkMode ? 'text-gray-200' : 'text-gray-800'
                                    }`}>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            Champion
                                        </div>
                                    </th>
                                    <th className={`px-8 py-6 text-left text-sm font-bold uppercase tracking-wider ${
                                        darkMode ? 'text-gray-200' : 'text-gray-800'
                                    }`}>
                                        <div className="flex items-center gap-2">
                                            <Star className="h-4 w-4" />
                                            Word
                                        </div>
                                    </th>
                                    <th className={`px-8 py-6 text-left text-sm font-bold uppercase tracking-wider ${
                                        darkMode ? 'text-gray-200' : 'text-gray-800'
                                    }`}>
                                        <div className="flex items-center gap-2">
                                            <Zap className="h-4 w-4" />
                                            Score
                                        </div>
                                    </th>
                                    <th className={`px-8 py-6 text-left text-sm font-bold uppercase tracking-wider ${
                                        darkMode ? 'text-gray-200' : 'text-gray-800'
                                    }`}>
                                        <div className="flex items-center gap-2">
                                            <Target className="h-4 w-4" />
                                            Performance
                                        </div>
                                    </th>
                                    <th className={`px-8 py-6 text-left text-sm font-bold uppercase tracking-wider ${
                                        darkMode ? 'text-gray-200' : 'text-gray-800'
                                    }`}>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            Date
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${darkMode ? 'divide-gray-700/50' : 'divide-gray-200/50'}`}>
                                {leaderboardData.map((entry, index) => {
                                    const rank = index + 1;
                                    const isTopThree = rank <= 3;

                                    return (
                                        <tr
                                            key={index}
                                            className={`group transition-all duration-300 hover:scale-[1.02] ${
                                                isTopThree
                                                    ? darkMode
                                                        ? 'bg-gradient-to-r from-yellow-900/20 via-gray-800 to-yellow-900/20 hover:from-yellow-900/30 hover:to-yellow-900/30'
                                                        : 'bg-gradient-to-r from-yellow-50 via-white to-yellow-50 hover:from-yellow-100 hover:to-yellow-100'
                                                    : darkMode
                                                        ? 'hover:bg-gray-700/50'
                                                        : 'hover:bg-gray-50/80'
                                            } ${isTopThree ? 'border-l-4 border-l-yellow-500' : ''}`}
                                        >
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="flex items-center justify-center">
                                                    {getRankIcon(rank)}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                                                        darkMode
                                                            ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                                                            : 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                                                    } shadow-lg`}>
                                                        {entry.username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className={`font-bold text-lg ${
                                                            darkMode ? 'text-white' : 'text-gray-900'
                                                        }`}>
                                                            {entry.username}
                                                        </div>
                                                        {isTopThree && (
                                                            <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                                                                🏆 Hall of Fame
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className={`inline-flex items-center px-4 py-2 rounded-full font-mono font-bold text-sm shadow-lg ${
                                                    darkMode
                                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                                                }`}>
                                                    ✨ {entry.word.toUpperCase()}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="text-center">
                                                    <div className={`text-3xl font-black ${
                                                        isTopThree
                                                            ? 'text-yellow-500 animate-pulse'
                                                            : darkMode
                                                                ? 'text-blue-400'
                                                                : 'text-blue-600'
                                                    }`}>
                                                        {entry.score}
                                                    </div>
                                                    <div className={`text-xs font-medium ${
                                                        darkMode ? 'text-gray-400' : 'text-gray-600'
                                                    }`}>
                                                        points
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="flex flex-wrap gap-2">
                                                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                                        darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                                                    }`}>
                                                        <Target className="h-3 w-3" />
                                                        {entry.attempts} tries
                                                    </div>
                                                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                                        darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        <Lightbulb className="h-3 w-3" />
                                                        {entry.hints_used} hints
                                                    </div>
                                                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                                        darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                        <Clock className="h-3 w-3" />
                                                        {formatTime(entry.completion_time)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={`px-8 py-6 whitespace-nowrap text-sm font-medium ${
                                                darkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                {formatDate(entry.timestamp)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    
                    {leaderboardData.length === 0 && !loading && (
                        <div className="text-center py-20">
                            <div className="relative inline-block mb-8">
                                <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                                    darkMode
                                        ? 'bg-gradient-to-br from-gray-700 to-gray-800'
                                        : 'bg-gradient-to-br from-gray-100 to-gray-200'
                                } shadow-2xl`}>
                                    <Trophy className={`h-12 w-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
                                    <Star className="h-4 w-4 text-white" />
                                </div>
                            </div>
                            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                The Hall of Fame Awaits!
                            </h3>
                            <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                No champions yet. Be the first to claim your throne!
                            </p>
                            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium ${
                                darkMode
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                            } shadow-lg`}>
                                <Zap className="h-4 w-4" />
                                Start Playing to Join!
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
