'use client'; // Required for state and interaction

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { BrainCircuit, ArrowLeft } from 'lucide-react';
import AnimalIdQuiz from '@/components/games/animal-id-quiz'; // Import the quiz component

export default function AnimalIdQuizPage() {
  return (
    <div className="container mx-auto py-12 px-4">
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
          {/* Replace placeholder with the actual quiz component */}
          <AnimalIdQuiz />
        </CardContent>
      </Card>
    </div>
  );
}
