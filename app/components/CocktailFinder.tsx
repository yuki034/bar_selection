"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { dummyRecipes } from "./recipes";
import Sidebar from "./Sidebar";

export default function CocktailFinder() {
  const [search, setSearch] = useState("");
  const [base, setBase] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // ローカルストレージからお気に入りと検索履歴を読み込み
  useEffect(() => {
    const savedFavorites = localStorage.getItem("cocktail-favorites");
    const savedHistory = localStorage.getItem("cocktail-search-history");
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // お気に入りを切り替え
  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
    
    setFavorites(newFavorites);
    localStorage.setItem("cocktail-favorites", JSON.stringify(newFavorites));
  };

  // 検索履歴を更新
  const updateSearchHistory = (searchTerm: string) => {
    if (searchTerm.trim()) {
      const newHistory = [searchTerm, ...searchHistory.filter(term => term !== searchTerm)].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem("cocktail-search-history", JSON.stringify(newHistory));
    }
  };

  // 検索処理
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim()) {
      updateSearchHistory(value);
    }
  };

  // 検索・フィルタ処理
  const filteredRecipes = dummyRecipes.filter((recipe) => {
    const matchBase = base === "" || base === "すべてのベース" || recipe.base === base;
    const matchSearch =
      search === "" ||
      recipe.name.includes(search) ||
      recipe.ingredients.some((ing) => ing.includes(search));
    return matchBase && matchSearch;
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-900 to-amber-800 text-foreground">
      <div className="flex min-h-screen">
        {/* サイドバー */}
        <Sidebar
          selectedBase={base}
          onBaseChange={setBase}
          searchHistory={searchHistory}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />

        {/* メインコンテンツ */}
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="bg-amber-950 shadow p-6 flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold mb-2 text-amber-100">Cocktail Recipe Finder</h1>
            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xl">
              <input
                type="text"
                placeholder="カクテル名や材料で検索..."
                value={search}
                onChange={handleSearch}
                className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring bg-amber-50"
              />
            </div>
          </header>
          
          <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-amber-900 to-amber-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
              {filteredRecipes.length === 0 ? (
                <div className="col-span-full text-center text-amber-100 text-lg">
                  該当するレシピがありません
                </div>
              ) : (
                filteredRecipes.map((recipe) => (
                  <div key={recipe.id} className="bg-amber-50 dark:bg-amber-900 rounded-lg shadow p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="relative">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-32 h-32 object-cover rounded mb-2 border"
                      />
                      <button
                        onClick={() => toggleFavorite(recipe.id)}
                        className={`absolute top-2 right-2 text-2xl ${
                          favorites.includes(recipe.id) ? 'text-red-500' : 'text-gray-400'
                        } hover:text-red-500 transition-colors`}
                      >
                        ♥
                      </button>
                    </div>
                    <h2 className="text-xl font-semibold mb-1 text-center">{recipe.name}</h2>
                    <div className="text-sm text-gray-500 mb-2">ベース: {recipe.base}</div>
                    <ul className="text-sm mb-2 text-center">
                      {recipe.ingredients.slice(0, 3).map((ing, idx) => (
                        <li key={idx}>・{ing}</li>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <li className="text-gray-400">...</li>
                      )}
                    </ul>
                    <Link 
                      href={`/cocktail/${recipe.id}`} 
                      className="mt-2 px-3 py-1 bg-amber-700 text-amber-50 rounded hover:bg-amber-800 transition"
                    >
                      詳細を見る
                    </Link>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}