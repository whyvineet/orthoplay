import { Github } from 'lucide-react';

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
        <div className="relative z-10 min-h-screen bg-gradient-to-br pt-6 bg-white py-12 px-4">
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
                <div className="text-left md:text-center">
                    <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Orthoplay is Free & Open-Source
                    </h2>

                    <p className="text-sm sm:text-xl text-gray-600 font-medium mb-4 max-w-2xl mx-auto">
                        This project is proudly part of <strong>GirlScript Summer of Code (GSSoC) 2025</strong>. We're building in public — and you're invited to be a part of it.
                    </p>
                </div>

                {/* GSSoC Logo */}
                <div className="flex justify-center">
                    <img
                        src="/svg/gssoc-2025-logo.png"
                        alt="GSSoC 2025 Logo"
                        className="w-36 sm:w-48 mb-2"
                        loading="lazy"
                    />
                </div>

                <p className="text-gray-700 text-center max-w-2xl mx-auto mb-6">
                    Whether you're a beginner or a seasoned developer, your contributions are welcome! Improve gameplay, fix bugs, suggest new ideas — and grow with us. 🌱
                </p>

                <div className="flex justify-center">
                    <a
                        href="https://github.com/whyvineet/orthoplay"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 hover:scale-105 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md"
                    >
                        <Github size={20} />
                        Contribute on GitHub
                    </a>
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

export default AboutPage;
