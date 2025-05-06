'use client'; // Required for interaction

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Puzzle, ArrowLeft } from 'lucide-react';
import HabitatMatchGame from '@/components/games/habitat-match-game'; // Import the actual game component

export default function HabitatMatchPage() {
  return (
    <div className="container mx-auto py-12 px-4">
       <Link href="/games" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
         <ArrowLeft className="h-4 w-4" /> Back to Games
       </Link>
      <Card className="max-w-4xl mx-auto bg-card shadow-lg border-green-300 dark:border-green-700">
        <CardHeader className="text-center">
          <Puzzle className="h-12 w-12 mx-auto text-green-500 mb-4" />
          <CardTitle className="text-3xl font-bold text-primary">Habitat Match Game</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Drag and drop animals to their correct natural habitats.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           {/* Render the actual game component */}
           <HabitatMatchGame />
        </CardContent>
      </Card>
    </div>
  );
}
