
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Puzzle, Trophy, Footprints, Star, Award, BarChart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import LeaderboardDisplay from '@/components/games/leaderboard-display';
import { mockLeaderboardData } from '@/data/leaderboard-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

export const metadata: Metadata = {
  title: 'Wildlife Games & Quizzes - Test Your Knowledge',
  description: 'Play engaging games and quizzes about animals, habitats, and conservation on Wildpedia. Challenge yourself, earn points, and climb the leaderboard!',
  keywords: ['wildlife games', 'animal quizzes', 'conservation games', 'nature trivia', 'educational games', 'fun learning'],
  openGraph: {
    title: 'Wildlife Games & Quizzes | Wildpedia',
    description: 'Challenge your knowledge with fun and educational wildlife games on Wildpedia.',
    url: `${SITE_URL}/games`,
    images: [{ url: `${SITE_URL}/og-games.png`, alt: 'Wildpedia Games & Quizzes' }], // Create public/og-games.png
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wildlife Games & Quizzes | Wildpedia',
    description: 'Challenge your knowledge with fun and educational wildlife games on Wildpedia.',
    images: [`${SITE_URL}/twitter-games.png`], // Create public/twitter-games.png
  },
};

const games = [
  {
    title: 'Animal Identification Quiz',
    description: 'Test your knowledge recognizing different species.',
    icon: BrainCircuit,
    link: '/games/animal-id-quiz',
    bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-950',
    borderColor: 'border-blue-300 dark:border-blue-700',
    userLevel: 'Beginner',
  },
  {
    title: 'Habitat Match Game',
    description: 'Match animals to their correct natural habitats.',
    icon: Puzzle,
    link: '/games/habitat-match',
     bgColor: 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-950',
     borderColor: 'border-green-300 dark:border-green-700',
     userLevel: 'Explorer',
  },
  {
    title: 'Conservation Challenge',
    description: 'Answer questions about wildlife conservation efforts.',
    icon: Trophy,
    link: '/games/conservation-challenge',
     bgColor: 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-950',
     borderColor: 'border-yellow-300 dark:border-yellow-700',
     userLevel: 'Beginner',
  },
  {
    title: 'Migration Maze',
    description: 'Help animals navigate their migration routes.',
    icon: Footprints,
    link: '/games/migration-maze',
    bgColor: 'bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-950',
    borderColor: 'border-orange-300 dark:border-orange-700',
    userLevel: 'Expert',
  },
];

export default function GamesPage() {
  const gamesPageJsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage", // Appropriate for a list of games
      "name": "Wildpedia Games & Quizzes",
      "description": "A collection of fun and educational games about wildlife and conservation.",
      "url": `${SITE_URL}/games`,
      "publisher": {
        "@type": "Organization",
        "name": "Wildpedia"
      },
      "hasPart": games.map(game => ({ // Listing some of the games
        "@type": "Game",
        "name": game.title,
        "description": game.description,
        "url": `${SITE_URL}${game.link}`,
        "gamePlatform": "WebBrowser"
      }))
    };
  return (
    <div className="container mx-auto py-12 px-4 perspective-1000">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gamesPageJsonLd) }}
      />
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-center text-primary">
        Games & Quizzes
      </h1>
      <p className="mb-12 text-lg text-center text-muted-foreground max-w-2xl mx-auto">
        Challenge yourself and learn more about the amazing world of wildlife! Earn points, level up, and climb the leaderboard.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {games.map((game) => (
          <Link key={game.title} href={game.link} passHref>
            <Card className={`
              ${game.bgColor} ${game.borderColor}
              overflow-hidden shadow-lg border-2
              transform-style-preserve-3d transition-transform duration-500 ease-out
              hover:scale-105 hover:shadow-2xl hover:rotate-y-5 hover:rotate-x-2
              cursor-pointer group h-full flex flex-col
            `}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 text-card-foreground">
                 <div className="flex-1 mr-2">
                     <CardTitle className="text-xl font-semibold">{game.title}</CardTitle>
                 </div>
                <game.icon className="h-8 w-8 text-accent shrink-0" />
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
                <div className="mt-auto pt-4 border-t border-current/20">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                     <Star className="h-3 w-3 text-yellow-500" /> Your Level: <span className="font-semibold text-primary">{game.userLevel}</span>
                  </p>
                </div>
              </CardContent>
               <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 backface-hidden"></div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary flex items-center justify-center gap-2">
          <BarChart className="h-8 w-8 text-accent"/> Leaderboard
        </h2>
        <LeaderboardDisplay leaderboardData={mockLeaderboardData} />
      </div>

       <div className="mt-12 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
        </div>
    </div>
  );
}

    