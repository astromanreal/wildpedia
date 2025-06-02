import { Loader2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AnimalTypeLoading() {
  return (
    <div className="container mx-auto py-12 px-4 animate-pulse">
      <Skeleton className="h-6 w-36 mb-6" /> {/* Back link */}

      <Card className="mb-10">
        <CardHeader>
          <div className="flex items-center gap-3 mb-1">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-1/2" />
          </div>
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6 mt-1" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="overflow-hidden h-full flex flex-col">
            <Skeleton className="w-full h-48" /> {/* Image placeholder */}
            <CardHeader className="p-4">
              <Skeleton className="h-6 w-3/4 mb-1" /> {/* Title */}
              <Skeleton className="h-4 w-1/2 mb-2" /> {/* Scientific Name */}
              <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              <Skeleton className="h-3 w-full mb-1" /> {/* Description line 1 */}
              <Skeleton className="h-3 w-5/6" />      {/* Description line 2 */}
            </CardHeader>
             <div className="p-4 mt-auto border-t">
                 <Skeleton className="h-4 w-1/4 ml-auto" /> {/* Learn More link */}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
