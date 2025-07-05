import { Volume2, Play, AlertCircle } from 'lucide-react';

const AudioPlayer = ({ currentGame, isPlayingAudio, playAudio }) => {
    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                    <Volume2 className="h-6 w-6 mr-2" />
                    Listen to the word
                </h3>
                <button
                    onClick={() => playAudio()}
                    disabled={!currentGame.audioData || isPlayingAudio}
                    className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-2xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Play className="h-5 w-5 mr-2" />
                    {isPlayingAudio ? 'Playing...' : 'Play Word'}
                </button>
                {!currentGame.audioData && (
                    <p className="mt-4 text-orange-600 text-sm flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Audio not available - TTS may have failed
                    </p>
                )}
            </div>
        </div>
    );
};

export default AudioPlayer;
