import React, { useContext } from 'react';
import { Github, UserRoundCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const AboutPage = () => {
    const { darkMode } = useContext(ThemeContext);
    
    const featuresCard = [
        {
            imgSrc: "/svg/voice-access-svgrepo-com.svg",
            title: "Voice-Based Word Challenges",
            desc: "Experience a unique way of learning with spoken word prompts. Listen carefully and let your ears lead the way."
        },
        {
            imgSrc: "/svg/index-svgrepo-com.svg",
            title: "Helpful Descriptive Clues",
            desc: "Each word is paired with a smart textual hint to guide your thinking — no guesswork, just clever clues."
        },
        {
            imgSrc: "/svg/supermemo-svgrepo-com.svg",
            title: "Gamified Learning Experience",
            desc: "Boost your vocabulary through interactive gameplay instead of boring memorization. Fun meets function."
        },
    ];

    return (
        <div className={`relative z-10 min-h-screen py-12 px-4 gap-y-10 flex flex-col pt-6 ${
            darkMode 
                ? "bg-gradient-to-br from-gray-900 to-blue-900" 
                : "bg-gradient-to-br from-slate-50 to-blue-50"
        }`}>
            {/* Hero Section */}
            <section className="max-w-5xl mx-auto flex flex-col gap-12">
                <div className="flex flex-col items-start md:items-center md:text-center">
                    <div className="flex items-center mb-6 group">
                        <img 
                            src="/icon.png" 
                            alt="Orthoplay Logo" 
                            className="mr-4 md:w-24 w-20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" 
                        />
                        <h1 className={`text-3xl sm:text-5xl font-bold tracking-tight transition-colors duration-300 group-hover:text-blue-600 ${
                            darkMode ? "text-gray-100" : "text-gray-900"
                        }`}>
                            About Orthoplay
                        </h1>
                    </div>
                    <p className={`text-sm sm:text-xl font-medium transition-colors duration-300 hover:text-blue-500 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                        A voice-powered word guessing game to make learning vocabulary fun.
                    </p>
                </div>

                {/* App Description */}
                <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10 md:gap-20">
                    <div className={`text-lg space-y-6 max-w-xl ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                        <p>
                            <strong>Orthoplay</strong> is an interactive, voice-based word learning game built to make vocabulary practice fun, engaging, and immersive.
                        </p>
                        <p>
                            Players are challenged with spoken words, each supported by descriptive text hints. The goal is to guess the word by identifying its length and gradually revealing its correct spelling through a smooth, game-like interaction.
                        </p>
                        <p>
                            Whether you're expanding your English vocabulary or simply enjoy word puzzles, Orthoplay transforms traditional learning into an enjoyable, voice-powered experience — perfect for learners, gamers, and curious minds alike.
                        </p>
                    </div>

                    <img
                        src="/svg/speaking-1.png"
                        alt="Voice-based gameplay illustration"
                        className="w-48 md:w-[25%] h-auto transition-transform duration-300 hover:scale-105"
                    />
                </div>
            </section>

            {/* Open Source Section */}
            <section className="max-w-5xl mx-auto flex flex-col gap-6 md:gap-10 mt-24 px-2">
                <div className="text-left md:text-center flex-col flex gap-y-4 ">
                    <h2 className={`text-3xl sm:text-5xl font-bold tracking-tight transition-colors duration-300 hover:text-blue-600 ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                    }`}>
                        Orthoplay is Free & Open-Source
                    </h2>

                    <p className={`text-sm sm:text-xl font-medium max-w-2xl mx-auto transition-colors duration-300 ${
                        darkMode 
                            ? "text-gray-300 hover:text-gray-200" 
                            : "text-gray-600 hover:text-gray-700"
                    }`}>
                        Orthoplay is proudly open-sourced under the <strong>AGPL-3.0 License</strong>.
                        You're welcome to explore the code, contribute new features, or fix issues to make it even better!
                    </p>
                </div>

                <p className={`text-center max-w-2xl mx-auto mb-6 transition-colors duration-300 ${
                    darkMode 
                        ? "text-gray-300 hover:text-gray-200" 
                        : "text-gray-700 hover:text-gray-800"
                }`}>
                    Whether you're just starting out or you're an experienced developer — your contributions matter.
                    Let's build a better learning game together. 🚀
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a
                        href="https://github.com/whyvineet/orthoplay"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 group hover:scale-105 ${
                            darkMode 
                                ? "bg-gray-800 hover:bg-gray-700 text-white" 
                                : "bg-black hover:bg-gray-800 text-white"
                        }`}
                    >
                        <Github size={20} className="transition-transform duration-300 group-hover:scale-110" />
                        Contribute on GitHub
                    </a>

                    <Link
                        to="/our-contributors"
                        className={`inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 group hover:scale-105 ${
                            darkMode 
                                ? "bg-blue-700 hover:bg-blue-600" 
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        <UserRoundCheck size={20} className="transition-transform duration-300 group-hover:scale-110" />
                        View Contributors
                    </Link>
                </div>
            </section>

            {/* Note: The features section is commented out in the original code, 
                 so I've kept it commented here as well */}
        </div>
    )
}

export default AboutPage;