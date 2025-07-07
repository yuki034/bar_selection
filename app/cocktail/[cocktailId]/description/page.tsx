import { dummyRecipes } from "../../../components/recipes";
import { notFound } from "next/navigation";

export default function CocktailDescription({ params }: { params: { cocktailId: string } }) {
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