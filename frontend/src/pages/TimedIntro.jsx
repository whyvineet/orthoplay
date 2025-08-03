import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TimedIntro() {
  const navigate = useNavigate();
  const [recentScores, setRecentScores] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('timed-scores')) || [];
    setRecentScores(saved);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('timed-scores');
    setRecentScores([]);
  };

  return (
    <div className="min-h-screen flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row bg-gradient-to-br from-slate-50 to-blue-50 text-gray-800 py-4 px-2">
      {/* Left Sidebar */}
      <aside className="w-full lg:w-[20%] p-6 bg-white shadow-inner border border-gray-200 rounded-lg lg:rounded-none">
        <h2 className="text-2xl font-semibold mb-4">Timed Challenge</h2>
        <ul className="text-sm text-gray-700 space-y-2">
          <li><strong>Duration:</strong> 60 seconds</li>
          <li><strong>Mode:</strong> Rapid Spelling</li>
          <li><strong>Scoring:</strong> +1 per correct</li>
          <li><strong>End Condition:</strong> Time runs out</li>
        </ul>
        <button
          onClick={() => navigate('/timed/play')}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition font-medium cursor-pointer"
        >
          🚀 Start Challenge
        </button>
      </aside>

      {/* Main Content */}
      <main className="w-full lg:w-[55%] p-6 lg:p-10 bg-white rounded-lg lg:rounded-none shadow">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Rapid Recall Challenge</h1>
          <p className="text-base lg:text-lg text-gray-700 max-w-xl leading-relaxed mb-6">
            This challenge tests your ability to spell quickly and accurately under pressure.
            You’ll have <strong>60 seconds</strong> to complete as many words as possible.
            Each word includes a hint and audio support to guide you.
          </p>
          <div className="bg-blue-100 border border-blue-300 text-blue-800 p-4 rounded-md mb-8 shadow-sm w-full max-w-xl">
            Your performance summary will include your score, total attempts, and accuracy percentage.
          </div>
          <p className="text-sm lg:text-md text-gray-500 max-w-lg">
            🎧 Tip: Use headphones for better audio clarity. This mode is designed for individual timed practice and can be replayed any time.
          </p>
        </div>
      </main>

      {/* History Panel */}
      <aside className="w-full lg:w-[25%] p-6 bg-white border border-gray-200 shadow-inner rounded-lg lg:rounded-none lg:sticky lg:top-0 lg:h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Previous Attempts</h3>
          {recentScores.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-sm text-red-500 hover:underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        <ul className="text-sm space-y-3">
          {recentScores.length === 0 ? (
            <li className="text-gray-400 italic">No attempts yet</li>
          ) : (
            recentScores.map((entry, idx) => {
              const date = new Date(entry.date);
              const formatted = date.toLocaleString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <li
                  key={idx}
                  className="border border-gray-200 p-4 rounded-md hover:shadow-md transition bg-slate-50"
                >
                  <div className="flex justify-between font-semibold mb-1">
                    <span>{entry.score} pts</span>
                    <span className="text-xs text-gray-400">{formatted}</span>
                  </div>
                  <div className="text-xs text-gray-600">Accuracy: {entry.accuracy}%</div>
                </li>
              );
            })
          )}
        </ul>
      </aside>
    </div>
  );
}
