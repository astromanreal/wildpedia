import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Trophy, ArrowLeft } from 'lucide-react';
import ConservationChallenge from '@/components/games/conservation-challenge'; // Import the game component

export default function ConservationChallengePage() {
  return (
    <div className="container mx-auto py-12 px-4">
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
           {/* Render the actual quiz/challenge component */}
           <ConservationChallenge />
        </CardContent>
      </Card>
    </div>
  );
}
