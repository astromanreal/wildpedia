
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Puzzle, Trophy, Footprints, Gamepad2 } from 'lucide-react';

const games = [
  {
    title: 'Animal ID Quiz',
    description: 'Test your species recognition skills!',
    icon: BrainCircuit,
    link: '/games/animal-id-quiz',
    cta: 'Play Quiz',
  },
  {
    title: 'Habitat Match',
    description: 'Match animals to their correct homes.',
    icon: Puzzle,
    link: '/games/habitat-match',
    cta: 'Match Habitats',
  },
  {
    title: 'Conservation Challenge',
    description: 'Test your eco-knowledge.',
    icon: Trophy,
    link: '/games/conservation-challenge',
    cta: 'Take Challenge',
  },
  {
    title: 'Migration Maze',
    description: 'Guide animals on their journeys.',
    icon: Footprints,
    link: '/games/migration-maze',
    cta: 'Start Maze',
  },
];

export default function FeaturedGamesSection() {
  return (
    <div className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 flex items-center justify-center gap-3">
            <Gamepad2 className="h-8 w-8 text-accent" />
            Test Your Wildlife Wisdom
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Engage with our fun and educational games. Learn while you play!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {games.map((game) => (
            <Card key={game.title} className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden border-border/50 group">
              <CardHeader className="items-center text-center pt-6">
                <game.icon className="h-10 w-10 text-accent mb-3 transition-transform duration-300 group-hover:scale-110" />
                <CardTitle className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">{game.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center px-4">
                <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
              </CardContent>
              <div className="p-4 mt-auto text-center border-t border-border/20">
                <Link href={game.link} passHref>
                  <Button variant="default" className="w-full sm:w-auto group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    {game.cta}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
         <div className="text-center mt-10">
            <Link href="/games" passHref>
                <Button variant="outline" size="lg">
                    View All Games & Leaderboard &rarr;
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}
