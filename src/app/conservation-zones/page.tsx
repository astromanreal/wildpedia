'use client'; // Required for state management (filtering, search)

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Filter, Search, X } from 'lucide-react';
import { conservationZonesData, type ConservationZone, type ConservationZoneCategory } from '@/data/conservation-zones-data';
import ZoneCard from '@/components/conservation-zones/zone-card'; // Reusable card component
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const categories: ConservationZoneCategory[] = ['Sanctuary', 'National Park', 'Tiger Reserve', 'Marine Protected Area', 'World Heritage Site'];

export default function ConservationZonesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ConservationZoneCategory | 'All'>('All');

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden mb-12">
        <Image
          src="https://cdn.pixabay.com/photo/2021/11/13/04/02/panda-6790494_1280.jpg" // Updated hero image
          alt="Panda eating bamboo in a protected habitat" // Updated alt text
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-70"
          priority
          data-ai-hint="panda bamboo eating china conservation" // Updated data-ai-hint
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-primary-foreground px-4 z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">Conservation Zones & Sanctuaries</h1>
          <p className="text-lg md:text-xl max-w-2xl text-white/90 drop-shadow-md">Explore Earth’s Protected Natural Havens</p>
        </div>
         {/* Back Link */}
         <Link href="/" className="absolute top-4 left-4 z-20 text-sm text-white/80 hover:text-white bg-black/30 hover:bg-black/50 px-3 py-1 rounded-full inline-flex items-center gap-1 transition-colors">
             <ArrowLeft className="h-4 w-4" /> Back to Explore
         </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter and Search Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-center gap-4 p-4 bg-muted/50 rounded-lg border shadow-sm">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, location, species..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value as ConservationZoneCategory | 'All')}
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
                    <Button variant="ghost" size="icon" onClick={handleClearFilters} className="text-muted-foreground hover:text-destructive">
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

        {/* Grid Layout */}
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

        {/* Optional: Map Placeholder */}
        {/* <div className="mt-16 p-4 border rounded-lg bg-card">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Interactive Map</h2>
          <div className="h-96 bg-muted flex items-center justify-center text-muted-foreground italic">
            Interactive map coming soon...
          </div>
        </div> */}

        {/* Optional: Glossary Placeholder */}
        {/* <div className="mt-16 p-4 border rounded-lg bg-card">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Conservation Glossary</h2>
             <p className="text-muted-foreground italic">Glossary coming soon...</p>
        </div> */}
      </div>
    </div>
  );
}
