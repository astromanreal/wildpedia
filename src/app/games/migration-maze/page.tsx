'use client';

import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Footprints, ArrowLeft } from 'lucide-react';
import MigrationMazeGame from '@/components/games/migration-maze';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

// Removed export from metadata object as Client Components cannot export static metadata.
// The title for this page will be inherited or can be set dynamically using document.title.
const pageMetadata: Metadata = {
  title: 'Migration Maze Game - Guide Animals on Their Journeys',
  description: 'Play the Migration Maze game on Wildpedia! Help animals navigate challenging mazes representing their migration routes. Avoid obstacles and reach the destination safely.',
  keywords: ['migration game', 'animal maze', 'maze game', 'wildlife journey', 'educational game animals'],
  openGraph: {
    title: 'Migration Maze Game | Wildpedia',
    description: 'Guide migrating animals through mazes in this fun challenge.',
    url: `${SITE_URL}/games/migration-maze`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og-migration-maze.png`, alt: 'Migration Maze Game' }], // Create public/og-migration-maze.png
     article: {
        section: "Games",
        tags: ["game", "maze", "migration", "animals", "education"]
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Migration Maze Game | Wildpedia',
    description: 'Help animals complete their epic migrations. Play the maze game!',
    images: [`${SITE_URL}/twitter-migration-maze.png`], // Create public/twitter-migration-maze.png
  },
};

export default function MigrationMazePage() {
   const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": "Migration Maze Game",
    "description": "Guide the animals through challenging mazes representing their migration routes.",
    "gamePlatform": "WebBrowser",
    "url": `${SITE_URL}/games/migration-maze`,
    "image": `${SITE_URL}/og-migration-maze.png`,
     "author": {
      "@type": "Organization",
      "name": "Wildpedia"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Wildpedia"
    },
    "learningResourceType": "Game",
     "audience": {
        "@type": "Audience",
        "audienceType": "General public, Children, Students"
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }}
      />
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
           <MigrationMazeGame />
        </CardContent>
      </Card>
    </div>
  );
}
