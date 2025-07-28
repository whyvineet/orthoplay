import { AlertCircle, XCircle } from "lucide-react";
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
}) => {
  const hints = {
    hint1: currentGame.hint1,
    hint2: currentGame.hint2,
    hint3: currentGame.hint3,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Orthoplay</h1>
          <div className="flex items-center justify-center text-sm text-gray-500">
            <span className="px-3 py-1 bg-white rounded-full shadow-sm">
              Attempts: {attempts}
            </span>
          </div>
        </header>

        {/* Error Message */}
        {errorMessage && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center shadow-sm">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
              <span className="text-red-800 text-sm flex-1">
                {errorMessage}
              </span>
              <button
                onClick={() => setErrorMessage("")}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                <XCircle className="h-5 w-5" />
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
  );
};

export default GamePage;
