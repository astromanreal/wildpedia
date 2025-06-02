
import type { AnimalInfo } from '@/services/animal-info';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PawPrint, ShieldCheck, Tag } from 'lucide-react'; // Added Tag for category

interface AnimalSummaryCardProps {
  animal: AnimalInfo;
}

function getConservationStatusColorClass(status: AnimalInfo['conservationStatus']): string {
  switch (status) {
    case 'Critically Endangered':
    case 'Endangered':
    case 'Extinct in the Wild':
    case 'Extinct':
      return 'bg-destructive/20 text-destructive border-destructive/30';
    case 'Vulnerable':
      return 'bg-orange-500/20 text-orange-600 border-orange-500/30 dark:text-orange-400';
    case 'Near Threatened':
      return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30 dark:text-yellow-400';
    case 'Least Concern':
      return 'bg-green-500/20 text-green-600 border-green-500/30 dark:text-green-400';
    case 'Data Deficient':
    case 'Not Evaluated':
    default:
      return 'bg-muted/50 text-muted-foreground border-muted-foreground/30';
  }
}

export default function AnimalSummaryCard({ animal }: AnimalSummaryCardProps) {
  const placeholderImage = animal.mediaUrls[0] || `https://picsum.photos/seed/${animal.id}/300/200`;
  const statusColorClass = getConservationStatusColorClass(animal.conservationStatus);

  return (
    <Link href={`/animal/${animal.id}`} passHref>
      <Card className="
        overflow-hidden h-full flex flex-col bg-card border border-border/50 hover:border-primary/50
        hover:shadow-xl transition-all duration-300 group cursor-pointer
        transform-style-preserve-3d hover:scale-[1.03] hover:-rotate-y-1
      ">
        <CardHeader className="p-0 relative z-10">
          <Image
            src={placeholderImage}
            alt={`Image of ${animal.commonName}`}
            width={300}
            height={200}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={`${animal.commonName} ${animal.habitat}`}
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col z-10">
          <CardTitle className="text-xl font-semibold mb-1 text-primary group-hover:text-accent transition-colors duration-300 line-clamp-1">
            {animal.commonName}
          </CardTitle>
          <CardDescription className="text-xs italic text-muted-foreground mb-2 line-clamp-1">
            {animal.scientificName}
          </CardDescription>

          <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
            <Badge variant="outline" className="text-xs py-0.5 px-1.5 flex items-center gap-1 bg-secondary/50 border-secondary">
                <Tag size={12}/> {animal.category}
            </Badge>
            <Badge variant="outline" className={`text-xs py-0.5 px-1.5 flex items-center gap-1 ${statusColorClass}`}>
                <ShieldCheck size={12}/> {animal.conservationStatus}
            </Badge>
          </div>

          <p className="text-xs text-foreground line-clamp-2 flex-grow">
            {animal.description}
          </p>

          <div className="mt-auto pt-2 border-t border-border/20 text-right">
            <span className="text-xs text-accent group-hover:underline">
                Learn More &rarr;
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
