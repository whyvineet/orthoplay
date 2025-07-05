import { Volume2, CheckCircle, XCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const StartPage = ({ isLoading, startGame, apiStatus }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <Navigation apiStatus={apiStatus} />

        {/* Header */}
        <header className="text-center mb-12">
          <div className='flex items-center justify-center mb-6'>
            <img src="/icon.png" alt="Orthoplay Logo" className="mr-4 w-24 h-24" />
            <div>
              <h1 className="text-6xl font-bold text-gray-900 mb-4 tracking-tight">
                Orthoplay
              </h1>
              <p className="text-xl text-gray-600 font-medium">
                Hear it. Guess it. Spell it right.
              </p>
            </div>
          </div>
        </header>

        {/* Start Game Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                <Volume2 className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Play?</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Listen to the word, guess its length, then spell it correctly!
              </p>
            </div>

            <button
              onClick={startGame}
              disabled={isLoading}
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-2xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed min-w-48"
            >
              {isLoading ? 'Starting...' : 'Start Game'}
            </button>

            {/* API Status */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center text-sm">
                <span className="text-gray-500 mr-2">API Status:</span>
                <span className={`flex items-center font-medium ${apiStatus === 'connected' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {apiStatus === 'connected' ? (
                    <CheckCircle className="h-4 w-4 mr-1" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-1" />
                  )}
                  {apiStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default StartPage;
