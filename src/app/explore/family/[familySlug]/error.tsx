'use client';

import { Button } from '@/components/ui/button';
import { HelpCircle, Home, RotateCcw, ListTree } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function FamilyError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Family Page Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto py-12 px-4 text-center">
      <HelpCircle className="h-16 w-16 text-destructive mx-auto mb-6" />
      <h1 className="text-2xl font-semibold text-destructive mb-3">Could Not Load Family Details</h1>
      <p className="text-muted-foreground mb-2">
        We encountered an issue fetching information for this biological family.
      </p>
      <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
        This might be a temporary problem, or the family details may not be available.
        {error?.message && <span className="block mt-1">Details: {error.message}</span>}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={() => reset()} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" /> Try Again
        </Button>
        <Link href="/explore/family" passHref>
          <Button size="lg">
            <ListTree className="mr-2 h-4 w-4" /> Back to Families
          </Button>
        </Link>
      </div>
    </div>
  );
}
