
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PawPrint, BookOpen, Mountain, ShieldCheck, Globe, Users, Skull } from 'lucide-react';

const features = [
  {
    title: 'In-Depth Animal Profiles',
    description: 'Explore detailed information about hundreds of species, their habitats, behaviors, and conservation status.',
    icon: BookOpen,
    link: '/explore/type/mammal', // Link to a general starting point
    cta: 'Discover Species',
  },
  {
    title: 'Journey Through Ecosystems',
    description: 'Discover diverse habitats, from dense rainforests to arid deserts, and the unique animals that call them home.',
    icon: Mountain,
    link: '/habitats',
    cta: 'Explore Habitats',
  },
  {
    title: 'Conservation Central',
    description: 'Learn about conservation efforts, protected zones, and the challenges facing wildlife today.',
    icon: ShieldCheck,
    link: '/conservation-zones',
    cta: 'Learn About Conservation',
  },
  {
    title: 'Wildlife Loss & Extinction',
    description: 'Understand the critical issues of biodiversity loss and the factors driving species extinction.',
    icon: Skull,
    link: '/loss-extinction',
    cta: 'Understand the Crisis',
  },
];

export default function KeyFeaturesSection() {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 flex items-center justify-center gap-3">
            <Globe className="h-8 w-8 text-accent" />
            Dive Deeper into Wildpedia
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Beyond categories, explore dedicated sections covering every aspect of the animal kingdom.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden border-border/50 group">
              <CardHeader className="pt-6 pb-3"> {/* Adjusted padding */}
                <div className="flex items-center gap-3 mb-1"> {/* Increased gap for icon and title */}
                    <feature.icon className="h-7 w-7 text-accent" /> {/* Slightly larger icon */}
                    <CardTitle className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-0 pb-4"> {/* Adjusted padding */}
                <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
              </CardContent>
              <div className="p-4 mt-auto text-left border-t border-border/20">
                <Link href={feature.link} passHref>
                  <Button variant="outline" className="w-full sm:w-auto group-hover:border-accent group-hover:text-accent transition-colors">
                    {feature.cta} &rarr;
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
