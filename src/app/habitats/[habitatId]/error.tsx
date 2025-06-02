'use client';

import { Button } from '@/components/ui/button';
import { MapPin, Home, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function HabitatError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Habitat Page Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto py-12 px-4 text-center">
      <MapPin className="h-16 w-16 text-destructive mx-auto mb-6" />
      <h1 className="text-2xl font-semibold text-destructive mb-3">Could Not Load Habitat Details</h1>
      <p className="text-muted-foreground mb-2">
        We're sorry, but there was an issue fetching information for this habitat.
      </p>
      <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
        It might be a temporary glitch, or the habitat profile may not exist.
        {error?.message && <span className="block mt-1">Details: {error.message}</span>}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={() => reset()} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" /> Try Again
        </Button>
        <Link href="/habitats" passHref>
          <Button size="lg">
            <Home className="mr-2 h-4 w-4" /> Back to Habitats
          </Button>
        </Link>
      </div>
    </div>
  );
}
