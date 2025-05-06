'use client'; // Required for potential future interaction

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Footprints, ArrowLeft } from 'lucide-react';
import MigrationMazeGame from '@/components/games/migration-maze'; // Import the actual game component

export default function MigrationMazePage() {
  return (
    <div className="container mx-auto py-12 px-4">
       <Link href="/games" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
         <ArrowLeft className="h-4 w-4" /> Back to Games
       </Link>
      <Card className="max-w-4xl mx-auto bg-card shadow-lg border-orange-300 dark:border-orange-700">
        <CardHeader className="text-center">
          <Footprints className="h-12 w-12 mx-auto text-orange-500 mb-4" />
          <CardTitle className="text-3xl font-bold text-primary">Migration Maze</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Guide the animals through challenging mazes representing their migration routes. Avoid obstacles and reach the destination!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           {/* Render the actual game component */}
           <MigrationMazeGame />
        </CardContent>
      </Card>
    </div>
  );
}
