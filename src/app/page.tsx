
import type { Metadata } from 'next';
import HeroSection from '@/components/layout/hero-section';
import ExploreCategoriesPage from '@/components/pages/explore-page'; // This is the category grid
import FeaturedGamesSection from '@/components/home/featured-games-section';
import KeyFeaturesSection from '@/components/home/key-features-section';
import { categories as exploreCategoriesData } from '@/app/explore/page'; // For JSON-LD

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

export const metadata: Metadata = {
  title: 'Wildpedia - Your Gateway to the Animal Kingdom & Wildlife Conservation',
  description: 'Welcome to Wildpedia! Explore a vast collection of animal information, discover wildlife habitats, learn about conservation efforts, and engage with interactive games. Your ultimate resource for all things wild.',
  keywords: ['wildlife encyclopedia', 'animal kingdom', 'explore animals', 'nature discovery', 'conservation education', 'habitats guide', 'species information', 'wildpedia home'],
  openGraph: {
    title: 'Wildpedia - Your Gateway to the Animal Kingdom & Wildlife Conservation',
    description: 'Dive into the fascinating world of animals with Wildpedia. Explore species, habitats, conservation, games, and more.',
    url: SITE_URL, // Explicitly set for homepage
    images: [
      {
        url: `${SITE_URL}/og-homepage.png`, // Ensure /public/og-homepage.png exists
        width: 1200,
        height: 630,
        alt: 'Wildpedia Homepage - Gateway to Wildlife Exploration',
      },
    ],
  },
  twitter: {
    title: 'Wildpedia - Your Gateway to the Animal Kingdom & Wildlife Conservation',
    description: 'Dive into the fascinating world of animals with Wildpedia. Explore species, habitats, and more.',
     images: [`${SITE_URL}/twitter-homepage.png`], // Ensure /public/twitter-homepage.png exists
  },
  alternates: {
    canonical: SITE_URL, // Canonical URL for the homepage
  },
};

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": metadata.title as string,
  "description": metadata.description as string,
  "url": SITE_URL,
  "isPartOf": {
    "@type": "WebSite",
    "url": SITE_URL,
    "name": "Wildpedia"
  },
  "mainEntity": {
    "@type": "ItemList",
    "name": "Key Sections of Wildpedia",
    "itemListElement": [
      ...exploreCategoriesData.map((category, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "WebPage",
          "name": category.name,
          "description": category.description,
          "url": `${SITE_URL}/explore/${category.slug}`
        }
      })),
      {
        "@type": "ListItem",
        "position": exploreCategoriesData.length + 1,
        "item": {
          "@type": "WebPage",
          "name": "Wildlife Games & Quizzes",
          "description": "Test your knowledge with fun and educational wildlife games.",
          "url": `${SITE_URL}/games`
        }
      },
      {
        "@type": "ListItem",
        "position": exploreCategoriesData.length + 2,
        "item": {
            "@type": "WebPage",
            "name": "Wildlife Tourism Guide",
            "description": "Explore responsible wildlife tourism and eco-travel.",
            "url": `${SITE_URL}/tourism`
        }
      }
    ]
  }
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />
      <HeroSection />
      <ExploreCategoriesPage />
      <FeaturedGamesSection />
      <KeyFeaturesSection />
    </>
  );
}
