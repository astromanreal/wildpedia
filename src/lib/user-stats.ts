/**
 * @fileOverview Utility functions for managing user game statistics in localStorage.
 */

import type { UserProfile } from '@/types/user-profile'; // Assuming UserProfile type is moved to a shared location

const LOCAL_STORAGE_KEY = 'wildpediaUserProfile';

// --- Level Definitions ---
interface LevelInfo {
  name: string;
  minScore: number;
  nextLevelScore: number | null; // Score needed to reach the *next* level
}

export const levels: Record<string, LevelInfo> = {
  Beginner: { name: 'Beginner', minScore: 0, nextLevelScore: 100 },
  Explorer: { name: 'Explorer', minScore: 100, nextLevelScore: 250 },
  Expert: { name: 'Expert', minScore: 250, nextLevelScore: 500 },
  Master: { name: 'Master', minScore: 500, nextLevelScore: null }, // No next level for Master
};

// --- Helper Functions ---

/**
 * Retrieves the full user profile (including stats) from localStorage.
 * Returns a default profile if none exists.
 * IMPORTANT: Call only on the client-side (e.g., within useEffect).
 */
export function getUserProfile(): UserProfile {
  if (typeof window === 'undefined') {
    // Default structure for SSR or initial load before hydration
    return {
      username: '...',
      avatarSeed: 'default',
      stats: { totalScore: 0, gamesPlayed: 0, achievements: [] },
    };
  }
  const storedProfile = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedProfile) {
    try {
      const parsed = JSON.parse(storedProfile);
      // Ensure stats exist, add default if missing
      if (!parsed.stats) {
        parsed.stats = { totalScore: 0, gamesPlayed: 0, achievements: [] };
      }
       // Ensure achievements is an array
       if (!Array.isArray(parsed.stats.achievements)) {
        parsed.stats.achievements = [];
       }
      return parsed as UserProfile;
    } catch (e) {
      console.error("Failed to parse stored profile, resetting.", e);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }
  // Return a default profile structure if nothing is stored or parsing failed
   const defaultProfile: UserProfile = {
    username: 'WildlifeWatcher', // Default generated name
    avatarSeed: Math.random().toString(36).substring(7), // Default seed
    stats: { totalScore: 0, gamesPlayed: 0, achievements: [] },
  };
  // Save the default profile
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultProfile));
  return defaultProfile;
}

/**
 * Saves the full user profile to localStorage.
 * IMPORTANT: Call only on the client-side.
 */
export function saveUserProfile(profile: UserProfile) {
   if (typeof window !== 'undefined') {
       // Ensure achievements is always an array before saving
       if (!profile.stats) {
           profile.stats = { totalScore: 0, gamesPlayed: 0, achievements: [] };
       } else if (!Array.isArray(profile.stats.achievements)) {
            profile.stats.achievements = [];
       }
       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
   }
}

/**
 * Updates the user's game stats in localStorage.
 * IMPORTANT: Call only on the client-side.
 * @param scoreChange - The amount to add to the total score.
 * @param incrementGamesPlayed - Whether to increment the games played count.
 */
export function updateUserStats({ scoreChange = 0, incrementGamesPlayed = false }) {
   if (typeof window === 'undefined') return;

  const profile = getUserProfile(); // Get current profile
  profile.stats.totalScore += scoreChange;
  if (incrementGamesPlayed) {
    profile.stats.gamesPlayed += 1;
  }
  // Ensure score doesn't go below zero
  if (profile.stats.totalScore < 0) {
      profile.stats.totalScore = 0;
  }

  saveUserProfile(profile); // Save updated profile
}

/**
 * Calculates the user's current level and progress towards the next level.
 * @param totalScore - The user's total score.
 * @returns An object containing the current level name and progress percentage.
 */
export function calculateLevelInfo(totalScore: number): { currentLevel: string; levelProgress: number, nextLevelName: string | null } {
  let currentLevel = levels.Beginner;
  let nextLevel: LevelInfo | null = levels.Explorer;

  // Find the current level
  const levelKeys = Object.keys(levels).reverse(); // Start from Master
  for (const key of levelKeys) {
    const level = levels[key];
    if (totalScore >= level.minScore) {
      currentLevel = level;
       // Find the next level in the original order
       const originalKeys = Object.keys(levels);
       const currentIndex = originalKeys.indexOf(key);
       nextLevel = currentIndex < originalKeys.length - 1 ? levels[originalKeys[currentIndex + 1]] : null;
      break;
    }
  }

  let levelProgress = 0;
  if (nextLevel && currentLevel.nextLevelScore) {
    const scoreInCurrentLevel = totalScore - currentLevel.minScore;
    const scoreRangeOfLevel = currentLevel.nextLevelScore - currentLevel.minScore;
    levelProgress = scoreRangeOfLevel > 0 ? Math.max(0, Math.min(100, Math.round((scoreInCurrentLevel / scoreRangeOfLevel) * 100))) : 100;
     if (totalScore >= currentLevel.nextLevelScore) {
         levelProgress = 100; // Cap progress at 100 if score meets/exceeds next level threshold
     }
  } else {
      // Master level or error case
      levelProgress = 100; // Max level reached
  }


  return {
    currentLevel: currentLevel.name,
    levelProgress: levelProgress,
    nextLevelName: nextLevel ? nextLevel.name : null
  };
}

// --- Achievements (Example Structure) ---
export interface Achievement {
    id: string; // e.g., 'quiz_master_1'
    name: string;
    description: string;
    icon?: React.ElementType; // Optional: Lucide icon component
    achieved: boolean; // Whether the user has earned it
}

// Example function to grant an achievement
export function grantAchievement(achievementId: string) {
     if (typeof window === 'undefined') return;
    const profile = getUserProfile();
    const existingAchievement = profile.stats.achievements?.find(a => a.id === achievementId);

    if (!existingAchievement || !existingAchievement.achieved) {
        // Find the achievement definition (you might store these definitions elsewhere)
        // For now, assume we have a way to get the achievement details
        const achievementDefinition = getAchievementDefinition(achievementId); // Placeholder
        if (achievementDefinition) {
             const newAchievement = { ...achievementDefinition, achieved: true };
             // Remove potential duplicates before adding
            const otherAchievements = profile.stats.achievements?.filter(a => a.id !== achievementId) || [];
             profile.stats.achievements = [...otherAchievements, newAchievement];
             saveUserProfile(profile);
        }
    }
}

// Placeholder for fetching achievement definitions
function getAchievementDefinition(id: string): Omit<Achievement, 'achieved'> | null {
    // In a real app, fetch this from a data source
    const definitions: Record<string, Omit<Achievement, 'achieved'>> = {
        'quiz_master_1': { id: 'quiz_master_1', name: 'Quiz Novice', description: 'Complete the Animal ID Quiz' },
        'habitat_hero_1': { id: 'habitat_hero_1', name: 'Habitat Helper', description: 'Complete the Habitat Match Game' },
        'conservation_champ_1': { id: 'conservation_champ_1', name: 'Conservation Starter', description: 'Complete the Conservation Challenge' },
        'migration_master_1': { id: 'migration_master_1', name: 'Maze Navigator', description: 'Complete a Migration Maze level' },
        // Add more...
        'expert_scorer': { id: 'expert_scorer', name: 'Expert Scorer', description: 'Reach Expert Level' }
    };
    return definitions[id] || null;
}


/**
 * Retrieves the user's saved achievements.
 * IMPORTANT: Call only on the client-side.
 */
export function getUserAchievements(): Achievement[] {
    if (typeof window === 'undefined') return [];
    const profile = getUserProfile();
    return profile.stats.achievements || [];
}
