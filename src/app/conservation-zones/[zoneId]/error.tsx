'use client';

import { Button } from '@/components/ui/button';
import { Globe, Home, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function ZoneError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Conservation Zone Page Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto py-12 px-4 text-center">
      <Globe className="h-16 w-16 text-destructive mx-auto mb-6" />
      <h1 className="text-2xl font-semibold text-destructive mb-3">Could Not Load Conservation Zone</h1>
      <p className="text-muted-foreground mb-2">
        We encountered an issue fetching details for this conservation zone.
      </p>
       <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
        This zone might not exist or there could be a temporary problem.
        {error?.message && <span className="block mt-1">Details: {error.message}</span>}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={() => reset()} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" /> Try Again
        </Button>
        <Link href="/conservation-zones" passHref>
          <Button size="lg">
            <Home className="mr-2 h-4 w-4" /> Back to Zones List
          </Button>
        </Link>
      </div>
    </div>
  );
}
