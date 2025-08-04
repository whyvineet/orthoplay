import { Info, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const GameLegend = () => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={`rounded-3xl shadow-lg p-8 ${
            darkMode 
                ? "bg-gray-800 border border-gray-700" 
                : "bg-white border border-gray-100"
        }`}>
            <h3 className={`text-xl font-bold mb-6 flex items-center ${
                darkMode ? "text-gray-100" : "text-gray-900"
            }`}>
                <Info className={`h-5 w-5 mr-2 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                }`} />
                Color Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                        darkMode ? "bg-green-600" : "bg-green-500"
                    }`}>
                        <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <p className={`font-medium ${
                            darkMode ? "text-gray-100" : "text-gray-900"
                        }`}>
                            Correct
                        </p>
                        <p className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                            Right letter, right position
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                        darkMode ? "bg-yellow-600" : "bg-yellow-500"
                    }`}>
                        <AlertCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <p className={`font-medium ${
                            darkMode ? "text-gray-100" : "text-gray-900"
                        }`}>
                            Misplaced
                        </p>
                        <p className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                            Right letter, wrong position
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                        darkMode ? "bg-gray-500" : "bg-gray-400"
                    }`}>
                        <XCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <p className={`font-medium ${
                            darkMode ? "text-gray-100" : "text-gray-900"
                        }`}>
                            Incorrect
                        </p>
                        <p className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                            Letter not in word
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameLegend;