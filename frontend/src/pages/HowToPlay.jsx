import React from 'react';
import { Lightbulb, Volume2, SpellCheck, MousePointerClick, HelpCircle } from 'lucide-react';

const steps = [
    {
        icon: <MousePointerClick className="text-blue-600" size={28} />,
        title: "Start the Game",
        description: "Click on the 'Start Game' button to begin your vocabulary challenge."
    },
    {
        icon: <Volume2 className="text-blue-600" size={28} />,
        title: "Listen to the Word",
        description: "Tap the 'Play Word' button to hear the word spoken aloud clearly."
    },
    {
        icon: <Lightbulb className="text-blue-600" size={28} />,
        title: "Read the Hint",
        description: "A helpful text hint will appear to guide your thinking."
    },
    {
        icon: <SpellCheck className="text-blue-600" size={28} />,
        title: "Guess Word Length",
        description: "Pick the correct number of letters from 3 given options."
    },
    {
        icon: <SpellCheck className="text-blue-600" size={28} />,
        title: "Spell the Word",
        description: "Input boxes appear — start filling them out and submit your guess."
    },
    {
        icon: <HelpCircle className="text-blue-600" size={28} />,
        title: "Track & Learn",
        description: "Review your attempts, use the color guide, and keep guessing or reveal the answer."
    }
];

const HowToPlay = () => {
    return (
        <div className="relative z-10 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-10 pb-20 px-4 flex flex-col">
            <section className="max-w-5xl mx-auto flex flex-col gap-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-4 mb-4">
                        <img src="/icon.png" alt="Orthoplay Logo" className="w-16 md:w-20" />
                        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                            How to Play Orthoplay
                        </h1>
                    </div>
                    <p className="text-sm sm:text-xl text-gray-600 font-medium max-w-xl">
                        A fun and interactive voice-based game that builds your vocabulary through hints and challenges.
                    </p>
                </div>

                {/* Step-by-Step Guide */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:bg-blue-50 flex gap-4"
                        >
                            <div className="shrink-0">
                                <div className="p-2 rounded-full bg-blue-100">{step.icon}</div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                    Step {index + 1}: {step.title}
                                </h3>
                                <p className="text-gray-700">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Color Guide */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        🎨 Color Guide
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col items-start shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                            <span className="text-2xl font-bold text-green-600">🟩 Correct</span>
                            <p className="text-gray-700 mt-2 text-sm">Right letter in the correct spot.</p>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex flex-col items-start shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                            <span className="text-2xl font-bold text-yellow-500">🟨 Misplaced</span>
                            <p className="text-gray-700 mt-2 text-sm">Right letter, but in the wrong spot.</p>
                        </div>

                        <div className="bg-gray-100 border border-gray-300 rounded-xl p-4 flex flex-col items-start shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                            <span className="text-2xl font-bold text-gray-600">⬜ Incorrect</span>
                            <p className="text-gray-700 mt-2 text-sm">Letter is not in the word.</p>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default HowToPlay;
