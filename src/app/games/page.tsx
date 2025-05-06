import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Puzzle, Trophy, Footprints, Star, Award, BarChart } from 'lucide-react'; // Added Star, Award, BarChart
import Link from 'next/link';
import LeaderboardDisplay from '@/components/games/leaderboard-display'; // Import Leaderboard component
import { mockLeaderboardData } from '@/data/leaderboard-data'; // Import mock data

const games = [
  {
    title: 'Animal Identification Quiz',
    description: 'Test your knowledge recognizing different species.',
    icon: BrainCircuit,
    link: '/games/animal-id-quiz',
    bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-950',
    borderColor: 'border-blue-300 dark:border-blue-700',
    userLevel: 'Beginner', // Placeholder user level
  },
  {
    title: 'Habitat Match Game',
    description: 'Match animals to their correct natural habitats.',
    icon: Puzzle,
    link: '/games/habitat-match',
     bgColor: 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-950',
     borderColor: 'border-green-300 dark:border-green-700',
     userLevel: 'Explorer', // Placeholder user level
  },
  {
    title: 'Conservation Challenge',
    description: 'Answer questions about wildlife conservation efforts.',
    icon: Trophy,
    link: '/games/conservation-challenge',
     bgColor: 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-950',
     borderColor: 'border-yellow-300 dark:border-yellow-700',
     userLevel: 'Beginner', // Placeholder user level
  },
  {
    title: 'Migration Maze',
    description: 'Help animals navigate their migration routes.',
    icon: Footprints, // New icon
    link: '/games/migration-maze', // Updated link
    bgColor: 'bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-950',
    borderColor: 'border-orange-300 dark:border-orange-700',
    userLevel: 'Expert', // Placeholder user level
  },
];

export default function GamesPage() {
  return (
    <div className="container mx-auto py-12 px-4 perspective-1000">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-center text-primary">
        Games & Quizzes
      </h1>
      <p className="mb-12 text-lg text-center text-muted-foreground max-w-2xl mx-auto">
        Challenge yourself and learn more about the amazing world of wildlife! Earn points, level up, and climb the leaderboard.
      </p>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"> {/* Added mb-16 */}
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
              <CardContent className="flex-grow flex flex-col justify-between"> {/* Use flex-col */}
                <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
                {/* User Level/Progress Indicator */}
                <div className="mt-auto pt-4 border-t border-current/20">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                     <Star className="h-3 w-3 text-yellow-500" /> Your Level: <span className="font-semibold text-primary">{game.userLevel}</span>
                  </p>
                   {/* Add High Score or Progress bar here later */}
                  {/* <p className="text-xs text-muted-foreground mt-1">High Score: 0</p> */}
                </div>
              </CardContent>
              {/* Subtle 3D effect on hover */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 backface-hidden"></div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Leaderboard Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary flex items-center justify-center gap-2">
          <BarChart className="h-8 w-8 text-accent"/> Leaderboard
        </h2>
        <LeaderboardDisplay leaderboardData={mockLeaderboardData} />
      </div>

      {/* Back Link */}
       <div className="mt-12 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                &larr; Back to Explore
            </Link>
        </div>
    </div>
  );
}
