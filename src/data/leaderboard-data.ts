/**
 * @fileOverview Mock data for the Games Leaderboard.
 */

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  level: string; // Example levels: Beginner, Explorer, Expert, Master
}

// Function to determine level based on score
const getLevel = (score: number): string => {
  if (score >= 500) return 'Master';
  if (score >= 250) return 'Expert';
  if (score >= 100) return 'Explorer';
  return 'Beginner';
};

// Generate some mock data
const generateMockData = (count: number): LeaderboardEntry[] => {
  const names = ['WildlifeFan', 'JungleExplorer', 'ArcticAdventurer', 'SavannaSeeker', 'OceanObserver', 'ForestFriend', 'DesertDweller', 'MountainMapper', 'RiverRanger', 'PondProber'];
  const data: Omit<LeaderboardEntry, 'rank' | 'level'>[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      name: names[i % names.length] + (Math.floor(i / names.length) > 0 ? Math.floor(i / names.length) + 1 : ''),
      score: Math.floor(Math.random() * 600) + 10, // Scores between 10 and 610
    });
  }
  // Sort by score descending
  data.sort((a, b) => b.score - a.score);

  // Assign ranks and levels
  return data.map((entry, index) => ({
    ...entry,
    rank: index + 1,
    level: getLevel(entry.score),
  }));
};


export const mockLeaderboardData: LeaderboardEntry[] = generateMockData(10); // Generate top 10 entries
