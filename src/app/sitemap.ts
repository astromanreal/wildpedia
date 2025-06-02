
import type { MetadataRoute } from 'next';
import { mockAnimalDatabase, type ConservationStatus, type AnimalCategory } from '@/services/animal-info';
import { habitatData } from '@/data/habitat-data';
import { conservationZonesData } from '@/data/conservation-zones-data';
import { categories as exploreCategoriesData } from '@/app/explore/page';
import { continentData } from '@/data/continent-data';
import { subregionData } from '@/data/subregion-data';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

const familySlugs = [
    'felidae', 'canidae', 'ursidae', 'hominidae', 'elephantidae', 'cervidae', 'bovidae',
    'accipitridae', 'strigidae', 'anatidae', 'psittacidae', 'columbidae',
    'crocodylidae', 'testudinidae', 'viperidae', 'elapidae',
    'bufonidae', 'hylidae', 'salamandridae',
    'salmonidae', 'cyprinidae', 'serranidae', 'chondrichthyans',
    'formicidae', 'apidae', 'culicidae', 'coccinellidae',
    'theraphosidae', 'lycosidae', 'scorpionidae',
    'octopodidae', 'muricidae', 'veneridae'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  const staticRoutes = [
    '/',
    '/explore',
    '/games',
    '/games/animal-id-quiz',
    '/games/conservation-challenge',
    '/games/habitat-match',
    '/games/migration-maze',
    '/habitats',
    '/conservation-zones',
    '/loss-extinction',
    '/links',
    '/contact',
    '/profile',
    '/settings',
    '/tourism',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1.0 : (route.startsWith('/explore') || route.startsWith('/games') || route.startsWith('/habitats') ? 0.8 : 0.6),
  }));

  const animalRoutes = mockAnimalDatabase.map((animal) => ({
    url: `${BASE_URL}/animal/${animal.id}`,
    lastModified: currentDate, // Assuming content might change, but not frequently
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const habitatRoutes = habitatData.map((habitat) => ({
    url: `${BASE_URL}/habitats/${habitat.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const conservationZoneRoutes = conservationZonesData.map((zone) => ({
    url: `${BASE_URL}/conservation-zones/${zone.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
  
  const exploreCategoryRoutes = exploreCategoriesData.map((category) => ({
    url: `${BASE_URL}/explore/${category.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const conservationStatusValues: ConservationStatus[] = [
    'Extinct', 'Extinct in the Wild', 'Critically Endangered', 'Endangered',
    'Vulnerable', 'Near Threatened', 'Least Concern', 'Data Deficient', 'Not Evaluated'
  ];
  const conservationStatusRoutes = conservationStatusValues.map(status => ({
    url: `${BASE_URL}/explore/conservation/${toSlug(status)}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const animalTypeValues: AnimalCategory[] = [
    'Mammal', 'Bird', 'Reptile', 'Amphibian', 'Fish', 'Insect', 
    'Arachnid', 'Mollusk', 'Marine Mammal', 'Other Invertebrate', 'Other'
  ];
  const animalTypeRoutes = animalTypeValues.map(type => ({
    url: `${BASE_URL}/explore/type/${toSlug(type)}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const biologicalFamilyRoutes = familySlugs.map(slug => ({
    url: `${BASE_URL}/explore/family/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const continentPageRoutes = continentData.map(continent => ({
    url: `${BASE_URL}/explore/region/${continent.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  const subregionPageRoutes = subregionData.map(subregion => ({
    url: `${BASE_URL}/explore/region/${subregion.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.65,
  }));


  return [
    ...staticRoutes,
    ...animalRoutes,
    ...habitatRoutes,
    ...conservationZoneRoutes,
    ...exploreCategoryRoutes,
    ...conservationStatusRoutes,
    ...animalTypeRoutes,
    ...biologicalFamilyRoutes, 
    ...continentPageRoutes, 
    ...subregionPageRoutes, 
  ];
}
