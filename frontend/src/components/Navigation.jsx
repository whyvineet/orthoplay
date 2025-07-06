import { CheckCircle, XCircle } from 'lucide-react';

const Navigation = ({ apiStatus }) => {
    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 mb-8 sm:mb-12 rounded-t-3xl shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-y-2 h-auto sm:h-16 py-3 sm:py-0">
                    <div className="flex items-center">
                        <img src="/icon.png" alt="Orthoplay Logo" className="w-7 h-7 sm:w-8 sm:h-8 mr-2" />
                        <span className="text-lg sm:text-xl font-bold text-gray-900">Orthoplay</span>
                    </div>
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-end gap-4 sm:gap-6 w-full sm:w-auto">
                        <button className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors">
                            How to Play
                        </button>
                        <button className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors">
                            About
                        </button>
                        <div className="flex items-center text-sm">
                            <span className="text-gray-500 mr-1">API:</span>
                            <span
                                className={`flex items-center font-medium ${
                                    apiStatus === 'connected' ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
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
        </nav>
    );
};

export default Navigation;
