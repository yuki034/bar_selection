"use client";
import { useState } from "react";
import Link from "next/link";
import { dummyRecipes } from "./recipes";

const baseOptions = [
  "すべてのベース",
  "ジン",
  "ラム",
  "ウォッカ",
  "テキーラ",
  "ウイスキー",
  "ブランデー",
  "リキュール",
  "ビール",
  "ワイン",
  "シャンパン",
  "スピリッツ",
  "ノンアルコール",
];

export default function CocktailFinder() {
  const [search, setSearch] = useState("");
  const [base, setBase] = useState("");

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
    <div className="min-h-screen bg-gradient-to-b from-amber-900 to-amber-800 text-foreground">
      <header className="bg-amber-950 shadow p-6 flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold mb-2 text-amber-100">Cocktail Recipe Finder</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xl">
          <input
            type="text"
            placeholder="カクテル名や材料で検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring bg-amber-50"
          />
          <select
            value={base}
            onChange={(e) => setBase(e.target.value)}
            className="px-4 py-2 border rounded bg-amber-50"
          >
            {baseOptions.map((opt) => (
              <option key={opt} value={opt === "すべてのベース" ? "" : opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </header>
      <main className="p-8 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {filteredRecipes.length === 0 ? (
            <div className="col-span-full text-center text-amber-100">該当するレシピがありません</div>
          ) : (
            filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-amber-50 dark:bg-amber-900 rounded-lg shadow p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-32 h-32 object-cover rounded mb-2 border"
                />
                <h2 className="text-xl font-semibold mb-1">{recipe.name}</h2>
                <div className="text-sm text-gray-500 mb-2">ベース: {recipe.base}</div>
                <ul className="text-sm mb-2">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx}>・{ing}</li>
                  ))}
                </ul>
                <Link href={`/cocktail/${recipe.id}`} className="mt-2 px-3 py-1 bg-amber-700 text-amber-50 rounded hover:bg-amber-800 transition">
                  詳細を見る
                </Link>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}