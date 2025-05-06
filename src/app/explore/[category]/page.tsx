'use client'; // Keep as client component for potential future filtering/sorting

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PawPrint, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react'; // Import useEffect and useState

// --- Mock Animal Data ---
// Define different lists for different categories for demonstration
// In a real app, this data would come from an API or database based on the category
const allAnimals = [
  { id: 'lion', name: 'Lion', description: 'Majestic feline of Africa.', image: 'https://cdn.pixabay.com/photo/2020/05/15/15/13/baby-lion-5173894_1280.jpg', dataAiHint: 'lion savanna', category: 'habitat' },
  { id: 'penguin', name: 'Penguin', description: 'Flightless bird of the Southern Hemisphere.', image: 'https://cdn.pixabay.com/photo/2014/08/27/12/58/emperor-penguins-429128_1280.jpg', dataAiHint: 'penguin arctic ice', category: 'region' },
  { id: 'elephant', name: 'Elephant', description: 'Largest land mammal.', image: 'https://cdn.pixabay.com/photo/2017/12/03/17/23/fantasy-2995326_1280.jpg', dataAiHint: 'elephant africa safari', category: 'type' },
  { id: 'dolphin', name: 'Dolphin', description: 'Intelligent marine mammal.', image: 'https://cdn.pixabay.com/photo/2017/01/12/15/41/dolphin-1974975_1280.jpg', dataAiHint: 'dolphin ocean water', category: 'habitat' },
  { id: 'eagle', name: 'Eagle', description: 'Large bird of prey.', image: 'https://cdn.pixabay.com/photo/2021/04/20/17/05/adler-6194438_1280.jpg', dataAiHint: 'eagle mountain sky', category: 'type' },
  { id: 'frog', name: 'Frog', description: 'Amphibian known for its jumping.', image: 'https://cdn.pixabay.com/photo/2014/10/05/11/26/tree-frog-474949_1280.jpg', dataAiHint: 'frog pond water lily', category: 'type' },
  { id: 'tiger', name: 'Tiger', description: 'Largest cat species.', image: 'https://cdn.pixabay.com/photo/2012/11/28/09/50/tigers-67577_1280.jpg', dataAiHint: 'tiger jungle stripes', category: 'conservation' },
  { id: 'red-panda', name: 'Red Panda', description: 'Arboreal mammal native to Himalayas.', image: 'https://cdn.pixabay.com/photo/2022/12/05/17/49/red-panda-7637280_1280.jpg', dataAiHint: 'red panda tree bamboo', category: 'family' },
   { id: 'dog', name: 'Domestic Dog', description: 'Commonly kept companion animal.', image: 'https://cdn.pixabay.com/photo/2020/11/17/18/20/dog-5753302_1280.jpg', dataAiHint: 'dog golden retriever pet', category: 'domesticity' },
   { id: 'cat', name: 'Domestic Cat', description: 'Small carnivorous mammal.', image: 'https://cdn.pixabay.com/photo/2018/07/13/10/20/kittens-3535404_1280.jpg', dataAiHint: 'cat tabby pet domestic', category: 'domesticity' },
   { id: 'polar-bear', name: 'Polar Bear', description: 'Large bear native to the Arctic.', image: 'https://cdn.pixabay.com/photo/2023/04/28/05/43/polar-bear-7955893_1280.jpg', dataAiHint: 'polar bear arctic snow', category: 'region' },
];

// --- Mock Data Fetching Function ---
// Simulates fetching data based on category
async function fetchAnimalsByCategory(categorySlug: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 150));

  // Filter the animals based on the mock category property
  // In a real app, you'd replace this with an API call like:
  // const response = await fetch(`/api/animals?category=${categorySlug}`);
  // return await response.json();

  const filteredAnimals = allAnimals.filter(animal => animal.category === categorySlug);

  // If no direct match, return a generic subset or empty array
  if (filteredAnimals.length > 0) {
    return filteredAnimals;
  } else {
    // Fallback: Return a slice of all animals or an empty array
    // For demonstration, return first 3 if no match found
    // return allAnimals.slice(0, 3);
    return []; // Return empty if no specific data for category
  }
}

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [animals, setAnimals] = useState<typeof allAnimals>([]);
  const [isLoading, setIsLoading] = useState(true); // Start in loading state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      setIsLoading(true);
      setError(null);
      fetchAnimalsByCategory(category)
        .then(data => {
          setAnimals(data);
        })
        .catch(err => {
          console.error("Error fetching animals:", err);
          setError("Failed to load animals for this category.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
        setIsLoading(false); // No category param, stop loading
    }
  }, [category]); // Re-run effect when category changes

  const formattedCategory = category
    ? category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : 'Animals';

  return (
    <div className="container mx-auto py-12 px-4">
      <Link href="/explore" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">&larr; Back to Explore Categories</Link>
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-primary">{formattedCategory}</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : error ? (
         <p className="text-center text-destructive mt-12">{error}</p>
      ) : animals.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {animals.map((animal) => (
            <Link key={animal.id} href={`/animal/${animal.id}`} passHref>
               <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col bg-card hover:border-accent/50">
                <CardHeader className="p-0">
                 <Image
                    src={animal.image}
                    alt={`Image of ${animal.name}`}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                    data-ai-hint={animal.dataAiHint}
                  />
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-xl font-semibold mb-2 text-primary">{animal.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{animal.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground mt-12">No animals found in the '{formattedCategory}' category yet.</p>
      )}
    </div>
  );
}
