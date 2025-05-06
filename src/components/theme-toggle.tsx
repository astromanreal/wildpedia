
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  // Use the theme and setTheme function provided by next-themes
  const { theme, setTheme } = useTheme()
   const [isMounted, setIsMounted] = React.useState(false);

   // useEffect only runs on the client, so now we can safely show the UI
   React.useEffect(() => {
     setIsMounted(true);
   }, []);

  const toggleTheme = () => {
    // Explicitly toggle between 'light' and 'dark'
    setTheme(theme === "dark" ? "light" : "dark")
  }

   if (!isMounted) {
     // Avoid rendering mismatch during hydration
     // Render a placeholder or null until mounted
      return <Button variant="outline" size="icon" disabled><Sun className="h-[1.2rem] w-[1.2rem]" /></Button>;
   }


  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      {/* Conditionally render icons based on the current theme */}
      {theme === 'dark' ? (
         <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
         <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
