
'use client';

import type { Metadata } from 'next'; // Useful for client components if pre-rendered
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Palette, Text, Laptop, Trash2, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { resetUserStats } from '@/lib/user-stats';
import { useToast } from '@/hooks/use-toast';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

// Static metadata for settings page.
export const staticSettingsMetadata: Metadata = { // Renamed as it's a client page
  title: 'Application Settings - Customize Your Wildpedia Experience',
  description: 'Manage your preferences for Wildpedia, including theme settings (dark/light mode, color scheme), font size, data management, and other accessibility options.',
  keywords: ['app settings', 'preferences', 'theme settings', 'dark mode', 'color scheme', 'font size', 'accessibility', 'reset data'],
  robots: { index: false, follow: false }, // Settings pages are typically not indexed
  openGraph: {
    title: 'Settings | Wildpedia',
    description: 'Customize your Wildpedia experience.',
    url: `${SITE_URL}/settings`,
  },
  twitter: {
    card: 'summary',
    title: 'Settings | Wildpedia',
    description: 'Customize your Wildpedia experience.',
  },
};


const COLOR_SCHEME_STORAGE_KEY = 'wildpedia-color-scheme';
const FONT_SIZE_STORAGE_KEY = 'wildpedia-font-size';

type FontSizeOption = 'font-size-small' | 'font-size-normal' | 'font-size-large';

export default function SettingsPage() {
  const [colorScheme, setColorScheme] = useState('theme-default');
  const [fontSize, setFontSize] = useState<FontSizeOption>('font-size-normal');
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = staticSettingsMetadata.title as string;

    const savedTheme = localStorage.getItem(COLOR_SCHEME_STORAGE_KEY) || 'theme-default';
    const savedFontSize = (localStorage.getItem(FONT_SIZE_STORAGE_KEY) || 'font-size-normal') as FontSizeOption;
    
    setColorScheme(savedTheme);
    setFontSize(savedFontSize);
    
    document.body.classList.remove('theme-default', 'theme-blue', 'theme-desert');
    document.body.classList.add(savedTheme);

    document.body.classList.remove('font-size-small', 'font-size-normal', 'font-size-large');
    document.body.classList.add(savedFontSize);
    
    setIsMounted(true);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    if (newTheme !== colorScheme) {
        setColorScheme(newTheme);
        localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, newTheme);
        document.body.classList.remove('theme-default', 'theme-blue', 'theme-desert');
        document.body.classList.add(newTheme);
    }
  };

  const handleFontSizeChange = (newSize: FontSizeOption) => {
     if (newSize !== fontSize) {
        setFontSize(newSize);
        localStorage.setItem(FONT_SIZE_STORAGE_KEY, newSize);
        document.body.classList.remove('font-size-small', 'font-size-normal', 'font-size-large');
        document.body.classList.add(newSize);
        toast({
            title: "Font Size Updated",
            description: `Font size set to ${newSize.replace('font-size-', '')}. Full effect may require CSS implementation.`,
        });
     }
  };

  const handleResetStats = () => {
    resetUserStats();
    toast({
      title: "Game Stats Reset",
      description: "Your scores and achievements have been cleared.",
      variant: "default", // or "destructive" if preferred
    });
    // Optionally, redirect or refresh parts of the UI if needed
    // e.g., if a profile component is displayed on the same page.
  };

  if (!isMounted) {
    // Render a skeleton or null to avoid hydration mismatch
    return (
        <div className="container mx-auto py-12 px-4">
             <h1 className="mb-8 text-4xl font-bold tracking-tight text-center text-primary">Settings</h1>
             <div className="animate-pulse space-y-8 max-w-4xl mx-auto">
                <div className="h-48 bg-muted rounded-lg"></div>
                <div className="h-48 bg-muted rounded-lg"></div>
             </div>
        </div>
    );
  }
  
  const settingsPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Wildpedia Application Settings",
    "description": "Customize theme, font size, and other preferences for your Wildpedia experience.",
    "url": `${SITE_URL}/settings`,
    "publisher": {
        "@type": "Organization",
        "name": "Wildpedia"
    }
  };


  return (
    <div className="container mx-auto py-12 px-4">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(settingsPageJsonLd) }}
      />
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-center text-primary">Settings</h1>
      <p className="mb-12 text-lg text-center text-muted-foreground max-w-2xl mx-auto">
        Manage your application preferences here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="bg-card shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-2">
              <Palette className="h-6 w-6" />
              Appearance
            </CardTitle>
            <CardDescription>Customize the look and feel of Wildpedia.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-mode" className="flex items-center gap-2">
                 <Laptop className="h-4 w-4 text-muted-foreground" />
                 Dark/Light Mode
              </Label>
              <ThemeToggle />
            </div>

            <div className="flex items-center justify-between">
               <Label htmlFor="color-scheme" className="flex items-center gap-2">
                   <Palette className="h-4 w-4 text-muted-foreground" />
                   Color Scheme
               </Label>
              <Select value={colorScheme} onValueChange={handleThemeChange}>
                <SelectTrigger id="color-scheme" className="w-[180px]">
                  <SelectValue placeholder="Select Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="theme-default">Default (Green)</SelectItem>
                  <SelectItem value="theme-blue">Ocean Blue</SelectItem>
                  <SelectItem value="theme-desert">Desert Sands</SelectItem>
                </SelectContent>
              </Select>
            </div>

             <div className="flex items-center justify-between">
               <Label htmlFor="font-size" className="flex items-center gap-2">
                   <Text className="h-4 w-4 text-muted-foreground" />
                   Font Size
               </Label>
               <Select
                 value={fontSize}
                 onValueChange={(value) => handleFontSizeChange(value as FontSizeOption)}
               >
                 <SelectTrigger id="font-size" className="w-[180px]">
                   <SelectValue placeholder="Select Size" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="font-size-small">Small</SelectItem>
                   <SelectItem value="font-size-normal">Normal</SelectItem>
                   <SelectItem value="font-size-large">Large</SelectItem>
                 </SelectContent>
               </Select>
             </div>
          </CardContent>
        </Card>

         <Card className="bg-card shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-2">
              <SettingsIcon className="h-6 w-6" />
              General & Data
            </CardTitle>
             <CardDescription>Manage application data and other settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
               <Label htmlFor="notifications" className="flex items-center gap-2">
                    Enable Notifications
               </Label>
              <Switch id="notifications" disabled />
            </div>
             <div className="flex items-center justify-between">
               <Label htmlFor="data-sync" className="flex items-center gap-2">
                    Cloud Sync Profile
               </Label>
              <Switch id="data-sync" disabled />
            </div>
             <div className="border-t pt-6 mt-4">
                <Label className="flex items-center gap-2 mb-2 text-base">
                    <Trash2 className="h-5 w-5 text-destructive" />
                    Data Management
                </Label>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      Reset All Game Stats
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="text-destructive"/> Are you absolutely sure?
                        </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all your
                        game scores and achievements. Your username and appearance settings will remain.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleResetStats} className="bg-destructive hover:bg-destructive/90">
                        Yes, reset my stats
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <p className="text-xs text-muted-foreground mt-2">This will clear your scores, games played count, and earned achievements from this browser.</p>
             </div>
          </CardContent>
        </Card>
      </div>

       <div className="mt-12 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
        </div>
    </div>
  );
}

    