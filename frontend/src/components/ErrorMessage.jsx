import { AlertCircle, XCircle } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ErrorMessage = ({ message, onClose }) => {
    const { darkMode } = useContext(ThemeContext);
    
    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
            <div className={`border rounded-2xl p-4 flex items-center shadow-lg ${
                darkMode 
                    ? 'bg-red-900/30 border-red-800 backdrop-blur-sm' 
                    : 'bg-red-50 border-red-200'
            }`}>
                <AlertCircle className={`h-5 w-5 mr-3 flex-shrink-0 ${
                    darkMode ? 'text-red-400' : 'text-red-500'
                }`} />
                <span className={`text-sm flex-1 ${
                    darkMode ? 'text-red-300' : 'text-red-800'
                }`}>
                    {message}
                </span>
                <button
                    onClick={onClose}
                    className={`ml-2 flex-shrink-0 transition-colors duration-200 ${
                        darkMode 
                            ? 'text-red-400 hover:text-red-300' 
                            : 'text-red-500 hover:text-red-700'
                    }`}
                >
                    <XCircle className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default ErrorMessage;