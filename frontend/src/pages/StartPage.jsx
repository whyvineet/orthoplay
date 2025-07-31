import { Volume2, CheckCircle, XCircle } from "lucide-react";

const StartPage = ({ isLoading, startGame, apiStatus }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br pt-12 from-slate-50 to-blue-50">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-6 group">
            <img
              src="/icon.png"
              alt="Orthoplay Logo"
              className="mr-4 md:w-24 w-20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight transition-colors duration-300 group-hover:text-blue-600">
                Orthoplay
              </h1>
              <p className="text-sm sm:text-xl text-gray-600 font-medium transition-colors duration-300 group-hover:text-blue-500">
                Hear it. Guess it. Spell it right.
              </p>
            </div>
          </div>
        </header>

        {/* Start Game Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6 transition-all duration-300 hover:bg-blue-200 hover:scale-110 group">
                <Volume2 className="h-10 w-10 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 transition-colors duration-300 hover:text-blue-600">
                Ready to Play?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed transition-colors duration-300 hover:text-gray-700">
                Listen to the word, guess its length, then spell it correctly!
              </p>
            </div>

            <button
              onClick={startGame}
              disabled={isLoading}
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-2xl hover:bg-blue-700 hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg active:scale-95 min-w-48 group"
            >
              {isLoading ? "Starting..." : "Start Game"}
            </button>

            {/* API Status */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center text-sm">
                <span className="text-gray-500 mr-2">API Status:</span>
                <span
                  className={`flex items-center font-medium transition-all duration-300 ${
                    apiStatus === "connected"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {apiStatus === "connected" ? (
                    <CheckCircle className="h-4 w-4 mr-1 transition-transform duration-300 hover:scale-110" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-1 transition-transform duration-300 hover:scale-110" />
                  )}
                  {apiStatus === "connected" ? "Connected" : "Disconnected"}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StartPage;
