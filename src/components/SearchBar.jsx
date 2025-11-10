import {useState} from 'react'
import useRepoStore from '../store/useRepoStore'
import axios from 'axios'


const SearchBar = () => {
	const [query, setQuery] = useState("");
	const { setRepos, setLoading, setError } = useRepoStore();

	const handleSearch = async () => {
		if (!query.trim()) return;
		setLoading(true);
		setError(null);

		try {
			const res = await axios.get(
				`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`
			);
			setRepos(res.data.items);
		} catch (err) {
			console.log(err);
			setError("Failed to fetch repositories. Try again later.");
		} finally {
			setLoading(false);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") handleSearch();
	};

	return (
		<div className="flex items-center gap-2 w-full">
			<input
				type="text"
				placeholder="Search GitHub repositories..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown ={handleKeyDown}
				className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-black"
			/>
			<button
				onClick={handleSearch}
				className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
			>
				Search
			</button>
		</div>
	)
}

export default SearchBar