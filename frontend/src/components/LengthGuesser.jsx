import { Brain } from 'lucide-react';

const LengthGuesser = ({ lengthOptions, lengthFeedback, guessLength, isLoading }) => {
    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 px-4 py-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center flex items-center justify-center">
                <Brain className="h-5 w-5 mr-2" />
                How many letters?
            </h3>
            <div className="flex justify-center flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
                {lengthOptions.map((option) => (
                    <button
                        key={option}
                        onClick={() => guessLength(option)}
                        disabled={isLoading}
                        className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {option} letters
                    </button>
                ))}
            </div>
            {lengthFeedback && (
                <div className="text-center">
                    <p
                        className={`text-base sm:text-lg font-medium ${
                            lengthFeedback.correct ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {lengthFeedback.message}
                    </p>
                </div>
            )}
        </div>
    );
};

export default LengthGuesser;
