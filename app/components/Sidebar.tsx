"use client";
import { useState } from "react";
import Link from "next/link";
import { dummyRecipes } from "./recipes";

interface SidebarProps {
  selectedBase: string;
  onBaseChange: (base: string) => void;
  searchHistory: string[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
}

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

// 人気カクテル（IDで指定）
const popularCocktails = [1, 2, 5, 12, 14]; // ジントニック、モヒート、マルガリータ、マティーニ、ブラッディマリー

export default function Sidebar({ selectedBase, onBaseChange, searchHistory, favorites, onToggleFavorite }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const popularRecipes = dummyRecipes.filter(recipe => popularCocktails.includes(recipe.id));
  const favoriteRecipes = dummyRecipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <div className={`bg-amber-950 text-amber-100 min-h-screen transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col`}>
      {/* ヘッダー */}
      <div className="p-4 border-b border-amber-800 flex items-center justify-between">
        {!isCollapsed && <h2 className="font-bold text-lg">メニュー</h2>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-amber-800 rounded"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* ベース酒フィルター */}
      <div className="p-4 border-b border-amber-800">
        {!isCollapsed && <h3 className="font-semibold mb-3">ベース酒</h3>}
        <div className="space-y-2">
          {baseOptions.map((base) => (
            <button
              key={base}
              onClick={() => onBaseChange(base === "すべてのベース" ? "" : base)}
              className={`w-full text-left p-2 rounded transition ${
                selectedBase === (base === "すべてのベース" ? "" : base)
                  ? 'bg-amber-700 text-white'
                  : 'hover:bg-amber-800'
              } ${isCollapsed ? 'text-center' : ''}`}
            >
              {isCollapsed ? base.charAt(0) : base}
            </button>
          ))}
        </div>
      </div>

      {/* 人気カクテル */}
      <div className="p-4 border-b border-amber-800">
        {!isCollapsed && <h3 className="font-semibold mb-3">人気カクテル</h3>}
        <div className="space-y-2">
          {popularRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/cocktail/${recipe.id}`}
              className="block p-2 hover:bg-amber-800 rounded transition"
            >
              {isCollapsed ? (
                <div className="text-center">
                  <div className="text-xs">🍸</div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-sm">{recipe.name}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onToggleFavorite(recipe.id);
                    }}
                    className={`text-lg ${favorites.includes(recipe.id) ? 'text-red-400' : 'text-gray-400'}`}
                  >
                    ♥
                  </button>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* お気に入り */}
      {favorites.length > 0 && (
        <div className="p-4 border-b border-amber-800">
          {!isCollapsed && <h3 className="font-semibold mb-3">お気に入り</h3>}
          <div className="space-y-2">
            {favoriteRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/cocktail/${recipe.id}`}
                className="block p-2 hover:bg-amber-800 rounded transition"
              >
                {isCollapsed ? (
                  <div className="text-center">
                    <div className="text-xs">❤️</div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{recipe.name}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onToggleFavorite(recipe.id);
                      }}
                      className="text-lg text-red-400"
                    >
                      ♥
                    </button>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 検索履歴 */}
      {searchHistory.length > 0 && (
        <div className="p-4">
          {!isCollapsed && <h3 className="font-semibold mb-3">検索履歴</h3>}
          <div className="space-y-2">
            {searchHistory.slice(0, isCollapsed ? 3 : 5).map((term, index) => (
              <div
                key={index}
                className={`p-2 rounded bg-amber-800/50 ${isCollapsed ? 'text-center text-xs' : 'text-sm'}`}
              >
                {isCollapsed ? term.charAt(0) : term}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* フッター */}
      <div className="mt-auto p-4 border-t border-amber-800">
        {!isCollapsed && (
          <div className="text-xs text-amber-300">
            <p>カクテルレシピ</p>
            <p>Finder</p>
          </div>
        )}
      </div>
    </div>
  );
} 