import { Loader2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function RegionLoading() {
  return (
    <div className="bg-background text-foreground animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative h-[300px] md:h-[400px] w-full mb-8 bg-muted">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
          <Skeleton className="h-12 w-3/4 max-w-lg mb-3" />
          <Skeleton className="h-5 w-full max-w-xl mb-1" />
          <Skeleton className="h-5 w-5/6 max-w-lg" />
        </div>
         <Skeleton className="h-6 w-36 absolute top-4 left-4 rounded-full" />
      </div>

      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <Skeleton className="h-8 w-1/3 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden h-full flex flex-col">
                <Skeleton className="w-full h-40" />
                <CardContent className="p-4 flex-grow flex flex-col">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6 mb-3" />
                  <Skeleton className="h-5 w-24 rounded-full mt-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Placeholder for potential subregion-specific sections like Featured Locations or Ecological Significance */}
        <section className="mb-12">
            <Skeleton className="h-8 w-2/5 mb-6" />
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
             </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-1/2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                </CardContent>
            </Card>
        </section>

      </div>
    </div>
  );
}
