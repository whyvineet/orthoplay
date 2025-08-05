import { Volume2, Play, Square, AlertCircle, RefreshCw } from 'lucide-react';
import { useState, useEffect, useContext } from 'react';
import { ttsService } from '../services/ttsService.js';
import { toast } from 'react-toastify';
import { ThemeContext } from '../context/ThemeContext';

const AudioPlayer = ({ currentGame }) => {
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(false);
    const [isRetrying, setIsRetrying] = useState(false);
    const [currentVoice, setCurrentVoice] = useState(null);
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        const initializeTts = async () => {
            try {
                await ttsService.initialize();
                setSpeechSupported(ttsService.isSupported);
                
                const bestVoice = ttsService.getBestVoice();
                setCurrentVoice(bestVoice);
                console.log('TTS ready with voice:', bestVoice?.name);
            } catch (error) {
                console.error('TTS initialization failed:', error);
                setSpeechSupported(false);
            }
        };

        initializeTts();
    }, []);

    const playAudio = async () => {
        if (!speechSupported) {
            return toast.warn('Text-to-Speech is not supported in your browser');
        }

        if (!currentGame.word) {
            console.error('No word available for TTS. Current game:', currentGame);
            return toast.error('Word not available for playback');
        }

        console.log('Playing word:', currentGame.word);

        try {
            await ttsService.speak(currentGame.word, {
                rate: 0.7,
                onStart: () => setIsPlayingAudio(true),
                onEnd: () => setIsPlayingAudio(false),
                onError: (error) => {
                    console.error('TTS error:', error);
                    setIsPlayingAudio(false);
                    toast.error('Audio playback failed. Please try again.');
                }
            });
        } catch (error) {
            console.error('TTS error:', error);
            setIsPlayingAudio(false);
            toast.error('Failed to play audio. Please try again.');
        }
    };

    const playSlowAudio = async () => {
        if (!speechSupported) {
            alert('Text-to-Speech is not supported in your browser');
            return;
        }

        if (!currentGame.word) {
            console.error('No word available for TTS. Current game:', currentGame);
            alert('Word not available for playback');
            return;
        }

        console.log('Playing word slowly:', currentGame.word);

        try {
            await ttsService.speak(currentGame.word, {
                rate: 0.1, // slowed speech
                onStart: () => setIsPlayingAudio(true),
                onEnd: () => setIsPlayingAudio(false),
                onError: (error) => {
                    console.error('TTS error (slow):', error);
                    setIsPlayingAudio(false);
                    alert('Slow playback failed. Please try again.');
                }
            });
        } catch (error) {
            console.error('TTS error (slow):', error);
            setIsPlayingAudio(false);
            alert('Failed to play audio slowly. Please try again.');
        }
    };

    const stopAudio = () => {
        ttsService.stop();
        setIsPlayingAudio(false);
    };

    const handleRetry = () => {
        setIsRetrying(true);

        // Wait a moment and try again
        setTimeout(() => {
            playAudio();
            setIsRetrying(false);
        }, 500);
    };    
    
    return (
        <div className={`rounded-3xl shadow-lg p-8 transition-shadow duration-300 hover:shadow-xl ${
            darkMode 
                ? "bg-gray-800 border border-gray-700" 
                : "bg-white border border-gray-100"
        }`}>
            <div className="text-center">
                <h3 className={`text-2xl font-bold mb-6 flex items-center justify-center ${
                    darkMode ? "text-gray-100" : "text-gray-900"
                }`}>
                    <Volume2 className={`h-6 w-6 mr-2 transition-transform duration-300 hover:scale-110 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                    }`} />
                    Listen to the word
                </h3>
                
                {speechSupported ? (
                    <div className="space-y-4">
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={playAudio}
                                disabled={isPlayingAudio || !currentGame.word}
                                className={`inline-flex items-center justify-center px-8 py-4 text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg active:scale-95 group hover:scale-105 hover:shadow-xl ${
                                    darkMode 
                                        ? "bg-green-700 hover:bg-green-600" 
                                        : "bg-green-600 hover:bg-green-700"
                                }`}
                            >
                                <Play className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                                {isPlayingAudio ? 'Playing...' : 'Play Word'}
                            </button>

                            <button
                                onClick={playSlowAudio}
                                disabled={isPlayingAudio || !currentGame.word}
                                className={`inline-flex items-center justify-center px-8 py-4 text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg active:scale-95 group hover:scale-105 hover:shadow-xl ${
                                    darkMode 
                                        ? "bg-yellow-600 hover:bg-yellow-500" 
                                        : "bg-yellow-500 hover:bg-yellow-600"
                                }`}
                            >
                                <Play className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                                Play Slow
                            </button>

                            
                            {isPlayingAudio && (
                                <button
                                    onClick={stopAudio}
                                    className={`inline-flex items-center justify-center px-6 py-4 text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg active:scale-95 group hover:scale-105 hover:shadow-xl ${
                                        darkMode 
                                            ? "bg-red-700 hover:bg-red-600" 
                                            : "bg-red-600 hover:bg-red-700"
                                    }`}
                                >
                                    <Square className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                                    Stop
                                </button>
                            )}
                        </div>

                        {currentVoice && (
                            <p className={`text-sm transition-colors duration-300 ${
                                darkMode 
                                    ? "text-gray-400 hover:text-gray-300" 
                                    : "text-gray-600 hover:text-gray-700"
                            }`}>
                                Voice: {currentVoice.name}
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className={`text-sm flex items-center justify-center ${
                            darkMode ? "text-orange-400" : "text-orange-600"
                        }`}>
                            <AlertCircle className="h-4 w-4 mr-1 transition-transform duration-300 hover:scale-110" />
                            Text-to-Speech not supported in your browser
                        </p>
                        <button
                            onClick={handleRetry}
                            disabled={isRetrying}
                            className={`inline-flex items-center justify-center px-6 py-3 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg active:scale-95 group hover:scale-105 hover:shadow-xl ${
                                darkMode 
                                    ? "bg-blue-700 hover:bg-blue-600" 
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110 ${isRetrying ? 'animate-spin' : ''}`} />
                            {isRetrying ? 'Checking...' : 'Try Again'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AudioPlayer;