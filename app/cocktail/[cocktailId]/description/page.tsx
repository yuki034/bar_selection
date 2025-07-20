import { Metadata, ResolvingMetadata } from 'next';
import { dummyRecipes } from "../../../components/recipes";
import { notFound } from "next/navigation";

// 正しいPagePropsの定義を使用
interface PageProps {
  params: {
    cocktailId: string;
  };
}

// メタデータを動的に生成
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = Number(params.cocktailId);
  const recipe = dummyRecipes.find(r => r.id === id);

  if (!recipe) {
    return {
      title: 'カクテルが見つかりません',
    };
  }

  return {
    title: `${recipe.name} - 詳細説明 - Cocktail Recipe Finder`,
    description: recipe.description,
  };
}

export default function CocktailDescription({ params }: PageProps) {
  const id = Number(params.cocktailId);
  const recipe = dummyRecipes.find(r => r.id === id);

  if (!recipe) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 to-amber-800 text-foreground flex flex-col items-center p-8">
      <div className="bg-amber-50 dark:bg-amber-900 rounded-lg shadow p-8 flex flex-col items-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
        <p className="text-lg text-amber-900 dark:text-amber-100 font-medium mb-8">{recipe.description}</p>
        <a href={`/cocktail/${recipe.id}`} className="px-4 py-2 bg-amber-700 text-amber-50 rounded hover:bg-amber-800 transition">カクテル詳細へ戻る</a>
      </div>
    </div>
  );
} 