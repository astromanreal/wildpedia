
import type { ConservationStatus } from '@/services/animal-info';

export interface ContinentAnimal {
  id: string; // animal slug for linking to /animal/[animalId]
  name: string;
  habitat: string;
  diet: string;
  fact: string;
  status: ConservationStatus;
  imagePlaceholderText: string; // Text for placeholder image
  dataAiHint: string; // Hint for actual image search later
}

export interface ContinentInfo {
  id: string; // slug for the continent, e.g., 'africa'
  name: string; // 'Africa'
  heroImage: string; // URL for hero image
  heroImageAlt: string;
  heroImageDataAiHint: string;
  introduction: string;
  keyAnimals: ContinentAnimal[];
  pageTitle: string;
  pageDescription: string;
}

export const continentData: ContinentInfo[] = [
  {
    id: 'africa',
    name: 'Africa',
    heroImage: 'https://placehold.co/1200x400.png',
    heroImageAlt: 'African savanna at sunset with acacia trees and distant wildlife silhouette',
    heroImageDataAiHint: 'african savanna sunset wildlife',
    introduction: 'Africa is a land of majestic wildlife and vast ecosystems. From the sweeping savannas to dense rainforests and dry deserts, it is home to some of the world’s most iconic animals.',
    pageTitle: 'Wildlife of Africa - Savannas, Rainforests & Deserts',
    pageDescription: 'Explore the iconic animals of Africa, from lions and elephants on the savanna to unique creatures in its rainforests and deserts. Learn about their habitats, diets, and conservation status.',
    keyAnimals: [
      {
        id: 'lion',
        name: 'Lion',
        habitat: 'Savannas, grasslands',
        diet: 'Carnivore',
        fact: 'Known as the "King of the Beasts", lions live in social groups called prides.',
        status: 'Vulnerable',
        imagePlaceholderText: 'Lion',
        dataAiHint: 'lion portrait wildlife',
      },
      {
        id: 'elephant', // Assuming 'elephant' is the general ID for African Elephant
        name: 'African Elephant',
        habitat: 'Forests, savannas',
        diet: 'Herbivore',
        fact: 'The largest land animal on Earth, with incredible memory and family bonds.',
        status: 'Endangered',
        imagePlaceholderText: 'African Elephant',
        dataAiHint: 'african elephant savanna',
      },
      {
        id: 'giraffe', // Need to ensure 'giraffe' exists or create a generic entry
        name: 'Giraffe',
        habitat: 'Open woodlands, savannas',
        diet: 'Herbivore',
        fact: 'Giraffes have the longest necks of any mammal, used for reaching high foliage.',
        status: 'Vulnerable',
        imagePlaceholderText: 'Giraffe',
        dataAiHint: 'giraffe savanna profile',
      },
      {
        id: 'meerkat', // Need to ensure 'meerkat' exists
        name: 'Meerkat',
        habitat: 'Deserts, dry plains (Kalahari)',
        diet: 'Omnivore (insects, small animals, plants)',
        fact: 'Meerkats work in teams, with designated lookouts watching for danger.',
        status: 'Least Concern',
        imagePlaceholderText: 'Meerkat',
        dataAiHint: 'meerkat lookout desert',
      },
    ],
  },
  {
    id: 'asia',
    name: 'Asia',
    heroImage: 'https://placehold.co/1200x400.png',
    heroImageAlt: 'Bamboo forest with a hint of mist or a snowy mountain range',
    heroImageDataAiHint: 'bamboo forest asia mountains',
    introduction: 'Asia, the largest continent, boasts diverse ecosystems from towering Himalayas to dense tropical rainforests and vast steppes, harboring unique and fascinating wildlife.',
    pageTitle: 'Wildlife of Asia - Tigers, Pandas & Snow Leopards',
    pageDescription: 'Discover the diverse animals of Asia, including tigers in jungles, pandas in bamboo forests, and elusive snow leopards in high mountains. Learn about their habitats and conservation status.',
    keyAnimals: [
      {
        id: 'tiger',
        name: 'Tiger',
        habitat: 'Tropical forests, grasslands, mangroves',
        diet: 'Carnivore',
        fact: 'The largest cat species, tigers are solitary hunters known for their distinctive stripes.',
        status: 'Endangered',
        imagePlaceholderText: 'Tiger',
        dataAiHint: 'tiger jungle stripes',
      },
      {
        id: 'giant-panda', // Use 'giant-panda' if this matches your animal data
        name: 'Giant Panda',
        habitat: 'Temperate bamboo forests',
        diet: 'Herbivore (primarily bamboo)',
        fact: 'Native to China, pandas are iconic symbols of wildlife conservation.',
        status: 'Vulnerable',
        imagePlaceholderText: 'Giant Panda',
        dataAiHint: 'giant panda bamboo eating',
      },
      {
        id: 'snow-leopard',
        name: 'Snow Leopard',
        habitat: 'High mountain ranges of Central Asia',
        diet: 'Carnivore',
        fact: 'Elusive and well-camouflaged cats adapted to cold, rugged terrain.',
        status: 'Vulnerable',
        imagePlaceholderText: 'Snow Leopard',
        dataAiHint: 'snow leopard mountains',
      },
      {
        id: 'king-cobra', // Need to ensure 'king-cobra' exists
        name: 'King Cobra',
        habitat: 'Rainforests, swamps',
        diet: 'Carnivore (primarily other snakes)',
        fact: 'The world\'s longest venomous snake, known for its intimidating hood.',
        status: 'Vulnerable',
        imagePlaceholderText: 'King Cobra',
        dataAiHint: 'king cobra snake hood',
      },
    ],
  },
  // Add other continents here following the same structure
  {
    id: 'europe',
    name: 'Europe',
    heroImage: 'https://placehold.co/1200x400.png',
    heroImageAlt: 'Alpine meadow with wildflowers or a boreal forest scene',
    heroImageDataAiHint: 'europe alpine forest',
    introduction: 'Europe features a diverse range of habitats from Arctic tundra to Mediterranean scrublands, home to resilient and adaptable wildlife.',
    pageTitle: 'Wildlife of Europe - Foxes, Bears & Ancient Forests',
    pageDescription: 'Explore European wildlife, from cunning red foxes and formidable brown bears to the elusive lynx. Discover animals adapted to its varied landscapes.',
    keyAnimals: [
      { id: 'red-fox', name: 'Red Fox', habitat: 'Forests, grasslands, urban areas', diet: 'Omnivore', fact: 'Highly adaptable and found across diverse environments.', status: 'Least Concern', imagePlaceholderText: 'Red Fox', dataAiHint: 'red fox forest' },
      { id: 'brown-bear', name: 'Brown Bear', habitat: 'Forests, mountains', diet: 'Omnivore', fact: 'One of the largest land carnivores in Europe.', status: 'Least Concern', imagePlaceholderText: 'Brown Bear', dataAiHint: 'brown bear forest' },
      { id: 'eurasian-lynx', name: 'Eurasian Lynx', habitat: 'Dense forests, rocky areas', diet: 'Carnivore', fact: 'A secretive wild cat with tufted ears and large paws.', status: 'Least Concern', imagePlaceholderText: 'Eurasian Lynx', dataAiHint: 'eurasian lynx snow forest' },
    ],
  },
  {
    id: 'north-america',
    name: 'North America',
    heroImage: 'https://placehold.co/1200x400.png',
    heroImageAlt: 'Rocky Mountains landscape or a vast prairie scene',
    heroImageDataAiHint: 'north america mountains prairie',
    introduction: 'North America spans arctic tundras, vast prairies, deserts, and lush forests, supporting a wide array of iconic wildlife.',
    pageTitle: 'Wildlife of North America - Grizzlies, Eagles & Diverse Ecosystems',
    pageDescription: 'Discover North American animals like the grizzly bear, bald eagle, and raccoon, thriving in habitats from arctic plains to desert landscapes.',
    keyAnimals: [
      { id: 'grizzly-bear', name: 'Grizzly Bear', habitat: 'Forests, mountains, tundra', diet: 'Omnivore', fact: 'A subspecies of brown bear known for its distinctive hump.', status: 'Least Concern', imagePlaceholderText: 'Grizzly Bear', dataAiHint: 'grizzly bear mountains' },
      { id: 'bald-eagle', name: 'Bald Eagle', habitat: 'Near large bodies of water', diet: 'Carnivore (primarily fish)', fact: 'The national bird of the United States, a symbol of strength.', status: 'Least Concern', imagePlaceholderText: 'Bald Eagle', dataAiHint: 'bald eagle flying' },
      { id: 'raccoon', name: 'Raccoon', habitat: 'Forests, marshes, urban areas', diet: 'Omnivore', fact: 'Highly adaptable mammals known for their dexterity and masked faces.', status: 'Least Concern', imagePlaceholderText: 'Raccoon', dataAiHint: 'raccoon urban forest' },
    ],
  },
  {
    id: 'south-america',
    name: 'South America',
    heroImage: 'https://placehold.co/1200x400.png',
    heroImageAlt: 'Amazon rainforest canopy or the Andes mountain range',
    heroImageDataAiHint: 'south america amazon andes',
    introduction: 'South America is renowned for the Amazon rainforest, the Andes mountains, and incredible biodiversity, including many unique species.',
    pageTitle: 'Wildlife of South America - Jaguars, Macaws & Amazonian Wonders',
    pageDescription: 'Explore South American wildlife: jaguars in the rainforest, colorful macaws, capybaras in wetlands, and anacondas in tropical swamps.',
    keyAnimals: [
      { id: 'jaguar', name: 'Jaguar', habitat: 'Rainforests, swamps, grasslands', diet: 'Carnivore', fact: 'The largest cat in the Americas, known for its powerful bite.', status: 'Near Threatened', imagePlaceholderText: 'Jaguar', dataAiHint: 'jaguar rainforest' },
      { id: 'capybara', name: 'Capybara', habitat: 'Savannas, dense forests, near bodies of water', diet: 'Herbivore', fact: 'The world\'s largest rodent, highly social and semi-aquatic.', status: 'Least Concern', imagePlaceholderText: 'Capybara', dataAiHint: 'capybara water' },
      { id: 'green-anaconda', name: 'Green Anaconda', habitat: 'Swamps, marshes, slow-moving streams', diet: 'Carnivore', fact: 'One of the world\'s largest snakes, a powerful constrictor.', status: 'Least Concern', imagePlaceholderText: 'Green Anaconda', dataAiHint: 'green anaconda swamp' },
    ],
  },
  {
    id: 'australia-oceania',
    name: 'Australia & Oceania',
    heroImage: 'https://placehold.co/1200x400.png',
    heroImageAlt: 'Australian outback scene or a coral reef in Oceania',
    heroImageDataAiHint: 'australia outback oceania reef',
    introduction: 'Australia and Oceania are famous for their unique marsupials, vibrant coral reefs, and distinctive wildlife found nowhere else on Earth.',
    pageTitle: 'Wildlife of Australia & Oceania - Kangaroos, Koalas & Unique Marsupials',
    pageDescription: 'Discover the unique animals of Australia and Oceania, including kangaroos, koalas, cassowaries, and diverse marine life in its coral reefs.',
    keyAnimals: [
      { id: 'kangaroo', name: 'Kangaroo', habitat: 'Grasslands, woodlands, savannas', diet: 'Herbivore', fact: 'Large marsupials known for their powerful hind legs and hopping gait.', status: 'Least Concern', imagePlaceholderText: 'Kangaroo', dataAiHint: 'kangaroo outback' },
      { id: 'koala', name: 'Koala', habitat: 'Eucalyptus forests', diet: 'Herbivore (eucalyptus leaves)', fact: 'Arboreal marsupials iconic to Australia, sleeping up to 20 hours a day.', status: 'Vulnerable', imagePlaceholderText: 'Koala', dataAiHint: 'koala eucalyptus tree' },
      { id: 'cassowary', name: 'Southern Cassowary', habitat: 'Rainforests', diet: 'Frugivore (fruit-eater)', fact: 'Large, flightless birds with a distinctive casque on their head.', status: 'Least Concern', imagePlaceholderText: 'Cassowary', dataAiHint: 'cassowary rainforest' },
    ],
  },
  {
    id: 'antarctica',
    name: 'Antarctica',
    heroImage: 'https://placehold.co/1200x400.png',
    heroImageAlt: 'Vast icy landscape with icebergs and penguins',
    heroImageDataAiHint: 'antarctica icebergs penguins',
    introduction: 'Antarctica, the coldest, driest, and windiest continent, is home to resilient wildlife adapted to extreme conditions, primarily in its surrounding seas.',
    pageTitle: 'Wildlife of Antarctica - Penguins, Seals & Icy Wilderness',
    pageDescription: 'Explore the wildlife of Antarctica, a continent of ice and snow, home to penguins, seals, orcas, and other species adapted to extreme cold.',
    keyAnimals: [
      { id: 'emperor-penguin', name: 'Emperor Penguin', habitat: 'Sea ice, Antarctic continent', diet: 'Carnivore (fish, krill, squid)', fact: 'The tallest and heaviest of all penguin species, breeding during the Antarctic winter.', status: 'Near Threatened', imagePlaceholderText: 'Emperor Penguin', dataAiHint: 'emperor penguin antarctica ice' },
      { id: 'weddell-seal', name: 'Weddell Seal', habitat: 'Fast ice, coastal Antarctica', diet: 'Carnivore (fish, squid)', fact: 'Known for their ability to dive deep and stay submerged for long periods.', status: 'Least Concern', imagePlaceholderText: 'Weddell Seal', dataAiHint: 'weddell seal ice antarctica' },
      { id: 'orca', name: 'Orca (Killer Whale)', habitat: 'All oceans, including Antarctic waters', diet: 'Carnivore (fish, seals, whales)', fact: 'Apex predators with complex social structures and hunting techniques.', status: 'Data Deficient', imagePlaceholderText: 'Orca', dataAiHint: 'orca whale antarctic ocean' },
    ],
  },
];

    