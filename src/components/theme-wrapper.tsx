'use client';

import { useEffect, useState } from 'react';
// No need to import useTheme here anymore, ThemeProvider handles the dark class

// Constant for storing the color scheme preference
const COLOR_SCHEME_STORAGE_KEY = 'wildpedia-color-scheme';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState('theme-default'); // Default to green theme
  const [isMounted, setIsMounted] = useState(false); // Prevent hydration issues

  // Effect to load color scheme from localStorage and apply class
  useEffect(() => {
    const savedColorScheme = localStorage.getItem(COLOR_SCHEME_STORAGE_KEY) || 'theme-default';
    setColorScheme(savedColorScheme);

    // Apply the initial color scheme class
    document.body.classList.remove('theme-default', 'theme-blue', 'theme-desert');
    document.body.classList.add(savedColorScheme);

    setIsMounted(true); // Component is mounted

    // Add listener for storage changes to sync across tabs
    const handleStorageChange = (event: StorageEvent) => {
        if (event.key === COLOR_SCHEME_STORAGE_KEY && event.newValue) {
             setColorScheme(event.newValue);
             document.body.classList.remove('theme-default', 'theme-blue', 'theme-desert');
             document.body.classList.add(event.newValue);
        }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);

  }, []);


  // Effect to update body classes only when the colorScheme state changes
  // This simplifies the logic as next-themes/ThemeProvider handles the .dark class
  useEffect(() => {
    if (isMounted) { // Only run after initial mount and setup
         // Remove previous color scheme classes
        document.body.classList.remove('theme-default', 'theme-blue', 'theme-desert');
         // Add the current color scheme class
        document.body.classList.add(colorScheme);
    }
  }, [colorScheme, isMounted]);

  // This component doesn't render anything itself, just manages color scheme classes
  return <>{children}</>;
}
