import { CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../AuthContext'; 
import { useNavigate } from 'react-router-dom';

const Navigation = ({ apiStatus }) => {
    const { token, logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLoginClick = () => navigate('/login');
    const handleSignupClick = () => navigate('/signup');

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 mb-12 rounded-t-3xl shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <img src="/icon.png" alt="Orthoplay Logo" className="w-8 h-8 mr-3" />
                        <span className="text-xl font-bold text-gray-900">Orthoplay</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <button className="text-gray-600 hover:text-gray-900 transition-colors">
                            How to Play
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition-colors">
                            About
                        </button>

                        {token ? (
                            <button
                                onClick={logout}
                                className="text-red-600 hover:text-red-800 font-medium transition-colors"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleLoginClick}
                                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={handleSignupClick}
                                    className="text-green-600 hover:text-green-800 font-medium transition-colors"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}

                        <div className="flex items-center text-sm">
                            <span className="text-gray-500 mr-2">API:</span>
                            <span className={`flex items-center font-medium ${apiStatus === 'connected' ? 'text-green-600' : 'text-red-600'}`}>
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
