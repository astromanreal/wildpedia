
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mountain, PawPrint, Dna, HeartHandshake, Globe, Home } from 'lucide-react'; // Nature/category icons

const categories = [
  { name: 'Explore by Habitat', icon: Mountain, slug: 'habitat', description: 'Discover animals based on their natural environments like forests, oceans, or deserts.' },
  { name: 'Explore by Animal Type', icon: PawPrint, slug: 'type', description: 'Browse species by their biological classification such as mammals, birds, reptiles, etc.' },
  { name: 'Explore by Conservation Status', icon: HeartHandshake, slug: 'conservation', description: 'Learn about animals based on their IUCN Red List status (e.g., Endangered, Vulnerable).' },
  { name: 'Explore by Biological Family', icon: Dna, slug: 'family', description: 'Group animals by their scientific families to see related species.' },
  { name: 'Explore by Domesticity', icon: Home, slug: 'domesticity', description: 'Differentiate between animals kept by humans and those living freely in the wild.' },
  { name: 'Explore by Geographic Region', icon: Globe, slug: 'region', description: 'Find animals based on the continent or specific geographic area they inhabit.' },
];

// Renamed component to avoid conflict if ExplorePage is used elsewhere
export default function ExploreCategoriesPage() {
  return (
    <div className="container mx-auto py-16 px-4 perspective-1000"> {/* Increased top padding and added perspective */}
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-center text-primary">Explore Wildlife</h1>
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
    </div>
  );
}
