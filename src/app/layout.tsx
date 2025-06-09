
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
  authors: [{ name: 'Wildpedia Team', url: `${APP_URL}/contact` }],
  creator: 'Wildpedia Team',
  publisher: 'Wildpedia',
  verification: { // Handles google-site-verification and other verifications
    google: 'mac7aLjz9hgBPOeatEJp8fZ6RL2GRi8PeWQfgcITzFU',
    // Add other verification services here if needed, e.g., yandex, bing, etc.
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: CANONICAL_URL,
    siteName: 'Wildpedia',
    title: 'Wildpedia - Explore the Animal Kingdom, Habitats & Conservation',
    description: 'Your ultimate guide to the animal kingdom. Discover facts, images, and conservation status of diverse species.',
    images: [
      {
        url: `${CANONICAL_URL}/og-default.png`, // Ensure /public/og-default.png exists
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
    images: [`${CANONICAL_URL}/twitter-default.png`], // Ensure /public/twitter-default.png exists
    // site: '@yourTwitterHandle', // Optional: Your site's Twitter handle
    // creator: '@creatorTwitterHandle', // Optional: Content creator's Twitter handle
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
    icon: '/favicon.ico', // Main favicon
    shortcut: '/favicon-16x16.png', // For older browsers
    apple: '/apple-touch-icon.png', // For iOS home screen
    // You can add more sizes or types if needed:
    // other: [
    //   { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32' },
    //   { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
    // ],
  },
  manifest: `${APP_URL}/site.webmanifest`,
  alternates: {
    canonical: CANONICAL_URL,
    // languages: {
    //   'en-US': '/',
    //   // 'es-ES': '/es', // If you add translations
    // },
    // types: { // If you offer different content types, e.g., RSS feed
    //   'application/rss+xml': `${APP_URL}/rss.xml`,
    // },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Wildpedia",
  "url": CANONICAL_URL,
  "description": "Wildpedia is your ultimate guide to the animal kingdom. Discover comprehensive information on species, wildlife habitats, conservation efforts, interactive games, and fascinating facts about creatures great and small from across the globe.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${CANONICAL_URL}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Wildpedia",
    "logo": {
      "@type": "ImageObject",
      "url": `${CANONICAL_URL}/logo.png` // Ensure /public/logo.png exists
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
        <meta name="google-site-verification" content="mac7aLjz9hgBPOeatEJp8fZ6RL2GRi8PeWQfgcITzFU" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
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
