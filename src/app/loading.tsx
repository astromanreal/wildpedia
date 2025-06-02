import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.14))] flex-col items-center justify-center bg-background p-4 text-center">
      <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
      <h1 className="text-2xl font-semibold text-primary mb-2">Loading Wildpedia</h1>
      <p className="text-muted-foreground">Fetching the wonders of the animal kingdom for you...</p>
    </div>
  );
}
