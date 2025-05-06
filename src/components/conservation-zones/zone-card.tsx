import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ConservationZone } from '@/data/conservation-zones-data';
import { MapPin } from 'lucide-react';

interface ZoneCardProps {
  zone: ConservationZone;
}

export default function ZoneCard({ zone }: ZoneCardProps) {
  return (
    <Link href={`/conservation-zones/${zone.id}`} passHref>
      <Card className="
        overflow-hidden h-full flex flex-col bg-card border border-border/50 hover:border-primary/50
        hover:shadow-xl transition-all duration-300 group cursor-pointer
        transform-style-preserve-3d hover:scale-[1.03] hover:-rotate-y-1
      ">
         <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backface-hidden z-0"></div>
        <CardHeader className="p-0 relative z-10">
          <Image
            src={zone.image}
            alt={`Image of ${zone.name}`}
            width={400}
            height={200}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={zone.dataAiHint}
          />
           <Badge variant="secondary" className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">{zone.category}</Badge>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col z-10">
          <CardTitle className="text-xl font-semibold mb-1 text-primary group-hover:text-accent transition-colors duration-300">{zone.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
             <MapPin size={14} /> {zone.location}
          </CardDescription>
          <div className="text-xs text-foreground mt-auto pt-2 border-t border-border/30">
             <p><span className="font-medium text-muted-foreground">Key Species:</span> {zone.keySpecies.slice(0, 2).join(', ')}...</p>
             <p><span className="font-medium text-muted-foreground">Area:</span> {zone.area}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
