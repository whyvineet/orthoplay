import { Volume2, Trophy, Frown, ArrowRight } from 'lucide-react';
import { useState, useEffect, useContext } from 'react';
import { ttsService } from '../services/ttsService.js';
import { ThemeContext } from '../context/ThemeContext';
import ScoreSubmission from '../components/ScoreSubmission';

const CompletePage = ({
  isWinner,
  correctWord,
  exampleSentence,
  attempts,
  numberOfHints,
  resetGame,
  getGameCompletionData,
  lastGameMode,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [showScoreSubmission, setShowScoreSubmission] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const { darkMode } = useContext(ThemeContext);

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
      });
    } catch (error) {
      console.error("TTS error:", error);
      setIsPlayingAudio(false);
    }
  };

  const handleSubmitScore = () => {
    setShowScoreSubmission(true);
  };

  const handleSubmissionComplete = (result) => {
    setSubmissionComplete(true);
    setShowScoreSubmission(false);
  };

  const handleSkipSubmission = () => {
    setShowScoreSubmission(false);
  };

  const gameCompletionData = getGameCompletionData ? getGameCompletionData() : null;
  
  return (
    <div className={`min-h-screen flex flex-col ${
      darkMode
      ? 'bg-gradient-to-br from-gray-900 to-blue-900'
      : 'bg-gradient-to-br from-slate-50 to-blue-50'
      }`}>
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-2 transition-colors duration-300 hover:text-blue-600 ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>Orthoplay</h1>
        </header>
        <div className="max-w-2xl mx-auto">
          <div className={`rounded-3xl shadow-xl p-12 text-center hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${
            darkMode
            ? 'bg-gray-800 border border-gray-700'
            : 'bg-white border border-gray-100'
            }`}>
            <div className="mb-8">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all duration-300 hover:scale-110 group ${
                  isWinner
                  ? (darkMode ? 'bg-green-900 hover:bg-green-800' : 'bg-green-100 hover:bg-green-200')
                  : (darkMode ? 'bg-orange-900 hover:bg-orange-800' : 'bg-orange-100 hover:bg-orange-200')
                  }`}
              >
                {isWinner ? (
                  <Trophy className={`h-10 w-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                    darkMode ? 'text-green-400' : 'text-green-600'
                    }`} />
                ) : (
                  <Frown className={`h-10 w-10 transition-transform duration-300 group-hover:scale-110 ${
                    darkMode ? 'text-orange-400' : 'text-orange-600'
                    }`} />
                )}
              </div>
              <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 hover:text-blue-600 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                {isWinner ? 'Congratulations!' : 'Better luck next time!'}
              </h2>
            </div>

            <div className="mb-8">
              <p className={`text-2xl font-bold mb-2 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                The word was:{" "}
                <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>
                  {correctWord.toUpperCase()}
                </span>
              </p>
              <p className={`text-lg italic mb-6 transition-colors duration-300 ${
                darkMode
                ? 'text-gray-300 hover:text-gray-200'
                : 'text-gray-600 hover:text-gray-700'
                }`}>
                "{exampleSentence}"
              </p>

              <button
                onClick={playAudio}
                disabled={!speechSupported || isPlayingAudio}
                className={`inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md mb-6 active:scale-95 group ${
                  darkMode
                  ? 'bg-blue-700 hover:bg-blue-600'
                  : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                <Volume2 className="h-5 w-5 mr-2" />
                {isPlayingAudio ? "Playing..." : "Hear Word"}
              </button>
            </div>

            <div className="mb-8">
              <p className={`text-lg transition-colors duration-300 ${
                darkMode
                ? 'text-gray-300 hover:text-gray-200'
                : 'text-gray-600 hover:text-gray-700'
                }`}>
                {isWinner
                  ? `You solved it in ${attempts} attempts!`
                  : `You tried ${attempts} times - keep practicing!`}
              </p>
              <p className={`text-lg ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                {isWinner
                  ? `You used ${numberOfHints} hints! Great Work!!`
                  : `You used ${numberOfHints} hints - better luck next time!`}
              </p>
            </div>

            {/* Score Submission Section */}
            { 
              lastGameMode == "demo" ? (
                <>
                  <p className={`mb-6 text-center font-semibold ${darkMode ? 'text-yellow-400' : 'text-yellow-700'
                    }`}>
                    Demo complete, ready for the full experience!
                  </p>
                  <button
                    onClick={resetGame}
                    className={`inline-flex items-center justify-center px-8 py-4 text-white text-lg font-semibold rounded-2xl hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-lg active:scale-95 mx-auto ${darkMode
                      ? 'bg-blue-700 hover:bg-blue-600'
                      : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                  >
                    Start Game
                  </button>
                </>
              ) : (
                <>
                  {isWinner && !showScoreSubmission && !submissionComplete && gameCompletionData && (
                    <div className="mb-6">
                      <button
                        onClick={handleSubmitScore}
                        className={`inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md mr-4 active:scale-95 group ${
                    darkMode
                          ? 'bg-green-700 hover:bg-green-600'
                          : 'bg-green-600 hover:bg-green-700'
                          }`}
                      >
                        <Trophy className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                        Submit Score
                      </button>
                    </div>
                  )}

                  <button
                    onClick={resetGame}
                    className={`inline-flex items-center justify-center px-8 py-4 text-white text-lg font-semibold rounded-2xl hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-lg active:scale-95 group ${
                darkMode
                      ? 'bg-blue-700 hover:bg-blue-600'
                      : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                  >
                    <ArrowRight className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                    Next Word
                  </button>
                </>
              )}

          </div>

          {/* Score Submission Modal */}
          {showScoreSubmission && gameCompletionData && (
            <div className="mt-8">
              <ScoreSubmission
                gameData={gameCompletionData}
                onSubmissionComplete={handleSubmissionComplete}
                onSkip={handleSkipSubmission}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletePage;