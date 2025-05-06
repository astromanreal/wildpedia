'use client'; // Make the layout client-side to use hooks for sheet interaction

import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Changed font to Inter
import './globals.css';
import { Toaster } from '@/components/ui/toaster'; // Import Toaster
import Header from '@/components/layout/header'; // Import Header
import { ThemeProvider } from 'next-themes'; // Import ThemeProvider
import { ThemeWrapper } from '@/components/theme-wrapper'; // Import ThemeWrapper
// Removed SidebarProvider and related imports

import React, { type ReactNode } from 'react'; // Import React for hook usage

const inter = Inter({
  variable: '--font-inter', // Changed variable name
  subsets: ['latin'],
});

// Metadata can still be defined in a client component, but it's often better handled in server components or page.tsx if possible
// export const metadata: Metadata = {
//   title: 'Wildpedia', // Updated title
//   description: 'A comprehensive digital encyclopedia of all animals living on Earth.', // Updated description
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // No longer need Sidebar-specific components here. Header will handle the trigger for the new right nav.
  const LayoutContent = () => {
       return (
          <div className="flex min-h-screen flex-col"> {/* Simplified layout structure */}
               <Header /> {/* Header now contains the trigger for the right nav sheet */}
               <main className="flex-grow">{children}</main>
          </div>
       );
  }


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
         {/* Keep metadata definitions minimal here or move to page.tsx */}
         <title>Wildpedia</title>
         <meta name="description" content="A comprehensive digital encyclopedia of all animals living on Earth." />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark" // Set a default theme to dark
            enableSystem={false} // Disable system preference detection
            disableTransitionOnChange // Optional: disable theme transition animation if preferred
        >
          <ThemeWrapper>
            <LayoutContent /> {/* Render the layout structure */}
            <Toaster />
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
   );
}
