import React from 'react'
import useRepoStore from '../store/useRepoStore';
import confetti from "canvas-confetti";
const RepoList = () => {
	const { repos, loading, error, toggleFavorite, favorites } = useRepoStore();

	 if (loading)
		return (
			<p className="text-center text-gray-500 mt-6 animate-pulse">
				⏳ Fetching repositories...
			</p>
		);

	if (repos.length === 0)
		return (
			<p className="text-center text-gray-500 mt-6">
				Start by searching for a repository above 👆
			</p>
		);
	if (error) return <p className="text-center text-red-500">{error}</p>;

	const handleFavorite = (repo) => {
	toggleFavorite(repo);
	confetti({
		particleCount: 80,
		spread: 60,
		origin: { y: 0.7 },
	});
};


 return (
	<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
		{repos.map((repo) => {
			const isFav = favorites.some((f) => f.id === repo.id);
			return (
			<div
				key={repo.id}
				className="rounded-xl p-5 bg-white dark:bg-gray-800 
								shadow-[0_4px_20px_rgba(0,0,0,0.08),0_-2px_6px_rgba(0,0,0,0.03)]
								dark:shadow-[0_4px_20px_rgba(0,0,0,0.4),0_-2px_6px_rgba(0,0,0,0.2)]
								hover:shadow-[0_6px_25px_rgba(0,0,0,0.12),0_-3px_8px_rgba(0,0,0,0.05)]
								dark:hover:shadow-[0_6px_25px_rgba(0,0,0,0.5),0_-3px_8px_rgba(0,0,0,0.3)]
								transition transform hover:-translate-y-1 flex flex-col justify-between border-amber-500"
	    >
				<div>
					<h2 className="font-semibold text-lg text-blue-600 hover:underline">
						<a href={repo.html_url} target="_blank" rel="noreferrer">
							{repo.name}
						</a>
					</h2>
					<p
				className="mt-2 text-[14px] leading-relaxed text-gray-600 dark:text-gray-300 italic font-normal transition-all duration-200 line-clamp-2 hover:line-clamp-none hover:overflow-visible cursor-pointer"
				title={repo.description}
			>
						{repo.description || "No description available."}
					</p>
				</div>

				<div className="mt-4">
					<div className="flex flex-wrap gap-2 mt-3">
						<span className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 text-xs px-3 py-1 rounded-full">
							⭐ {repo.stargazers_count.toLocaleString()}
						</span>
						<span className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 text-xs px-3 py-1 rounded-full">
							🍴 {repo.forks_count.toLocaleString()}
						</span>
						<span className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 text-xs px-3 py-1 rounded-full">
							🧠 {repo.language || "N/A"}
						</span>
						<span
							className={`text-xs px-3 py-1 rounded-full font-medium ${
								repo.private
									? "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800"
									: "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800"
							}`}
						>
							{repo.private ? "🔒 Private" : "🌐 Public"}
						</span>
					</div>
					<button
						onClick={() => handleFavorite(repo)}
						className={`mt-4 w-full rounded-lg py-2 font-medium transition
							${
								isFav
									? "bg-yellow-300 hover:bg-yellow-400 text-gray-900 dark:bg-yellow-500 dark:hover:bg-yellow-400 dark:text-gray-900"
									: "bg-[#44A08D] hover:bg-gray-900 text-white dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-900"
							}`}
					>
						{isFav ? "★ Favorite" : "☆ Add to Favorites"}
					</button>
				</div>
			</div>
			);
		})}
	</div>
);
}

export default RepoList