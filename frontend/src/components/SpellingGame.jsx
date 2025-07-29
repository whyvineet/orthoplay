import { useEffect, useRef, useState } from 'react';
import { Send, Eye } from 'lucide-react';

const SpellingGame = ({
    wordLength,
    currentGuess,
    setCurrentGuess,
    submitSpelling,
    revealAnswer,
    isLoading
}) => {
    const [guess, setGuess] = useState(() => {
        const initial = Array(wordLength).fill('');
        return currentGuess.length === wordLength
            ? currentGuess.split('')
            : initial;
    });

    const inputsRef = useRef([]);

    // Sync parent state
    useEffect(() => {
        setCurrentGuess(guess.join(''));
    }, [guess]);

    // Focus first input on load
    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    const focusInput = (index) => {
        if (inputsRef.current[index]) {
            inputsRef.current[index].focus();
        }
    };

    const handleChange = (e, index) => {
        const val = e.target.value.toUpperCase();

        if (/^[A-Z]$/.test(val)) {
            const newGuess = [...guess];
            newGuess[index] = val;
            setGuess(newGuess);

            if (index < wordLength - 1) {
                focusInput(index + 1);
            }
        } else if (val === '') {
            const newGuess = [...guess];
            newGuess[index] = '';
            setGuess(newGuess);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            e.preventDefault();

            const newGuess = [...guess];
            if (guess[index]) {
                newGuess[index] = '';
                setGuess(newGuess);
            } else if (index > 0) {
                newGuess[index - 1] = '';
                setGuess(newGuess);
                focusInput(index - 1);
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            focusInput(index - 1);
        } else if (e.key === 'ArrowRight' && index < wordLength - 1) {
            focusInput(index + 1);
        } else if (e.key === 'Enter' && !guess.includes('')) {
            (async () => {
                await submitSpelling(guess.join(''));
                const cleared = Array(wordLength).fill('');
                setGuess(cleared);
                setCurrentGuess('');
                setTimeout(() => {
                    inputsRef.current[0]?.focus();
                }, 0);
            })();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('Text').toUpperCase().replace(/[^A-Z]/g, '');
        const chars = pasteData.slice(0, wordLength).split('');

        if (chars.length) {
            const newGuess = [...guess];
            chars.forEach((ch, i) => {
                newGuess[i] = ch;
            });
            setGuess(newGuess);
            const nextIndex = chars.length < wordLength ? chars.length : wordLength - 1;
            focusInput(nextIndex);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Spell the word ({wordLength} letters)
            </h3>

            <div className="space-y-6">
                {/* Letter Grid */}
                <div className="flex justify-center mb-8">
                    <div className="flex flex-wrap justify-center gap-2">
                        {Array.from({ length: wordLength }).map((_, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputsRef.current[index] = el)}
                                value={guess[index]}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                type="text"
                                maxLength={1}
                                disabled={isLoading}
                                className="w-10 h-10 md:w-14 md:h-14 border-2 border-gray-300 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 text-center uppercase transition-all duration-200 hover:border-blue-400 hover:shadow-md hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={async () => {
                            await submitSpelling(currentGuess);

                            const cleared = Array(wordLength).fill('');
                            setGuess(cleared);
                            setCurrentGuess('');
                            setTimeout(() => {
                                inputsRef.current[0]?.focus();
                            }, 0);
                        }}
                        disabled={isLoading || guess.includes('')}
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md active:scale-95"
                    >
                        <Send className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                        {isLoading ? 'Checking...' : 'Submit'}
                    </button>


                    <button
                        onClick={revealAnswer}
                        disabled={isLoading}
                        className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md active:scale-95"
                    >
                        <Eye className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                        Give Up
                    </button>
                </div>

                <div className="text-center text-sm text-gray-600">
                    <p>Enter all {wordLength} letters and press Submit, or press Enter</p>
                </div>
            </div>
        </div>
    );
};

export default SpellingGame;
