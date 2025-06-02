
import type { ConservationStatus } from '@/services/animal-info';
import type { ContinentAnimal } from '@/data/continent-data'; // Reusing ContinentAnimal type for simplicity

export interface FeaturedLocation {
  name: string;
  // link?: string; // Future enhancement
  // description?: string; // Future enhancement
}

export interface SubregionInfo {
  id: string; // slug for the subregion, e.g., 'rainforests'
  name: string; // 'Rainforests'
  heroImage: string; // URL for hero image
  heroImageAlt: string;
  heroImageDataAiHint: string;
  introduction: string;
  featuredLocations: FeaturedLocation[];
  representativeAnimals: ContinentAnimal[]; // Reusing ContinentAnimal for structure
  ecologicalSignificance: string;
  pageTitle: string;
  pageDescription: string;
}

export const subregionData: SubregionInfo[] = [
  {
    id: 'rainforests',
    name: 'Rainforests',
    heroImage: 'https://placehold.co/1200x400.png',
    heroImageAlt: 'Misty green rainforest canopy teeming with life',
    heroImageDataAiHint: 'rainforest canopy mist jungle',
    introduction: 'Rainforests are dense, biodiverse ecosystems found near the equator. They receive high rainfall and support more than half of all animal and plant species on Earth, playing a crucial role as the "Lungs of the Earth."',
    pageTitle: 'Rainforests - The Lungs of the Earth | Wildpedia',
    pageDescription: 'Explore rainforests, the most biodiverse terrestrial ecosystems. Learn about featured locations like the Amazon and Congo, representative species, and their ecological significance.',
    featuredLocations: [
      { name: 'Amazon Rainforest – South America' },
      { name: 'Congo Rainforest – Central Africa' },
      { name: 'Sundaland Rainforests (Borneo & Sumatra) – Southeast Asia' },
      { name: 'Daintree Rainforest – Australia' },
    ],
    representativeAnimals: [
      {
        id: 'howler-monkey',
        name: 'Howler Monkey',
        habitat: 'Amazon canopy',
        diet: 'Primarily folivorous (leaves), also fruits and flowers',
        fact: 'One of the loudest land animals; their calls can be heard for miles.',
        status: 'Least Concern', 
        imagePlaceholderText: 'Howler Monkey',
        dataAiHint: 'howler monkey rainforest canopy',
      },
      {
        id: 'green-anaconda', 
        name: 'Green Anaconda',
        habitat: 'Swamps and rivers of the Amazon',
        diet: 'Carnivore (mammals, birds, reptiles, fish)',
        fact: 'One of the world’s heaviest and longest snakes, a powerful constrictor.',
        status: 'Least Concern',
        imagePlaceholderText: 'Green Anaconda',
        dataAiHint: 'green anaconda amazon river',
      },
      {
        id: 'blue-morpho-butterfly', 
        name: 'Blue Morpho Butterfly',
        habitat: 'Tropical rainforests of South and Central America',
        diet: 'Adults feed on fermenting fruit juices; caterpillars on specific host plants.',
        fact: 'Its brilliant blue wings are an optical illusion caused by microscopic scales reflecting light.',
        status: 'Not Evaluated',
        imagePlaceholderText: 'Blue Morpho Butterfly',
        dataAiHint: 'blue morpho butterfly rainforest wing',
      },
      {
        id: 'orangutan', 
        name: 'Orangutan',
        habitat: 'Rainforests of Borneo and Sumatra (Sundaland)',
        diet: 'Primarily frugivorous (fruit), also leaves, bark, insects',
        fact: 'Shares about 97% of human DNA; highly intelligent arboreal apes.',
        status: 'Critically Endangered',
        imagePlaceholderText: 'Orangutan',
        dataAiHint: 'orangutan rainforest borneo sumatra',
      },
    ],
    ecologicalSignificance: 'Rainforests play a critical role in regulating global climate patterns by absorbing vast amounts of carbon dioxide and producing oxygen. They influence weather systems and maintain hydrological cycles. Their immense biodiversity is a treasure trove of genetic resources and provides essential ecosystem services, including pollination, seed dispersal, and soil stability. Deforestation due to agriculture, logging, and mining poses a severe threat to these vital ecosystems and the myriad species they harbor, contributing to climate change and biodiversity loss.',
  },
  {
    id: 'savannas',
    name: 'Savannas',
    heroImage: 'https://placehold.co/1200x400.png',
    heroImageAlt: 'Expansive savanna grassland with acacia trees and setting sun',
    heroImageDataAiHint: 'savanna grassland acacia sunset',
    introduction: 'Savannas are vast, open grasslands with scattered trees, found in tropical and subtropical regions. They are characterized by distinct wet and dry seasons and support iconic grazing animals and their predators.',
    pageTitle: 'Savannas - Grasslands of Giants | Wildpedia',
    pageDescription: 'Explore the world\'s savannas, home to incredible wildlife migrations and iconic species like lions, elephants, and giraffes. Learn about these unique grassland ecosystems.',
    featuredLocations: [
        { name: 'Serengeti Plains – Tanzania & Kenya' },
        { name: 'The Llanos – Venezuela & Colombia' },
        { name: 'Brazilian Cerrado – Brazil' },
        { name: 'Northern Australian Savannas – Australia' },
    ],
    representativeAnimals: [
        { id: 'lion', name: 'Lion', habitat: 'African savannas, grasslands', diet: 'Carnivore', fact: 'Apex predators living in social groups called prides.', status: 'Vulnerable', imagePlaceholderText: 'Lion on Savanna', dataAiHint: 'lion savanna pride' },
        { id: 'elephant', name: 'African Savanna Elephant', habitat: 'Savannas, grasslands, woodlands', diet: 'Herbivore', fact: 'The largest land animal, crucial for shaping savanna landscapes.', status: 'Endangered', imagePlaceholderText: 'Elephant on Savanna', dataAiHint: 'african elephant savanna herd' },
        { id: 'giraffe', name: 'Giraffe', habitat: 'African savannas, open woodlands', diet: 'Herbivore', fact: 'The world\'s tallest mammal, feeding on high tree foliage.', status: 'Vulnerable', imagePlaceholderText: 'Giraffe on Savanna', dataAiHint: 'giraffe savanna acacia' },
        { id: 'zebra', name: 'Plains Zebra', habitat: 'Grasslands and savannas of eastern and southern Africa', diet: 'Herbivore', fact: 'Known for their distinctive black and white stripes and participation in great migrations.', status: 'Near Threatened', imagePlaceholderText: 'Zebra on Savanna', dataAiHint: 'zebra savanna stripes herd' },
    ],
    ecologicalSignificance: 'Savannas are vital ecosystems supporting vast numbers of herbivores and their predators, including spectacular annual migrations. They play a role in carbon cycling and are important for local livelihoods through tourism and pastoralism. Threats include conversion to agriculture, overgrazing, altered fire regimes, and climate change.',
  },
  {
    id: 'deserts',
    name: 'Deserts',
    heroImage: 'https://placehold.co/1200x400.png',
    heroImageAlt: 'Vast sand dunes stretching to the horizon under a clear blue sky',
    heroImageDataAiHint: 'desert sand dunes arid landscape',
    introduction: 'Deserts are arid or hyper-arid ecoregions that receive very little precipitation. Despite harsh conditions, they host a surprising diversity of life specially adapted to survive extreme temperatures and water scarcity.',
    pageTitle: 'Deserts - Life in Arid Lands | Wildpedia',
    pageDescription: 'Explore the world\'s deserts, from the Sahara to the Gobi. Discover animals uniquely adapted to survive extreme heat, cold, and lack of water.',
    featuredLocations: [
        { name: 'Sahara Desert – North Africa' },
        { name: 'Arabian Desert – Middle East' },
        { name: 'Gobi Desert – Central Asia' },
        { name: 'Sonoran Desert – North America' },
        { name: 'Atacama Desert – South America' },
    ],
    representativeAnimals: [
        { id: 'fennec-fox', name: 'Fennec Fox', habitat: 'Sahara Desert and other parts of North Africa', diet: 'Omnivore (insects, rodents, birds, plants)', fact: 'Known for its disproportionately large ears, which help dissipate heat.', status: 'Least Concern', imagePlaceholderText: 'Fennec Fox', dataAiHint: 'fennec fox desert ears' },
        { id: 'camel', name: 'Dromedary Camel', habitat: 'Deserts of North Africa and the Middle East (domesticated)', diet: 'Herbivore', fact: 'Iconic desert dwellers able to survive long periods without water.', status: 'Not Evaluated', imagePlaceholderText: 'Dromedary Camel', dataAiHint: 'dromedary camel desert' },
        { id: 'sidewinder-rattlesnake', name: 'Sidewinder Rattlesnake', habitat: 'Deserts of southwestern North America', diet: 'Carnivore (rodents, lizards)', fact: 'Moves using a unique "sidewinding" motion to traverse loose sand efficiently.', status: 'Least Concern', imagePlaceholderText: 'Sidewinder Rattlesnake', dataAiHint: 'sidewinder rattlesnake desert sand' },
    ],
    ecologicalSignificance: 'Deserts cover about one-fifth of the Earth\'s land surface. They are important for specialized biodiversity and contain valuable mineral resources. Desertification, the process by which fertile land becomes desert, is a major global concern, often exacerbated by climate change and unsustainable land use practices.',
  },
  {
    id: 'polar-regions',
    name: 'Polar Regions',
    heroImage: 'https://placehold.co/1200x400.png',
    heroImageAlt: 'Vast expanse of ice and snow with a polar bear or penguins',
    heroImageDataAiHint: 'polar region ice snow arctic antarctic',
    introduction: 'Polar regions, encompassing the Arctic and Antarctic, are characterized by extreme cold, ice-covered landscapes, and unique wildlife adapted to survive harsh conditions. These regions play a critical role in regulating global climate.',
    pageTitle: 'Polar Regions - Wildlife of the Arctic & Antarctic | Wildpedia',
    pageDescription: 'Explore the icy realms of the Arctic and Antarctic. Discover resilient wildlife like polar bears, penguins, seals, and whales adapted to extreme cold and learn about their fragile ecosystems.',
    featuredLocations: [
      { name: 'Arctic Circle (including Greenland, Svalbard)' },
      { name: 'Antarctic Continent & Peninsula' },
      { name: 'Arctic Ocean Ice Pack' },
      { name: 'Southern Ocean surrounding Antarctica' },
    ],
    representativeAnimals: [
      {
        id: 'polar-bear',
        name: 'Polar Bear',
        habitat: 'Arctic sea ice, coastlines',
        diet: 'Carnivore (primarily seals)',
        fact: 'Largest land carnivore, heavily reliant on sea ice for hunting.',
        status: 'Vulnerable',
        imagePlaceholderText: 'Polar Bear on Ice',
        dataAiHint: 'polar bear arctic ice snow',
      },
      {
        id: 'emperor-penguin',
        name: 'Emperor Penguin',
        habitat: 'Antarctic sea ice and continent',
        diet: 'Carnivore (fish, krill, squid)',
        fact: 'The only penguin species that breeds during the Antarctic winter.',
        status: 'Near Threatened',
        imagePlaceholderText: 'Emperor Penguin Colony',
        dataAiHint: 'emperor penguin antarctica snow colony',
      },
      {
        id: 'arctic-fox',
        name: 'Arctic Fox',
        habitat: 'Arctic tundra, coastal areas',
        diet: 'Omnivore (lemmings, voles, birds, carrion, berries)',
        fact: 'Its thick fur changes color from white in winter to brown/grey in summer for camouflage.',
        status: 'Least Concern',
        imagePlaceholderText: 'Arctic Fox in Snow',
        dataAiHint: 'arctic fox winter snow tundra',
      },
      {
        id: 'weddell-seal',
        name: 'Weddell Seal',
        habitat: 'Antarctic fast ice',
        diet: 'Carnivore (fish, squid)',
        fact: 'Can dive to great depths and remain submerged for over an hour.',
        status: 'Least Concern',
        imagePlaceholderText: 'Weddell Seal on Ice',
        dataAiHint: 'weddell seal antarctica ice',
      },
    ],
    ecologicalSignificance: 'Polar regions are crucial for global climate regulation through ice-albedo feedback and ocean current modulation. They host unique ecosystems highly sensitive to climate change. Melting ice caps contribute to sea-level rise and impact specialized wildlife dependent on ice for survival and breeding.',
  },
  {
    id: 'mountains',
    name: 'Mountains',
    heroImage: 'https://placehold.co/1200x400.png',
    heroImageAlt: 'Majestic snow-capped mountain range with a soaring eagle',
    heroImageDataAiHint: 'mountains snow peaks alpine',
    introduction: 'Mountain ecosystems are characterized by high altitudes, steep slopes, and diverse climatic zones. They are "water towers" for the world and harbor unique flora and fauna adapted to challenging conditions.',
    pageTitle: 'Mountain Ecosystems - High Altitude Havens | Wildpedia',
    pageDescription: 'Explore the diverse wildlife of mountain regions like the Himalayas and Andes. Discover species adapted to high altitudes, from snow leopards to mountain goats and condors.',
    featuredLocations: [
      { name: 'Himalayas – Asia' },
      { name: 'Andes – South America' },
      { name: 'Rocky Mountains – North America' },
      { name: 'Alps – Europe' },
      { name: 'Ethiopian Highlands – Africa' },
    ],
    representativeAnimals: [
      {
        id: 'snow-leopard',
        name: 'Snow Leopard',
        habitat: 'High mountain ranges of Central and South Asia',
        diet: 'Carnivore (ibex, blue sheep)',
        fact: 'Elusive and well-camouflaged cats adapted to cold, rugged terrain.',
        status: 'Vulnerable',
        imagePlaceholderText: 'Snow Leopard in Mountains',
        dataAiHint: 'snow leopard mountains asia rocky',
      },
      {
        id: 'andean-condor',
        name: 'Andean Condor',
        habitat: 'Andes Mountains, adjacent Pacific coasts',
        diet: 'Scavenger (carrion)',
        fact: 'One of the world\'s largest flying birds, with a wingspan up to 3.3 meters.',
        status: 'Vulnerable',
        imagePlaceholderText: 'Andean Condor Soaring',
        dataAiHint: 'andean condor andes flying bird',
      },
      {
        id: 'mountain-goat',
        name: 'Mountain Goat',
        habitat: 'Alpine and subalpine regions of North America',
        diet: 'Herbivore (grasses, herbs, lichens)',
        fact: 'Incredibly agile climbers with specialized hooves for navigating steep, rocky terrain.',
        status: 'Least Concern',
        imagePlaceholderText: 'Mountain Goat on Cliff',
        dataAiHint: 'mountain goat rocky mountains cliff climb',
      },
      {
        id: 'yak',
        name: 'Wild Yak',
        habitat: 'High-altitude plateaus and mountains of the Himalayas and Tibetan Plateau',
        diet: 'Herbivore (grasses, herbs)',
        fact: 'Large bovines with dense fur, well-adapted to extreme cold and low oxygen levels.',
        status: 'Vulnerable',
        imagePlaceholderText: 'Yak in Snow',
        dataAiHint: 'yak himalayas mountain snow cattle',
      },
    ],
    ecologicalSignificance: 'Mountains provide freshwater for billions downstream through rivers originating from their glaciers and snowmelt. They host high biodiversity due to varied microclimates and altitudinal gradients. These ecosystems are fragile and vulnerable to climate change, deforestation, and unsustainable tourism.',
  },
  {
    id: 'islands',
    name: 'Islands',
    heroImage: 'https://placehold.co/1200x400.png',
    heroImageAlt: 'Tropical island with lush vegetation and clear blue water',
    heroImageDataAiHint: 'island tropical beach ocean unique',
    introduction: 'Island ecosystems are isolated landmasses surrounded by water, often fostering unique evolutionary paths leading to high levels of endemism (species found nowhere else). They are particularly vulnerable to external pressures.',
    pageTitle: 'Island Ecosystems - Cradles of Evolution | Wildpedia',
    pageDescription: 'Discover the unique wildlife of island ecosystems like Madagascar and the Galápagos. Learn about endemic species and the delicate balance of these isolated havens.',
    featuredLocations: [
      { name: 'Madagascar' },
      { name: 'Galápagos Islands – Ecuador' },
      { name: 'Hawaiian Islands – USA' },
      { name: 'New Zealand' },
      { name: 'Indonesia (archipelago)' },
    ],
    representativeAnimals: [
      {
        id: 'ring-tailed-lemur',
        name: 'Ring-tailed Lemur',
        habitat: 'Dry forests and scrub of southern Madagascar',
        diet: 'Omnivore (fruits, leaves, flowers, insects)',
        fact: 'Highly social primates known for their distinctive striped tails and sunbathing behavior.',
        status: 'Endangered',
        imagePlaceholderText: 'Ring-tailed Lemur',
        dataAiHint: 'ring tailed lemur madagascar social',
      },
      {
        id: 'galapagos-tortoise',
        name: 'Galápagos Giant Tortoise',
        habitat: 'Various islands of the Galápagos archipelago',
        diet: 'Herbivore (grasses, cacti, leaves)',
        fact: 'Among the longest-living vertebrates, with distinct shell shapes on different islands.',
        status: 'Vulnerable', // Varies by subspecies, some are Critically Endangered
        imagePlaceholderText: 'Galapagos Tortoise',
        dataAiHint: 'galapagos tortoise giant shell island',
      },
      {
        id: 'komodo-dragon',
        name: 'Komodo Dragon',
        habitat: 'Indonesian islands of Komodo, Rinca, Flores, Gili Motang',
        diet: 'Carnivore (deer, pigs, carrion)',
        fact: 'The world\'s largest living lizard, possessing a venomous bite.',
        status: 'Endangered',
        imagePlaceholderText: 'Komodo Dragon',
        dataAiHint: 'komodo dragon indonesia lizard large',
      },
      {
        id: 'kiwi-bird',
        name: 'Kiwi (various species)',
        habitat: 'Forests and scrublands of New Zealand',
        diet: 'Omnivore (insects, worms, berries, seeds)',
        fact: 'Flightless, nocturnal birds with nostrils at the tip of their long beaks.',
        status: 'Vulnerable', // Varies by species
        imagePlaceholderText: 'Kiwi Bird',
        dataAiHint: 'kiwi bird new zealand nocturnal forest',
      },
    ],
    ecologicalSignificance: 'Islands are natural laboratories for evolution, often resulting in high numbers of endemic species. This uniqueness makes them global biodiversity hotspots. However, island ecosystems are extremely vulnerable to invasive species (predators, competitors, diseases) and habitat destruction, leading to higher extinction rates compared to mainland areas.',
  },
];
