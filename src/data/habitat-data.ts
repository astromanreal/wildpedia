/**
 * @fileOverview Mock data for Wildlife Habitats.
 */
import type { LucideIcon } from 'lucide-react';
// Replaced Reef with Shell as Reef doesn't exist in lucide-react
import { TreePine, Waves, Mountain, Bug, Sun, Droplets, Shell, Flower } from 'lucide-react';

export interface HabitatInfo {
  id: string; // URL-friendly identifier (e.g., 'forests', 'grasslands')
  name: string;
  icon: LucideIcon; // Icon component for the list page
  description: string;
  climate: string;
  speciesExamples: string[]; // List of common animal names found here
  conservationConcerns: string[];
  mapImageUrl: string; // URL for a representative image/map
  dataAiHint: string; // Hint for placeholder image generation
}

export const habitatData: HabitatInfo[] = [
  {
    id: 'forests',
    name: 'Forests',
    icon: TreePine,
    description: 'Dense woodlands dominated by trees, supporting a vast array of life from the canopy to the forest floor.',
    climate: 'Varies widely from tropical (hot, humid, high rainfall) to temperate (seasonal changes, moderate rainfall) and boreal (cold, coniferous trees).',
    speciesExamples: ['Tiger', 'Gorilla', 'Orangutan', 'Jaguar', 'Woodpecker', 'Deer', 'Squirrel', 'Owl', 'Bear'],
    conservationConcerns: ['Deforestation (logging, agriculture, development)', 'Climate change impacts', 'Forest fires', 'Invasive species', 'Unsustainable resource extraction'],
    mapImageUrl: 'https://cdn.pixabay.com/photo/2019/05/04/14/17/forest-4178175_1280.jpg',
    dataAiHint: 'lush green forest canopy trees path sunlight',
  },
  {
    id: 'grasslands',
    name: 'Grasslands',
    icon: Flower, // Using Flower as a placeholder for grass/savanna
    description: 'Open areas dominated by grasses rather than large shrubs or trees. Includes savannas, prairies, and steppes.',
    climate: 'Typically semi-arid with distinct wet and dry seasons. Temperatures can vary greatly between summer and winter.',
    speciesExamples: ['Lion', 'Zebra', 'Wildebeest', 'Giraffe', 'Bison', 'Prairie Dog', 'Cheetah', 'Hyena', 'Ostrich'],
    conservationConcerns: ['Conversion to agriculture', 'Overgrazing by livestock', 'Habitat fragmentation', 'Climate change (altered rainfall patterns)', 'Suppression of natural fire cycles'],
    mapImageUrl: 'https://cdn.pixabay.com/photo/2018/07/12/11/27/grassland-3533120_1280.jpg',
    dataAiHint: 'wide open grassland rolling hills sunset',
  },
  {
    id: 'deserts',
    name: 'Deserts',
    icon: Sun,
    description: 'Arid regions characterized by extreme temperatures and very low rainfall, hosting specially adapted life.',
    climate: 'Very dry (low precipitation). Can be hot (like the Sahara) or cold (like the Gobi). Large temperature swings between day and night are common.',
    speciesExamples: ['Camel', 'Fennec Fox', 'Scorpion', 'Rattlesnake', 'Roadrunner', 'Desert Tortoise', 'Meerkat', 'Oryx'],
    conservationConcerns: ['Desertification (spread of desert conditions)', 'Water scarcity', 'Off-road vehicle use damaging fragile soil', 'Resource extraction (mining, oil)', 'Climate change exacerbating drought'],
    mapImageUrl: 'https://cdn.pixabay.com/photo/2012/11/07/22/32/desert-65310_1280.jpg',
    dataAiHint: 'vast sand dunes desert landscape arid',
  },
  {
    id: 'wetlands',
    name: 'Wetlands',
    icon: Droplets,
    description: 'Areas saturated with water, either permanently or seasonally, such as swamps, marshes, bogs, and mangroves.',
    climate: 'Highly variable depending on location, but defined by the presence of water. Crucial for water filtration and flood control.',
    speciesExamples: ['Crocodile', 'Alligator', 'Beaver', 'Otter', 'Heron', 'Frog', 'Dragonfly', 'Manatee (mangroves)', 'Various fish'],
    conservationConcerns: ['Draining for agriculture or development', 'Pollution (runoff, industrial waste)', 'Dam construction altering water flow', 'Invasive species', 'Climate change (sea level rise for coastal wetlands)'],
    mapImageUrl: 'https://cdn.pixabay.com/photo/2020/07/07/05/09/pantanal-5379257_1280.jpg',
    dataAiHint: 'wetland pantanal water birds caiman',
  },
  {
    id: 'oceans',
    name: 'Oceans',
    icon: Waves,
    description: 'The vast body of saltwater covering most of the Earth, divided into different zones (coastal, open ocean, deep sea).',
    climate: 'Marine environment with varying temperatures, salinity, and pressure depending on depth and location.',
    speciesExamples: ['Whale', 'Dolphin', 'Shark', 'Tuna', 'Squid', 'Jellyfish', 'Sea Turtle', 'Various fish species', 'Plankton'],
    conservationConcerns: ['Overfishing', 'Plastic pollution', 'Climate change (ocean acidification, warming temperatures)', 'Habitat destruction (trawling, coastal development)', 'Noise pollution'],
    mapImageUrl: 'https://cdn.pixabay.com/photo/2020/05/16/10/14/ocean-5176878_1280.jpg',
    dataAiHint: 'deep blue ocean underwater coral fish',
  },
  {
    id: 'mountains',
    name: 'Mountains',
    icon: Mountain,
    description: 'High-elevation landscapes with steep slopes, rugged terrain, and changing conditions with altitude.',
    climate: 'Cooler temperatures at higher altitudes, often with significant wind and precipitation (snow or rain). Conditions change rapidly with elevation.',
    speciesExamples: ['Mountain Goat', 'Snow Leopard', 'Eagle', 'Pika', 'Ibex', 'Condor', 'Yak', 'Marmot'],
    conservationConcerns: ['Climate change (melting glaciers, shifting vegetation zones)', 'Habitat fragmentation by roads/development', 'Tourism impacts', 'Resource extraction', 'Human-wildlife conflict'],
    mapImageUrl: 'https://cdn.pixabay.com/photo/2020/09/11/00/11/landscape-5561678_1280.jpg',
    dataAiHint: 'snowy mountain range peaks lake reflection',
  },
  {
    id: 'coral-reefs',
    name: 'Coral Reefs',
    icon: Shell, // Changed from Reef to Shell
    description: 'Underwater ecosystems built by colonies of tiny animals (coral polyps), forming complex structures that support immense biodiversity.',
    climate: 'Warm, shallow, clear tropical waters with stable salinity.',
    speciesExamples: ['Clownfish', 'Parrotfish', 'Sea Turtle', 'Reef Shark', 'Moray Eel', 'Sea Anemone', 'Numerous coral and fish species'],
    conservationConcerns: ['Coral bleaching (due to warming waters)', 'Ocean acidification', 'Pollution (runoff, plastic)', 'Destructive fishing practices (dynamite, cyanide)', 'Coastal development'],
    mapImageUrl: 'https://cdn.pixabay.com/photo/2019/09/14/12/32/anemone-4475898_1280.jpg',
    dataAiHint: 'vibrant coral reef underwater anemone clownfish',
  },
  {
    id: 'mangroves',
    name: 'Mangroves',
    icon: Bug, // Using Bug as a placeholder, needs better icon maybe TreeDeciduous?
    description: 'Coastal wetlands dominated by salt-tolerant trees and shrubs, found in tropical and subtropical regions.',
    climate: 'Tropical/subtropical coastal areas, adapted to saltwater inundation and brackish conditions.',
    speciesExamples: ['Mangrove Crab', 'Mudskipper', 'Proboscis Monkey', 'Manatee', 'Various birds (herons, kingfishers)', 'Juvenile fish species'],
    conservationConcerns: ['Deforestation for aquaculture (shrimp farms), coastal development, and timber', 'Pollution', 'Climate change (sea level rise)', 'Altered freshwater inflow'],
    mapImageUrl: 'https://cdn.pixabay.com/photo/2020/05/02/12/38/mangrove-5121263_1280.jpg',
    dataAiHint: 'mangrove forest roots water coastal ecosystem',
  },
];
