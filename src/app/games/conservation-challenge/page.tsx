
'use client';

import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Trophy, ArrowLeft } from 'lucide-react';
import ConservationChallenge from '@/components/games/conservation-challenge';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

// Removed export from metadata object as Client Components cannot export static metadata.
// The title for this page will be inherited or can be set dynamically using document.title.
const pageMetadata: Metadata = {
  title: 'Conservation Challenge Quiz - Test Your Eco-Knowledge',
  description: 'Take the Conservation Challenge on Wildpedia! Answer trivia questions about wildlife conservation, endangered species, and environmental efforts.',
  keywords: ['conservation quiz', 'wildlife challenge', 'environmental trivia', 'endangered species game', 'eco knowledge'],
  openGraph: {
    title: 'Conservation Challenge Quiz | Wildpedia',
    description: 'Test your knowledge on wildlife conservation and endangered species.',
    url: `${SITE_URL}/games/conservation-challenge`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og-conservation-challenge.png`, alt: 'Conservation Challenge Quiz' }], // Create public/og-conservation-challenge.png
    article: {
        section: "Games",
        tags: ["quiz", "conservation", "environment", "education"]
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conservation Challenge Quiz | Wildpedia',
    description: 'How much do you know about conservation? Play the quiz!',
    images: [`${SITE_URL}/twitter-conservation-challenge.png`], // Create public/twitter-conservation-challenge.png
  },
};

export default function ConservationChallengePage() {
  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": "Conservation Challenge Quiz",
    "description": "Answer trivia questions about wildlife conservation and endangered species.",
    "gamePlatform": "WebBrowser",
    "url": `${SITE_URL}/games/conservation-challenge`,
    "image": `${SITE_URL}/og-conservation-challenge.png`,
    "author": {
      "@type": "Organization",
      "name": "Wildpedia"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Wildpedia"
    },
    "learningResourceType": "Quiz",
     "audience": {
        "@type": "Audience",
        "audienceType": "General public, Students, Conservation enthusiasts"
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
      <Card className="max-w-2xl mx-auto bg-card shadow-lg border-yellow-300 dark:border-yellow-700">
        <CardHeader className="text-center">
          <Trophy className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
          <CardTitle className="text-3xl font-bold text-primary">Conservation Challenge</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Answer trivia questions about wildlife conservation and endangered species.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <ConservationChallenge />
        </CardContent>
      </Card>
    </div>
  );
}
