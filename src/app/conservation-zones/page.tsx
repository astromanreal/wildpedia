
'use client';

import type { Metadata } from 'next'; // Still useful for client components if pre-rendered or for consistency
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Filter, Search, X } from 'lucide-react';
import { conservationZonesData, type ConservationZone, type ConservationZoneCategory } from '@/data/conservation-zones-data';
import ZoneCard from '@/components/conservation-zones/zone-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Static metadata for the main listing page.
// Individual zone pages will have dynamic metadata.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

// If this page were server-rendered without client hooks for filtering,
// you could export `metadata` directly. Since it's a client component,
// this primarily serves for initial load if possible or as a template.
// For truly dynamic titles based on filters, you'd update document.title client-side.
export const staticMetadata: Metadata = { // Renamed to avoid confusion as it's a 'use client' page.
  title: 'Conservation Zones & Sanctuaries - Protected Wildlife Areas',
  description: 'Explore a curated list of important conservation zones, national parks, wildlife sanctuaries, and other protected areas dedicated to preserving biodiversity on Wildpedia.',
  keywords: ['conservation zones', 'national parks', 'wildlife sanctuaries', 'protected areas', 'biodiversity conservation', 'tiger reserves', 'marine protected areas'],
  openGraph: {
    title: 'Conservation Zones & Sanctuaries | Wildpedia',
    description: 'Discover protected natural havens for wildlife around the world.',
    url: `${SITE_URL}/conservation-zones`,
    images: [{ url: `${SITE_URL}/og-conservation-zones.png`, alt: 'Conservation Zones on Wildpedia' }], // Create public/og-conservation-zones.png
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conservation Zones & Sanctuaries | Wildpedia',
    description: 'Discover protected natural havens for wildlife around the world.',
    images: [`${SITE_URL}/twitter-conservation-zones.png`], // Create public/twitter-conservation-zones.png
  },
};


const categories: ConservationZoneCategory[] = ['Sanctuary', 'National Park', 'Tiger Reserve', 'Marine Protected Area', 'World Heritage Site'];

export default function ConservationZonesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ConservationZoneCategory | 'All'>('All');

  // Update document title dynamically if needed (though Next.js metadata is preferred for SSR/initial)
  useEffect(() => {
    if (selectedCategory !== 'All') {
      document.title = `${selectedCategory}s | Conservation Zones | Wildpedia`;
    } else if (searchTerm) {
       document.title = `Search: ${searchTerm} | Conservation Zones | Wildpedia`;
    }
    else {
      document.title = staticMetadata.title as string; // Fallback to static title
    }
  }, [searchTerm, selectedCategory]);


  const filteredZones = useMemo(() => {
    return conservationZonesData.filter(zone => {
      const matchesCategory = selectedCategory === 'All' || zone.category === selectedCategory;
      const matchesSearch = searchTerm.trim() === '' ||
                            zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            zone.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            zone.keySpecies.some(species => species.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleClearFilters = () => {
      setSearchTerm('');
      setSelectedCategory('All');
  }
  
  const zonesPageJsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Conservation Zones & Sanctuaries on Wildpedia",
      "description": "Browse various protected wildlife areas including national parks, sanctuaries, and reserves.",
      "url": `${SITE_URL}/conservation-zones`,
       "mainEntity": {
        "@type": "ItemList",
        "itemListElement": filteredZones.map((zone, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Place", // Or TouristAttraction
            "name": zone.name,
            "description": zone.significance.substring(0, 100) + "...",
            "url": `${SITE_URL}/conservation-zones/${zone.id}`,
            "image": zone.image
          }
        }))
      }
    };


  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(zonesPageJsonLd) }}
      />
      <div className="relative h-64 md:h-80 w-full overflow-hidden mb-12">
        <Image
          src="https://cdn.pixabay.com/photo/2021/11/13/04/02/panda-6790494_1280.jpg"
          alt="Panda eating bamboo in a protected habitat - Hero for Conservation Zones"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-70"
          priority
          data-ai-hint="panda bamboo eating china conservation"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-primary-foreground px-4 z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">Conservation Zones & Sanctuaries</h1>
          <p className="text-lg md:text-xl max-w-2xl text-white/90 drop-shadow-md">Explore Earth’s Protected Natural Havens</p>
        </div>
         <Link href="/" className="absolute top-4 left-4 z-20 text-sm text-white/80 hover:text-white bg-black/30 hover:bg-black/50 px-3 py-1 rounded-full inline-flex items-center gap-1 transition-colors">
             <ArrowLeft className="h-4 w-4" /> Back to Home
         </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row items-center gap-4 p-4 bg-muted/50 rounded-lg border shadow-sm">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, location, species..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
              aria-label="Search conservation zones"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value as ConservationZoneCategory | 'All')}
              aria-label="Filter by zone category"
            >
              <SelectTrigger className="w-full md:w-[250px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
            {(searchTerm || selectedCategory !== 'All') && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleClearFilters} className="text-muted-foreground hover:text-destructive" aria-label="Clear filters">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Clear Filters</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clear Filters</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
        </div>

        {filteredZones.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 perspective-1000">
            {filteredZones.map((zone) => (
              <ZoneCard key={zone.id} zone={zone} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No conservation zones match your criteria.</p>
             <Button variant="link" onClick={handleClearFilters} className="mt-4">Clear filters and try again</Button>
          </div>
        )}
      </div>
    </div>
  );
}

    