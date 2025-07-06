import { AlertCircle, XCircle } from 'lucide-react';

const ErrorMessage = ({ message, onClose }) => {
    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] sm:max-w-md">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-3 sm:p-4 flex items-start sm:items-center gap-2 shadow-lg">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 sm:mt-0 flex-shrink-0" />
                <span className="text-red-800 text-sm flex-1 break-words">
                    {message}
                </span>
                <button
                    onClick={onClose}
                    className="text-red-500 hover:text-red-700 flex-shrink-0 mt-0.5 sm:mt-0"
                >
                    <XCircle className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default ErrorMessage;
