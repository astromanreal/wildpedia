'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Encountered:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center bg-background text-foreground">
      <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
      <h1 className="text-3xl font-bold text-destructive mb-3">Oops! Something Went Wrong</h1>
      <p className="text-lg text-muted-foreground mb-1">
        We encountered an unexpected issue.
      </p>
      {error?.message && (
        <p className="text-sm text-muted-foreground max-w-md mb-6">
          Error details: {error.message}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => reset()}
          variant="outline"
          size="lg"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Link href="/" passHref>
          <Button size="lg">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
