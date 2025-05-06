'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { migrationMazeData, type MazeLevel } from '@/data/migration-maze-data'; // Removed MazeTile import as it's implicitly used
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, AlertTriangle, Trophy, RefreshCcw } from 'lucide-react'; // Added Trophy, RefreshCcw
import { cn } from '@/lib/utils';
import { updateUserStats, grantAchievement } from '@/lib/user-stats'; // Import stats utilities

// Basic placeholder - a full maze game requires more complex state management and rendering
export default function MigrationMazeGame() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [level, setLevel] = useState<MazeLevel | null>(null);
  const [playerPosition, setPlayerPosition] = useState<{ row: number; col: number } | null>(null);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won_level' | 'won_game' | 'lost' | 'loading'>('loading');
  const [totalScore, setTotalScore] = useState(0); // Track score across levels
  const [levelMoves, setLevelMoves] = useState(0); // Track moves for potential scoring adjustments

  useEffect(() => {
    // Load initial stats on mount to display total score correctly if game is reloaded
     // This might be better handled by reading from localStorage directly if needed immediately
    // const profile = getUserProfile(); // Can't call directly here
    // setTotalScore(profile.stats.totalScore); // Initialize score from profile if possible
    loadLevel(0);
  }, []);

  const loadLevel = (levelIndex: number) => {
     setLevelMoves(0); // Reset moves for the new level
    if (levelIndex >= 0 && levelIndex < migrationMazeData.length) {
      const newLevel = migrationMazeData[levelIndex];
      setLevel(newLevel);
      setCurrentLevelIndex(levelIndex);

      // Find start position
      let startPos = null;
      for (let r = 0; r < newLevel.grid.length; r++) {
        for (let c = 0; c < newLevel.grid[r].length; c++) {
          if (newLevel.grid[r][c] === 'start') {
            startPos = { row: r, col: c };
            break;
          }
        }
        if (startPos) break;
      }
      setPlayerPosition(startPos);
      setGameStatus('playing');
    } else {
       // Finished all levels
      setGameStatus('won_game');
      // Final score update might happen here or in the won_game state rendering
    }
  };

  const handleMove = (dr: number, dc: number) => {
    if (gameStatus !== 'playing' || !playerPosition || !level) return;

    const newRow = playerPosition.row + dr;
    const newCol = playerPosition.col + dc;
    let moved = false;

    // Check boundaries
    if (newRow < 0 || newRow >= level.grid.length || newCol < 0 || newCol >= level.grid[0].length) {
      return; // Hit boundary
    }

    const targetTile = level.grid[newRow][newCol];

    switch (targetTile) {
      case 'path':
      case 'start': // Allow moving back to start
        setPlayerPosition({ row: newRow, col: newCol });
         moved = true;
        break;
      case 'end':
        setPlayerPosition({ row: newRow, col: newCol });
         moved = true;
        completeLevel(); // Reached the end of the current level
        break;
      case 'wall':
        // Cannot move into a wall
        break;
      case 'obstacle':
        setPlayerPosition({ row: newRow, col: newCol });
         moved = true;
        setGameStatus('lost'); // Hit an obstacle
         // No points awarded for hitting obstacle, game played increments on restart/next
        break;
    }

     if (moved) {
         setLevelMoves((prev) => prev + 1);
     }
  };

   const completeLevel = () => {
    // Award points based on level difficulty and maybe moves?
    const basePoints = 25; // Base points for completing a level
     const bonusPoints = Math.max(0, 5 - Math.floor(levelMoves / 5)); // Small bonus for fewer moves
     const levelPoints = basePoints + bonusPoints;

    setTotalScore((prev) => prev + levelPoints);
    // Update global stats immediately when level is won
    updateUserStats({ scoreChange: levelPoints, incrementGamesPlayed: false }); // Don't increment games played yet
    grantAchievement('migration_master_1'); // Grant achievement for completing *a* level
    setGameStatus('won_level');
  }

  const restartLevel = () => {
     // Increment games played only if they actually failed/restarted, not just won
     if (gameStatus === 'lost') {
         updateUserStats({incrementGamesPlayed: true });
     }
    loadLevel(currentLevelIndex);
  };

   const restartGame = () => {
     // Increment games played if restarting after winning or losing the whole game
      if (gameStatus === 'won_game' || gameStatus === 'lost') {
          updateUserStats({incrementGamesPlayed: true });
      }
     // Reset local total score tracker for the new game session
     setTotalScore(0);
    loadLevel(0);
  };

  const nextLevel = () => {
     // Increment games played when moving from a completed level to the next
     updateUserStats({ incrementGamesPlayed: true });
     loadLevel(currentLevelIndex + 1);
  }


  if (gameStatus === 'loading' || !level) {
    return <p className="text-center text-muted-foreground">Loading Maze...</p>;
  }

   const gridHeight = level.grid.length;
   const gridWidth = level.grid[0]?.length || 0;
   const maxTileSize = 60;
   const containerWidth = 600;
   const tileSize = Math.min(maxTileSize, containerWidth / Math.max(gridWidth, gridHeight));


   // Final Game Won State
  if (gameStatus === 'won_game') {
    return (
      <div className="flex flex-col items-center space-y-6 text-center">
        <Trophy className="h-20 w-20 text-yellow-500" />
        <h2 className="text-3xl font-bold text-primary">Congratulations!</h2>
        <p className="text-xl text-muted-foreground">You've completed all the migration challenges!</p>
         {/* Display the final accumulated score for this session */}
        <p className="text-2xl font-semibold">Session Score: {totalScore}</p>
        <Button onClick={restartGame} size="lg">
          <RefreshCcw className="mr-2 h-5 w-5" /> Play Again From Start
        </Button>
      </div>
    );
  }


  return (
    <div className="flex flex-col items-center space-y-6">
      <Card className="w-full max-w-xl bg-muted/30 text-center"> {/* Increased max-width */}
         <CardHeader>
            <CardTitle className="text-xl text-primary">{level.name}</CardTitle>
            <CardDescription>{level.description}</CardDescription>
         </CardHeader>
         <CardContent className="flex justify-between items-center px-4 pb-4">
            <span className="text-sm font-medium">Level {currentLevelIndex + 1} / {migrationMazeData.length}</span>
             {/* Show accumulating score for the current game session */}
             <span className="text-sm font-medium">Session Score: {totalScore}</span>
             <span className="text-sm font-medium">Moves: {levelMoves}</span>
         </CardContent>
      </Card>

      {/* Maze Grid */}
      <div
        className="grid border bg-background p-1 shadow-inner overflow-hidden rounded-md" // Added rounded-md
        style={{
           gridTemplateRows: `repeat(${gridHeight}, ${tileSize}px)`,
           gridTemplateColumns: `repeat(${gridWidth}, ${tileSize}px)`,
           width: `${gridWidth * tileSize + 2}px`, // +2 for border
           height: `${gridHeight * tileSize + 2}px`,
        }}
      >
        {level.grid.map((row, r) =>
          row.map((tile, c) => (
            <div
              key={`${r}-${c}`}
              className={cn(
                'flex items-center justify-center border text-lg transition-colors duration-150', // Smooth transition
                tile === 'wall' && 'bg-foreground/70 dark:bg-foreground/90', // Darker wall
                tile === 'path' && 'bg-background hover:bg-muted/50', // Slight hover on path
                tile === 'start' && 'bg-green-100 dark:bg-green-900', // More distinct start/end
                tile === 'end' && 'bg-blue-100 dark:bg-blue-900',
                tile === 'obstacle' && 'bg-orange-200 dark:bg-orange-800 flex items-center justify-center', // Changed obstacle color
                 (playerPosition?.row === r && playerPosition?.col === c) && 'relative', // For player positioning
              )}
               style={{ width: `${tileSize}px`, height: `${tileSize}px` }}
            >
               {/* Render Player */}
              {playerPosition?.row === r && playerPosition?.col === c && (
                  <span
                    role="img"
                    aria-label={level.animal.name}
                    className="text-2xl z-10 transform scale-110" // Slightly larger player
                     style={{ fontSize: `${tileSize * 0.65}px` }} // Scale icon size
                  >
                    {level.animal.icon}
                  </span>
              )}
              {/* Render Goal (optional visual) */}
              {tile === 'end' && <span className="text-xl">🏁</span>}
               {/* Render Obstacle (optional visual) */}
               {tile === 'obstacle' && <AlertTriangle className="h-2/3 w-2/3 text-orange-700 dark:text-orange-300" />} {/* Adjusted size and color */}
            </div>
          ))
        )}
      </div>

      {/* Controls */}
       {gameStatus === 'playing' && (
        <div className="grid grid-cols-3 gap-2 w-48"> {/* Slightly wider controls */}
            <div className="col-start-2 flex justify-center">
            <Button variant="outline" size="lg" onClick={() => handleMove(-1, 0)} disabled={gameStatus !== 'playing'} aria-label="Move Up">
                <ArrowUp />
            </Button>
            </div>
            <div className="flex justify-center">
            <Button variant="outline" size="lg" onClick={() => handleMove(0, -1)} disabled={gameStatus !== 'playing'} aria-label="Move Left">
                <ArrowLeft />
            </Button>
            </div>
            <div className="flex justify-center">
            <Button variant="outline" size="lg" onClick={() => handleMove(1, 0)} disabled={gameStatus !== 'playing'} aria-label="Move Down">
                <ArrowDown />
            </Button>
            </div>
            <div className="flex justify-center">
            <Button variant="outline" size="lg" onClick={() => handleMove(0, 1)} disabled={gameStatus !== 'playing'} aria-label="Move Right">
                <ArrowRight />
            </Button>
            </div>
        </div>
       )}

       {/* Game Status Messages */}
        {gameStatus === 'won_level' && (
            <div className="text-center p-4 bg-green-100 dark:bg-green-900/50 rounded-md border border-green-300 dark:border-green-700 w-full max-w-md">
            <p className="font-semibold text-lg text-green-700 dark:text-green-300">Level Complete!</p>
             {/* Display points earned for this level */}
             <p className="text-muted-foreground mb-3">Points Earned: {25 + Math.max(0, 5 - Math.floor(levelMoves / 5))}</p>
             {currentLevelIndex < migrationMazeData.length - 1 ? (
                <Button onClick={nextLevel} className="mt-2" size="lg">Next Level</Button>
             ) : (
                 // Button leads to the final 'won_game' state
                <Button onClick={nextLevel} className="mt-2" size="lg">Finish Game</Button>
             )}
            </div>
        )}
        {gameStatus === 'lost' && (
            <div className="text-center p-4 bg-red-100 dark:bg-red-900/50 rounded-md border border-red-300 dark:border-red-700 w-full max-w-md">
            <p className="font-semibold text-lg text-red-700 dark:text-red-300">Oh no! You hit an obstacle.</p>
             <p className="text-muted-foreground mb-3">No points earned for this attempt.</p>
            <Button onClick={restartLevel} className="mt-2" size="lg">
                 <RotateCcw className="mr-1 h-4 w-4" /> Try Again
            </Button>
            </div>
        )}
         {gameStatus === 'playing' && (
             <Button onClick={restartLevel} variant="ghost" size="sm" className="text-muted-foreground">
                 <RotateCcw className="mr-1 h-3 w-3" /> Restart Level
             </Button>
         )}

    </div>
  );
}
