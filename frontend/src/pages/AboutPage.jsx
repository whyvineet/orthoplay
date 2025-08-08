import React, { useContext, useState, useEffect } from 'react';
import { Github, UserRoundCheck, Mic, BookOpen, Gamepad2, Sparkles, Heart, Code, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { apiService } from '../services/apiService';

const AboutPage = () => {
    const { darkMode } = useContext(ThemeContext);
    const [stats, setStats] = useState({
        active_learners: 0,
        words_available: 0,
        total_games_played: 0,
        community_love: 0,
        open_source: 100
    });
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);
    
    const featuresCard = [
        {
            icon: Mic,
            title: "Voice-Based Word Challenges",
            desc: "Experience a unique way of learning with spoken word prompts. Listen carefully and let your ears lead the way.",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: BookOpen,
            title: "Helpful Descriptive Clues",
            desc: "Each word is paired with a smart textual hint to guide your thinking — no guesswork, just clever clues.",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: Gamepad2,
            title: "Gamified Learning Experience",
            desc: "Boost your vocabulary through interactive gameplay instead of boring memorization. Fun meets function.",
            gradient: "from-green-500 to-emerald-500"
        },
    ];

    // Fetch app statistics on component mount
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const appStats = await apiService.getAppStats();
                setStats(appStats);
                setLastUpdated(new Date());
            } catch (error) {
                console.error('Failed to fetch app stats:', error);
                // Keep default values if fetch fails
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Format numbers for display
    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k+';
        }
        return num.toString() + (num > 0 ? '+' : '');
    };

    const statsDisplay = [
        {
            icon: Users,
            label: "Active Learners",
            value: isLoading ? "..." : formatNumber(stats.active_learners),
            color: "text-blue-500",
            isLoading
        },
        {
            icon: BookOpen,
            label: "Words Available",
            value: isLoading ? "..." : formatNumber(stats.words_available),
            color: "text-green-500",
            isLoading
        },
        {
            icon: Heart,
            label: "Community Love",
            value: isLoading ? "..." : `${stats.community_love}%`,
            color: "text-red-500",
            isLoading
        },
        {
            icon: Code,
            label: "Open Source",
            value: "100%",
            color: "text-purple-500",
            isLoading: false
        }
    ];

    return (
        <div className={`relative min-h-screen overflow-hidden ${
            darkMode
                ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
                : "bg-gradient-to-br from-white via-blue-50 to-indigo-100"
        }`}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 animate-pulse ${
                    darkMode ? "bg-blue-500" : "bg-blue-300"
                }`}></div>
                <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 animate-pulse delay-1000 ${
                    darkMode ? "bg-purple-500" : "bg-purple-300"
                }`}></div>
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-5 animate-spin ${
                    darkMode ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-blue-400 to-purple-400"
                }`} style={{ animationDuration: '20s' }}></div>
            </div>

            <div className="relative z-10 py-12 px-4">
                {/* Hero Section */}
                <section className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="flex justify-center items-center mb-8 group">
                            <div className="relative">
                                <div className={`absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 ${
                                    darkMode ? "bg-blue-500" : "bg-blue-400"
                                }`}></div>
                                <img
                                    src="/icon.png"
                                    alt="Orthoplay Logo"
                                    className="w-20 h-20 md:w-28 md:h-28 relative transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 rounded-full"
                                />
                            </div>
                        </div>

                        <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent animate-fade-in ${
                            darkMode
                                ? "from-white via-blue-200 to-purple-200"
                                : "from-gray-900 via-blue-600 to-purple-600"
                        }`}>
                            About Orthoplay
                        </h1>

                        <div className="flex items-center justify-center gap-2 mb-8">
                            <Sparkles className={`w-6 h-6 ${darkMode ? "text-yellow-400" : "text-yellow-500"} animate-pulse`} />
                            <p className={`text-lg sm:text-2xl font-medium ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                            }`}>
                                A voice-powered word guessing game to make learning vocabulary fun
                            </p>
                            <Sparkles className={`w-6 h-6 ${darkMode ? "text-yellow-400" : "text-yellow-500"} animate-pulse delay-500`} />
                        </div>

                        {/* Last Updated Info */}
                        {lastUpdated && !isLoading && (
                            <div className={`text-center mb-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                <p className="text-sm">
                                    📊 Statistics updated: {lastUpdated.toLocaleTimeString()}
                                </p>
                            </div>
                        )}

                        {/* Stats Section */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                            {statsDisplay.map((stat, index) => (
                                <div key={index} className={`group p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                                    darkMode
                                        ? "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70"
                                        : "bg-white/70 border-gray-200 hover:bg-white/90"
                                }`}>
                                    <div className="relative">
                                        <stat.icon className={`w-8 h-8 mx-auto mb-3 transition-all duration-300 ${stat.color} ${
                                            stat.isLoading ? 'animate-pulse' : 'group-hover:scale-110'
                                        }`} />
                                        {!stat.isLoading && stat.label === "Active Learners" && (
                                            <TrendingUp className="w-4 h-4 absolute -top-1 -right-1 text-green-500 animate-pulse" />
                                        )}
                                    </div>
                                    <div className={`text-2xl font-bold mb-1 transition-all duration-300 ${
                                        darkMode ? "text-white" : "text-gray-900"
                                    } ${stat.isLoading ? 'animate-pulse' : ''}`}>
                                        {stat.value}
                                    </div>
                                    <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                        {stat.label}
                                    </div>
                                    {stat.label === "Active Learners" && !stat.isLoading && (
                                        <div className={`text-xs mt-1 ${darkMode ? "text-green-400" : "text-green-600"}`}>
                                            Growing daily!
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {featuresCard.map((feature, index) => (
                            <div key={index} className={`group p-8 rounded-3xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                                darkMode
                                    ? "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70"
                                    : "bg-white/70 border-gray-200 hover:bg-white/90"
                            }`}>
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                    {feature.title}
                                </h3>
                                <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} leading-relaxed`}>
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* App Description */}
                    <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12 lg:gap-20 mb-20">
                        <div className={`text-lg space-y-6 max-w-2xl ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                        }`}>
                            <div className={`p-6 rounded-2xl backdrop-blur-sm border ${
                                darkMode
                                    ? "bg-gray-800/30 border-gray-700"
                                    : "bg-white/50 border-gray-200"
                            }`}>
                                <p className="mb-4">
                                    <strong className={`${darkMode ? "text-blue-400" : "text-blue-600"}`}>Orthoplay</strong> is an interactive, voice-based word learning game built to make vocabulary practice fun, engaging, and immersive.
                                </p>
                                <p className="mb-4">
                                    Players are challenged with spoken words, each supported by descriptive text hints. The goal is to guess the word by identifying its length and gradually revealing its correct spelling through a smooth, game-like interaction.
                                </p>
                                <p>
                                    Whether you're expanding your English vocabulary or simply enjoy word puzzles, Orthoplay transforms traditional learning into an enjoyable, voice-powered experience — perfect for learners, gamers, and curious minds alike.
                                </p>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 ${
                                darkMode ? "bg-blue-500" : "bg-blue-400"
                            }`}></div>
                            <img
                                src="/svg/speaking-1.png"
                                alt="Voice-based gameplay illustration"
                                className="relative w-64 md:w-80 h-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                            />
                        </div>
                    </div>
                </section>

                {/* Open Source Section */}
                <section className="max-w-6xl mx-auto">
                    <div className={`relative p-12 rounded-3xl backdrop-blur-sm border overflow-hidden ${
                        darkMode
                            ? "bg-gradient-to-br from-gray-800/50 to-blue-900/30 border-gray-700"
                            : "bg-gradient-to-br from-white/70 to-blue-50/70 border-gray-200"
                    }`}>
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}></div>
                        </div>

                        <div className="relative text-center">
                            <div className="flex justify-center mb-8">
                                <div className={`p-4 rounded-2xl ${
                                    darkMode ? "bg-green-500/20" : "bg-green-500/10"
                                }`}>
                                    <Code className={`w-12 h-12 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                                </div>
                            </div>

                            <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r bg-clip-text text-transparent ${
                                darkMode
                                    ? "from-green-400 via-blue-400 to-purple-400"
                                    : "from-green-600 via-blue-600 to-purple-600"
                            }`}>
                                Free & Open-Source
                            </h2>

                            <div className="max-w-3xl mx-auto mb-8">
                                <p className={`text-lg sm:text-xl mb-6 ${
                                    darkMode ? "text-gray-300" : "text-gray-600"
                                }`}>
                                    Orthoplay is proudly open-sourced under the <span className={`font-bold px-2 py-1 rounded ${
                                        darkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-500/10 text-blue-600"
                                    }`}>AGPL-3.0 License</span>.
                                    You're welcome to explore the code, contribute new features, or fix issues to make it even better!
                                </p>

                                <p className={`text-lg mb-8 ${
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                }`}>
                                    Whether you're just starting out or you're an experienced developer — your contributions matter.
                                    Let's build a better learning game together. 🚀
                                </p>
                            </div>

                            {/* Enhanced Buttons */}
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                                <a
                                    href="https://github.com/whyvineet/orthoplay"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative inline-flex items-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl active:scale-95 hover:scale-105 overflow-hidden ${
                                        darkMode
                                            ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
                                            : "bg-black hover:bg-gray-800 text-white"
                                    }`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <Github size={24} className="relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                                    <span className="relative">Contribute on GitHub</span>
                                </a>

                                <Link
                                    to="/our-contributors"
                                    className={`group relative inline-flex items-center gap-3 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl active:scale-95 hover:scale-105 overflow-hidden ${
                                        darkMode
                                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                                            : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                                    }`}
                                >
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <UserRoundCheck size={24} className="relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                                    <span className="relative">View Contributors</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AboutPage;