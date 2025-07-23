import { useEffect, useState } from "react";
import { apiService } from "../services/apiService";
import { Loader2 } from "lucide-react";

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
    ;

    return (
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 min-h-screen mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
                Meet Our Contributors 💖
            </h2>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col items-center space-y-4 animate-pulse"
                        >
                            <div className="w-20 h-20 bg-gray-200 rounded-lg" />
                            <div className="w-1/3 h-4 bg-gray-200 rounded" />
                            <div className="w-1/4 h-3 bg-gray-200 rounded" />
                        </div>
                    ))}
                </div>
            ) : isError ? (
                <p className="text-center text-red-500">
                    Couldn't load contributors. Please try again later.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {finalContributors.map((user) => (
                        <a
                            key={user.login}
                            href={user.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 text-center flex flex-col items-center space-y-4"
                        >
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                className="w-20 h-20 rounded-lg border"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">@{user.login}</h3>
                                <p className="text-sm text-gray-500">
                                    {user.contributions} contributions
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            )}

        </section>
    );
};

export default ContributorsPage;
