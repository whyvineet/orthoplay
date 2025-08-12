import { AlertCircle, XCircle } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import AudioPlayer from "../components/AudioPlayer";
import WordDescription from "../components/WordDescription";
import Hints from "../components/Hints";
import LengthGuesser from "../components/LengthGuesser";
import SpellingGame from "../components/SpellingGame";
import SpellingHistory from "../components/SpellingHistory";
import GameLegend from "../components/GameLegend";

const GamePage = ({
  gamePhase,
  isLoading,
  currentGame,
  lengthFeedback,
  currentGuess,
  setCurrentGuess,
  spellingHistory,
  attempts,
  numberOfHints,
  lastMessage,
  wordLength,
  guessLength,
  submitSpelling,
  revealAnswer,
  errorMessage,
  setErrorMessage,
  setNumberOfHints,
  trackHintUsage,
  gameState,
}) => {
  const { darkMode } = useContext(ThemeContext);

  const hints = {
    hint1: currentGame.hint1,
    hint2: currentGame.hint2,
    hint3: currentGame.hint3,
  };

  return (
    <div>

      {
      gameState === "demo" && (
                <div className="p-4 mb-4 rounded bg-yellow-200 text-yellow-900 font-semibold">
                  Demo Mode: Your progress won't be saved.
                </div>
              )}
              
      <div className={`min-h-screen ${darkMode
          ? "bg-gradient-to-br from-gray-900 to-blue-900"
          : "bg-gradient-to-br from-slate-50 to-blue-50"
        }`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className={`text-4xl font-bold mb-2 ${
            darkMode ? "text-gray-100" : "text-gray-900"
              }`}>Orthoplay</h1>
            <div className="flex items-center justify-center text-sm">
              <span className={`px-3 py-1 rounded-full shadow-sm ${
              darkMode
                  ? "bg-gray-800 text-gray-300"
                  : "bg-white text-gray-500"
                }`}>
                Attempts: {attempts}
              </span>
            </div>
          </header>

          {/* Error Message */}
          {errorMessage && (
            <div className="max-w-4xl mx-auto mb-6">
              <div className={`border rounded-2xl p-4 flex items-center shadow-sm ${
                darkMode
                  ? "bg-red-900/30 border-red-800"
                  : "bg-red-50 border-red-200"
                }`}>
                <AlertCircle className={`h-5 w-5 mr-3 ${
                darkMode ? "text-red-400" : "text-red-500"
                  }`} />
                <span className={`text-sm flex-1 ${
                darkMode ? "text-red-300" : "text-red-800"
                  }`}>
                  {errorMessage}
                </span>
                <button
                  onClick={() => setErrorMessage("")}
                  className={`hover:text-red-700 ml-2 ${
                  darkMode ? "text-red-400" : "text-red-500"
                    }`}
                >
                  <XCircle className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
                </button>
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto space-y-6">
            <AudioPlayer currentGame={currentGame} />

            <WordDescription description={currentGame.description} />

            <Hints
              hints={hints}
              numberOfHints={numberOfHints}
              setNumberOfHints={setNumberOfHints}
              trackHintUsage={trackHintUsage}
            />

            {gamePhase === "length" && (
              <LengthGuesser
                lengthOptions={currentGame.lengthOptions}
                lengthFeedback={lengthFeedback}
                guessLength={guessLength}
                isLoading={isLoading}
              />
            )}

            {gamePhase === "spelling" && (
              <SpellingGame
                wordLength={wordLength}
                currentGuess={currentGuess}
                setCurrentGuess={setCurrentGuess}
                submitSpelling={submitSpelling}
                revealAnswer={revealAnswer}
                isLoading={isLoading}
              />
            )}

            {spellingHistory.length > 0 && (
              <SpellingHistory
                spellingHistory={spellingHistory}
                lastMessage={lastMessage}
              />
            )}

            <GameLegend />
          </div>
        </div>
      </div>

    </div>

  );
};

export default GamePage;