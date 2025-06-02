import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function FamilyLoading() {
  return (
    <div className="bg-background text-foreground animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative h-[300px] md:h-[400px] w-full mb-8 bg-muted">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
          <Skeleton className="h-10 w-10 rounded-full mb-3" />
          <Skeleton className="h-12 w-3/4 max-w-md mb-2" />
        </div>
        <Skeleton className="h-6 w-36 absolute top-4 left-4 rounded-full" />
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-12">
          <CardHeader><Skeleton className="h-7 w-1/2" /></CardHeader>
          <CardContent>
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-5/6" />
          </CardContent>
        </Card>

        <section className="mb-12">
          <Skeleton className="h-8 w-1/3 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="flex flex-col">
                <Skeleton className="w-full h-44" />
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="text-sm space-y-1.5 flex-grow">
                  {[...Array(3)].map((_, j) => <Skeleton key={j} className="h-4 w-full" />)}
                </CardContent>
                <div className="p-4 mt-auto border-t">
                    <Skeleton className="h-4 w-1/4 ml-auto" />
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <Skeleton className="h-8 w-2/5 mb-6" />
          <Card>
            <CardContent className="p-6 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
