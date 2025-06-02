import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { PawPrint } from 'lucide-react';

interface AnimalSuggestionCardProps {
  animalName: string;
}

export default function AnimalSuggestionCard({ animalName }: AnimalSuggestionCardProps) {
  // Convert name to a URL-friendly slug (simple version)
  const slug = animalName.toLowerCase().replace(/\s+/g, '-');

  // Use placehold.co for more descriptive placeholders
  const placeholderImage = `https://placehold.co/200x150.png?text=${encodeURIComponent(animalName)}`;

  return (
    <Link href={`/animal/${slug}`} passHref>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer h-full bg-card hover:border-primary/30">
        <Image
          src={placeholderImage}
          alt={`Image of ${animalName}`}
          width={200}
          height={150}
          className="w-full h-24 object-cover"
           data-ai-hint={`${animalName} animal wildlife`}
        />
        <CardContent className="p-3">
          <CardTitle className="text-base font-medium flex items-center gap-2 text-primary">
             <PawPrint className="h-4 w-4 text-accent"/>
             {animalName}
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}
