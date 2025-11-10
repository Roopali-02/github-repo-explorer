import React from 'react'
import useRepoStore from '../store/useRepoStore';
const Favorites = () => {
	const { favorites, toggleFavorite } = useRepoStore();

	if (favorites.length === 0)
		return (
			<p className="text-center text-gray-500 mt-6">
				No favorite repositories yet.
			</p>
		);
		
	return (
		 <div className="mt-8">
				<h2 className="text-xl font-bold text-gray-800 mb-3">⭐ Favorites</h2>
				<div className="grid md:grid-cols-2 gap-4">
					{favorites.map((repo) => (
					<div
						key={repo.id}
						className="rounded-lg p-4 
											bg-linear-to-br from-yellow-100 to-yellow-50 
											dark:from-gray-800 dark:to-gray-900
											border border-yellow-200 dark:border-yellow-700
											shadow-lg hover:shadow-xl
											transition transform hover:-translate-y-1"
	>
							<h3 className="font-semibold text-lg text-blue-600 font-sans">
								<a href={repo.html_url} target="_blank" rel="noreferrer">
									{repo.name}
								</a>
							</h3>
							<p className="text-gray-600 dark:text-gray-400 font-sans text-sm mt-1 line-clamp-2 overflow-hidden text-ellipsis font-normal"
								title={repo.description}
							>
								{repo.description || "No description available."}
							</p>
							<div className="flex justify-between mt-3 text-sm text-gray-500">
								<span>⭐ {repo.stargazers_count}</span>
								<span>🍴 {repo.forks_count}</span>
								<button
									onClick={() => toggleFavorite(repo)}
									className="text-red-700 hover:text-red-600 transition font-sans cursor-pointer"
								>
									Remove
								</button>
							</div>
					</div>
					))}
				</div>
		 </div>
	)
}

export default Favorites