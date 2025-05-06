import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { LeaderboardEntry } from '@/data/leaderboard-data';
import { Crown, Medal, Star } from 'lucide-react'; // Icons for ranks

interface LeaderboardDisplayProps {
  leaderboardData: LeaderboardEntry[];
}

// Function to determine rank icon and color
const getRankDecoration = (rank: number) => {
  if (rank === 1) {
    return { icon: <Crown className="h-5 w-5 text-yellow-500" />, color: 'text-yellow-500 font-bold' };
  }
  if (rank === 2) {
    return { icon: <Medal className="h-5 w-5 text-gray-400" />, color: 'text-gray-400 font-semibold' };
  }
  if (rank === 3) {
    return { icon: <Medal className="h-5 w-5 text-orange-400" />, color: 'text-orange-400 font-semibold' };
  }
  return { icon: null, color: 'text-muted-foreground' };
};

// Function to determine level badge styling
const getLevelBadge = (level: string) => {
  let badgeColor = 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200';
  if (level === 'Expert') {
    badgeColor = 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200';
  } else if (level === 'Master') {
      badgeColor = 'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200';
  } else if (level === 'Explorer') {
    badgeColor = 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200';
  }
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}>
      {level}
    </span>
  );
};

export default function LeaderboardDisplay({ leaderboardData }: LeaderboardDisplayProps) {
  // Sort data by rank
  const sortedData = [...leaderboardData].sort((a, b) => a.rank - b.rank);

  return (
    <Card className="max-w-2xl mx-auto bg-gradient-to-b from-card to-muted/30 shadow-xl border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-primary">Top Explorers</CardTitle>
        <CardDescription className="text-center text-muted-foreground">See who's leading the wildlife discovery!</CardDescription>
      </CardHeader>
      <CardContent>
        {sortedData.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px] text-center">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-center">Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((entry) => {
                const { icon: rankIcon, color: rankColor } = getRankDecoration(entry.rank);
                return (
                  <TableRow key={entry.rank} className="hover:bg-primary/5">
                    <TableCell className={`text-center font-medium ${rankColor}`}>
                      <div className="flex items-center justify-center gap-1">
                        {rankIcon}
                        <span>{entry.rank}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">{entry.name}</TableCell>
                    <TableCell className="text-right font-mono text-primary">{entry.score.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      {getLevelBadge(entry.level)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-muted-foreground py-4">The leaderboard is currently empty. Play some games to get started!</p>
        )}
      </CardContent>
    </Card>
  );
}
