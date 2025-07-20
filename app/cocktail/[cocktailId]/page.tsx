import { Metadata, ResolvingMetadata } from 'next';
import { dummyRecipes } from "../../components/recipes";
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
    title: `${recipe.name} - Cocktail Recipe Finder`,
    description: recipe.description,
    openGraph: {
      title: recipe.name,
      description: recipe.description,
      images: [recipe.image],
    },
  };
}

export default function CocktailDetail({ params }: PageProps) {
  const id = Number(params.cocktailId);
  const recipe = dummyRecipes.find(r => r.id === id);

  if (!recipe) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 to-amber-800 text-foreground flex flex-col items-center p-8">
      <div className="bg-amber-50 dark:bg-amber-900 rounded-lg shadow p-8 flex flex-col items-center max-w-md w-full">
        <img src={recipe.image} alt={recipe.name} className="w-48 h-48 object-cover rounded mb-4 border" />
        <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
        <div className="text-lg text-gray-500 mb-2">ベース: {recipe.base}</div>
        <p className="mb-4 text-base text-amber-900 dark:text-amber-100 font-medium">{recipe.description}</p>
        <ul className="text-base mb-4">
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>・{ing}</li>
          ))}
        </ul>
        <a href="/" className="mt-4 px-4 py-2 bg-amber-700 text-amber-50 rounded hover:bg-amber-800 transition">トップに戻る</a>
      </div>
    </div>
  );
}