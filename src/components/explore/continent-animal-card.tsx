
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ContinentAnimal } from '@/data/continent-data';
import { PawPrint, Info, Utensils, ShieldCheck } from 'lucide-react';

interface ContinentAnimalCardProps {
  animal: ContinentAnimal;
  continentSlug: string;
}

export default function ContinentAnimalCard({ animal, continentSlug }: ContinentAnimalCardProps) {
  const animalImage = `https://placehold.co/300x200.png?text=${encodeURIComponent(animal.imagePlaceholderText)}`;

  return (
    <Card className="overflow-hidden h-full flex flex-col group bg-card border border-border/50 hover:shadow-lg transition-shadow duration-200">
      <Link href={`/animal/${animal.id}`} passHref className="block">
        <CardHeader className="p-0 relative">
          <Image
            src={animalImage}
            alt={`Image of ${animal.name}`}
            width={300}
            height={200}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={animal.dataAiHint}
          />
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow flex flex-col">
        <Link href={`/animal/${animal.id}`} passHref>
          <CardTitle className="text-xl font-semibold mb-2 text-primary group-hover:text-accent transition-colors">
            {animal.name}
          </CardTitle>
        </Link>
        <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
          <p className="flex items-center gap-1.5"><PawPrint size={14} className="text-accent" /> <strong>Habitat:</strong> {animal.habitat}</p>
          <p className="flex items-center gap-1.5"><Utensils size={14} className="text-accent" /> <strong>Diet:</strong> {animal.diet}</p>
          <p className="flex items-center gap-1.5"><Info size={14} className="text-accent" /> <strong>Fact:</strong> {animal.fact}</p>
        </div>
        <div className="mt-auto">
          <Badge variant="outline" className="flex items-center gap-1.5 text-xs py-1 px-2 w-fit">
            <ShieldCheck size={14} className="text-accent" /> Status: {animal.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

    