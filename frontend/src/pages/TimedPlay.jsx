import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import AudioPlayer from '../components/AudioPlayer';
import WordDescription from '../components/WordDescription';
import { apiService } from '../services/apiService';

const TimedPlay = () => {
  const navigate = useNavigate();

  const [wordData, setWordData] = useState(null);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guess, setGuess] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const [spellingHistory, setSpellingHistory] = useState([]);
  const [showConfirmEnd, setShowConfirmEnd] = useState(false);
  const [feedbackPopup, setFeedbackPopup] = useState(null);
  const [seenWords, setSeenWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    fetchNewWord();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isFinished) {
      endGame();
    }
  }, [timeLeft, isFinished]);

  const fetchNewWord = async () => {
    try {
      const data = await apiService.startGame();
      setWordData(data);
      setGuess(Array(data.word.length).fill(''));
      setCurrentGuess('');
      setTimeout(() => inputsRef.current[0]?.focus(), 0);
    } catch (err) {
      console.error('Failed to fetch word:', err);
    }
  };

  const handleChange = (e, index) => {
    const val = e.target.value.toUpperCase();
    if (/^[A-Z]$/.test(val) || val === '') {
      const updated = [...guess];
      updated[index] = val;
      setGuess(updated);
      setCurrentGuess(updated.join(''));
      if (val && index < wordData.word.length - 1) inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const updated = [...guess];
      if (updated[index]) {
        updated[index] = '';
        setGuess(updated);
        setCurrentGuess(updated.join(''));
      } else if (index > 0) {
        updated[index - 1] = '';
        setGuess(updated);
        setCurrentGuess(updated.join(''));
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'Enter' && !guess.includes('')) {
      handleSubmit();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').toUpperCase().replace(/[^A-Z]/g, '').slice(0, wordData.word.length);
    const updated = Array(wordData.word.length).fill('');
    [...paste].forEach((char, idx) => updated[idx] = char);
    setGuess(updated);
    setCurrentGuess(updated.join(''));
    inputsRef.current[Math.min(paste.length, wordData.word.length - 1)]?.focus();
  };

  const handleSubmit = async () => {
    if (!currentGuess || currentGuess.length !== wordData.word.length) {
      setFeedbackPopup('incomplete');
      setTimeout(() => setFeedbackPopup(null), 1200);
      return;
    }

    setIsLoading(true);
    try {
      const data = await apiService.submitSpelling(wordData.word_id, currentGuess);
      setFeedbackPopup(data.is_correct ? 'correct' : 'incorrect');
      setTimeout(() => setFeedbackPopup(null), 1200);

      setSeenWords(prev => [
  ...prev,
  {
    word_id: wordData.word_id,
    word: wordData.word,
    description: wordData.description,
    status: data.is_correct ? 'correct' : 'incorrect',
    guess: currentGuess,
    feedback: data.feedback,
  },
]);


      setSpellingHistory(prev => [...prev, { guess: currentGuess, feedback: data.feedback, is_correct: data.is_correct }]);
      if (data.is_correct) setScore(prev => prev + 1);
      fetchNewWord();
    } catch (err) {
      console.error('Error submitting guess:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const endGame = () => {
    if (wordData && !seenWords.some(w => w.word_id === wordData.word_id)) {
  setSeenWords(prev => [
    ...prev,
    {
      word_id: wordData.word_id,
      word: wordData.word,
      description: wordData.description,
      status: 'skipped',
      guess: '',
      feedback: '',
    },
  ]);
}

    setIsFinished(true);
    const totalAttempts = spellingHistory.length;
    const correct = spellingHistory.filter(x => x.is_correct).length;
    const accuracy = totalAttempts > 0 ? Math.round((correct / totalAttempts) * 100) : 0;

    const prevScores = JSON.parse(localStorage.getItem('timed-scores')) || [];
    const newEntry = { score, date: new Date().toISOString(), accuracy, attempts: totalAttempts };
    const updatedHistory = [newEntry, ...prevScores].slice(0, 5);
    localStorage.setItem('timed-scores', JSON.stringify(updatedHistory));

    setTimeout(() => {
      navigate('/timed/summary', { state: { score: correct, history: seenWords } });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Orthoplay - Timed Challenge</h1>
          <div className="flex flex-wrap justify-center items-center gap-4 text-lg text-gray-700">
            <span className="bg-white px-4 py-2 rounded shadow">⏱ Time Left: <strong>{timeLeft}s</strong></span>
            <span className="bg-white px-4 py-2 rounded shadow">🎯 Score: <strong>{score}</strong></span>
            {!isFinished && (
              <>
<button
  onClick={() => {
    if (wordData) {
      setSeenWords(prev => [
        ...prev,
        {
          word_id: wordData.word_id,
          word: wordData.word,
          description: wordData.description,
          status: 'skipped',
          guess: '',
          feedback: '',
        },
      ]);
    }
    fetchNewWord();
  }}
  className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600"
>
  Skip
</button>
                <button onClick={() => setShowConfirmEnd(true)} className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600">End</button>
              </>
            )}
          </div>
        </header>

        <Dialog open={showConfirmEnd} onClose={() => setShowConfirmEnd(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center space-y-4">
              <Dialog.Title className="text-lg font-semibold text-gray-800">End Challenge Early?</Dialog.Title>
              <Dialog.Description className="text-sm text-gray-600">Are you sure you want to end the challenge now? Your progress will be saved.</Dialog.Description>
              <div className="flex justify-center space-x-4 pt-4">
                <button onClick={endGame} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">Yes, End</button>
                <button onClick={() => setShowConfirmEnd(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition">Cancel</button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {feedbackPopup && (
  <div
    className={`fixed top-10 left-1/2 transform -translate-x-1/2 scale-100 animate-pulse px-8 py-4 rounded-2xl shadow-2xl z-50 text-white text-xl font-bold transition-all duration-300 ease-out ${
      feedbackPopup === 'correct'
        ? 'bg-green-600 shadow-green-400/40'
        : feedbackPopup === 'incorrect'
        ? 'bg-red-600 shadow-red-400/40'
        : 'bg-yellow-500 shadow-yellow-300/50'
    }`}
  >
    {feedbackPopup === 'correct' && '🎉 Correct!'}
    {feedbackPopup === 'incorrect' && '❌ Oops! Try the next one.'}
    {feedbackPopup === 'incomplete' && '⚠️ Complete all letters first'}
  </div>
)}

        {isFinished ? (
          <div className="text-center mt-12">
            <h2 className="text-2xl font-semibold mb-4">⏹ Challenge Ended</h2>
            <p className="text-lg">Redirecting to summary...</p>
          </div>
        ) : wordData ? (
          <div className="space-y-6">
            {/* Audio + Description side-by-side */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="w-full md:w-1/2">
                <AudioPlayer currentGame={wordData} />
              </div>
              <div className="w-full md:w-1/2">
                <WordDescription description={wordData.description} />
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Spell the word ({wordData.word.length} letters)</h3>
              <div className="flex justify-center mb-6">
                <div className="flex flex-wrap justify-center gap-2">
                  {Array.from({ length: wordData.word.length }).map((_, index) => (
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
                      className="w-10 h-10 md:w-14 md:h-14 border-2 border-gray-300 rounded-lg text-2xl font-bold text-gray-900 bg-white focus:outline-none focus:border-blue-500 text-center uppercase"
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || guess.includes('')}
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TimedPlay;
