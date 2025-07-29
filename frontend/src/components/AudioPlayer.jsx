import { Volume2, Play, Square, AlertCircle, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ttsService } from '../services/ttsService.js';

const AudioPlayer = ({ currentGame }) => {
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(false);
    const [isRetrying, setIsRetrying] = useState(false);
    const [currentVoice, setCurrentVoice] = useState(null);

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
            alert('Text-to-Speech is not supported in your browser');
            return;
        }

        if (!currentGame.word) {
            console.error('No word available for TTS. Current game:', currentGame);
            alert('Word not available for playback');
            return;
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
                    alert('Audio playback failed. Please try again.');
                }
            });
        } catch (error) {
            console.error('TTS error:', error);
            setIsPlayingAudio(false);
            alert('Failed to play audio. Please try again.');
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
    };    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                    <Volume2 className="h-6 w-6 mr-2 transition-transform duration-300 hover:scale-110" />
                    Listen to the word
                </h3>
                
                {speechSupported ? (
                    <div className="space-y-4">
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={playAudio}
                                disabled={isPlayingAudio || !currentGame.word}
                                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-2xl hover:bg-green-700 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg active:scale-95 group"
                            >
                                <Play className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                                {isPlayingAudio ? 'Playing...' : 'Play Word'}
                            </button>

                            <button
                                onClick={playSlowAudio}
                                disabled={isPlayingAudio || !currentGame.word}
                                className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-white text-lg font-semibold rounded-2xl hover:bg-yellow-600 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg active:scale-95 group"
                            >
                                <Play className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                                Play Slow
                            </button>

                            
                            {isPlayingAudio && (
                                <button
                                    onClick={stopAudio}
                                    className="inline-flex items-center justify-center px-6 py-4 bg-red-600 text-white text-lg font-semibold rounded-2xl hover:bg-red-700 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg active:scale-95 group"
                                >
                                    <Square className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                                    Stop
                                </button>
                            )}
                        </div>

                        {currentVoice && (
                            <p className="text-sm text-gray-600 transition-colors duration-300 hover:text-gray-700">
                                Voice: {currentVoice.name}
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-orange-600 text-sm flex items-center justify-center">
                            <AlertCircle className="h-4 w-4 mr-1 transition-transform duration-300 hover:scale-110" />
                            Text-to-Speech not supported in your browser
                        </p>
                        <button
                            onClick={handleRetry}
                            disabled={isRetrying}
                            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg active:scale-95 group"
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
