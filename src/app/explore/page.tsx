import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mountain, MapPinned, PawPrint, Dna, HeartHandshake, Globe, Home } from 'lucide-react'; // Nature/category icons
import { ArrowLeft } from 'lucide-react'; // Added back arrow

const categories = [
  { name: 'Habitat', icon: Mountain, slug: 'habitat', description: 'Animals by their environment' },
  { name: 'Biological Family', icon: Dna, slug: 'family', description: 'Grouped by scientific families' },
  { name: 'Animal Type', icon: PawPrint, slug: 'type', description: 'Mammals, Birds, Fish, etc.' },
  { name: 'Conservation Status', icon: HeartHandshake, slug: 'conservation', description: 'Endangered, Vulnerable, etc.' },
  { name: 'Domesticity', icon: Home, slug: 'domesticity', description: 'Kept by humans or living free' }, // Updated name
  { name: 'Geographic Region', icon: Globe, slug: 'region', description: 'Animals by continent or area' },
];

export default function ExploreAnimalsPage() { // Renamed component for clarity
  return (
    <div className="container mx-auto py-16 px-4 perspective-1000"> {/* Increased top padding and added perspective */}
       <Link href="/" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
           <ArrowLeft className="h-4 w-4" /> Back to Home
       </Link>
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-center text-primary">Explore Animals</h1>
      <p className="mb-12 text-lg text-center text-muted-foreground max-w-2xl mx-auto">
        Dive deeper into the animal kingdom by exploring different classifications. Select a category below to start.
      </p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"> {/* Increased gap */}
        {categories.map((category) => (
          <Link key={category.slug} href={`/explore/${category.slug}`} passHref>
            <Card className="
              transform-style-preserve-3d transition-transform duration-500 ease-out
              hover:scale-105 hover:shadow-2xl hover:rotate-y-5 hover:rotate-x-2
              cursor-pointer h-full flex flex-col bg-card border border-border/50 hover:border-accent/50 group relative overflow-hidden
            ">
               <div className="absolute inset-0 bg-gradient-to-br from-card via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backface-hidden"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 z-10">
                <CardTitle className="text-xl font-semibold text-primary">{category.name}</CardTitle>
                <category.icon className="h-6 w-6 text-accent" />
              </CardHeader>
              <CardContent className="flex-grow z-10">
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
       {/* Placeholder for future Search and Filter component */}
      {/* <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">Search & Filter</h2>
        <p className="text-center text-muted-foreground">Coming soon: Powerful tools to find specific animals.</p>
      </div> */}
    </div>
  );
}