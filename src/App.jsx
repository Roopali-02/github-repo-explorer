import { useEffect } from 'react'

import SearchBar from './components/SearchBar';
import RepoList from './components/RepoList';
import Filters from './components/Filters';
import Favorites from './components/Favorites';

import useRepoStore  from './store/useRepoStore';
import useThemeStore from './store/useThemeStore';

function App() {
	const { darkMode, toggleTheme } = useThemeStore();
	const { loadFavorites,repos  } = useRepoStore();

	useEffect(() => {
		loadFavorites();
	}, []);

	useEffect(() => {
	if (darkMode) document.documentElement.classList.add("dark");
	else document.documentElement.classList.remove("dark");
	}, [darkMode]);


	return (
		<div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors">
			<button
				onClick={toggleTheme}
				className="absolute top-4 right-4 text-sm bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-gray-700"
			>
				{darkMode ? "☀️ Light" : "🌙 Dark"}
			</button>
			<h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
				🚀 GitHub Repo Explorer
			</h1>
			<div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6">
				<SearchBar />
				 <Favorites />
				{repos.length > 0 && <Filters />}
				<RepoList />
			</div>
		</div>
	)
}

export default App
