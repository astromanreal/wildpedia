/**
 * @fileOverview Mock data for Conservation Zones & Sanctuaries.
 */
import type { LucideIcon } from 'lucide-react';
// Replaced Park with Mountain as Park doesn't exist in lucide-react
import { ShieldCheck, Mountain, Fish, Globe, Home } from 'lucide-react';

export type ConservationZoneCategory = 'Sanctuary' | 'National Park' | 'Tiger Reserve' | 'Marine Protected Area' | 'World Heritage Site';

export interface ConservationZone {
  id: string; // URL-friendly identifier
  name: string;
  category: ConservationZoneCategory;
  location: string; // e.g., "State, Country"
  area: string; // e.g., "430 km²"
  keySpecies: string[];
  bestVisitTime: string;
  rules: string[];
  significance: string;
  image: string; // Updated image URL
  dataAiHint: string; // Hint for image generation
  icon: LucideIcon; // Icon representing the category
}

// Helper to get icon based on category
const getIconForCategory = (category: ConservationZoneCategory): LucideIcon => {
    switch (category) {
        case 'Sanctuary': return Home; // Using Home as placeholder
        case 'National Park': return Mountain; // Using Mountain instead of Park
        case 'Tiger Reserve': return ShieldCheck; // Using ShieldCheck as placeholder
        case 'Marine Protected Area': return Fish;
        case 'World Heritage Site': return Globe;
        default: return ShieldCheck;
    }
};


export const conservationZonesData: ConservationZone[] = [
  {
    id: 'kaziranga-national-park',
    name: 'Kaziranga National Park',
    category: 'World Heritage Site',
    location: 'Assam, India',
    area: 'Approx. 1090 km² (core + additions)',
    keySpecies: ['One-horned Rhinoceros', 'Tiger', 'Elephant', 'Wild Water Buffalo', 'Swamp Deer'],
    bestVisitTime: 'November to April',
    rules: ['Follow guide instructions', 'Maintain silence', 'No littering', 'Do not disturb animals', 'Stick to designated routes'],
    significance: 'Home to two-thirds of the world’s great one-horned rhinoceroses population. Highest density of tigers among protected areas in the world.',
    image: 'https://cdn.pixabay.com/photo/2020/05/05/10/11/chobe-national-park-5132392_1280.jpg', // Updated image
    dataAiHint: 'kaziranga national park rhinoceros india',
    icon: getIconForCategory('World Heritage Site'),
  },
  {
    id: 'serengeti-national-park',
    name: 'Serengeti National Park',
    category: 'National Park',
    location: 'Tanzania',
    area: '14,750 km²',
    keySpecies: ['Wildebeest', 'Zebra', 'Lion', 'Leopard', 'Cheetah', 'Elephant', 'Giraffe'],
    bestVisitTime: 'June to October (Dry season, Great Migration in north), January to March (Calving season in south)',
    rules: ['Stay inside vehicle in predator areas', 'No off-road driving', 'Do not feed animals', 'Respect speed limits'],
    significance: 'Famous for the annual Great Migration of over 1.5 million wildebeest and hundreds of thousands of zebras.',
    image: 'https://cdn.pixabay.com/photo/2015/10/31/18/30/africa-1016064_1280.jpg', // Updated image
    dataAiHint: 'serengeti national park migration tanzania',
    icon: getIconForCategory('National Park'),
  },
  {
    id: 'galapagos-marine-reserve',
    name: 'Galápagos Marine Reserve',
    category: 'Marine Protected Area',
    location: 'Ecuador',
    area: '133,000 km²',
    keySpecies: ['Marine Iguana', 'Galápagos Penguin', 'Sea Lion', 'Hammerhead Shark', 'Whale Shark', 'Blue-footed Booby'],
    bestVisitTime: 'Year-round (Dec-May warm/wet, Jun-Nov cool/dry)',
    rules: ['Strict regulations on boat tours', 'No touching wildlife', 'Designated diving/snorkeling sites', 'No fishing in most areas'],
    significance: 'One of the largest and most biologically diverse marine reserves in the world, crucial for Darwin\'s theory of evolution.',
    image: 'https://cdn.pixabay.com/photo/2019/09/16/14/43/sea-lion-4481175_1280.jpg', // Updated image
    dataAiHint: 'galapagos islands marine iguana wildlife',
    icon: getIconForCategory('Marine Protected Area'),
  },
   {
    id: 'jim-corbett-national-park',
    name: 'Jim Corbett National Park',
    category: 'Tiger Reserve',
    location: 'Uttarakhand, India',
    area: '1,318.54 km² (including buffer)',
    keySpecies: ['Bengal Tiger', 'Asiatic Elephant', 'Leopard', 'Sambar Deer', 'Gharial'],
    bestVisitTime: 'November to June (Specific zones open seasonally)',
    rules: ['Permits required', 'Adhere to zone timings', 'Maintain distance from wildlife', 'No smoking or alcohol'],
    significance: 'India\'s oldest national park, established in 1936. A key area for tiger conservation under Project Tiger.',
    image: 'https://cdn.pixabay.com/photo/2020/05/05/10/10/chobe-national-park-5132381_1280.jpg', // Updated image
    dataAiHint: 'jim corbett national park tiger india',
    icon: getIconForCategory('Tiger Reserve'),
   },
   {
    id: 'yellowstone-national-park',
    name: 'Yellowstone National Park',
    category: 'National Park',
    location: 'Wyoming, Montana, Idaho, USA',
    area: '8,983 km²',
    keySpecies: ['Bison', 'Grizzly Bear', 'Wolf', 'Elk', 'Pronghorn', 'Bald Eagle'],
    bestVisitTime: 'May to September (Summer access), December to March (Winter activities, limited access)',
    rules: ['Stay on marked trails', 'Maintain safe distance from wildlife (especially bears/bison)', 'Store food properly', 'No drone use'],
    significance: 'Widely considered the first national park in the world. Known for its geothermal features (geysers, hot springs) and diverse wildlife.',
    image: 'https://cdn.pixabay.com/photo/2016/10/22/12/01/yellowstone-national-park-1760553_1280.jpg', // Updated image
    dataAiHint: 'yellowstone national park geyser bison usa',
    icon: getIconForCategory('National Park'),
   },
];
