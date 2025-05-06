'use client'; // Required for useEffect, useState, localStorage access

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Gamepad2, Star, Medal, ArrowLeft, User as UserIcon, Edit, CheckCircle } from 'lucide-react'; // Use UserIcon, added Edit, CheckCircle
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { generateRandomUsername } from '@/lib/username-generator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getUserProfile, saveUserProfile, calculateLevelInfo, getUserAchievements, type Achievement } from '@/lib/user-stats'; // Import stats utilities
import type { UserProfile } from '@/types/user-profile'; // Import shared UserProfile type

// Import specific achievement icons if needed, or use placeholders
import { Award } from 'lucide-react'; // Example icon

// Map achievement IDs to icons (example)
const achievementIcons: Record<string, React.ElementType> = {
    'quiz_master_1': Star,
    'habitat_hero_1': Medal,
    'conservation_champ_1': Trophy,
    'migration_master_1': Gamepad2, // Example
    'expert_scorer': Award,
    // Add mappings for other achievement IDs as needed
    default: Star, // Fallback icon
};


export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableUsername, setEditableUsername] = useState('');
  const [levelInfo, setLevelInfo] = useState({ currentLevel: 'Beginner', levelProgress: 0, nextLevelName: 'Explorer' });
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Load profile and stats from localStorage on mount (client-side)
  useEffect(() => {
    const profile = getUserProfile();
    setUserProfile(profile);
    setLevelInfo(calculateLevelInfo(profile.stats.totalScore));
    setAchievements(profile.stats.achievements || []); // Load achievements
  }, []);

  // Function to refresh profile data displayed (e.g., after saving username)
  const refreshProfileData = () => {
     const profile = getUserProfile();
     setUserProfile(profile);
     setLevelInfo(calculateLevelInfo(profile.stats.totalScore));
     setAchievements(profile.stats.achievements || []);
  }

  const handleEditOpen = () => {
    if (userProfile) {
      setEditableUsername(userProfile.username);
      setIsEditing(true);
    }
  };

  const handleSaveUsername = () => {
    if (userProfile && editableUsername.trim()) {
      const updatedProfile: UserProfile = { ...userProfile, username: editableUsername.trim() };
      saveUserProfile(updatedProfile); // Save updated profile to localStorage
      refreshProfileData(); // Refresh displayed data
      setIsEditing(false); // Close dialog
    }
  };

  if (!userProfile) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  const avatarUrl = `https://picsum.photos/seed/${userProfile.avatarSeed}/100/100`;
  const nextLevelText = levelInfo.nextLevelName ? `(to ${levelInfo.nextLevelName})` : '(Max Level)';

  return (
    <div className="container mx-auto py-12 px-4">
      <Link href="/" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
        <ArrowLeft className="h-4 w-4" /> Back to Explore
      </Link>

      <Card className="max-w-4xl mx-auto bg-card shadow-lg overflow-hidden border-primary/10">
        <CardHeader className="bg-muted/50 p-6 flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-background shadow-md">
            <AvatarImage src={avatarUrl} alt={userProfile.username} data-ai-hint="wildlife avatar animal" />
            <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
              {userProfile.username ? userProfile.username.substring(0, 2).toUpperCase() : <UserIcon />}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left flex-grow">
            <CardTitle className="text-3xl font-bold text-primary">{userProfile.username}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-1">
              Wildlife Enthusiast - Level: {levelInfo.currentLevel}
            </CardDescription>
          </div>
          {/* Edit Profile Dialog Trigger */}
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" onClick={handleEditOpen} className="mt-4 sm:mt-0 sm:ml-auto shrink-0">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Profile</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Change your username here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={editableUsername}
                    onChange={(e) => setEditableUsername(e.target.value)}
                    className="col-span-3"
                    maxLength={20} // Optional: Limit username length
                  />
                </div>
              </div>
              <DialogFooter>
                 <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                 </DialogClose>
                 {/* Close dialog on save */}
                 <DialogClose asChild>
                    <Button type="button" onClick={handleSaveUsername} disabled={!editableUsername.trim()}>Save changes</Button>
                 </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stats Section */}
          <div className="md:col-span-1 space-y-6">
            <h3 className="text-xl font-semibold text-primary border-b pb-2">Stats</h3>
            {/* Display real stats */}
            <StatItem icon={Trophy} label="Total Score" value={userProfile.stats.totalScore.toLocaleString()} />
            <StatItem icon={Gamepad2} label="Games Played" value={userProfile.stats.gamesPlayed.toString()} />
             <div>
                <Label className="text-sm font-medium text-muted-foreground">Level Progress {nextLevelText}</Label>
                <Progress value={levelInfo.levelProgress} className="h-2 mt-1" />
                 <p className="text-xs text-right text-muted-foreground mt-1">{levelInfo.levelProgress}%</p>
             </div>
          </div>

          {/* Achievements Section */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-semibold text-primary border-b pb-2">Achievements</h3>
            {achievements.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Display earned achievements */}
                {achievements.filter(ach => ach.achieved).map((ach) => {
                   const IconComponent = achievementIcons[ach.id] || achievementIcons.default;
                  return (
                    <div key={ach.id} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-md border border-secondary">
                       <IconComponent className="h-8 w-8 text-yellow-500 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">{ach.name}</p>
                        <p className="text-xs text-muted-foreground">{ach.description}</p>
                      </div>
                    </div>
                  );
                 })}
              </div>
            ) : (
              <p className="text-muted-foreground italic">No achievements earned yet. Keep playing!</p>
            )}
          </div>
        </CardContent>
      </Card>

       <div className="mt-8 text-center">
            <Link href="/games" className="text-sm text-primary hover:underline">
                 View Games & Leaderboard &rarr;
            </Link>
        </div>
    </div>
  );
}

// Helper component for displaying stat items
interface StatItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function StatItem({ icon: Icon, label, value }: StatItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <span className="font-semibold text-primary">{value}</span>
    </div>
  );
}
