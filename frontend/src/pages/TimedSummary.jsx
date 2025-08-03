import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function TimedSummary() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score = 0, history = [] } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate('/timed');
    }
  }, [location, navigate]);

  const totalWords = history.length;
  const correct = history.filter(w => w.status === 'correct').length;
  const incorrect = history.filter(w => w.status === 'incorrect').length;
  const skipped = history.filter(w => w.status === 'skipped').length;
  const accuracy = totalWords > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">🎯 Challenge Summary</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-8">
          <div className="bg-green-100 text-green-800 p-4 rounded-xl">
            <p className="text-sm">Correct</p>
            <p className="text-xl font-bold">{correct}</p>
          </div>
          <div className="bg-red-100 text-red-800 p-4 rounded-xl">
            <p className="text-sm">Incorrect</p>
            <p className="text-xl font-bold">{incorrect}</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl">
            <p className="text-sm">Skipped</p>
            <p className="text-xl font-bold">{skipped}</p>
          </div>
          <div className="bg-blue-100 text-blue-800 p-4 rounded-xl">
            <p className="text-sm">Accuracy</p>
            <p className="text-xl font-bold">{accuracy}%</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">📝 Word Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 border-b">#</th>
                <th className="text-left px-4 py-2 border-b">Word</th>
                <th className="text-left px-4 py-2 border-b">Your Guess</th>
                <th className="text-left px-4 py-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((word, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 font-medium">{word.word}</td>
                  <td className="px-4 py-2 text-gray-700 italic">
                    {word.guess || '—'}
                  </td>
                  <td className="px-4 py-2">
                    {word.status === 'correct' && <span className="text-green-600">✅ Correct</span>}
                    {word.status === 'incorrect' && <span className="text-red-600">❌ Incorrect</span>}
                    {word.status === 'skipped' && <span className="text-yellow-600">⏭ Skipped</span>}
                  </td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-6">
                    No words attempted.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

              <div className="text-center mt-10">
  <div className="flex justify-center gap-4 flex-wrap w-full max-w-xs mx-auto">
    <button
      onClick={() => navigate('/timed/play')}
      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      🔁 Play Again
    </button>
    <button
      onClick={() => navigate('/')}
      className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
    >
      🏠 Exit to Home
    </button>
  </div>
</div>

      </div>
    </div>
  );
}
