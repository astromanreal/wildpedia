/**
 * @fileOverview Shared type definition for the user profile.
 */

import type { Achievement } from '@/lib/user-stats'; // Import Achievement type

export interface UserStats {
    totalScore: number;
    gamesPlayed: number;
    achievements: Achievement[]; // Store earned achievements
}

export interface UserProfile {
    username: string;
    avatarSeed: string; // Used for generating consistent avatar placeholder
    stats: UserStats;
}
```

```xml
  </