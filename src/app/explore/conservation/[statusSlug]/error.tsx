'use client';

import { Button } from '@/components/ui/button';
import { ListFilter, Home, RotateCcw, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function ConservationStatusError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Conservation Status Page Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto py-12 px-4 text-center">
      <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-6" />
      <h1 className="text-2xl font-semibold text-destructive mb-3">Error Loading Animal List</h1>
      <p className="text-muted-foreground mb-2">
        We couldn't retrieve the list of animals for this conservation status.
      </p>
      <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
        This might be a temporary issue or the status might not be valid.
        {error?.message && <span className="block mt-1">Details: {error.message}</span>}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={() => reset()} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" /> Try Again
        </Button>
        <Link href="/explore/conservation" passHref>
          <Button size="lg">
            <ListFilter className="mr-2 h-4 w-4" /> Choose Different Status
          </Button>
        </Link>
      </div>
    </div>
  );
}
