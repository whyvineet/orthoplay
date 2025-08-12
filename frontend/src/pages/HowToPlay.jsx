import React, { useContext } from 'react';
import { Lightbulb, Volume2, SpellCheck, MousePointerClick, HelpCircle } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const HowToPlay = ({setGameState, startGame}) => {
    const { darkMode } = useContext(ThemeContext);
    const navigate = useNavigate()
    const demoGame = async() => {
        try {
            await startGame("demo");
            setGameState("demo");
            navigate("/");
        } catch (error) {
            console.log("Failed to start demo game: ", error);
        }
    }
    const steps = [
        {
            icon: <MousePointerClick className={darkMode ? "text-blue-400" : "text-blue-600"} size={28} />,
            title: "Start the Game",
            description: "Click on the 'Start Game' button to begin your vocabulary challenge."
        },
        {
            icon: <Volume2 className={darkMode ? "text-blue-400" : "text-blue-600"} size={28} />,
            title: "Listen to the Word",
            description: "Tap the 'Play Word' button to hear the word spoken aloud clearly."
        },
        {
            icon: <Lightbulb className={darkMode ? "text-blue-400" : "text-blue-600"} size={28} />,
            title: "Read the Hint",
            description: "A helpful text hint will appear to guide your thinking."
        },
        {
            icon: <SpellCheck className={darkMode ? "text-blue-400" : "text-blue-600"} size={28} />,
            title: "Guess Word Length",
            description: "Pick the correct number of letters from 3 given options."
        },
        {
            icon: <SpellCheck className={darkMode ? "text-blue-400" : "text-blue-600"} size={28} />,
            title: "Spell the Word",
            description: "Input boxes appear — start filling them out and submit your guess."
        },
        {
            icon: <HelpCircle className={darkMode ? "text-blue-400" : "text-blue-600"} size={28} />,
            title: "Track & Learn",
            description: "Review your attempts, use the color guide, and keep guessing or reveal the answer."
        }
    ];

    return (
        <div className={`relative z-10 min-h-screen pt-10 pb-20 px-4 flex flex-col ${
            darkMode 
                ? "bg-gradient-to-br from-gray-900 to-blue-900" 
                : "bg-gradient-to-br from-slate-50 to-blue-50"
        }`}>
            <section className="max-w-5xl mx-auto flex flex-col gap-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-4 mb-4 group">
                        <img 
                            src="/icon.png" 
                            alt="Orthoplay Logo" 
                            className="w-16 md:w-20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" 
                        />
                        <h1 className={`text-3xl sm:text-5xl font-bold tracking-tight transition-colors duration-300 group-hover:text-blue-600 ${
                            darkMode ? "text-gray-100" : "text-gray-900"
                        }`}>
                            How to Play Orthoplay
                        </h1>
                    </div>
                    <p className={`text-sm sm:text-xl font-medium max-w-xl transition-colors duration-300 hover:text-blue-500 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                        A fun and interactive voice-based game that builds your vocabulary through hints and challenges.
                    </p>
                </div>

                {/* Step-by-Step Guide */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] flex gap-4 group ${
                                darkMode
                                    ? "bg-gray-800 border border-gray-700 hover:border-blue-500 hover:bg-gray-700/70"
                                    : "bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                            }`}
                        >
                            <div className="shrink-0">
                                <div className={`p-2 rounded-full transition-all duration-300 group-hover:scale-110 ${
                                    darkMode 
                                        ? "bg-blue-900/50 group-hover:bg-blue-800/70" 
                                        : "bg-blue-100 group-hover:bg-blue-200"
                                }`}>{step.icon}</div>
                            </div>
                            <div>
                                <h3 className={`text-xl font-semibold mb-1 transition-colors duration-300 group-hover:text-blue-600 ${
                                    darkMode ? "text-gray-100" : "text-gray-900"
                                }`}>
                                    Step {index + 1}: {step.title}
                                </h3>
                                <p className={`transition-colors duration-300 ${
                                    darkMode 
                                        ? "text-gray-300 group-hover:text-gray-200" 
                                        : "text-gray-700 group-hover:text-gray-800"
                                }`}>{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={demoGame}
                    className={`inline-flex items-center justify-center px-8 py-4 text-white text-lg font-semibold rounded-2xl hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg active:scale-95 min-w-48 group ${
                        darkMode 
                        ? "bg-blue-700 hover:bg-blue-600" 
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    >
                        Try Demo Round
                    </button>
                {/* Color Guide */}
                <div>
                    <h3 className={`text-2xl font-bold mb-6 text-center transition-colors duration-300 hover:text-blue-600 ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                    }`}>
                        🎨 Color Guide
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className={`rounded-xl p-4 flex flex-col items-start shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group ${
                            darkMode
                                ? "bg-green-900/20 border border-green-800"
                                : "bg-green-50 border border-green-200"
                        }`}>
                            <span className={`text-2xl font-bold transition-transform duration-300 group-hover:scale-110 ${
                                darkMode ? "text-green-400" : "text-green-600"
                            }`}>🟩 Correct</span>
                            <p className={`mt-2 text-sm transition-colors duration-300 ${
                                darkMode 
                                    ? "text-gray-300 group-hover:text-gray-200" 
                                    : "text-gray-700 group-hover:text-gray-800"
                            }`}>Right letter in the correct spot.</p>
                        </div>

                        <div className={`rounded-xl p-4 flex flex-col items-start shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group ${
                            darkMode
                                ? "bg-yellow-900/20 border border-yellow-800"
                                : "bg-yellow-50 border border-yellow-200"
                        }`}>
                            <span className={`text-2xl font-bold transition-transform duration-300 group-hover:scale-110 ${
                                darkMode ? "text-yellow-400" : "text-yellow-500"
                            }`}>🟨 Misplaced</span>
                            <p className={`mt-2 text-sm transition-colors duration-300 ${
                                darkMode 
                                    ? "text-gray-300 group-hover:text-gray-200" 
                                    : "text-gray-700 group-hover:text-gray-800"
                            }`}>Right letter, but in the wrong spot.</p>
                        </div>

                        <div className={`rounded-xl p-4 flex flex-col items-start shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group ${
                            darkMode
                                ? "bg-gray-800 border border-gray-700"
                                : "bg-gray-100 border border-gray-300"
                        }`}>
                            <span className={`text-2xl font-bold transition-transform duration-300 group-hover:scale-110 ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                            }`}>⬜ Incorrect</span>
                            <p className={`mt-2 text-sm transition-colors duration-300 ${
                                darkMode 
                                    ? "text-gray-300 group-hover:text-gray-200" 
                                    : "text-gray-700 group-hover:text-gray-800"
                            }`}>Letter is not in the word.</p>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default HowToPlay;