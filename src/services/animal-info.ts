/**
 * @fileOverview Service for fetching detailed animal information. Includes type definitions.
 */

/**
 * Represents the conservation status of an animal.
 */
export type ConservationStatus = 'Extinct' | 'Extinct in the Wild' | 'Critically Endangered' | 'Endangered' | 'Vulnerable' | 'Near Threatened' | 'Least Concern' | 'Data Deficient' | 'Not Evaluated';

/**
 * Represents the category/type of the animal.
 */
export type AnimalCategory = 'Mammal' | 'Bird' | 'Reptile' | 'Amphibian' | 'Fish' | 'Insect' | 'Arachnid' | 'Mollusk' | 'Other Invertebrate' | 'Marine Mammal' | 'Other';


/**
 * Represents the geographical distribution of an animal.
 */
export interface Distribution {
  /**
   * A description of the animal's geographical distribution.
   */
  description: string;
  /**
   * A URL to a map showing the animal's distribution. (Can be placeholder)
   */
  mapUrl: string;
}

/**
 * Represents detailed information about an animal.
 */
export interface AnimalInfo {
  /**
   * The scientific name of the animal.
   */
  scientificName: string;
  /**
   * The common name of the animal.
   */
  commonName: string;
    /**
   * The category/type of the animal.
   */
  category: AnimalCategory;
  /**
   * URLs to images or videos of the animal.
   */
  mediaUrls: string[];
  /**
   * A description of the animal.
   */
  description: string;
  /**
   * The animal's diet.
   */
  diet: string;
  /**
   * The animal's habitat.
   */
  habitat: string;
  /**
   * The animal's typical behavior.
   */
  behavior: string;
  /**
   * The typical size of the animal.
   */
  size: string;
  /**
   * The typical weight of the animal.
   */
  weight: string;
  /**
   * The typical lifespan of the animal.
   */
  lifespan: string;
  /**
   * The estimated population of the animal.
   */
  population: string;
  /**
   * The animal's conservation status according to the IUCN Red List.
   */
  conservationStatus: ConservationStatus;
   /**
   * Major threats faced by the animal.
   */
  threats: string[];
  /**
   * Interesting or notable facts about the animal.
   */
  funFacts: string[];
  /**
   * Information about the animal's geographical distribution.
   */
  distribution: Distribution;
}

