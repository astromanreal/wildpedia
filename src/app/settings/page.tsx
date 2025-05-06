'use client'; // Make this a Client Component

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Palette, Text, Laptop } from 'lucide-react'; // Import Text icon
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

// Constant for storing the color scheme preference
const COLOR_SCHEME_STORAGE_KEY = 'wildpedia-color-scheme';
// Constant for storing font size preference
const FONT_SIZE_STORAGE_KEY = 'wildpedia-font-size';

export default function SettingsPage() {
  const [colorScheme, setColorScheme] = useState('theme-default'); // Default theme
  const [fontSize, setFontSize] = useState('normal'); // State for font size
  const [isMounted, setIsMounted] = useState(false); // Prevent hydration mismatch

   // Load theme and font size from local storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(COLOR_SCHEME_STORAGE_KEY) || 'theme-default';
    const savedFontSize = localStorage.getItem(FONT_SIZE_STORAGE_KEY) || 'normal';
    setColorScheme(savedTheme);
    setFontSize(savedFontSize);
    setIsMounted(true); // Component is mounted, safe to use state

    // Apply initial classes based on saved preferences
    document.body.classList.remove('theme-default', 'theme-blue', 'theme-desert');
    document.body.classList.add(savedTheme);
    // Apply font size class (example, actual implementation might vary)
    // document.body.classList.remove('font-size-small', 'font-size-normal', 'font-size-large');
    // document.body.classList.add(`font-size-${savedFontSize}`);

  }, []);

  // Update theme and save to local storage
  const handleThemeChange = (newTheme: string) => {
    if (newTheme !== colorScheme) {
        setColorScheme(newTheme);
        localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, newTheme);
        // Apply class to body immediately for visual feedback
        document.body.classList.remove('theme-default', 'theme-blue', 'theme-desert');
        document.body.classList.add(newTheme);
    }
  };

  // Handler for font size change
  const handleFontSizeChange = (newSize: string) => {
     if (newSize !== fontSize) {
        setFontSize(newSize);
        localStorage.setItem(FONT_SIZE_STORAGE_KEY, newSize);
        // Add logic here to apply font size class to body or html element
        // This part is complex and requires CSS setup, keeping it disabled for now
        // Example:
        // document.body.classList.remove('font-size-small', 'font-size-normal', 'font-size-large');
        // document.body.classList.add(`font-size-${newSize}`);
        console.warn('Font size change UI updated, but CSS application is not implemented.');
     }
  };


   // Wait until mounted to render the select value to avoid hydration mismatch
  if (!isMounted) {
    // Optionally render a loading state or null
    return null; // Or a skeleton loader
  }


  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-center text-primary">Settings</h1>
      <p className="mb-12 text-lg text-center text-muted-foreground max-w-2xl mx-auto">
        Manage your application preferences here. Changes might require a refresh to take full effect.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

        {/* Appearance Settings Card */}
        <Card className="bg-card shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-2">
              <Palette className="h-6 w-6" />
              Appearance
            </CardTitle>
            <CardDescription>Customize the look and feel of Wildpedia.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme Setting */}
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-mode" className="flex items-center gap-2">
                 <Laptop className="h-4 w-4 text-muted-foreground" /> {/* Using Laptop for system theme */}
                 Dark/Light Mode
              </Label>
              {/* Reusing ThemeToggle shows current state, logic is already handled */}
              <ThemeToggle />
            </div>

            {/* Color Scheme Setting */}
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

             {/* Font Size Setting */}
             <div className="flex items-center justify-between">
               <Label htmlFor="font-size" className="flex items-center gap-2">
                   <Text className="h-4 w-4 text-muted-foreground" />
                   Font Size
               </Label>
               {/* Keep disabled until full CSS/JS implementation is ready */}
               <Select
                 value={fontSize}
                 onValueChange={handleFontSizeChange}
                 disabled // Remove this 'disabled' prop when ready to implement CSS changes
               >
                 <SelectTrigger id="font-size" className="w-[180px]">
                   <SelectValue placeholder="Select Size" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="small">Small</SelectItem>
                   <SelectItem value="normal">Normal</SelectItem>
                   <SelectItem value="large">Large</SelectItem>
                 </SelectContent>
               </Select>
             </div>
          </CardContent>
        </Card>

        {/* General Settings Card (Placeholder) */}
         <Card className="bg-card shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-2">
              <SettingsIcon className="h-6 w-6" />
              General
            </CardTitle>
             <CardDescription>Configure other application settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             {/* Example Setting Placeholder */}
            <div className="flex items-center justify-between">
               <Label htmlFor="notifications" className="flex items-center gap-2">
                    {/* Add appropriate icon */}
                    Enable Notifications
               </Label>
              <Switch id="notifications" disabled /> {/* Disabled placeholder */}
            </div>
             <div className="flex items-center justify-between">
               <Label htmlFor="data-sync" className="flex items-center gap-2">
                    {/* Add appropriate icon */}
                    Cloud Sync Profile
               </Label>
              <Switch id="data-sync" disabled /> {/* Disabled placeholder */}
            </div>
              <p className="text-sm text-muted-foreground pt-4 border-t">More settings coming soon!</p>
          </CardContent>
        </Card>
      </div>

       <div className="mt-12 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                &larr; Back to Explore
            </Link>
        </div>
    </div>
  );
}
