import { Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ConservationStatusLoading() {
  return (
    <div className="container mx-auto py-12 px-4 animate-pulse">
      <Skeleton className="h-6 w-32 mb-6" /> {/* Back link */}
      
      <Card className="mb-10">
        <CardHeader className="items-center text-center pt-8">
          <Skeleton className="h-16 w-16 rounded-full mb-3" />
          <Skeleton className="h-10 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-5 w-full max-w-2xl mx-auto" />
           <Skeleton className="h-5 w-5/6 max-w-xl mx-auto mt-1" />
        </CardHeader>
      </Card>

      <Skeleton className="h-8 w-1/2 mx-auto mb-8" /> {/* Section Title */}

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
