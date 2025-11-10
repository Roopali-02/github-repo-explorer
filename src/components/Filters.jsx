import { useState } from 'react'
import useRepoStore from '../store/useRepoStore';

const Filters = () => {
  const { repos, setRepos } = useRepoStore();
  const [sortBy, setSortBy] = useState("stars");
  const [language, setLanguage] = useState("All");

  const uniqueLanguages = [
    "All",
    ...new Set(repos.map((repo) => repo.language).filter(Boolean)),
  ];

  const handleFilter = () => {
    let filtered = [...repos];

    if (language !== "All") {
      filtered = filtered.filter((r) => r.language === language);
    }

    if (sortBy === "stars") {
      filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortBy === "forks") {
      filtered.sort((a, b) => b.forks_count - a.forks_count);
    } else if (sortBy === "updated") {
      filtered.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );
    }

    setRepos(filtered);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mt-4">
       <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 
                   text-gray-900 dark:text-gray-100 
                   rounded-lg text-sm p-2 shadow-sm
                   focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-500 transition"
      >
        {uniqueLanguages.map((lang) => (
          <option key={lang}>{lang}</option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 
                   text-gray-900 dark:text-gray-100 
                   rounded-lg text-sm p-2 shadow-sm
                   focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-500 transition"
      >
        <option value="stars">Sort by Stars</option>
        <option value="forks">Sort by Forks</option>
        <option value="updated">Recently Updated</option>
      </select>

       <button
        onClick={handleFilter}
        className="bg-linear-to-r from-[#D66D75] to-[#E29587] 
                   dark:from-yellow-600 dark:to-yellow-700
                   text-white px-5 py-2 rounded-lg text-sm font-medium
                   hover:opacity-90 active:scale-95 shadow-md transition"
      >
        Apply
      </button>
    </div>
  )
}

export default Filters