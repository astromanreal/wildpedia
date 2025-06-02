
'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import { ThemeProvider } from 'next-themes';
import { ThemeWrapper } from '@/components/theme-wrapper';
import React, { type ReactNode } from 'react';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

// APP_URL can be dynamic based on the environment, used by Next.js metadata system
const APP_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';
// CANONICAL_URL is fixed for the JSON-LD to ensure consistency between server/client rendering
const CANONICAL_URL = 'https://wildpedia.app'; // Replace with your actual final production URL if different

export const siteMetadata: Metadata = {
  metadataBase: new URL(APP_URL), // Next.js uses this for resolving relative URLs in metadata
  title: {
    default: 'Wildpedia - Explore the Animal Kingdom, Habitats & Conservation',
    template: '%s | Wildpedia - Your Wildlife Encyclopedia',
  },
  description: 'Wildpedia is your ultimate guide to the animal kingdom. Discover comprehensive information on species, wildlife habitats, conservation efforts, interactive games, and fascinating facts about creatures great and small from across the globe.',
  keywords: ['wildlife encyclopedia', 'animal facts', 'species information', 'habitats', 'conservation', 'biodiversity', 'nature guide', 'explore animals', 'wildpedia'],
  authors: [{ name: 'Wildpedia Team', url: `${APP_URL}/contact` }], // Use APP_URL for dynamic links
  creator: 'Wildpedia Team',
  publisher: 'Wildpedia',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: CANONICAL_URL, // Use CANONICAL_URL for OG URL
    siteName: 'Wildpedia',
    title: 'Wildpedia - Explore the Animal Kingdom, Habitats & Conservation',
    description: 'Your ultimate guide to the animal kingdom. Discover facts, images, and conservation status of diverse species.',
    images: [
      {
        url: `${CANONICAL_URL}/og-default.png`,
        width: 1200,
        height: 630,
        alt: 'Wildpedia - Explore the Animal Kingdom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wildpedia - Explore the Animal Kingdom, Habitats & Conservation',
    description: 'Your ultimate guide to the animal kingdom. Discover facts, images, and conservation status of diverse species.',
    images: [`${CANONICAL_URL}/twitter-default.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${APP_URL}/site.webmanifest`, // Can use APP_URL if manifest needs to be environment aware
  alternates: {
    canonical: CANONICAL_URL, // Main canonical URL for the site
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Wildpedia",
  "url": CANONICAL_URL, // Use fixed CANONICAL_URL
  "description": "Wildpedia is your ultimate guide to the animal kingdom. Discover comprehensive information on species, wildlife habitats, conservation efforts, interactive games, and fascinating facts about creatures great and small from across the globe.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${CANONICAL_URL}/search?q={search_term_string}` // Use fixed CANONICAL_URL
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Wildpedia",
    "logo": {
      "@type": "ImageObject",
      "url": `${CANONICAL_URL}/logo.png` // Use fixed CANONICAL_URL
    }
  },
  "inLanguage": "en-US"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
<meta name="google-site-verification" content="mac7aLjz9hgBPOeatEJp8fZ6RL2GRi8PeWQfgcITzFU" />
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
        >
          <ThemeWrapper>
            <div className="flex min-h-screen flex-col">
                 <Header />
                 <main className="flex-grow">{children}</main>
            </div>
            <Toaster />
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
   );
}
