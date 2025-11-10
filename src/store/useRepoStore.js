import { create } from "zustand";

const useRepoStore = create((set)=>({
  repos: [],
  favorites: [],
  loading: false,
  error: null,

  setRepos: (repos) => set({ repos }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  toggleFavorite: (repo) =>
    set((state) => {
      const exists = state.favorites.find((f) => f.id === repo.id);
      let updated;

      if (exists) {
        updated = state.favorites.filter((f) => f.id !== repo.id);
      } else {
        const minimalRepo = {
          id: repo.id,
          name: repo.name,
          html_url: repo.html_url,
          description: repo.description,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language,
          private: repo.private,
        };
        updated = [...state.favorites, minimalRepo];
      }

      try {
        localStorage.setItem("favorites", JSON.stringify(updated));
      } catch (error) {
        console.warn("⚠️ localStorage full or unavailable:", error);
        alert("Storage limit reached. Please remove some favorites.");
      }

      return { favorites: updated };
    }),

  loadFavorites: () => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      try {
        set({ favorites: JSON.parse(saved) });
      } catch {
        console.warn("⚠️ Failed to parse favorites from localStorage");
      }
    }
  }

}))

export default useRepoStore;