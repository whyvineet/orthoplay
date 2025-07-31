import { Brain } from 'lucide-react';

const LengthGuesser = ({ lengthOptions, lengthFeedback, guessLength, isLoading }) => {
    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                <Brain className="h-5 w-5 mr-2 transition-transform duration-300 hover:scale-110" />
                How many letters?
            </h3>
            <div className="flex justify-center flex-wrap gap-4 mb-6">
                {lengthOptions.map((option) => (
                    <button
                        key={option}
                        onClick={() => guessLength(option)}
                        disabled={isLoading}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md active:scale-95 transform"
                    >
                        {option} letters
                    </button>
                ))}
            </div>
            {lengthFeedback && (
                <div className="text-center">
                    <p className={`text-lg font-medium transition-all duration-300 ${lengthFeedback.correct ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {lengthFeedback.message}
                    </p>
                </div>
            )}
        </div>
    );
};

export default LengthGuesser;
