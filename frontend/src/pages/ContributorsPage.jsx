import { useEffect, useState, useContext } from "react";
import { apiService } from "../services/apiService";
import { Github, Loader2 } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const ContributorsPage = () => {
    const [contributors, setContributors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        const fetchContributors = async () => {
            try {
                const response = await apiService.fetchContributors();
                if (response?.error) throw new Error();
                setContributors(response || []);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContributors();
    }, []);

    const finalContributors = contributors.sort((a, b) => b.contributions - a.contributions);
    
    return (
        <section className={`py-12 px-4 min-h-screen mx-auto ${
            darkMode 
                ? "bg-gradient-to-br from-gray-900 to-blue-900" 
                : "bg-gradient-to-br from-slate-50 to-blue-50"
        }`}>
            <h2 className={`text-3xl font-bold text-center mb-8 transition-colors duration-300 hover:text-blue-600 ${
                darkMode ? "text-gray-100" : "text-gray-900"
            }`}>
                Meet Our Contributors 💖
            </h2>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className={`rounded-xl shadow-md pt-6 text-center flex flex-col items-center space-y-4 animate-pulse ${
                                darkMode ? "bg-gray-800" : "bg-white"
                            }`}
                        >
                            <div className={`w-20 h-20 rounded-lg ${
                                darkMode ? "bg-gray-700" : "bg-gray-200"
                            }`} />
                            <div className={`w-1/3 h-4 rounded ${
                                darkMode ? "bg-gray-700" : "bg-gray-200"
                            }`} />
                            <div className={`w-1/4 h-3 rounded ${
                                darkMode ? "bg-gray-700" : "bg-gray-200"
                            }`} />
                            <div className={`w-full rounded-b-lg h-12 ${
                                darkMode ? "bg-gray-700" : "bg-gray-200"
                            }`} />
                        </div>
                    ))}
                </div>
            ) : isError ? (
                <p className={`text-center transition-colors duration-300 ${
                    darkMode ? "text-red-400 hover:text-red-300" : "text-red-500 hover:text-red-600"
                }`}>
                    Couldn't load contributors. Please try again later.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {finalContributors.map((user) => (
                        <div
                            key={user.login}
                            className={`relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center pt-6 pb-0 text-center space-y-4 group hover:scale-[1.02] ${
                                darkMode ? "bg-gray-800" : "bg-white"
                            }`}
                        >
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                className={`w-20 h-20 rounded-lg border shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                                    darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
                                }`}
                            />

                            {/* Username & Contributions */}
                            <div className="">
                                <h3 className={`text-lg font-semibold transition-colors duration-300 group-hover:text-blue-600 ${
                                    darkMode ? "text-gray-100" : "text-gray-900"
                                }`}>
                                    @{user.login}
                                </h3>
                                <p className={`mt-2 text-sm rounded-3xl inline-block px-4 py-1.5 font-medium transition-all duration-300 group-hover:scale-105 ${
                                    darkMode 
                                        ? "bg-amber-900/30 text-amber-300 group-hover:bg-amber-800/40" 
                                        : "bg-amber-100 text-gray-600 group-hover:bg-amber-200"
                                }`}>
                                    {user.contributions} {user.contributions > 1 ? 'contributions' : 'contribution'}
                                </p>
                            </div>

                            {/* Profile Button */}
                            <a
                                href={user.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex justify-center items-center w-full h-12 text-white rounded-b-xl gap-x-2 font-medium hover:scale-105 transition-all duration-300 group-hover:shadow-lg ${
                                    darkMode 
                                        ? "bg-gray-700 hover:bg-gray-600" 
                                        : "bg-gray-900 hover:bg-black"
                                }`}
                            >
                                <Github className="transition-transform duration-300 group-hover:scale-110" />
                                <span>View Profile</span>
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ContributorsPage;