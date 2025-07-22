import { Send, Eye } from 'lucide-react';

const SpellingGame = ({
    wordLength,
    currentGuess,
    setCurrentGuess,
    submitSpelling,
    revealAnswer,
    isLoading
}) => {
    const handleLetterChange = (index, value) => {
        const upperValue = value.toUpperCase();
        if (upperValue.length <= 1 && /^[A-Z]*$/.test(upperValue)) {
            const newGuess = currentGuess.split('');
            newGuess[index] = upperValue;
            setCurrentGuess(newGuess.join(''));

            // Auto-focus next input when a letter is entered
            if (upperValue && index < wordLength - 1) {
                setTimeout(() => {
                    const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
                    if (nextInput) nextInput.focus();
                }, 0);
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !currentGuess[index] && index > 0) {
            // Focus previous input on backspace
            setTimeout(() => {
                const prevInput = document.querySelector(`input[data-index="${index - 1}"]`);
                if (prevInput) prevInput.focus();
            }, 0);
        } else if (e.key === 'Enter' && currentGuess.length === wordLength) {
            submitSpelling();
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
            <div className="flex flex-wrap justify-center gap-2" style={{ gridTemplateColumns: `repeat(${wordLength}, 1fr)` }}>
              {Array.from({ length: wordLength }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    if (el && index === 0) el.focus();
                  }}
                  value={currentGuess[index] || ""}
                  onChange={(e) => handleLetterChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  data-index={index}
                  type="text"
                  className="w-10 h-10 md:w-14 md:h-14 border-2 border-gray-300 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-900 bg-white focus:outline-none focus:border-blue-500 text-center uppercase"
                  disabled={isLoading}
                  maxLength={1}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={submitSpelling}
              disabled={isLoading || currentGuess.length !== wordLength}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5 mr-2" />
              {isLoading ? "Checking..." : "Submit"}
            </button>

            <button
              onClick={revealAnswer}
              disabled={isLoading}
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Eye className="h-5 w-5 mr-2" />
              Give Up
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>
              Enter all {wordLength} letters and press Submit, or press Enter
            </p>
          </div>
        </div>
      </div>
    );
};

export default SpellingGame;
