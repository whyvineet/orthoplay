import { useEffect, useState } from "react";
import { apiService } from "../services/apiService";
import { Github, Loader2 } from "lucide-react";

const ContributorsPage = () => {
    const [contributors, setContributors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

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
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 min-h-screen mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 transition-colors duration-300 hover:text-blue-600">
                Meet Our Contributors 💖
            </h2>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md pt-6 text-center flex flex-col items-center space-y-4 animate-pulse"
                        >
                            <div className="w-20 h-20 bg-gray-200 rounded-lg" />
                            <div className="w-1/3 h-4 bg-gray-200 rounded" />
                            <div className="w-1/4 h-3 bg-gray-200 rounded" />
                            <div className="w-full bg-gray-200 rounded-b-lg h-12" />
                        </div>
                    ))}
                </div>
            ) : isError ? (
                <p className="text-center text-red-500 transition-colors duration-300 hover:text-red-600">
                    Couldn't load contributors. Please try again later.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {finalContributors.map((user) => (
                        <div
                            key={user.login}
                            className="relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center pt-6 pb-0 text-center space-y-4 group hover:scale-[1.02]"
                        >

                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                className="w-20 h-20 rounded-lg border shadow-md bg-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                            />

                            {/* Username & Contributions */}
                            <div className="">
                                <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-blue-600">@{user.login}</h3>
                                <p className="mt-2 text-sm text-gray-600 bg-amber-100 rounded-3xl inline-block px-4 py-1.5 font-medium transition-all duration-300 group-hover:bg-amber-200 group-hover:scale-105">
                                    {user.contributions} {user.contributions > 1 ? 'contributions' : 'contribution'}
                                </p>
                            </div>

                            {/* Profile Button */}
                            <a
                                href={user.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex justify-center items-center w-full h-12 bg-gray-900 text-white rounded-b-xl gap-x-2 font-medium hover:bg-black hover:scale-105 transition-all duration-300 group-hover:shadow-lg"
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
