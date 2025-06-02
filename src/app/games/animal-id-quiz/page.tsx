'use client';

import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { BrainCircuit, ArrowLeft } from 'lucide-react';
import AnimalIdQuiz from '@/components/games/animal-id-quiz';

// Although this is a client component, metadata can be defined for initial load / SSR
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

// Removed export from metadata object as Client Components cannot export static metadata.
// The title for this page will be inherited or can be set dynamically using document.title.
const pageMetadata: Metadata = {
  title: 'Animal Identification Quiz - Test Your Wildlife Knowledge',
  description: 'Play the Animal Identification Quiz on Wildpedia! Recognize different species from images or descriptions and see how much you know about the animal kingdom.',
  keywords: ['animal quiz', 'identification game', 'wildlife trivia', 'species quiz', 'learn animals'],
  openGraph: {
    title: 'Animal Identification Quiz | Wildpedia',
    description: 'Test your animal recognition skills with this fun quiz!',
    url: `${SITE_URL}/games/animal-id-quiz`,
    type: 'article', // 'Game' type in schema.org, 'article' for OG is fine
    images: [{ url: `${SITE_URL}/og-animal-quiz.png`, alt: 'Animal Identification Quiz' }], // Create public/og-animal-quiz.png
    article: { // Optional for games, but can provide context
        section: "Games",
        tags: ["quiz", "animals", "identification", "education"]
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Animal Identification Quiz | Wildpedia',
    description: 'Can you identify these animals? Play the quiz on Wildpedia!',
    images: [`${SITE_URL}/twitter-animal-quiz.png`], // Create public/twitter-animal-quiz.png
  },
};


export default function AnimalIdQuizPage() {
  // JSON-LD for Game
  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": "Animal Identification Quiz",
    "description": "Test your knowledge recognizing different species from images or descriptions.",
    "gamePlatform": "WebBrowser",
    "url": `${SITE_URL}/games/animal-id-quiz`,
    "image": `${SITE_URL}/og-animal-quiz.png`,
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
        "audienceType": "General public, Students, Wildlife enthusiasts"
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
      <Card className="max-w-2xl mx-auto bg-card shadow-lg border-blue-300 dark:border-blue-700">
        <CardHeader className="text-center">
          <BrainCircuit className="h-12 w-12 mx-auto text-blue-500 mb-4" />
          <CardTitle className="text-3xl font-bold text-primary">Animal Identification Quiz</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Test your knowledge recognizing different species from images or descriptions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <AnimalIdQuiz />
        </CardContent>
      </Card>
    </div>
  );
}
