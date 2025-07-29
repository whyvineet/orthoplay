import { Github, UserRoundCheck } from 'lucide-react';
import { Link } from 'react-router-dom'
import ProgressChart from '../components/ProgressChart';
import PlanGenerator from '../components/PlanGenerator';
import VoiceGuideToggle from '../components/VoiceGuideToggle';
import { useState, useEffect } from 'react';
import { getProgress, addProgressEntry } from '../utils/progress';

const AboutPage = () => {
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
        <div className="relative z-10 min-h-screen bg-gradient-to-br pt-6 from-slate-50 to-blue-50 py-12 px-4 gap-y-10 flex flex-col">
            {/* Hero Section */}
            <section className="max-w-5xl mx-auto flex flex-col gap-12">
                <div className="flex flex-col items-start md:items-center md:text-center">
                    <div className="flex items-center mb-6">
                        <img src="/icon.png" alt="Orthoplay Logo" className="mr-4 md:w-24 w-20" />
                        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                            About Orthoplay
                        </h1>
                    </div>
                    <p className="text-sm sm:text-xl text-gray-600 font-medium">
                        A voice-powered word guessing game to make learning vocabulary fun.
                    </p>
                </div>

                {/* App Description */}
                <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10 md:gap-20">
                    <div className="text-gray-700 text-lg space-y-6 max-w-xl">
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
                        className="w-48 md:w-[25%] h-auto"
                    />
                </div>
            </section>

            {/* Open Source Section */}
            <section className="max-w-5xl mx-auto flex flex-col gap-6 md:gap-10 mt-24 px-2">
                <div className="text-left md:text-center flex-col flex gap-y-4 ">
                    <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                        Orthoplay is Free & Open-Source
                    </h2>

                    <p className="text-sm sm:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
                        Orthoplay is proudly open-sourced under the <strong>AGPL-3.0 License</strong>.
                        You’re welcome to explore the code, contribute new features, or fix issues to make it even better!
                    </p>
                </div>

                <p className="text-gray-700 text-center max-w-2xl mx-auto mb-6">
                    Whether you're just starting out or you're an experienced developer — your contributions matter.
                    Let’s build a better learning game together. 🚀
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a
                        href="https://github.com/whyvineet/orthoplay"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 hover:scale-105 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md"
                    >
                        <Github size={20} />
                        Contribute on GitHub
                    </a>

                    <Link
                        href="/our-contributors"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md"
                    >
                        <UserRoundCheck size={20} />
                        View Contributors
                    </Link>
                </div>
            </section>

            {/* Feature Preview Section */}
            <section className="max-w-5xl mx-auto flex flex-col gap-8 mt-24 px-2">
                <h2 className="text-2xl font-bold mb-4">Feature Preview: Rehab Tools</h2>
                {/* Progress Tracker Demo */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Patient Progress Tracker</h3>
                    <DemoProgressTracker />
                </div>
                {/* Plan Generator Demo */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Personalized Exercise Plan Generator</h3>
                    <PlanGenerator />
                </div>
                {/* Voice Guide Demo */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Voice-Guided Exercise Mode</h3>
                    <VoiceGuideToggle />
                </div>
            </section>


            {/* <section className="flex flex-col justify-center items-center mx-4 md:mx-20 gap-4 md:gap-10 ">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Features That Set Us Apart
                    </h2>

                    <div className="text-center mb-4 tracking-tight text-sm sm:text-xl text-gray-600 font-medium">
                        Voice-powered learning meets playful design — everything you need to sharpen your vocabulary, one word at a time.
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresCard.map((feature) => (
                        <div className="p-4 hover:bg-blue-50 hover:cursor-pointer transition-all hover:scale-105  flex flex-col gap-y-2 hover:border-blue-500 border-2 rounded-lg shadow-sm hover:shadow-lg " key={feature.title}>
                            <img
                                className="size-24"
                                src={feature.imgSrc}
                                loading="lazy"
                            />
                            <h3 className="font-bold text-2xl ">{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section> */}


        </div>
    )
}

// DemoProgressTracker component for AboutPage only
function DemoProgressTracker() {
    const [progress, setProgress] = useState([]);
    useEffect(() => {
        setProgress(getProgress());
    }, []);
    // For demo: add a random entry for today
    const addToday = () => {
        const today = new Date().toISOString().slice(0, 10);
        const completed = Math.floor(Math.random() * 6);
        addProgressEntry(today, completed);
        setProgress(getProgress());
    };
    return (
        <div>
            <button onClick={addToday} className="mb-2 px-4 py-2 bg-blue-500 text-white rounded">Add Random Progress for Today</button>
            <ProgressChart progressData={progress.slice(-7)} />
        </div>
    );
}

export default AboutPage;
