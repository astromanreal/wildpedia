/**
 * @fileOverview Mock data for the Conservation Challenge quiz.
 */

export interface ConservationQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string; // Optional explanation for the answer
}

export const conservationChallengeData: ConservationQuestion[] = [
  {
    id: 1,
    question: 'Which of these is the primary driver of species extinction today?',
    options: ['Climate Change', 'Habitat Loss', 'Pollution', 'Overhunting'],
    correctAnswer: 'Habitat Loss',
    explanation: 'While all listed factors contribute, habitat loss due to human activities like deforestation and urbanization is currently the single biggest threat to biodiversity worldwide.',
  },
  {
    id: 2,
    question: 'What does the term "endangered species" mean according to the IUCN Red List?',
    options: ['Likely to become extinct soon', 'Facing a very high risk of extinction in the wild', 'At risk of becoming endangered in the near future', 'No longer found in the wild'],
    correctAnswer: 'Facing a very high risk of extinction in the wild',
    explanation: 'Endangered (EN) is a category indicating a species faces a very high risk of extinction in the wild in the near future.',
  },
  {
    id: 3,
    question: 'Which large mammal was brought back from the brink of extinction in North America through captive breeding and reintroduction programs?',
    options: ['Gray Wolf', 'Grizzly Bear', 'American Bison', 'Black-footed Ferret'],
    correctAnswer: 'Black-footed Ferret',
    explanation: 'Black-footed Ferrets were once thought extinct but were rediscovered. Successful captive breeding and reintroduction efforts have helped restore populations.',
  },
  {
    id: 4,
    question: 'What is a "biodiversity hotspot"?',
    options: ['An area with many active volcanoes', 'A region with extremely high temperatures', 'A region with exceptional levels of plant endemism and serious habitat loss', 'A popular tourist destination for wildlife viewing'],
    correctAnswer: 'A region with exceptional levels of plant endemism and serious habitat loss',
    explanation: 'Biodiversity hotspots are areas rich in unique species (high endemism) that are also under severe threat from habitat loss.',
  },
  {
    id: 5,
    question: 'Which of the following actions can individuals take to help conserve wildlife?',
    options: ['Reduce plastic consumption', 'Support sustainable businesses', 'Create wildlife-friendly gardens', 'All of the above'],
    correctAnswer: 'All of the above',
    explanation: 'Many individual actions, from reducing waste and making conscious consumer choices to providing local habitat, collectively contribute to conservation efforts.',
  },
   {
    id: 6,
    question: 'What is the purpose of CITES (Convention on International Trade in Endangered Species of Wild Fauna and Flora)?',
    options: ['To ban all international travel', 'To regulate and monitor international trade in threatened species', 'To fund zoos and aquariums globally', 'To promote hunting tourism'],
    correctAnswer: 'To regulate and monitor international trade in threatened species',
    explanation: 'CITES is an international agreement between governments aiming to ensure that international trade in specimens of wild animals and plants does not threaten their survival.',
   },
   {
    id: 7,
    question: 'Which marine ecosystem is often called the "rainforest of the sea" due to its high biodiversity?',
    options: ['Kelp Forests', 'Mangrove Swamps', 'Coral Reefs', 'Deep Sea Trenches'],
    correctAnswer: 'Coral Reefs',
    explanation: 'Coral reefs support a vast number of marine species, making them one of the most biodiverse ecosystems on the planet, similar to rainforests on land.',
   },
   {
    id: 8,
    question: 'What is "bycatch" in the fishing industry?',
    options: ['Fish caught specifically for research', 'The targeted species of fish', 'Unwanted marine creatures caught unintentionally during fishing', 'Fish farmed in aquaculture facilities'],
    correctAnswer: 'Unwanted marine creatures caught unintentionally during fishing',
    explanation: 'Bycatch refers to the incidental capture of non-target species (like dolphins, turtles, seabirds, or other fish) during commercial fishing operations.',
   },
   {
    id: 9,
    question: 'What term describes the process where habitats are broken into smaller, isolated patches?',
    options: ['Habitat Fragmentation', 'Habitat Restoration', 'Habitat Enrichment', 'Habitat Corridor'],
    correctAnswer: 'Habitat Fragmentation',
    explanation: 'Habitat fragmentation occurs when large, contiguous habitats are divided into smaller, disconnected pieces, often by roads, agriculture, or urban development, isolating populations.',
   },
   {
    id: 10,
    question: 'Which critically endangered primate is found only in Madagascar?',
    options: ['Gorilla', 'Orangutan', 'Chimpanzee', 'Lemur (many species)'],
    correctAnswer: 'Lemur (many species)',
    explanation: 'Lemurs are a diverse group of primates endemic to the island of Madagascar. Sadly, many lemur species are critically endangered due to habitat loss.',
   },
];
