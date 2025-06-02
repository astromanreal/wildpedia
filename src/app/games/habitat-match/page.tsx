'use client';

import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Puzzle, ArrowLeft } from 'lucide-react';
import HabitatMatchGame from '@/components/games/habitat-match-game';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

// Removed export from metadata object as Client Components cannot export static metadata.
// The title for this page will be inherited or can be set dynamically using document.title.
const pageMetadata: Metadata = {
  title: 'Habitat Match Game - Connect Animals to Their Homes',
  description: 'Play the Habitat Match Game on Wildpedia! Drag and drop animals to their correct natural habitats and learn about different ecosystems.',
  keywords: ['habitat game', 'animal matching game', 'ecosystem quiz', 'learn habitats', 'wildlife education game'],
  openGraph: {
    title: 'Habitat Match Game | Wildpedia',
    description: 'Match animals to their habitats in this interactive game.',
    url: `${SITE_URL}/games/habitat-match`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og-habitat-match.png`, alt: 'Habitat Match Game' }], // Create public/og-habitat-match.png
     article: {
        section: "Games",
        tags: ["game", "habitats", "animals", "matching", "education"]
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Habitat Match Game | Wildpedia',
    description: 'Can you match these animals to their correct homes? Play now!',
    images: [`${SITE_URL}/twitter-habitat-match.png`], // Create public/twitter-habitat-match.png
  },
};

export default function HabitatMatchPage() {
  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": "Habitat Match Game",
    "description": "Drag and drop animals to their correct natural habitats.",
    "gamePlatform": "WebBrowser",
    "url": `${SITE_URL}/games/habitat-match`,
    "image": `${SITE_URL}/og-habitat-match.png`,
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
      <Card className="max-w-4xl mx-auto bg-card shadow-lg border-green-300 dark:border-green-700">
        <CardHeader className="text-center">
          <Puzzle className="h-12 w-12 mx-auto text-green-500 mb-4" />
          <CardTitle className="text-3xl font-bold text-primary">Habitat Match Game</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Drag and drop animals to their correct natural habitats.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <HabitatMatchGame />
        </CardContent>
      </Card>
    </div>
  );
}