// --- Mock Data Store ---
// In a real application, this would be replaced by API calls or database queries.
const mockAnimalDatabase: Record<string, AnimalInfo> = {
  'lion': {
    scientificName: 'Panthera leo',
    commonName: 'Lion',
    category: 'Mammal',
    mediaUrls: [
      'https://picsum.photos/seed/lion-profile/500/400',
      'https://picsum.photos/seed/lion-pride/500/400',
      // 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/440px-Lion_waiting_in_Namibia.jpg', // Uncomment if host is configured
    ],
    description: 'The lion is a large cat of the genus Panthera native to Africa and India. It is the most social of all big cats, living in groups called prides.',
    diet: 'Carnivorous - primarily large mammals like wildebeest, zebras, and buffalo.',
    habitat: 'Savannas, grasslands, open woodlands.',
    behavior: 'Social animals living in prides, typically led by related females. Males defend the pride\'s territory. They are mostly nocturnal hunters.',
    size: 'Body Length: 1.8 - 2.1 m (male), 1.6 - 1.9 m (female); Height: ~1.2 m at shoulder.',
    weight: '150 - 250 kg (male), 120 - 182 kg (female).',
    lifespan: '10 - 14 years in the wild, up to 25 years in captivity.',
    population: 'Approximately 23,000 - 39,000 remaining in the wild.',
    conservationStatus: 'Vulnerable',
    threats: ['Habitat loss and fragmentation', 'Human-wildlife conflict (retaliatory killings)', 'Prey base depletion', 'Illegal wildlife trade', 'Disease'],
    funFacts: [
      'A lion’s roar can be heard from as far as 8 kilometers (5 miles) away.',
      'Lions are the only cats that live in large social groups (prides).',
      'Lionesses do the majority of the hunting for the pride.',
      'Unlike most big cats, lions are not typically strong swimmers.'
    ],
    distribution: {
      description: 'Fragmented populations across Sub-Saharan Africa and a single population in the Gir Forest National Park, India.',
      mapUrl: 'https://picsum.photos/seed/lion-map/400/200', // Placeholder map URL
    },
  },
  // Add more mock animals here as needed
  'penguin': {
    scientificName: 'Spheniscidae (Family)', // Example: Aptenodytes forsteri (Emperor)
    commonName: 'Penguin',
    category: 'Bird',
    mediaUrls: [
      'https://picsum.photos/seed/penguin-profile/500/400',
      'https://picsum.photos/seed/penguin-group/500/400',
    ],
    description: 'Penguins are a group of aquatic flightless birds living almost exclusively in the Southern Hemisphere.',
    diet: 'Carnivorous - krill, fish, squid.',
    habitat: 'Oceans and coastal regions, primarily in cold climates (Antarctica, sub-Antarctic islands, southern continents).',
    behavior: 'Highly social, often forming large colonies. Excellent swimmers and divers.',
    size: 'Varies greatly by species (e.g., Little Blue Penguin: ~30cm, Emperor Penguin: ~1.1m).',
    weight: 'Varies greatly by species (e.g., Little Blue Penguin: ~1.5kg, Emperor Penguin: ~40kg).',
    lifespan: '15 - 20 years on average, depending on species.',
    population: 'Varies by species, some abundant, others threatened.',
    conservationStatus: 'Varies (Least Concern to Endangered)',
    threats: ['Climate change (melting sea ice)', 'Overfishing (depleting food sources)', 'Pollution (oil spills)', 'Introduced predators on breeding grounds'],
    funFacts: [
      'Penguins cannot fly in the air, but they "fly" underwater.',
      'They have dense bones to help them dive.',
      'Penguins huddle together in large groups to stay warm in extreme cold.',
      'Their black and white plumage provides camouflage (countershading).'
    ],
    distribution: {
      description: 'Southern Hemisphere, particularly Antarctica, New Zealand, Australia, South America, and Southern Africa.',
      mapUrl: 'https://picsum.photos/seed/penguin-map/400/200',
    },
  },
   'elephant': {
    scientificName: 'Ailurus fulgens',
    commonName: 'Red Panda',
    category: 'Mammal',
    mediaUrls: [
      'https://picsum.photos/seed/red-panda-profile/500/400',
      'https://picsum.photos/seed/red-panda-climb/500/400',
    ],
    description: 'The red panda is a small, arboreal mammal native to the eastern Himalayas and southwestern China.',
    diet: 'Herbivorous - primarily bamboo, but also fruit, roots, and insects.',
    habitat: 'Temperate forests, bamboo thickets.',
    behavior: 'Solitary, crepuscular to nocturnal. Spends most of its time in trees.',
    size: 'Body length: 50-64 cm; Tail: 28-48 cm.',
    weight: '3-6 kg.',
    lifespan: '8-10 years in the wild.',
    population: 'Estimated to be fewer than 10,000 mature individuals.',
    conservationStatus: 'Endangered',
    threats: ['Habitat loss and fragmentation', 'Poaching', 'Inbreeding'],
    funFacts: [
      'Red pandas are sometimes called "firefoxes."',
      'They have a special "false thumb" (modified wrist bone) to help them grip bamboo.',
      'They are very agile climbers.',
    ],
    distribution: {
      description: 'Eastern Himalayas, from Nepal to China.',
      mapUrl: 'https://picsum.photos/seed/red-panda-map/400/200',
    },
  },
  'dolphin': {
    scientificName: 'Delphinidae (Family)',
    commonName: 'Dolphin',
    category: 'Marine Mammal',
    mediaUrls: [
      'https://picsum.photos/seed/dolphin-profile/500/400',
      'https://picsum.photos/seed/dolphin-pod/500/400',
    ],
    description: 'Dolphins are a widely distributed and diverse group of aquatic mammals. They are known for their intelligence and social behavior.',
    diet: 'Carnivorous - primarily fish and squid.',
    habitat: 'Oceans worldwide.',
    behavior: 'Highly social animals that live in groups called pods. They are very intelligent and use echolocation.',
    size: 'Varies greatly by species (e.g., Bottlenose: ~4m, Orca: ~8m).',
    weight: 'Varies by species (e.g., Bottlenose: ~150-650kg, Orca: ~3000-6000kg).',
    lifespan: 'Varies by species, generally 30-50 years.',
    population: 'Varies widely by species; some abundant, others endangered.',
    conservationStatus: 'Varies (Least Concern to Endangered)',
    threats: ['Entanglement in fishing gear', 'Pollution', 'Overfishing', 'Climate change'],
    funFacts: [
      'Dolphins can swim up to 25 mph.',
      'They use echolocation to navigate and hunt.',
      'Dolphins sleep with one half of their brain at a time.',
    ],
    scientificName: 'Elephantidae (Family)', // Example: Loxodonta africana (African Bush Elephant)
    commonName: 'Elephant',
    category: 'Mammal',
    mediaUrls: [
      'https://picsum.photos/seed/elephant-profile/500/400',
      'https://picsum.photos/seed/elephant-herd/500/400',
    ],
    description: 'Elephants are the largest existing land animals, characterized by their long trunk, large ears, and tusks (in most species).',
    diet: 'Herbivorous - grasses, leaves, bark, fruits.',
    habitat: 'Savannas, forests, deserts, marshes (depending on species).',
    behavior: 'Highly social, living in complex matriarchal family groups. Known for intelligence and memory.',
    size: 'African Bush Elephant: up to 4m tall at the shoulder; Asian Elephant: slightly smaller.',
    weight: 'African Bush Elephant: 4,000 - 6,000 kg; Asian Elephant: 3,000 - 5,000 kg.',
    lifespan: '60 - 70 years in the wild.',
    population: 'African: ~415,000; Asian: ~40,000-50,000.',
    conservationStatus: 'African Forest: Critically Endangered, African Savanna: Endangered, Asian: Endangered',
    threats: ['Poaching for ivory tusks', 'Habitat loss and fragmentation', 'Human-elephant conflict'],
    funFacts: [
      'An elephant\'s trunk has over 40,000 muscles.',
      'Elephants communicate using a variety of sounds, including infrasound (too low for humans to hear).',
      'They use their large ears to radiate excess heat and cool down.',
      'Elephants mourn their dead and show complex emotions.'
    ],
    distribution: {
      description: 'Sub-Saharan Africa, South Asia, and Southeast Asia.',
      mapUrl: 'https://picsum.photos/seed/elephant-map/400/200',
    },
  },
};



/**
 * Retrieves detailed information about a specific animal based on its ID (slug).
 *
 * @param animalId The unique identifier (slug) for the animal (e.g., "lion").
 * @returns A promise that resolves to an AnimalInfo object or null if not found.
 * @throws Will throw an error if the animalId is not found in the mock database.
 */
export async function getAnimalInfo(animalId: string): Promise<AnimalInfo> {
  console.log(`Fetching info for animalId: ${animalId}`); // Debug log
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100)); // Short delay

  const normalizedId = animalId.toLowerCase(); // Normalize ID

  if (mockAnimalDatabase[normalizedId]) {
    return mockAnimalDatabase[normalizedId];
  } else {
    console.error(`Animal with ID "${animalId}" not found in mock database.`);
    // In a real scenario, you might return null or a specific error object
    throw new Error(`Animal "${animalId}" not found.`);
  }
}
