import { Volume2, RotateCcw, Trophy, Frown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ttsService } from '../services/ttsService.js';
import GameScore from "../components/GameScore";
import React from 'react';
import { ArrowRight } from 'lucide-react';


const CompletePage = ({
  isWinner,
  correctWord,
  exampleSentence,
  attempts,
  resetGame,
  score,
  onScoreReset
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    setSpeechSupported(ttsService.isSupported);
  }, []);

  const playAudio = async () => {
    if (!speechSupported) {
      alert('Text-to-Speech is not supported in your browser');
      return;
    }

    try {
      await ttsService.speak(correctWord, {
        onStart: () => setIsPlayingAudio(true),
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false),
      });
    } catch (error) {
      console.error('TTS error:', error);
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Orthoplay</h1>
        </header>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center">
            <div className="mb-8">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                  isWinner ? 'bg-green-100' : 'bg-orange-100'
                }`}
              >
                {isWinner ? (
                  <Trophy className="h-10 w-10 text-green-600" />
                ) : (
                  <Frown className="h-10 w-10 text-orange-600" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isWinner ? 'Congratulations!' : 'Better luck next time!'}
              </h2>
            </div>

            <div className="mb-6">
              <p className="text-lg font-bold text-gray-800">
                Your Score: <span className="text-green-600">{score}</span>
              </p>
            </div>

            <GameScore score={score} onScoreReset={onScoreReset} />

            <div className="mb-8">
              <p className="text-2xl font-bold text-gray-900 mb-2">
                The word was:{' '}
                <span className="text-blue-600">{correctWord.toUpperCase()}</span>
              </p>
              <p className="text-lg text-gray-600 mb-6 italic">
                "{exampleSentence}"
              </p>

              <button
                onClick={playAudio}
                disabled={!speechSupported || isPlayingAudio}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mb-6"
              >
                <Volume2 className="h-5 w-5 mr-2" />
                {isPlayingAudio ? 'Playing...' : 'Hear Word'}
              </button>
            </div>

            <div className="mb-8">
              <p className="text-lg text-gray-600">
                {isWinner
                  ? `You solved it in ${attempts} attempts!`
                  : `You tried ${attempts} times - keep practicing!`}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-2xl font-bold text-gray-900 mb-2">
                The word was:{' '}
                <span className="text-blue-600">{correctWord.toUpperCase()}</span>
              </p>
              <p className="text-lg text-gray-600 mb-6 italic">
                "{exampleSentence}"
              </p>

              <button
                onClick={playAudio}
                disabled={!speechSupported || isPlayingAudio}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mb-6"
              >
                <Volume2 className="h-5 w-5 mr-2" />
                {isPlayingAudio ? 'Playing...' : 'Hear Word'}
              </button>
            </div>

            <div className="mb-8">
              <p className="text-lg text-gray-600">
                {isWinner
                  ? `You solved it in ${attempts} attempts!`
                  : `You tried ${attempts} times - keep practicing!`}
              </p>
            </div>

            <button
              onClick={resetGame}
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-2xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Play Again

             <ArrowRight className="h-5 w-5 mr-2" />

              Next Word

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletePage;