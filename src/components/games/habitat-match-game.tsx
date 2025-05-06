'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { animals as initialAnimals, habitats, type Animal, type Habitat } from '@/data/habitat-match-data';
import { CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { updateUserStats, grantAchievement } from '@/lib/user-stats'; // Import stats utilities

// Function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function HabitatMatchGame() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [placedAnimals, setPlacedAnimals] = useState<Record<string, Animal | null>>({}); // habitatId -> Animal
  const [draggingAnimalId, setDraggingAnimalId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect' | null>>({}); // habitatId -> feedback
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0); // Local score for correct placements
  const [gameStarted, setGameStarted] = useState(false); // Track if game has started for scoring

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    setAnimals(shuffleArray(initialAnimals));
    const initialPlaced: Record<string, Animal | null> = {};
    const initialFeedback: Record<string, null> = {};
    habitats.forEach(habitat => {
        initialPlaced[habitat.id] = null;
        initialFeedback[habitat.id] = null;
    });
    setPlacedAnimals(initialPlaced);
    setFeedback(initialFeedback);
    setDraggingAnimalId(null);
    setGameOver(false);
    setScore(0); // Reset local score
    setGameStarted(true); // Mark game as started/restarted
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, animalId: string) => {
    setDraggingAnimalId(animalId);
    e.dataTransfer.setData('animalId', animalId);
    e.currentTarget.classList.add('opacity-50'); // Visual feedback for dragging
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggingAnimalId(null);
    e.currentTarget.classList.remove('opacity-50');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
    e.currentTarget.classList.add('bg-accent/20', 'border-accent'); // Highlight drop zone
  };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('bg-accent/20', 'border-accent');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, habitatId: string) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-accent/20', 'border-accent');
    const animalId = e.dataTransfer.getData('animalId');
    const animal = animals.find(a => a.id === animalId);

    if (animal && !placedAnimals[habitatId]) { // Only allow dropping if the spot is empty
      const isCorrect = animal.correctHabitatId === habitatId;

      // Move animal from the list to the placed map
      setAnimals(prevAnimals => prevAnimals.filter(a => a.id !== animalId));
      setPlacedAnimals(prevPlaced => ({
        ...prevPlaced,
        [habitatId]: animal,
      }));

      // Set feedback
       setFeedback(prevFeedback => ({
        ...prevFeedback,
        [habitatId]: isCorrect ? 'correct' : 'incorrect',
      }));

      if (isCorrect) {
        setScore(prevScore => prevScore + 1); // Update local score
      }

      // Check for game over (when the animals list becomes empty after this drop)
      if (animals.length -1 === 0) {
          finishGame(isCorrect ? score + 1 : score); // Pass the potentially updated score
      }

      // Clear feedback after a delay
      setTimeout(() => {
         setFeedback(prevFeedback => ({
          ...prevFeedback,
          [habitatId]: null, // Reset feedback only for this habitat
        }));
      }, 1500);
    }
    setDraggingAnimalId(null); // Clear dragging state
  };

  const finishGame = (finalScore: number) => {
     const pointsPerCorrect = 20; // Assign points per correct match
     const totalPoints = finalScore * pointsPerCorrect;
     updateUserStats({ scoreChange: totalPoints, incrementGamesPlayed: true });
     grantAchievement('habitat_hero_1');
     setGameOver(true);
  }

   const remainingAnimals = animals.filter(animal =>
      !Object.values(placedAnimals).some(placed => placed?.id === animal.id)
   );

  return (
    <div className="space-y-8">
      {/* Animals to Place */}
      {!gameOver && (
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg text-primary">Animals to Place</CardTitle>
             <CardDescription>Drag each animal to its correct habitat below.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4 justify-center p-4 min-h-[120px]">
            {remainingAnimals.length > 0 ? (
              remainingAnimals.map(animal => (
                <div
                  key={animal.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, animal.id)}
                  onDragEnd={handleDragEnd}
                  className="p-2 border rounded-lg bg-card hover:shadow-md cursor-grab active:cursor-grabbing transition-all flex flex-col items-center text-center w-28"
                  title={animal.name}
                >
                  <Image
                    src={animal.image}
                    alt={animal.name}
                    width={60}
                    height={60}
                    className="object-contain rounded-full mb-1 border"
                    data-ai-hint={animal.dataAiHint}
                  />
                  <span className="text-xs font-medium truncate w-full">{animal.name}</span>
                </div>
              ))
            ) : (
               // This state should ideally be handled by the gameOver state now
               <p className="text-muted-foreground italic">Checking results...</p>
            )}
          </CardContent>
        </Card>
      )}

        {/* Habitats (Drop Zones) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {habitats.map(habitat => (
          <Card
            key={habitat.id}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, habitat.id)}
            className={cn(
                "border-2 border-dashed transition-colors relative min-h-[250px] flex flex-col items-center justify-between text-center overflow-hidden",
                 // Don't apply feedback colors if game is over, keep placed animals visible
                !gameOver && feedback[habitat.id] === 'correct' && 'border-green-500 bg-green-500/10',
                !gameOver && feedback[habitat.id] === 'incorrect' && 'border-destructive bg-destructive/10',
            )}
            style={{ backgroundImage: `url(${habitat.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}

          >
            <CardHeader className="w-full bg-black/50 backdrop-blur-sm p-2">
                 <CardTitle className="text-lg text-white drop-shadow-md">{habitat.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center w-full p-4">
              {placedAnimals[habitat.id] ? (
                <div className="p-2 border rounded-lg bg-card/80 backdrop-blur-sm shadow-lg flex flex-col items-center w-32 relative"> {/* Added relative */}
                  <Image
                    src={placedAnimals[habitat.id]!.image}
                    alt={placedAnimals[habitat.id]!.name}
                    width={70}
                    height={70}
                    className="object-contain rounded-full mb-1 border bg-white"
                     data-ai-hint={placedAnimals[habitat.id]!.dataAiHint}
                  />
                  <span className="text-sm font-medium truncate w-full text-card-foreground">
                    {placedAnimals[habitat.id]!.name}
                  </span>
                   {/* Show feedback icons briefly, hide when game is over */}
                   {!gameOver && feedback[habitat.id] === 'correct' && <CheckCircle2 className="h-6 w-6 text-green-600 absolute top-1 right-1 bg-white/70 rounded-full p-0.5" />}
                   {!gameOver && feedback[habitat.id] === 'incorrect' && <XCircle className="h-6 w-6 text-destructive absolute top-1 right-1 bg-white/70 rounded-full p-0.5" />}
                    {/* Optionally show final correctness when game over */}
                    {gameOver && placedAnimals[habitat.id]?.correctHabitatId === habitat.id && <CheckCircle2 className="h-5 w-5 text-green-600 absolute bottom-1 right-1 bg-white/70 rounded-full p-0.5" />}
                     {gameOver && placedAnimals[habitat.id]?.correctHabitatId !== habitat.id && <XCircle className="h-5 w-5 text-destructive absolute bottom-1 right-1 bg-white/70 rounded-full p-0.5" />}
                </div>
              ) : (
                 // Don't show drop hint if game is over
                !gameOver && <span className="text-white/70 text-sm italic drop-shadow-md">Drop animal here</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

       {/* Game Over Screen */}
       {gameOver && (
         <Card className="text-center bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-950 py-8">
           <CardHeader>
                <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
             <CardTitle className="text-3xl font-bold text-primary">Well Done!</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">You've matched all the animals!</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             <p className="text-xl font-semibold">
               Correct Matches: {score} / {initialAnimals.length}
             </p>
              <p className="text-lg">Points Earned: {score * 20}</p> {/* Show points */}
             <Button onClick={startGame}>
               <RotateCcw className="mr-2 h-4 w-4" /> Play Again
             </Button>
           </CardContent>
         </Card>
       )}

        {/* Score and Restart (Show only during game) */}
        {!gameOver && gameStarted && (
           <div className="mt-8 flex justify-center items-center gap-6 border-t pt-6">
            <div className="text-center">
                 <p className="text-sm text-muted-foreground">Correct Matches</p>
                 <p className="text-2xl font-bold text-primary">{score} / {initialAnimals.length}</p>
            </div>
            <Button onClick={startGame} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" /> Restart Game
            </Button>
          </div>
        )}
    </div>
  );
}
