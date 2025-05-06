/**
 * @fileOverview Mock data for the Migration Maze Game.
 */

export type MazeTile = 'path' | 'wall' | 'start' | 'end' | 'obstacle';

export interface MazeLevel {
  id: number;
  name: string;
  animal: {
    name: string;
    icon: string; // Could be an emoji or path to a small image
  };
  grid: MazeTile[][]; // 2D array representing the maze layout
  description: string; // Brief description of the migration challenge
}

export const migrationMazeData: MazeLevel[] = [
  {
    id: 1,
    name: 'Arctic Tern\'s Journey',
    animal: { name: 'Arctic Tern', icon: '🐦' },
    // Easier Level 1 layout (6x6)
    grid: [
      ['start', 'path', 'path', 'wall', 'path', 'path'],
      ['wall', 'wall', 'path', 'wall', 'path', 'wall'],
      ['path', 'path', 'path', 'path', 'path', 'path'],
      ['path', 'wall', 'wall', 'wall', 'obstacle', 'path'],
      ['path', 'path', 'path', 'path', 'wall', 'path'],
      ['wall', 'wall', 'wall', 'path', 'path', 'end'],
    ],
    description: 'Guide the Arctic Tern from its nesting grounds to its wintering area. Avoid the storm!',
  },
  {
    id: 2,
    name: 'Wildebeest Crossing',
    animal: { name: 'Wildebeest', icon: '🐃' },
     // Easier Level 2 layout (7x7)
    grid: [
      ['start', 'path', 'path', 'path', 'wall', 'wall', 'wall'],
      ['wall', 'wall', 'wall', 'path', 'path', 'path', 'path'],
      ['path', 'path', 'path', 'path', 'wall', 'obstacle', 'path'],
      ['path', 'wall', 'wall', 'wall', 'wall', 'wall', 'path'],
      ['path', 'path', 'obstacle', 'path', 'path', 'path', 'path'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'path', 'wall'],
      ['path', 'path', 'path', 'path', 'path', 'path', 'end'],
    ],
    description: 'Help the Wildebeest navigate the plains and cross the treacherous river.',
  },
  // Add more levels as needed - ensure they are solvable!
   {
    id: 3,
    name: 'Salmon Run',
    animal: { name: 'Salmon', icon: '🐟' },
    // Slightly more complex 8x8 layout
    grid: [
      ['start', 'path', 'wall', 'path', 'path', 'path', 'wall', 'wall'],
      ['wall', 'path', 'wall', 'path', 'wall', 'path', 'path', 'path'],
      ['path', 'path', 'path', 'path', 'wall', 'obstacle', 'wall', 'path'],
      ['path', 'wall', 'wall', 'wall', 'path', 'path', 'path', 'path'],
      ['path', 'path', 'path', 'wall', 'path', 'wall', 'wall', 'wall'],
      ['wall', 'obstacle', 'path', 'path', 'path', 'path', 'path', 'end'],
      ['wall', 'wall', 'path', 'wall', 'wall', 'wall', 'path', 'wall'],
      ['path', 'path', 'path', 'path', 'path', 'path', 'path', 'wall'],
    ],
    description: 'Swim upstream! Guide the salmon past bears (obstacles) to the spawning grounds.',
   }
];
