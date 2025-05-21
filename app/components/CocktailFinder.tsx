"use client";
import { useState } from "react";

// ダミーデータ
const dummyRecipes = [
  {
    id: 1,
    name: "ジントニック",
    base: "ジン",
    ingredients: ["ジン", "トニックウォーター", "ライム"],
    image: "https://www.thecocktaildb.com/images/media/drink/qcgz0t1643821443.jpg",
  },
  {
    id: 2,
    name: "モヒート",
    base: "ラム",
    ingredients: ["ラム", "ミント", "ライム", "ソーダ"],
    image: "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
  },
  {
    id: 3,
    name: "カシスオレンジ",
    base: "リキュール",
    ingredients: ["カシスリキュール", "オレンジジュース"],
    image: "https://cocktailrecipe.jp/img/card/cassisOrange.WebP",
  },
  {
    id: 4,
    name: "スクリュードライバー",
    base: "ウォッカ",
    ingredients: ["ウォッカ", "オレンジジュース"],
    image: "https://www.thecocktaildb.com/images/media/drink/8xnyke1504352207.jpg",
  },
  {
    id: 5,
    name: "マルガリータ",
    base: "テキーラ",
    ingredients: ["テキーラ", "コアントロー", "ライムジュース", "塩"],
    image: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
  },
  {
    id: 6,
    name: "ハイボール",
    base: "ウイスキー",
    ingredients: ["ウイスキー", "ソーダ", "レモン"],
    image: "https://prcdn.freetls.fastly.net/release_image/30117/1336/30117-1336-bc22b77cda548a3e2f3b69b3b9e25ca7-600x400.jpg?format=jpeg&auto=webp&fit=bounds&width=720&height=480",
  },
  {
    id: 7,
    name: "キール",
    base: "ワイン",
    ingredients: ["白ワイン", "カシスリキュール"],
    image: "https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg",
  },
  {
    id: 8,
    name: "シャンディガフ",
    base: "ビール",
    ingredients: ["ビール", "ジンジャーエール"],
    image: "data:image/jpeg;base64,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",
  },
  {
    id:9,
    name: "ギムレット",
    base: "ジン",
    ingredients: ["ジン", "ライムジュース"],
    image: "data:image/jpeg;base64,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"
  },
  {
    id:10,
    name: "グラスホッパー",
    base:"リキュール",
    ingredients:["カカオリキュール 20ml", "ペパーミントリキュール 20ml", "生クリーム 20ml"],
    image:"https://img.freepik.com/premium-photo/grasshopper-drink-with-cherr-isolated-black-backgroudn_149482-31.jpg?w=360",
  },
];

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
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}