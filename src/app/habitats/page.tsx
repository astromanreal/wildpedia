import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getAllHabitats } from '@/services/habitat-info'; // Fetch habitat data
import { ArrowLeft } from 'lucide-react';

export default async function HabitatsListPage() {
  const habitats = await getAllHabitats();

  return (
    <div className="container mx-auto py-12 px-4 perspective-1000">
      <Link href="/" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
         <ArrowLeft className="h-4 w-4" /> Back to Explore
      </Link>
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-center text-primary">Explore Wildlife Habitats</h1>
      <p className="mb-12 text-lg text-center text-muted-foreground max-w-2xl mx-auto">
        Discover the diverse environments where wildlife thrives. Learn about the unique characteristics, climate, inhabitants, and conservation challenges of each habitat.
      </p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {habitats.map((habitat) => (
          <Link key={habitat.id} href={`/habitats/${habitat.id}`} passHref>
            <Card className="
              transform-style-preserve-3d transition-transform duration-500 ease-out
              hover:scale-105 hover:shadow-2xl hover:rotate-y-3 hover:rotate-x-1
              cursor-pointer h-full flex flex-col bg-card border border-border/50 hover:border-accent/50 group relative overflow-hidden
            ">
               <div className="absolute inset-0 bg-gradient-to-br from-card via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backface-hidden"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 z-10">
                <CardTitle className="text-xl font-semibold text-primary">{habitat.name}</CardTitle>
                <habitat.icon className="h-6 w-6 text-accent" />
              </CardHeader>
              <CardContent className="flex-grow z-10">
                {/* Short description could be added here if available in data */}
                <p className="text-sm text-muted-foreground line-clamp-3">{habitat.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}