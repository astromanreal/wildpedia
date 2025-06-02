
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
   * A unique identifier for the animal (e.g., URL slug).
   */
  id: string;
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
// Changed to an array of AnimalInfo objects
export const mockAnimalDatabase: AnimalInfo[] = [
  {
    id: 'lion',
    scientificName: 'Panthera leo',
    commonName: 'Lion',
    category: 'Mammal',
    mediaUrls: [
      'https://cdn.pixabay.com/photo/2020/05/15/15/13/baby-lion-5173894_1280.jpg',
      'https://placehold.co/500x400.png?text=Lion+Pride&data-ai-hint=lion+pride',
    ],
    description: 'The lion is a large carnivorous feline of the genus Panthera, native to Africa and India. It has a muscular, deep-chested body, a short, rounded head, round ears, and a hairy tuft at the end of its tail. Lions are renowned for their majesty and are often called the "king of the jungle," although they primarily inhabit grasslands and savannas.',
    diet: 'Strictly carnivorous. Their diet consists mainly of large mammals such as wildebeest, zebra, buffalo, and giraffe. They may also hunt smaller animals like warthogs, birds, and reptiles when larger prey is scarce.',
    habitat: 'Primarily found in savannas, grasslands, open woodlands, and scrub country. They are not typically found in dense forests or deserts.',
    behavior: 'Lions are unique among cats for their highly social behavior, living in groups called "prides." A pride typically consists of related females, their cubs, and a small number of adult males. Lionesses do most of the hunting, often working cooperatively. Males primarily defend the pride\'s territory and offspring. They are crepuscular, meaning they are most active at dawn and dusk.',
    size: 'Males: Body Length 1.8-2.1 m (5.9-6.9 ft), Tail Length 0.9-1.05 m (3.0-3.4 ft), Height at shoulder 1.0-1.2 m (3.3-3.9 ft). Females are slightly smaller.',
    weight: 'Males typically weigh 150-250 kg (330-550 lbs), while females weigh 120-182 kg (265-400 lbs).',
    lifespan: 'In the wild, lions live for approximately 10-14 years. In captivity, they can live for over 20 years.',
    population: 'Estimated to be between 23,000 and 39,000 individuals remaining in the wild. Populations have significantly declined in recent decades.',
    conservationStatus: 'Vulnerable',
    threats: ['Habitat loss and fragmentation due to human encroachment and agriculture', 'Human-wildlife conflict, including retaliatory killings for livestock predation', 'Prey base depletion due to overhunting by humans', 'Illegal wildlife trade (poaching for bones and other body parts used in traditional medicine)', 'Disease outbreaks, such as canine distemper and bovine tuberculosis'],
    funFacts: [
      'A lion’s roar can be heard from as far as 8 kilometers (5 miles) away, used for communication and territory marking.',
      'Lions spend a significant portion of their day resting, often up to 20 hours.',
      'Lionesses in a pride often synchronize the births of their cubs, which helps with communal rearing and suckling.',
      'Unlike most other cats, lions are generally poor climbers but are powerful swimmers when necessary.'
    ],
    distribution: {
      description: 'Historically widespread across Africa, the Middle East, and parts of Asia. Today, they are found in fragmented populations across Sub-Saharan Africa, with a single remnant population of Asiatic lions in the Gir Forest National Park in Gujarat, India.',
      mapUrl: 'https://placehold.co/400x200.png?text=Lion+Distribution+Map&data-ai-hint=world+map+lion',
    },
  },
  {
    id: 'penguin',
    scientificName: 'Spheniscidae (Family)', // Using family name as there are many species
    commonName: 'Penguin',
    category: 'Bird',
    mediaUrls: [
      'https://cdn.pixabay.com/photo/2014/08/27/12/58/emperor-penguins-429128_1280.jpg',
      'https://placehold.co/500x400.png?text=Penguin+Group&data-ai-hint=penguin+group',
    ],
    description: 'Penguins are a group of aquatic flightless birds. They live almost exclusively in the Southern Hemisphere, with only one species, the Galápagos penguin, found north of the Equator. Highly adapted for life in the water, penguins have countershaded dark and white plumage and flippers for swimming.',
    diet: 'Carnivorous, feeding primarily on krill, fish, squid, and other small sea creatures which they catch while swimming underwater. Diet varies by species and location.',
    habitat: 'Diverse marine environments, from the pack ice of Antarctica (e.g., Emperor and Adélie penguins) to temperate islands and coastlines (e.g., African and Galápagos penguins). They require land or ice for breeding and molting.',
    behavior: 'Highly social birds, often forming large breeding colonies that can number in the tens or hundreds of thousands. They are excellent swimmers and divers, using their flipper-like wings for propulsion. Many species undertake long annual migrations between feeding grounds and breeding sites. Penguins communicate through a variety of vocalizations and visual displays.',
    size: 'Varies dramatically by species. The smallest is the Little Blue Penguin (Eudyptula minor) at about 33 cm (13 in) tall. The largest is the Emperor Penguin (Aptenodytes forsteri) at about 1.1 m (3.6 ft) tall.',
    weight: 'Little Blue Penguin: ~1.5 kg (3.3 lbs). Emperor Penguin: ~25-45 kg (55-99 lbs).',
    lifespan: 'Typically 15-20 years in the wild, though this varies by species and environmental conditions. Some can live longer.',
    population: 'Varies greatly by species. Some, like the Adélie penguin, have large populations, while others, such as the Galápagos penguin, are endangered. Overall trends show declines for several species.',
    conservationStatus: 'Varies (e.g., Emperor Penguin - Near Threatened; Galápagos Penguin - Endangered)',
    threats: ['Climate change (loss of sea ice, changes in prey distribution)', 'Overfishing by humans, leading to depletion of food sources', 'Pollution (oil spills, plastic ingestion)', 'Habitat disturbance at breeding sites', 'Introduced predators on land (e.g., rats, cats on some islands)', 'Disease outbreaks'],
    funFacts: [
      'Penguins have a gland near their eyes that filters salt from the seawater they ingest, allowing them to drink saltwater.',
      'Their black and white "tuxedo" plumage provides camouflage called countershading: white belly blends with light from above, black back blends with dark water from below.',
      'Penguins often "toboggan" on their bellies over snow and ice to save energy and move quickly.',
      'Many penguin species are monogamous for a breeding season, and some for life.'
    ],
    distribution: {
      description: 'Predominantly found in the Southern Hemisphere, including Antarctica, New Zealand, southern Australia, South Africa, and the western coast of South America. The Galápagos penguin is the only species found north of the Equator.',
      mapUrl: 'https://placehold.co/400x200.png?text=Penguin+Distribution+Map&data-ai-hint=world+map+penguin',
    },
  },
  {
    id: 'red-panda',
    scientificName: 'Ailurus fulgens',
    commonName: 'Red Panda',
    category: 'Mammal',
    mediaUrls: [
      'https://cdn.pixabay.com/photo/2022/12/05/17/49/red-panda-7637280_1280.jpg',
      'https://placehold.co/500x400.png?text=Red+Panda+Climbing&data-ai-hint=red+panda+climbing',
    ],
    description: 'The red panda is a small, arboreal mammal native to the eastern Himalayas and southwestern China. It is characterized by its reddish-brown fur, long, shaggy tail, and waddling gait due to its shorter front legs. Despite its name, it is not closely related to the giant panda.',
    diet: 'Primarily herbivorous, with bamboo constituting about 85-95% of its diet. They also eat fruits, acorns, roots, insects, eggs, and small vertebrates when available.',
    habitat: 'Temperate forests with bamboo undergrowth, at altitudes between 2,200 and 4,800 meters. They prefer mountainous mixed deciduous and conifer forests.',
    behavior: 'Generally solitary, shy, and elusive animals, primarily active from dusk till dawn (crepuscular to nocturnal). They are skillful and agile climbers, spending most of their time in trees. They use their long, bushy tails for balance and warmth. Red pandas mark their territory with scent glands.',
    size: 'Body length: 50-64 cm (20-25 inches). Tail length: 28-48 cm (11-19 inches).',
    weight: 'Typically 3-6.2 kg (6.6-13.7 lbs). Males are slightly heavier than females.',
    lifespan: 'Around 8-10 years in the wild, up to 15 years in captivity.',
    population: 'Estimated to be fewer than 10,000 mature individuals in the wild, with a declining trend.',
    conservationStatus: 'Endangered',
    threats: ['Habitat loss and fragmentation due to deforestation, agriculture, and infrastructure development', 'Poaching for fur and the illegal pet trade', 'Inbreeding due to small, isolated populations', 'Competition with domestic livestock for food resources', 'Disturbance from human activities and free-ranging dogs'],
    funFacts: [
      'Red pandas are sometimes called "firefoxes" or "lesser pandas."',
      'They possess a "false thumb," which is an extension of the wrist bone, aiding in gripping bamboo stalks.',
      'To escape predators, they can climb trees rapidly or stand on their hind legs to appear larger and use their sharp claws.',
      'They are very heat-sensitive and often rest stretched out on tree branches during hot weather.'
    ],
    distribution: {
      description: 'Found in a narrow band in the temperate forests of the eastern Himalayas and southwestern China, including parts of Nepal, India (Sikkim, Arunachal Pradesh), Bhutan, northern Myanmar, and China (Sichuan, Yunnan provinces).',
      mapUrl: 'https://placehold.co/400x200.png?text=Red+Panda+Distribution+Map&data-ai-hint=asia+map+red+panda',
    },
  },
  {
    id: 'dolphin',
    scientificName: 'Delphinidae (Family)', // Many species, this refers to oceanic dolphins
    commonName: 'Dolphin',
    category: 'Marine Mammal',
    mediaUrls: [
      'https://cdn.pixabay.com/photo/2017/01/12/15/41/dolphin-1974975_1280.jpg',
      'https://placehold.co/500x400.png?text=Dolphin+Pod&data-ai-hint=dolphin+pod+ocean',
    ],
    description: 'Dolphins are a highly diverse group of aquatic mammals within the infraorder Cetacea. They are known for their intelligence, agility, and complex social structures. They are found in oceans worldwide, and some species inhabit freshwater rivers.',
    diet: 'Carnivorous, with a diet primarily consisting of fish and squid. Some larger species, like orcas (killer whales, which are dolphins), also hunt marine mammals.',
    habitat: 'Most species live in saltwater environments, ranging from coastal waters and estuaries to the open ocean. Some species, like river dolphins, are adapted to freshwater habitats.',
    behavior: 'Highly social animals, typically living in groups called "pods," which can range from a few individuals to hundreds. They communicate using a variety of clicks, whistles, and body language. Dolphins are renowned for their playful behavior, often seen leaping, surfing waves, and interacting with other species. They use echolocation to navigate, find food, and detect predators.',
    size: 'Varies significantly by species. The smallest, Maui\'s dolphin, is about 1.7 m (5.6 ft) long. The largest, the orca, can reach up to 9.8 m (32 ft). Bottlenose dolphins average 2-4 m (6.6-13 ft).',
    weight: 'Maui\'s dolphin: ~50 kg (110 lbs). Orca: up to 6,000 kg (13,200 lbs). Bottlenose dolphins: 150-650 kg (330-1,430 lbs).',
    lifespan: 'Varies greatly by species. Bottlenose dolphins can live for 40-60 years. Orcas can live for 50-80 years or more.',
    population: 'Global population estimates vary widely depending on the species. Some species are abundant, while others, like the Baiji river dolphin (now functionally extinct) or the Vaquita, are critically endangered.',
    conservationStatus: 'Varies by species (e.g., Bottlenose Dolphin - Least Concern; Hector\'s Dolphin - Endangered)',
    threats: ['Entanglement in fishing gear (bycatch) is a major threat for many species', 'Pollution (chemical contaminants, plastics, noise pollution)', 'Overfishing leading to prey depletion', 'Habitat degradation and loss', 'Climate change impacting ocean conditions and prey availability', 'Direct hunting in some regions'],
    funFacts: [
      'Dolphins are capable of complex problem-solving and have shown self-awareness.',
      'They sleep by resting one half of their brain at a time, allowing them to remain conscious enough to breathe and watch for danger.',
      'Some dolphin species have been observed using tools, such as sponges to protect their snouts while foraging.',
      'Dolphins have individual "signature whistles" that function like names.'
    ],
    distribution: {
      description: 'Found in all oceans of the world, from tropical to polar waters, and in some major river systems (e.g., Amazon River Dolphin). Distribution patterns vary significantly among the nearly 40 different species.',
      mapUrl: 'https://placehold.co/400x200.png?text=Dolphin+Distribution+Map&data-ai-hint=world+map+dolphin',
    }
  },
  {
    id: 'elephant',
    scientificName: 'Elephantidae (Family)',
    commonName: 'Elephant',
    category: 'Mammal',
    mediaUrls: [
      'https://cdn.pixabay.com/photo/2017/12/03/17/23/fantasy-2995326_1280.jpg',
      'https://placehold.co/500x400.png?text=Elephant+Herd&data-ai-hint=elephant+herd+savanna',
    ],
    description: 'Elephants are the largest existing land animals, characterized by their long, muscular trunk (proboscis), large floppy ears, thick, pillar-like legs, and, in most species, tusks of ivory. There are three recognized living species: the African bush elephant, the African forest elephant, and the Asian elephant.',
    diet: 'Strictly herbivorous. They consume vast quantities of vegetation, including grasses, leaves, twigs, bark, roots, fruits, and flowers. An adult elephant can eat up to 150 kg (330 lbs) of food per day.',
    habitat: 'Diverse habitats depending on the species. African bush elephants inhabit savannas, grasslands, and woodlands. African forest elephants live in dense tropical forests. Asian elephants are found in tropical and subtropical moist broadleaf forests, dry broadleaf forests, and grasslands.',
    behavior: 'Highly intelligent and social animals, living in complex matriarchal family groups led by the oldest and largest female (the matriarch). Male elephants (bulls) typically live solitary lives or form loose associations with other bulls. Elephants communicate through a wide range of sounds (including infrasound, too low for humans to hear), chemical signals (pheromones), and body language. They are known for their long memory, problem-solving abilities, and displays of grief and altruism.',
    size: 'African Bush Elephant: 2.5-4 meters (8.2-13 ft) tall at the shoulder. Asian Elephant: 2-3.5 meters (6.6-11.5 ft) tall at the shoulder.',
    weight: 'African Bush Elephant: 2,500-6,000 kg (5,500-13,200 lbs), with large males exceeding 7,000 kg. Asian Elephant: 2,000-5,000 kg (4,400-11,000 lbs).',
    lifespan: 'Typically 60-70 years in the wild. Some individuals can live longer.',
    population: 'African elephants (both species combined): around 415,000. Asian elephants: estimated between 30,000 and 50,000.',
    conservationStatus: 'Endangered', // General status, specific species differ
    threats: ['Poaching for ivory tusks remains a primary threat, especially for African elephants.', 'Habitat loss and fragmentation due to human population growth, agriculture, and infrastructure development.', 'Human-elephant conflict, where elephants raid crops or damage property, leading to retaliatory killings.', 'Climate change impacting water availability and vegetation.'],
    funFacts: [
      'An elephant\'s trunk is an incredibly versatile organ with over 40,000 muscles, used for breathing, smelling, touching, grasping, and trumpeting.',
      'Elephants use their large ears to radiate excess body heat, helping them stay cool.',
      'They have a sophisticated understanding of their environment and can remember locations of water sources over vast distances.',
      'Elephants are known to mourn their dead, often visiting gravesites and gently touching the bones of deceased individuals.'
    ],
    distribution: {
      description: 'African elephants are found in 37 countries in sub-Saharan Africa. Asian elephants are found in 13 countries across South and Southeast Asia.',
      mapUrl: 'https://placehold.co/400x200.png?text=Elephant+Distribution+Map&data-ai-hint=africa+asia+map',
    },
  },
  {
    id: 'tiger',
    commonName: 'Tiger',
    scientificName: 'Panthera tigris',
    category: 'Mammal',
    mediaUrls: [
      'https://cdn.pixabay.com/photo/2012/11/28/09/50/tigers-67577_1280.jpg',
      'https://placehold.co/500x400.png?text=Tiger+Profile&data-ai-hint=tiger+profile+jungle',
    ],
    description: 'Tigers are the largest cat species in the world, easily recognizable by their distinctive pattern of dark vertical stripes on reddish-orange fur with a lighter underside. They are powerful predators and apex carnivores in their ecosystems.',
    diet: 'Carnivorous. Their primary prey includes large ungulates such as deer (sambar, chital, rusa), wild boar, buffalo, and gaur. They will also hunt smaller prey like monkeys, birds, and fish when opportunities arise.',
    habitat: 'Diverse habitats including tropical rainforests, evergreen forests, temperate forests, mangrove swamps, grasslands, and savannas. They require sufficient cover, access to water, and an adequate prey base.',
    behavior: 'Tigers are generally solitary and territorial animals, with males maintaining larger territories that may overlap with those of several females. They are primarily nocturnal hunters, relying on stealth and power to ambush prey. Tigers are excellent swimmers and often enter water to cool off or hunt.',
    size: 'Varies by subspecies. Males: Body length 2.4-3.3 meters (7.9-10.8 ft), Tail length 0.9-1.1 meters (3-3.6 ft), Height at shoulder 0.9-1.1 meters (3-3.6 ft). Females are generally smaller.',
    weight: 'Males: 100-260 kg (220-570 lbs), with Siberian tigers being the largest. Females: 65-170 kg (143-375 lbs).',
    lifespan: 'Typically 10-15 years in the wild. They can live up to 20-25 years in captivity.',
    population: 'Estimated to be around 3,900-4,500 individuals remaining in the wild across all subspecies. This number represents a significant decline from historical populations.',
    conservationStatus: 'Endangered',
    threats: ['Poaching for their fur, bones (used in traditional Asian medicine), and other body parts.', 'Habitat loss and fragmentation due to deforestation, agriculture, and infrastructure development, leading to smaller, isolated populations.', 'Human-wildlife conflict, including retaliatory killings when tigers prey on livestock.', 'Depletion of their natural prey base due to overhunting by humans.'],
    funFacts: [
      'Each tiger has a unique pattern of stripes, similar to human fingerprints, which helps researchers identify individuals.',
      'Unlike most other cats, tigers are powerful swimmers and enjoy being in the water.',
      'A tiger\'s roar can be heard up to 3 kilometers (nearly 2 miles) away.',
      'Tigers can leap distances of up to 10 meters (33 feet) horizontally.'
    ],
    distribution: {
      description: 'Historically found across much of Asia. Today, their range is severely fragmented, with populations in India, Nepal, Bhutan, Bangladesh, Southeast Asian countries (like Thailand, Malaysia, Indonesia), and the Russian Far East (Siberian tiger).',
      mapUrl: 'https://placehold.co/400x200.png?text=Tiger+Distribution+Map&data-ai-hint=asia+map+tiger',
    },
  },
  {
    id: 'polar-bear',
    commonName: 'Polar Bear',
    scientificName: 'Ursus maritimus',
    category: 'Marine Mammal', // Classified as a marine mammal due to its dependence on the marine environment
    mediaUrls: [
      'https://cdn.pixabay.com/photo/2023/04/28/05/43/polar-bear-7955893_1280.jpg',
      'https://placehold.co/500x400.png?text=Polar+Bear+Cub&data-ai-hint=polar+bear+cub',
    ],
    description: 'The polar bear is a hypercarnivorous bear whose native range lies largely within the Arctic Circle, encompassing the Arctic Ocean, its surrounding seas, and surrounding land masses. It is the largest extant bear species as well as the largest extant land carnivore.',
    diet: 'Primarily feeds on seals, especially ringed and bearded seals, which they hunt from sea ice. They may also eat walruses, beluga whales, bird eggs, and occasionally scavenge on carcasses.',
    habitat: 'Arctic sea ice is their primary habitat, used for hunting, mating, and sometimes denning. They are also found on coastlines and islands within the Arctic Circle.',
    behavior: 'Generally solitary animals, except for mothers with cubs or during mating season. They are powerful swimmers and can swim for long distances. Polar bears are well-adapted to the cold, with a thick layer of blubber and dense fur. They rely heavily on sea ice platforms to hunt seals.',
    size: 'Adult males: Length 2.4-3 meters (7.9-9.8 ft), Height at shoulder 1.2-1.6 meters (3.9-5.2 ft). Females are smaller, typically 1.8-2.4 meters (5.9-7.9 ft) long.',
    weight: 'Adult males: 350-700 kg (772-1,543 lbs). Adult females: 150-350 kg (331-772 lbs).',
    lifespan: 'Typically 20-25 years in the wild, though some can live up to 30 years.',
    population: 'Estimated to be between 22,000 and 31,000 individuals worldwide, across 19 distinct subpopulations.',
    conservationStatus: 'Vulnerable',
    threats: ['Loss of sea ice habitat due to climate change is the most significant threat, impacting their ability to hunt seals.', 'Pollution, including persistent organic pollutants (POPs) that accumulate in their fat tissues.', 'Increased human activities in the Arctic, such as oil and gas exploration and shipping, leading to habitat disturbance and potential conflicts.', 'Unsustainable hunting in some regions (though largely regulated now).'],
    funFacts: [
      'Polar bears have black skin under their translucent fur, which helps them absorb sunlight and stay warm.',
      'They have an incredibly keen sense of smell, able to detect seals or carcasses from up to 20 miles (32 km) away.',
      'Female polar bears dig maternity dens in snowdrifts where they give birth to cubs and nurse them for several months.',
      'They are considered marine mammals because they spend most of their lives on sea ice and depend on the ocean for food.'
    ],
    distribution: {
      description: 'Circumpolar distribution in the Arctic regions, including countries like Canada, Russia, Greenland (Denmark), Norway, and the United States (Alaska).',
      mapUrl: 'https://placehold.co/400x200.png?text=Polar+Bear+Distribution+Map&data-ai-hint=arctic+map+polar+bear',
    },
  },
  {
    id: 'eagle', // Assuming Bald Eagle for specificity as it's iconic
    commonName: 'Bald Eagle',
    scientificName: 'Haliaeetus leucocephalus',
    category: 'Bird',
    mediaUrls: [
      'https://cdn.pixabay.com/photo/2021/04/20/17/05/adler-6194438_1280.jpg',
      'https://placehold.co/500x400.png?text=Eagle+Flying&data-ai-hint=eagle+flying+sky',
    ],
    description: 'The bald eagle is a large bird of prey found in North America. It is the national bird and symbol of the United States. Known for its white head and tail feathers, contrasting with a dark brown body and wings, and a large, hooked yellow beak.',
    diet: 'Primarily piscivorous (fish-eating), but its diet is opportunistic and varied. It also feeds on waterfowl, small mammals (like rabbits and squirrels), turtles, crabs, and carrion.',
    habitat: 'Typically found near large bodies of open water, such as seacoasts, rivers, large lakes, and marshes, where there is an abundant food supply and old-growth trees for nesting.',
    behavior: 'Often solitary but can congregate in large numbers at communal roosts or feeding sites, especially in winter. Bald eagles are powerful fliers, capable of soaring for long periods. They build enormous nests, called eyries, typically in tall trees or on cliffs, which they often reuse and add to each year. They are known for their spectacular courtship displays, including aerial acrobatics.',
    size: 'Wingspan: 1.8-2.3 meters (5.9-7.5 ft). Body length: 70-102 cm (28-40 inches). Females are generally larger than males.',
    weight: 'Typically 3-6.3 kg (6.6-14 lbs).',
    lifespan: 'Around 20-30 years in the wild, but can live up to 50 years in captivity.',
    population: 'Once seriously endangered due to DDT pesticide use, populations have made a remarkable recovery. In the United States, the population is now estimated at over 316,000 individuals (excluding Alaska).',
    conservationStatus: 'Least Concern',
    threats: ['Historically, DDT pesticide caused eggshell thinning and reproductive failure. Current threats include habitat loss and degradation, lead poisoning (from ingesting hunter-shot game containing lead fragments), electrocution from power lines, collisions with vehicles and wind turbines, and illegal shooting.'],
    funFacts: [
      'Bald eagles are not actually "bald"; their name comes from an older meaning of the word "white-headed."',
      'They possess incredibly keen eyesight, estimated to be 4 to 8 times stronger than that of an average human, allowing them to spot fish from high altitudes.',
      'Their nests are among the largest of any bird species, some weighing over a ton and measuring up to 2.5 meters (8 feet) in diameter and 4 meters (13 feet) deep.',
      'The high-pitched, weak-sounding call often attributed to bald eagles in movies is usually the call of a red-tailed hawk; bald eagles have a much softer, chattering call.'
    ],
    distribution: {
      description: 'Found throughout most of North America, from Alaska and Canada south through the contiguous United States to northern Mexico. Most abundant in Alaska and Canada.',
      mapUrl: 'https://placehold.co/400x200.png?text=Bald+Eagle+Distribution+Map&data-ai-hint=north+america+map',
    },
  },
   {
    id: 'frog', // Red-Eyed Tree Frog
    commonName: 'Red-Eyed Tree Frog',
    scientificName: 'Agalychnis callidryas',
    category: 'Amphibian',
    mediaUrls: [
      'https://cdn.pixabay.com/photo/2014/10/05/11/26/tree-frog-474949_1280.jpg',
      'https://placehold.co/500x400.png?text=Tree+Frog+on+Leaf&data-ai-hint=tree+frog+leaf',
    ],
    description: 'The red-eyed tree frog is a species of arboreal hylid native to Neotropical rainforests. It is known for its vibrant colors: bright green body, blue and yellow striped sides, orange or red feet, and striking large red eyes with vertical pupils.',
    diet: 'Carnivorous, feeding primarily on insects such as crickets, moths, flies, grasshoppers, and other small arthropods. They are nocturnal hunters.',
    habitat: 'Tropical rainforests, humid lowland forests, and premontane slopes, often near rivers, ponds, or other bodies of water where they breed.',
    behavior: 'Nocturnal and arboreal (tree-dwelling). They are excellent climbers, using their sticky toe pads. During the day, they rest camouflaged on the undersides of leaves, tucking their colorful sides and legs under their body and closing their eyes to blend in. If disturbed, they flash their bright colors and red eyes, which may startle predators (a phenomenon called deimatic behaviour or startle display), giving the frog a chance to escape.',
    size: 'Males typically grow to about 5.0-5.4 cm (2.0-2.1 inches) in snout-vent length. Females are larger, reaching 6.5-7.5 cm (2.5-3.0 inches).',
    weight: 'Relatively lightweight, around 6-15 grams, depending on size and sex.',
    lifespan: 'Approximately 3-5 years in the wild, but can live up to 8 years or more in captivity with proper care.',
    population: 'Considered relatively common within its specific range, but populations can be localized and are susceptible to habitat changes. Accurate global population figures are difficult to obtain.',
    conservationStatus: 'Least Concern',
    threats: ['Habitat destruction and fragmentation due to deforestation for agriculture, logging, and human settlement.', 'Chytridiomycosis, a fungal disease that has devastated amphibian populations worldwide.', 'Pollution of water bodies from pesticides and other contaminants.', 'Collection for the pet trade, although many in trade are captive-bred.'],
    funFacts: [
      'The bright red eyes are thought to be a defense mechanism called "startle coloration" to surprise predators.',
      'They lay their eggs in clutches on leaves or vegetation overhanging water; when the tadpoles hatch, they fall directly into the water below.',
      'Red-eyed tree frogs can significantly change their skin color to better match their surroundings or based on mood or temperature.',
      'Despite their bright colors, they are not poisonous.'
    ],
    distribution: {
      description: 'Native to the Neotropical rainforests of Central America and northern South America, ranging from southern Mexico (Veracruz and Oaxaca) through Belize, Guatemala, Honduras, Nicaragua, Costa Rica, Panama, and into northern Colombia.',
      mapUrl: 'https://placehold.co/400x200.png?text=Red-Eyed+Tree+Frog+Map&data-ai-hint=central+america+map',
    },
  },
  {
    id: 'green-sea-turtle',
    scientificName: 'Chelonia mydas',
    commonName: 'Green Sea Turtle',
    category: 'Reptile',
    mediaUrls: ['https://placehold.co/500x400.png?text=Green+Sea+Turtle&data-ai-hint=green+sea+turtle+ocean'],
    description: 'A large, widespread species of sea turtle belonging to the family Cheloniidae. It is named for the greenish color of its cartilage and fat, not its shell. Green turtles are one of the largest sea turtles and the only herbivorous species among them as adults.',
    diet: 'Primarily herbivorous as adults, feeding mainly on seagrasses and algae. Juveniles are more omnivorous, consuming invertebrates like jellyfish and crabs.',
    habitat: 'Found in tropical and subtropical coastal waters around the world. They inhabit shallow lagoons, bays, estuaries, and are commonly found in coral reefs and seagrass beds. They migrate long distances between feeding grounds and nesting beaches.',
    behavior: 'Solitary foragers but may congregate at feeding grounds. Females migrate to specific nesting beaches, often the same ones where they were born, to lay eggs. They dig nests on sandy beaches, lay clutches of about 100-200 eggs, and then return to the sea. Hatchlings emerge, usually at night, and make a perilous journey to the ocean. Green turtles can hold their breath for several hours when resting.',
    size: 'Adult carapace (shell) length can reach up to 1.5 meters (5 ft).',
    weight: 'Adults typically weigh between 110-190 kg (240-420 lbs), but individuals can weigh up to 320 kg (700 lbs) or more.',
    lifespan: 'Long-lived, estimated to live 80 years or more in the wild.',
    population: 'Global population has significantly declined from historical levels. Several distinct population segments (DPS) are listed as threatened or endangered under various conservation statuses.',
    conservationStatus: 'Endangered',
    threats: ['Harvesting of eggs and adults for food and traditional products.', 'Bycatch in commercial and artisanal fisheries (trawls, longlines, gillnets).', 'Habitat loss and degradation of nesting beaches due to coastal development, erosion, and artificial lighting.', 'Destruction of foraging habitats like seagrass beds and coral reefs.', 'Pollution (plastic ingestion, chemical contaminants).', 'Fibropapillomatosis, a disease causing tumors.', 'Climate change (affecting nesting beaches, altering sex ratios of hatchlings as nest temperature determines sex).'],
    funFacts: [
      'Green sea turtles are named for the green color of their body fat, which is a result of their herbivorous diet rich in algae and seagrass.',
      'They are one of the few large marine herbivores, playing a crucial role in maintaining healthy seagrass beds, much like grazing animals on land.',
      'They navigate vast oceanic distances, sometimes thousands of kilometers, using the Earth\'s magnetic field and possibly other cues.',
      'Like other sea turtles, they cannot retract their head and limbs into their shell.'
    ],
    distribution: {
      description: 'Circumglobal distribution, found in tropical and subtropical waters of the Atlantic, Pacific, and Indian Oceans. Major nesting sites are found in countries like Costa Rica, Oman, Australia, and islands in the Caribbean and Pacific.',
      mapUrl: 'https://placehold.co/400x200.png?text=Green+Sea+Turtle+Distribution&data-ai-hint=world+ocean+map',
    },
  },
  {
    id: 'clownfish',
    scientificName: 'Amphiprioninae (Subfamily)', // Subfamily containing many species
    commonName: 'Clownfish (Anemonefish)',
    category: 'Fish',
    mediaUrls: ['https://placehold.co/500x400.png?text=Clownfish&data-ai-hint=clownfish+anemone+coral'],
    description: 'Clownfish, or anemonefish, are small, brightly colored marine fish well-known for their symbiotic relationship with sea anemones. They are popular aquarium fish, further popularized by animated movies.',
    diet: 'Omnivorous. Their diet includes algae, zooplankton (like copepods and larval tunicates), small crustaceans, and undigested food particles from their host anemone.',
    habitat: 'Warm waters of coral reefs and sheltered lagoons in the Indian and Pacific Oceans. They are always found living in close association with a host sea anemone, which provides protection from predators with its stinging tentacles.',
    behavior: 'Clownfish exhibit a fascinating mutualistic symbiosis with sea anemones. The clownfish is immune to the anemone\'s stings due to a protective mucus layer. In return for shelter, the clownfish helps keep the anemone clean, may provide it with food scraps, and can help aerate the water around it. They are protandrous hermaphrodites, meaning all are born male; the largest and most dominant individual in a group becomes female. If the female dies, the largest breeding male will change sex to become the new female.',
    size: 'Varies by species, typically ranging from 6 to 11 cm (2.4 to 4.3 inches) in length. The largest species can reach up to 17 cm (6.7 inches).',
    weight: 'Generally very light, a few grams depending on size and species.',
    lifespan: 'In the wild, their lifespan can be 6 to 10 years. In well-maintained aquariums, they can live even longer.',
    population: 'Generally considered stable for the most common species, but their populations are intrinsically linked to the health of coral reefs and their host anemones. Localized declines can occur due to reef degradation or over-collection for the aquarium trade.',
    conservationStatus: 'Least Concern', // Most common species are LC
    threats: ['Degradation and loss of coral reef habitats due to climate change (coral bleaching, ocean acidification), pollution, and destructive fishing practices.', 'Over-collection for the marine aquarium trade, particularly for certain popular species, although captive breeding programs are increasingly common.', 'Loss of host anemones due to environmental stressors.'],
    funFacts: [
      'Clownfish perform an elaborate "dance" with an anemone before taking up residence, gently touching its tentacles to acclimate to its specific chemical signature and build immunity.',
      'They are surprisingly territorial and will defend their host anemone vigorously, even against much larger fish or divers.',
      'There are about 30 recognized species of anemonefish, each with unique color patterns and often preferring specific anemone species.',
      'The characteristic "wiggling" swimming motion of clownfish is quite distinctive.'
    ],
    distribution: {
      description: 'Found in the warmer waters of the Indian and Pacific Oceans, including the Red Sea and the Great Barrier Reef. They are absent from the Atlantic Ocean.',
      mapUrl: 'https://placehold.co/400x200.png?text=Clownfish+Distribution&data-ai-hint=pacific+indian+ocean',
    },
  },
  {
    id: 'monarch-butterfly',
    scientificName: 'Danaus plexippus',
    commonName: 'Monarch Butterfly',
    category: 'Insect',
    mediaUrls: ['https://placehold.co/500x400.png?text=Monarch+Butterfly&data-ai-hint=monarch+butterfly+flower+migration'],
    description: 'The monarch butterfly is one of the most recognizable and well-studied butterflies in North America, famous for its incredible long-distance seasonal migration and striking orange and black wing pattern.',
    diet: 'Larvae (caterpillars) feed exclusively on the leaves of milkweed plants (genus Asclepias). Adult monarch butterflies feed on nectar from a wide variety of flowering plants, which provides them with energy for flight and reproduction.',
    habitat: 'During their breeding season, monarchs are found in open fields, meadows, roadsides, gardens, and other areas where milkweed and nectar-producing flowers are abundant. Their overwintering sites are specific high-altitude oyamel fir forests in central Mexico (for the eastern population) and groves of eucalyptus, Monterey pine, and Monterey cypress trees along the coast of California (for the western population).',
    behavior: 'The eastern North American population exhibits a remarkable multi-generational migration. A special "super generation" undertakes a long journey south in the autumn to Mexico. In the spring, these butterflies reproduce, and subsequent generations gradually move north. Caterpillars sequester toxic cardenolide compounds from milkweed, making both larvae and adult butterflies unpalatable and poisonous to many predators. Their bright coloration serves as aposematic (warning) signaling.',
    size: 'Wingspan typically ranges from 8.9 to 10.2 cm (3.5 to 4.0 inches).',
    weight: 'Adults weigh approximately 0.25 to 0.75 grams.',
    lifespan: 'Non-migratory adult generations live for about 2-6 weeks. The migratory "super generation" that flies to Mexico or California can live for up to 8-9 months.',
    population: 'Both eastern and western North American populations have experienced significant declines in recent decades, raising conservation concerns.',
    conservationStatus: 'Endangered', // As per IUCN Red List assessment in July 2022.
    threats: ['Loss of milkweed habitat (the sole food source for caterpillars) due to widespread herbicide use in agriculture and land development.', 'Deforestation and degradation of overwintering forest habitats in Mexico and California.', 'Pesticide use, which can directly kill caterpillars and adult butterflies or contaminate their food sources.', 'Climate change, which can disrupt migration patterns, alter the timing of milkweed availability, and increase the frequency of extreme weather events.', 'Drought conditions impacting nectar sources and milkweed growth.'],
    funFacts: [
      'Monarchs can travel between 50-100 miles a day during their migration, which can span up to 3,000 miles.',
      'They use the sun as a primary navigational tool, along with an internal "magnetic compass" that helps them orient themselves.',
      'A single monarch caterpillar can consume an entire milkweed leaf in less than four minutes.',
      'The intricate patterns on their wings are made of tiny scales.'
    ],
    distribution: {
      description: 'Native to North, Central, and South America. The most well-known populations are in North America. They have also been introduced or have naturally spread to Australia, New Zealand, some Pacific Islands, Western Europe (as an occasional migrant or introduced species), and other regions where milkweed has become established.',
      mapUrl: 'https://placehold.co/400x200.png?text=Monarch+Butterfly+Distribution&data-ai-hint=north+america+map',
    },
  },
  {
    id: 'goliath-birdeater',
    scientificName: 'Theraphosa blondi',
    commonName: 'Goliath Birdeater Tarantula',
    category: 'Arachnid',
    mediaUrls: ['https://placehold.co/500x400.png?text=Goliath+Birdeater+Tarantula&data-ai-hint=goliath+tarantula+spider+rainforest'],
    description: 'The Goliath birdeater is one of the largest spiders in the world by mass and body length, belonging to the tarantula family Theraphosidae. It is native to the upland rainforests of northern South America and is known for its impressive size and formidable appearance.',
    diet: 'Carnivorous. Despite its common name, it primarily feeds on large insects (such as crickets, beetles, and grasshoppers), worms, and small terrestrial vertebrates like frogs, rodents (mice), lizards, and occasionally snakes. It rarely preys on birds.',
    habitat: 'Found in deep burrows in swampy or marshy areas within upland rainforest ecosystems. They prefer humid environments and are terrestrial, living on the forest floor.',
    behavior: 'Nocturnal and solitary ambush predator. It typically waits near the entrance of its burrow for prey to pass by. When threatened, the Goliath birdeater can produce a hissing sound (stridulation) by rubbing bristles on its pedipalps and legs. It can also flick urticating (barbed) hairs from its abdomen, which are extremely irritating to the skin and mucous membranes of potential predators, including humans.',
    size: 'Body length can reach up to 13 cm (5.1 inches). Leg span can be up to 30 cm (12 inches), comparable to the size of a dinner plate.',
    weight: 'Can weigh up to 175 grams (6.2 oz), making it arguably the heaviest spider species in the world.',
    lifespan: 'Females have a significantly longer lifespan, typically 15-25 years, and can live even longer in captivity. Males have a much shorter lifespan, usually 3-6 years, often dying shortly after reaching sexual maturity and mating.',
    population: 'The exact population status in the wild is not well-documented, and it has not been formally assessed by the IUCN. However, populations are believed to be impacted by habitat destruction and collection for the pet trade.',
    conservationStatus: 'Not Evaluated',
    threats: ['Habitat destruction and fragmentation due to deforestation for agriculture, logging, and mining operations in their rainforest habitat.', 'Collection for the international pet trade, as they are a popular species among tarantula enthusiasts.', 'Predation by larger animals such as coatis, snakes, and some large birds of prey. They are also parasitized by tarantula hawk wasps.'],
    funFacts: [
      'They possess fangs that can be 1.9 to 3.8 cm (0.75 to 1.5 inches) long, capable of delivering a painful bite, though their venom is generally not lethal to humans, comparable to a wasp sting.',
      'The "birdeater" name is largely a misnomer, stemming from an 18th-century engraving by Maria Sibylla Merian depicting one eating a hummingbird, an event considered rare in the wild.',
      'Like other tarantulas, they are capable of regenerating lost limbs through the process of molting.',
      'Females lay between 100 to 200 eggs, which are encased in a large silk sac.'
    ],
    distribution: {
      description: 'Native to the upland rainforest regions of northern South America, primarily found in countries such as Suriname, Guyana, French Guiana, northern Brazil, and southern Venezuela.',
      mapUrl: 'https://placehold.co/400x200.png?text=Goliath+Birdeater+Distribution&data-ai-hint=south+america+map+rainforest',
    },
  },
  {
    id: 'giant-pacific-octopus',
    scientificName: 'Enteroctopus dofleini',
    commonName: 'Giant Pacific Octopus',
    category: 'Mollusk',
    mediaUrls: ['https://placehold.co/500x400.png?text=Giant+Pacific+Octopus&data-ai-hint=giant+octopus+pacific+ocean+underwater'],
    description: 'The Giant Pacific Octopus is the largest octopus species in the world, renowned for its remarkable intelligence, complex behaviors, and incredible ability to camouflage itself by changing both skin color and texture.',
    diet: 'Carnivorous. Its diet consists of a wide variety of prey, including crabs, clams, lobsters, scallops, shrimp, fish, and occasionally other octopuses. They use their powerful beaks to break open shellfish.',
    habitat: 'Found in the cool, coastal waters of the North Pacific Ocean. They inhabit a range of depths, from intertidal zones down to 2,000 meters (6,600 ft). They prefer rocky areas, caves, dens under boulders, and kelp forests, which provide shelter and hunting grounds.',
    behavior: 'Generally solitary, except during mating. They are highly intelligent invertebrates, capable of learning, problem-solving, and possibly even tool use in some contexts. They are masters of camouflage, able to change their skin color and texture in fractions of a second to blend seamlessly with their surroundings or to communicate mood. They move by crawling using their eight arms or by jet propulsion, expelling water from their siphon. Lifespan: 3–5 years.',
    size: 'The average arm span is around 4.9 meters (16 ft), with a body weight typically ranging from 10 to 50 kg (22 to 110 lbs). The largest recorded specimen had an arm span of 9.1 meters (30 ft) and weighed over 272 kg (600 lbs).',
    weight: 'Typically 10-50 kg (22-110 lbs), though exceptionally large individuals can be much heavier.',
    lifespan: 'Relatively short for such a large animal, typically 3-5 years in the wild. Their lifespan is semelparous, meaning they reproduce only once and then die.',
    population: 'The overall population status is not precisely known across its vast range and is difficult to assess. It is not currently listed as endangered by major conservation organizations, but local populations can be affected by fishing pressure and environmental changes.',
    conservationStatus: 'Not Evaluated',
    threats: ['Bycatch in commercial fisheries, particularly in crab pots and bottom trawls.', 'Pollution from coastal runoff, shipping, and industrial discharges.', 'Habitat degradation due to coastal development, dredging, and destructive fishing practices.', 'Ocean acidification, which could potentially impact the shellfish that form a significant part of their diet.', 'Sensitivity to changes in water temperature and oxygen levels due to climate change.'],
    funFacts: [
      'Giant Pacific Octopuses have three hearts: two pump blood through the gills, and one circulates blood to the rest of the body.',
      'Their blood is blue because it contains a copper-rich protein called hemocyanin to transport oxygen, instead of the iron-based hemoglobin found in mammals.',
      'Female Giant Pacific Octopuses are dedicated mothers; they lay thousands of eggs in strings and meticulously care for them for 6-7 months, constantly cleaning and aerating them, without eating. They typically die shortly after the eggs hatch.',
      'They can squeeze their boneless bodies through incredibly small openings, limited only by the size of their hard beak.'
    ],
    distribution: {
      description: 'Found in the coastal regions of the North Pacific Ocean, its range extends from Southern California (USA) northwards along the coast of North America to Alaska, across the Aleutian Islands, and southwards along the coasts of Japan, Korea, and Russia.',
      mapUrl: 'https://placehold.co/400x200.png?text=Giant+Pacific+Octopus+Distribution&data-ai-hint=north+pacific+map+ocean',
    },
  },
  {
    id: 'common-starfish',
    scientificName: 'Asterias rubens',
    commonName: 'Common Starfish (Sea Star)',
    category: 'Other Invertebrate',
    mediaUrls: ['https://placehold.co/500x400.png?text=Common+Starfish&data-ai-hint=starfish+sea+star+ocean+tidepool'],
    description: 'The Common Starfish, also known as the Common Sea Star, is a familiar echinoderm found in the northeastern Atlantic Ocean and other temperate waters. It typically has five arms radiating from a central disc, though variations can occur.',
    diet: 'Carnivorous and a voracious predator. Its primary food source is bivalve mollusks such as mussels, clams, and oysters. It also feeds on barnacles, snails, small crustaceans, and occasionally carrion or small, slow-moving fish.',
    habitat: 'Inhabits a variety of marine environments, including rocky shores, kelp forests, and sandy or gravelly bottoms. It is found from the intertidal zone, where it can be exposed at low tide, down to depths of at least 200 meters (660 ft), and sometimes much deeper.',
    behavior: 'Moves using hundreds of tiny, sucker-tipped tube feet located in grooves on the underside of its arms. These tube feet are part of its water vascular system, which is also used for respiration and feeding. To eat a bivalve, the starfish uses its arms and tube feet to exert steady pressure to pry the shell open just a fraction. It then everts its stomach out through its mouth (located on the underside) and into the bivalve, digesting the soft tissues externally before retracting its stomach. They possess remarkable powers of regeneration; a lost arm can be regrown, and in some cases, a single arm with a portion of the central disc can regenerate into an entire new starfish.',
    size: 'Typically ranges from 10 to 30 cm (4 to 12 inches) in diameter across the arms. Exceptionally large individuals can reach up to 50 cm (20 inches).',
    weight: 'Varies considerably depending on size and recent feeding.',
    lifespan: 'Approximately 5 to 10 years in the wild.',
    population: 'Generally abundant and widespread within its native range. However, like many marine species, populations can experience fluctuations due to environmental factors and disease outbreaks, such as sea star wasting syndrome (though *Asterias rubens* has shown some resilience compared to certain Pacific species).',
    conservationStatus: 'Least Concern',
    threats: ['Sea star wasting disease, although its impact on *Asterias rubens* is less severe than on some other sea star species.', 'Pollution from coastal runoff and marine debris.', 'Habitat disturbance from bottom trawling and dredging activities.', 'Changes in water temperature, salinity, and acidity due to climate change, which can affect their physiology and prey availability.'],
    funFacts: [
      'Starfish have an eyespot (a simple light-sensitive organ) at the tip of each arm, allowing them to perceive light and dark and navigate their environment.',
      'They do not have blood; their water vascular system circulates seawater for many bodily functions.',
      'The Common Starfish can be found in a variety of colors, including orange, reddish-brown, yellow, and sometimes purplish.',
      'Despite their common name, they are not fish but echinoderms, related to sea urchins and sea cucumbers.'
    ],
    distribution: {
      description: 'Found predominantly in the northeastern Atlantic Ocean, including the North Sea, Baltic Sea (to a certain salinity), English Channel, and along the coasts of Europe from Norway and Iceland south to Portugal. It has also been reported in some areas of the northwestern Atlantic, though these might be distinct populations or misidentifications.',
      mapUrl: 'https://placehold.co/400x200.png?text=Common+Starfish+Distribution&data-ai-hint=atlantic+ocean+map+europe',
    },
  },
  {
    id: 'axolotl',
    scientificName: 'Ambystoma mexicanum',
    commonName: 'Axolotl (Mexican Walking Fish)',
    category: 'Amphibian',
    mediaUrls: ['https://placehold.co/500x400.png?text=Axolotl&data-ai-hint=axolotl+aquatic+salamander+gills'],
    description: 'The axolotl is a paedomorphic (neotenic) salamander, meaning it retains its larval features, such as external gills, throughout its adult life and remains fully aquatic. It is often referred to as the "Mexican walking fish," though it is an amphibian, not a fish. They are critically endangered in the wild.',
    diet: 'Carnivorous. In the wild, their diet consists of small insects, worms, crustaceans (like daphnia and small shrimp), mollusks, and occasionally small fish or tadpoles. In captivity, they are often fed earthworms, bloodworms, brine shrimp, and specialized pellets.',
    habitat: 'Native only to a complex of lakes and canals that are remnants of Lake Xochimilco and formerly Lake Chalco, located near Mexico City. These freshwater habitats are characterized by cool temperatures and aquatic vegetation.',
    behavior: 'Primarily aquatic and generally solitary, except during breeding. They are bottom-dwellers, often hiding among aquatic plants or in burrows. Axolotls are most active at night (nocturnal) or in low light conditions. They are famous for their extraordinary regenerative abilities, capable of regrowing lost limbs, parts of their spinal cord, heart, eyes, and even portions of their brain without scarring.',
    size: 'Adults typically reach lengths of 15-30 cm (6-12 inches), though some can grow up to 45 cm (18 inches).',
    weight: 'Usually between 60 and 230 grams (2 to 8 ounces).',
    lifespan: 'In captivity, with good care, they can live for 10-15 years, sometimes even longer. Their lifespan in the wild is likely shorter due to predation and environmental pressures.',
    population: 'Critically low and declining rapidly in the wild. Recent surveys have found very few, if any, individuals, leading to fears they may be functionally extinct in their native habitat, though captive populations thrive globally.',
    conservationStatus: 'Critically Endangered',
    threats: ['Severe habitat loss and degradation due to the drainage and pollution of the Xochimilco lake system for urbanization and agriculture in Mexico City.', 'Introduction of invasive predatory fish species, such as carp and tilapia, which prey on axolotl eggs and young, and compete for food resources.', 'Water contamination from sewage, fertilizers, and industrial waste.', 'Extraction of water for human consumption, further reducing their habitat.', 'Illegal capture for the pet trade and traditional medicine, though this is less of a threat now due to their rarity in the wild and captive breeding efforts.'],
    funFacts: [
      'Axolotls possess one of the most remarkable regenerative capabilities in the animal kingdom, able to regrow entire limbs, tails, and even damaged organs perfectly.',
      'Their external feathery gills are a retained larval feature, allowing them to breathe underwater.',
      'The name "Axolotl" originates from the Nahuatl language of the Aztecs and is often translated as "water dog" or "water monster" (atl = water, xolotl = dog/monster).',
      'Wild axolotls are typically dark brown or black with speckles, while the popular leucistic (pinkish-white with dark eyes) and albino varieties are primarily found in captivity.'
    ],
    distribution: {
      description: 'Endemic to the freshwater lake complex of Xochimilco, located south of Mexico City, and formerly Lake Chalco (which has largely been drained). Their wild range is now extremely restricted to a few canals and wetlands within this system.',
      mapUrl: 'https://placehold.co/400x200.png?text=Axolotl+Distribution+Map&data-ai-hint=mexico+city+map+lake',
    },
  },
  {
    id: 'honey-bee',
    scientificName: 'Apis mellifera',
    commonName: 'Western Honey Bee',
    category: 'Insect',
    mediaUrls: ['https://placehold.co/500x400.png?text=Honey+Bee&data-ai-hint=honey+bee+flower+pollination'],
    description: 'The Western Honey Bee is a species of honey bee, one of the most well-known and economically important insects globally due to its vital role in pollination of agricultural crops and production of honey and beeswax.',
    diet: 'Adult bees primarily consume nectar for carbohydrates (energy) and pollen for protein and other nutrients. Larvae are fed royal jelly (a glandular secretion) initially, then pollen and honey (brood food) by worker bees.',
    habitat: 'Highly adaptable, honey bees can be found in a wide range of environments where flowering plants are available. In the wild, they build nests in tree cavities, rock crevices, or other sheltered locations. Domesticated colonies are housed in man-made hives.',
    behavior: 'Eusocial insects living in large, complex colonies typically consisting of a single reproductive queen, thousands of sterile female worker bees, and, seasonally, male drones. Worker bees perform various tasks depending on their age, including cleaning the hive, nursing larvae, building wax comb, guarding the hive, and foraging for nectar and pollen. They communicate extensively, most famously through the "waggle dance," which informs other foragers about the direction and distance to food sources.',
    size: 'Worker bees are typically 10-15 mm (0.4-0.6 inches) long. Queens are larger, around 18-20 mm (0.7-0.8 inches). Drones are intermediate in size.',
    weight: 'A single worker bee weighs around 0.1 grams.',
    lifespan: 'Worker bees: Lifespan varies from a few weeks in the busy summer months to several months for those overwintering. Queen: Can live for 1-5 years. Drones: Live for a few weeks; they die after mating or are expelled from the hive before winter.',
    population: 'Globally widespread due to human introduction and management for agriculture and honey production. However, both wild and managed honey bee populations face significant threats in many regions.',
    conservationStatus: 'Not Evaluated', // As a species, it's widespread, but the health and stability of local populations and managed colonies are of major concern.
    threats: ['Colony Collapse Disorder (CCD), a phenomenon characterized by the sudden loss of a hive\'s adult bee population.', 'Parasitic Varroa mites (*Varroa destructor*), which weaken bees and transmit viruses.', 'Pesticides, particularly neonicotinoids and other systemic insecticides, which can impair bee navigation, foraging, and immune systems.', 'Habitat loss and fragmentation, leading to a reduction in diverse forage (flowering plants).', 'Climate change, which can alter flowering times and bee activity periods.', 'Various bee diseases and viruses (e.g., American Foulbrood, Nosema).'],
    funFacts: [
      'Honey bees perform a complex "waggle dance" to communicate the precise direction and distance of profitable food sources to their hive mates.',
      'A single honey bee may visit 50-100 flowers during one collection trip, and a colony can visit millions of flowers in a day.',
      'To produce one pound (0.45 kg) of honey, bees in a colony must collectively fly about 55,000 miles (88,500 km) and visit about 2 million flowers.',
      'Only female bees (worker bees and the queen) can sting. Worker bees have barbed stingers and die after stinging a mammal, as the stinger and part of their abdomen are left behind.'
    ],
    distribution: {
      description: 'Originally native to Europe, Africa, and the Middle East. Due to human introduction for honey production and pollination services, it is now found on every continent except Antarctica.',
      mapUrl: 'https://placehold.co/400x200.png?text=Honey+Bee+Distribution+Map&data-ai-hint=world+map+insect+hive',
    },
  },
  {
    id: 'common-cuttlefish',
    scientificName: 'Sepia officinalis',
    commonName: 'Common Cuttlefish',
    category: 'Mollusk',
    mediaUrls: ['https://placehold.co/500x400.png?text=Common+Cuttlefish&data-ai-hint=cuttlefish+underwater+camouflage+ocean'],
    description: 'The Common Cuttlefish is a species of cephalopod mollusk native to the Mediterranean Sea, North Sea, and Baltic Sea. It is renowned for its remarkable ability to rapidly change its skin color and texture for camouflage, communication, and hunting.',
    diet: 'Carnivorous. It actively hunts small mollusks (like clams and snails), crabs, shrimp, small fish, and occasionally other cephalopods. They use their two long tentacles, equipped with suckers, to capture prey swiftly.',
    habitat: 'Primarily found on the seabed in sublittoral depths, typically ranging from shallow waters down to about 200 meters (660 ft). They prefer sandy or muddy substrates where they can bury themselves, as well as seagrass beds and areas near rocky outcrops which provide cover.',
    behavior: 'Masters of camouflage, possessing specialized pigment sacs (chromatophores) and reflective cells (iridophores and leucophores) in their skin, allowing them to change their appearance in milliseconds to match their surroundings or display complex patterns for communication (e.g., courtship or aggression). They are intelligent predators and use jets of water expelled from a siphon for rapid propulsion. They possess an internal, porous shell called a cuttlebone, which is used for buoyancy control.',
    size: 'Mantle length can reach up to 45 cm (18 inches). Total length, including their eight arms and two longer tentacles, can be significantly more.',
    weight: 'Can weigh up to 4 kg (8.8 lbs), though most are smaller.',
    lifespan: 'Relatively short, typically 1-2 years.',
    population: 'Generally considered abundant and is commercially fished in many parts of its range. However, populations can experience natural fluctuations based on environmental conditions and fishing pressure.',
    conservationStatus: 'Least Concern',
    threats: ['Overfishing, both as a targeted species and as bycatch in trawl fisheries.', 'Habitat degradation due to pollution, coastal development, and destructive fishing practices like bottom trawling.', 'Climate change, which can affect water temperatures, prey availability, and breeding patterns.', 'Ocean acidification, which may impact the development of their cuttlebone and the shells of their prey.'],
    funFacts: [
      'Cuttlefish have W-shaped pupils, which are thought to give them a very wide field of vision and help them judge distances accurately, despite being colorblind (they see in shades of grey but can detect polarization of light).',
      'They have three hearts: two branchial hearts pump blood through each of the two gills, and a third systemic heart circulates the oxygenated blood to the rest of the body.',
      'The cuttlebone, often found washed ashore, is a unique internal shell made of aragonite that helps the cuttlefish maintain buoyancy by adjusting the gas-to-liquid ratio within its chambers.',
      'Like octopuses and squid, cuttlefish can squirt a cloud of dark ink (sepia) to confuse predators and make an escape.'
    ],
    distribution: {
      description: 'Native to the eastern North Atlantic Ocean, ranging from the Baltic Sea and North Sea southwards along the European and African coasts to Morocco. It is also found throughout the Mediterranean Sea. They are not found in American waters.',
      mapUrl: 'https://placehold.co/400x200.png?text=Cuttlefish+Distribution+Map&data-ai-hint=atlantic+mediterranean+map+europe',
    },
  },
  {
    id: 'domestic-cat',
    commonName: 'Domestic Cat',
    scientificName: 'Felis catus',
    category: 'Mammal',
    mediaUrls: ['https://placehold.co/500x400.png?text=Domestic+Cat&data-ai-hint=cat+domestic+pet+playing'],
    description: 'The domestic cat is a small carnivorous mammal. It is the only domesticated species in the family Felidae and is often referred to as the house cat to distinguish it from the wild members of the family. Cats are valued by humans for companionship and their ability to hunt vermin.',
    diet: 'Obligate carnivore. Their natural diet consists of small prey such as rodents, birds, and insects. Commercial cat food is formulated to meet their specific nutritional needs.',
    habitat: 'Globally distributed alongside humans. They live in homes, farms, and some live ferally in urban, suburban, and rural environments.',
    behavior: 'Known for a wide range of behaviors including purring, meowing, hissing, and various body language cues. They are skilled hunters, retaining strong predatory instincts. Domestic cats are generally crepuscular (active at dawn and dusk) and spend a significant amount of time sleeping.',
    size: 'Average body length is 46 cm (18 in) excluding the tail, and height is 23–25 cm (9–10 in).',
    weight: 'Typically 4–5 kg (8.8–11.0 lb), though this varies greatly with breed and diet.',
    lifespan: 'Indoor cats typically live 12–18 years, with some living into their 20s. Outdoor cats generally have shorter lifespans due to higher risks.',
    population: 'Hundreds of millions worldwide, making them one of the most popular pets.',
    conservationStatus: 'Not Evaluated', // Domesticated species are not typically assessed by IUCN unless feral populations impact native wildlife.
    threats: 'For pet cats: common diseases, accidents (if outdoors). For feral cats: impact on native wildlife (predation), disease transmission.',
    funFacts: [
      'Cats can make over 100 different sounds, whereas dogs make about 10.',
      'A group of cats is called a "clowder."',
      'Cats have a specialized collarbone that allows them to pass through any space their head can fit into.',
      'The oldest known pet cat existed 9,500 years ago.'
    ],
    distribution: {
      description: 'Found worldwide in association with human settlements.',
      mapUrl: 'https://placehold.co/400x200.png?text=Global+Distribution&data-ai-hint=world+map+global',
    },
  },
  {
    id: 'red-tailed-hawk',
    commonName: 'Red-tailed Hawk',
    scientificName: 'Buteo jamaicensis',
    category: 'Bird',
    mediaUrls: ['https://placehold.co/500x400.png?text=Red-tailed+Hawk&data-ai-hint=red+tailed+hawk+soaring'],
    description: 'The red-tailed hawk is a bird of prey that breeds throughout most of North America, from the interior of Alaska and northern Canada to as far south as Panama and the West Indies. It is one of the most common members of the genus Buteo in North America or worldwide.',
    diet: 'Carnivorous. Primarily feeds on small mammals such as rodents (mice, voles, gophers), rabbits, and squirrels. Also eats birds, reptiles (snakes, lizards), and occasionally insects or carrion.',
    habitat: 'Highly adaptable, found in a wide variety of habitats including open country, woodlands, deserts, grasslands, agricultural fields, and even urban areas.',
    behavior: 'Often seen soaring in wide circles high above open fields or perched on telephone poles and treetops, scanning for prey. They are monogamous and maintain pair bonds for many years, often reusing the same nest. Their call is a hoarse, screaming "kee-eeeee-arr," frequently used in movies to represent any raptor.',
    size: 'Wingspan: 107-141 cm (42-56 in). Length: 45-65 cm (18-26 in).',
    weight: '690-1,600 g (1.52-3.53 lb). Females are typically larger than males.',
    lifespan: 'Average 10-15 years in the wild, can live over 20 years.',
    population: 'Widespread and abundant, with an estimated global population in the millions.',
    conservationStatus: 'Least Concern',
    threats: 'Generally stable, but can be affected by habitat loss, collisions with vehicles, and secondary poisoning from rodenticides.',
    funFacts: [
      'The characteristic "kree-eee-ar" call often used for eagles in movies is actually the call of a Red-tailed Hawk.',
      'They have incredible eyesight, able to spot a mouse from 100 feet (30 m) up in the air.',
      'Red-tailed hawks are often used in falconry.',
      'The "red tail" is typically only present in adult birds; juveniles have brownish, banded tails.'
    ],
    distribution: {
      description: 'Found throughout North America, from Alaska and Canada south through the United States and Mexico to Central America and the West Indies.',
      mapUrl: 'https://placehold.co/400x200.png?text=Red-tailed+Hawk+Map&data-ai-hint=north+america+map',
    },
  },
  {
    id: 'black-kite',
    commonName: 'Black Kite',
    scientificName: 'Milvus migrans',
    category: 'Bird',
    mediaUrls: ['https://placehold.co/500x400.png?text=Black+Kite&data-ai-hint=black+kite+flying+scavenging'],
    description: 'The black kite is a medium-sized bird of prey in the family Accipitridae, which also includes many other diurnal raptors such as eagles, buzzards, and harriers. It is thought to be the world\'s most abundant species of Accipitridae, although some populations have experienced dramatic declines or fluctuations.',
    diet: 'Opportunistic scavenger and hunter. Their diet is varied and includes small live prey (rodents, birds, reptiles, fish, insects) as well as carrion and scraps from human refuse. They are adept at snatching food items from the ground or water surface while in flight.',
    habitat: 'Extremely adaptable, found in a wide range of habitats from open woodlands, savannas, and wetlands to agricultural areas and urban environments. Often seen near water bodies or human settlements where food is readily available.',
    behavior: 'Often gregarious, particularly when roosting or migrating, sometimes forming large flocks. They are skilled aerialists, known for their agile flight and ability to soar effortlessly on thermals. Black kites are migratory in temperate parts of their range, wintering in warmer regions.',
    size: 'Wingspan: 120-153 cm (47-60 in). Length: 47-60 cm (19-24 in).',
    weight: '560-950 g (1.23-2.09 lb).',
    lifespan: 'Can live up to 20-25 years in the wild.',
    population: 'Globally abundant, with a very large range. Some regional populations, however, have declined due to poisoning, habitat loss, and persecution.',
    conservationStatus: 'Least Concern',
    threats: 'Historically affected by pesticide use (e.g., DDT). Current threats in some regions include secondary poisoning from veterinary drugs (like diclofenac in Asia, which devastated vulture populations and also affects kites), direct persecution, collisions with vehicles and power lines, and habitat degradation.',
    funFacts: [
      'Black kites are known for their habit of "decorating" their nests with scraps of paper, plastic, and other human-made materials.',
      'They are highly opportunistic and have been observed stealing food from other birds or even people.',
      'In some cultures, black kites are considered sacred or are tolerated in urban areas due to their scavenging habits.',
      'They have a distinctive forked tail, which helps with their agile maneuvering in flight.'
    ],
    distribution: {
      description: 'Widespread across Eurasia (Europe and Asia), Africa, and Australia. Many populations are migratory.',
      mapUrl: 'https://placehold.co/400x200.png?text=Black+Kite+Distribution+Map&data-ai-hint=eurasia+africa+australia+map',
    },
  },
  {
    id: 'nile-crocodile',
    commonName: 'Nile Crocodile',
    scientificName: 'Crocodylus niloticus',
    category: 'Reptile',
    mediaUrls: ['https://placehold.co/500x400.png?text=Nile+Crocodile&data-ai-hint=nile+crocodile+river+africa'],
    description: 'The Nile crocodile is a large crocodilian native to freshwater habitats in Africa. It is the second-largest extant reptile in the world, after the saltwater crocodile.',
    diet: 'Apex predator, opportunistic carnivore. Diet varies with age; young eat insects and small aquatic invertebrates, while adults take fish, reptiles, birds, and mammals, including large prey like zebra and wildebeest.',
    habitat: 'Rivers, freshwater marshes, swamps, lakes, and estuaries throughout sub-Saharan Africa.',
    behavior: 'Ambush predator, often lying in wait in water for prey to come close. Thermoregulates by basking in the sun or seeking shade. Females lay eggs in nests dug in sandy banks and guard them.',
    size: 'Average 3.5-5 m (11.5-16.4 ft), with some males reaching 6 m (19.7 ft) or more.',
    weight: 'Typically 225-750 kg (500-1650 lb), large specimens can exceed 1,000 kg.',
    lifespan: '50-75 years in the wild, can live longer in captivity.',
    population: 'Estimated at 250,000 to 500,000 individuals.',
    conservationStatus: 'Least Concern',
    threats: ['Habitat loss, pollution, human-wildlife conflict, and illegal hunting for skin and meat in some areas.'],
    funFacts: [
        'Nile crocodiles have a powerful bite force, one of the strongest in the animal kingdom.',
        'They can hold their breath for over an hour when submerged.',
        'The sex of hatchlings is determined by nest temperature.'
    ],
    distribution: {
        description: 'Found throughout sub-Saharan Africa, the Nile Basin, and Madagascar, in various freshwater habitats.',
        mapUrl: 'https://placehold.co/400x200.png?text=Nile+Crocodile+Map&data-ai-hint=africa+map+crocodile',
    },
  },
  {
    id: 'saltwater-crocodile',
    commonName: 'Saltwater Crocodile',
    scientificName: 'Crocodylus porosus',
    category: 'Reptile',
    mediaUrls: ['https://placehold.co/500x400.png?text=Saltwater+Crocodile&data-ai-hint=saltwater+crocodile+estuary+australia'],
    description: 'The saltwater crocodile is the largest living reptile and crocodilian known. It inhabits saltwater habitats and brackish wetlands.',
    diet: 'Apex predator, highly opportunistic. Diet includes fish, crustaceans, reptiles, birds, and mammals, including large animals like buffalo, wild boar, and even sharks.',
    habitat: 'Coastal rivers, estuaries, mangrove swamps, lagoons, and occasionally open sea. Found from eastern India through Southeast Asia to northern Australia.',
    behavior: 'Highly territorial and aggressive. Excellent swimmer, capable of traveling long distances at sea. They are ambush predators, waiting for prey to come close to the water\'s edge.',
    size: 'Males typically 4.3-5.2 m (14-17 ft), with large individuals exceeding 6 m (20 ft) and exceptionally up to 7 m (23 ft). Females are smaller.',
    weight: 'Males 400-1,000 kg (880-2,200 lb), large specimens can weigh over 1,500 kg.',
    lifespan: 'Can live over 70 years in the wild.',
    population: 'Stable in some areas (e.g., Australia), but threatened or recovering in others.',
    conservationStatus: 'Least Concern', // Globally, but varies regionally
    threats: ['Habitat loss, human-wildlife conflict, illegal hunting, and pollution.'],
    funFacts: [
        'Saltwater crocodiles have a special gland on their tongue to excrete excess salt, allowing them to live in saline environments.',
        'They are capable of explosive bursts of speed both in water and for short distances on land.',
        'They are considered one of the most dangerous animals to humans.'
    ],
    distribution: {
        description: 'Widely distributed from the eastern coast of India, throughout Southeast Asia, to northern Australia and the islands of the western Pacific.',
        mapUrl: 'https://placehold.co/400x200.png?text=Saltwater+Crocodile+Map&data-ai-hint=southeast+asia+australia+map',
    },
  },
  {
    id: 'galapagos-tortoise',
    commonName: 'Galápagos Tortoise',
    scientificName: 'Chelonoidis niger (complex)',
    category: 'Reptile',
    mediaUrls: ['https://placehold.co/500x400.png?text=Galapagos+Tortoise&data-ai-hint=galapagos+tortoise+giant+island'],
    description: 'Galápagos tortoises are the largest living species of tortoise. Native to seven of the Galápagos Islands, these tortoises can weigh up to 417 kg (919 lb).',
    diet: 'Herbivorous, feeding on cacti, grasses, leaves, lichens, and berries.',
    habitat: 'Varies by island and subspecies, from dry lowlands with cacti to humid highlands with lush vegetation.',
    behavior: 'Slow-moving and diurnal. They spend much of their day basking in the sun or wallowing in mud or water to regulate body temperature. They can survive long periods without food or water.',
    size: 'Carapace length can exceed 1.5 m (5 ft).',
    weight: 'Up to 417 kg (919 lb).',
    lifespan: 'Can live over 100 years in the wild, with some captive individuals living over 170 years.',
    population: 'Around 15,000-20,000 individuals remaining. Several subspecies are critically endangered or extinct.',
    conservationStatus: 'Vulnerable', // Overall status for the species complex
    threats: ['Historically, overexploitation by whalers and settlers for food. Currently, introduced species (rats, pigs, goats) that prey on eggs/young or compete for food, habitat degradation, and climate change.'],
    funFacts: [
        'Charles Darwin\'s observations of Galápagos tortoises and finches contributed to his theory of evolution by natural selection.',
        'Different subspecies have distinct shell shapes (saddleback vs. dome-shaped) adapted to their specific island environments and food sources.',
        'They can store large amounts of water in their bodies.'
    ],
    distribution: {
        description: 'Endemic to the Galápagos Archipelago, Ecuador. Different islands host distinct subspecies.',
        mapUrl: 'https://placehold.co/400x200.png?text=Galapagos+Islands+Map&data-ai-hint=galapagos+islands+map',
    },
  },
  {
    id: 'indian-star-tortoise',
    commonName: 'Indian Star Tortoise',
    scientificName: 'Geochelone elegans',
    category: 'Reptile',
    mediaUrls: ['https://placehold.co/500x400.png?text=Indian+Star+Tortoise&data-ai-hint=indian+star+tortoise+shell+pattern'],
    description: 'The Indian star tortoise is a species of tortoise found in dry areas and scrub forest in India, Pakistan and Sri Lanka. This species is popular in the exotic pet trade.',
    diet: 'Herbivorous, feeding on grasses, fallen fruit, flowers, and leaves of succulent plants.',
    habitat: 'Scrub forests, grasslands, and semi-desert areas.',
    behavior: 'Diurnal, most active during the morning and late afternoon. Seeks shelter during the hottest part of the day. Their star-patterned shell helps them camouflage in tall grasses.',
    size: 'Females up to 25-30 cm (10-12 inches), males smaller at 15-20 cm (6-8 inches).',
    weight: '1.3 to 2.2 kg for females, less for males.',
    lifespan: 'Can live 30-80 years.',
    population: 'Declining due to habitat loss and illegal pet trade.',
    conservationStatus: 'Vulnerable',
    threats: ['Illegal collection for the pet trade is a major threat.', 'Habitat loss due to agriculture and development.', 'Road mortality.'],
    funFacts: [
        'The star-like patterns on their shell help break up their outline, providing camouflage in grassy environments.',
        'They are not strong swimmers and can drown in deep water.',
        'Females lay clutches of 1-10 eggs.'
    ],
    distribution: {
        description: 'Found in India (except lower Bengal), Sri Lanka, and southeastern Pakistan.',
        mapUrl: 'https://placehold.co/400x200.png?text=Indian+Star+Tortoise+Map&data-ai-hint=india+sri+lanka+map',
    },
  },
  {
    id: 'russells-viper',
    commonName: 'Russell\'s Viper',
    scientificName: 'Daboia russelii',
    category: 'Reptile',
    mediaUrls: ['https://placehold.co/500x400.png?text=Russell%27s+Viper&data-ai-hint=russells+viper+snake+asia+venomous'],
    description: 'Russell\'s viper is a venomous snake in the family Viperidae native to the Indian subcontinent. It is one of the "Big Four" snakes of India, responsible for the majority of snakebite deaths.',
    diet: 'Carnivorous, primarily feeding on rodents, but also small mammals, birds, lizards, and frogs.',
    habitat: 'Open grassy areas, scrub jungles, agricultural fields, and plantations. Often found near human settlements due to rodent abundance.',
    behavior: 'Primarily nocturnal, but can be active during the day, especially after rains. Generally sluggish unless threatened, then it can be very aggressive. It has a loud hiss.',
    size: 'Average length 1-1.2 m (3.3-3.9 ft), can reach up to 1.7 m (5.5 ft).',
    weight: 'Varies, up to a few kilograms for large specimens.',
    lifespan: 'Around 10-15 years.',
    population: 'Common in many parts of its range.',
    conservationStatus: 'Least Concern',
    threats: ['Persecution by humans due to its venomous nature.', 'Habitat loss.', 'Road kills.'],
    funFacts: [
        'Russell\'s viper venom is highly hemotoxic, causing pain, swelling, blistering, and tissue damage.',
        'They are viviparous, giving birth to live young.',
        'Their camouflage pattern helps them blend in with dry leaves and soil.'
    ],
    distribution: {
        description: 'Found throughout the Indian subcontinent (India, Sri Lanka, Bangladesh, Nepal, Pakistan), Southeast Asia (Myanmar, Thailand, Cambodia, parts of Indonesia), southern China, and Taiwan.',
        mapUrl: 'https://placehold.co/400x200.png?text=Russell%27s+Viper+Map&data-ai-hint=india+southeast+asia+map',
    },
  },
  {
    id: 'gaboon-viper',
    commonName: 'Gaboon Viper',
    scientificName: 'Bitis gabonica',
    category: 'Reptile',
    mediaUrls: ['https://placehold.co/500x400.png?text=Gaboon+Viper&data-ai-hint=gaboon+viper+africa+snake+camouflage'],
    description: 'The Gaboon viper is a large, heavy-bodied venomous viper species found in the rainforests and savannas of sub-Saharan Africa. It has the longest fangs of any snake and produces the largest quantity of venom.',
    diet: 'Carnivorous, preying on small and medium-sized mammals (rodents, rabbits, small antelopes), ground-dwelling birds, and frogs.',
    habitat: 'Rainforests, woodlands, savannas, and agricultural areas with good cover, often near water.',
    behavior: 'Primarily nocturnal and terrestrial. Known for its placid temperament but capable of very fast strikes. Relies on camouflage and ambush predation, often lying motionless for long periods.',
    size: 'Average 1.2-1.5 m (4-5 ft), can reach up to 2 m (6.6 ft).',
    weight: 'Can weigh over 8-10 kg (17-22 lbs), making it one of the heaviest vipers.',
    lifespan: 'Around 18-20 years.',
    population: 'Generally not considered threatened, but precise data is limited.',
    conservationStatus: 'Least Concern',
    threats: ['Habitat destruction and fragmentation.', 'Collection for the pet trade and for its skin.'],
    funFacts: [
        'Gaboon vipers have fangs up to 5 cm (2 inches) long.',
        'Their intricate skin patterns provide excellent camouflage among leaf litter on the forest floor.',
        'Despite their large venom yield, they are generally reluctant to bite unless severely provoked or stepped on.'
    ],
    distribution: {
        description: 'Found in tropical sub-Saharan Africa, from Guinea and Sierra Leone east to South Sudan, and south to Angola and northern KwaZulu-Natal in South Africa.',
        mapUrl: 'https://placehold.co/400x200.png?text=Gaboon+Viper+Map&data-ai-hint=africa+map+rainforest',
    },
  },
  {
    id: 'king-cobra',
    commonName: 'King Cobra',
    scientificName: 'Ophiophagus hannah',
    category: 'Reptile',
    mediaUrls: ['https://placehold.co/500x400.png?text=King+Cobra&data-ai-hint=king+cobra+hood+snake'],
    description: 'The king cobra is the world\'s longest venomous snake, with a length up to 5.85 m (19.2 ft). It is a prominent symbol in the mythology and folk traditions of India, Sri Lanka, and Myanmar.',
    diet: 'Ophiophagous, meaning it primarily feeds on other snakes, including venomous ones like kraits and other cobras, as well as non-venomous snakes like pythons and rat snakes. Occasionally eats lizards.',
    habitat: 'Found in forests, mangrove swamps, and areas with dense undergrowth, often near streams and rivers, across South and Southeast Asia.',
    behavior: 'Diurnal and primarily terrestrial, though it can climb trees and swim well. Known for its intimidating hooding display when threatened, raising the anterior part of its body and spreading its neck flaps. Uniquely among snakes, female king cobras build nests for their eggs and guard them until they hatch.',
    size: 'Average length 3-4 m (9.8-13.1 ft), can reach up to 5.85 m (19.2 ft).',
    weight: 'Average 6 kg (13 lb), large specimens can weigh up to 12 kg (26 lb).',
    lifespan: 'Around 20 years in the wild.',
    population: 'Declining due to habitat destruction and persecution.',
    conservationStatus: 'Vulnerable',
    threats: ['Deforestation for agriculture and logging, persecution by humans due to fear, and collection for the skin trade and traditional medicine.'],
    funFacts: [
        'The king cobra\'s scientific name, Ophiophagus, means "snake-eater."',
        'It can inject a large amount of venom in a single bite, enough to kill an elephant or 20 humans.',
        'They are the only snakes in the world that build nests for their eggs.'
    ],
    distribution: {
        description: 'Found across the Indian subcontinent, Southeast Asia, and the southern areas of East Asia where it is not common. Countries include India, Nepal, Bhutan, Bangladesh, Myanmar, Thailand, Cambodia, Laos, Vietnam, Malaysia, Singapore, Indonesia, and the Philippines.',
        mapUrl: 'https://placehold.co/400x200.png?text=King+Cobra+Distribution+Map&data-ai-hint=southeast+asia+map+india',
    },
  },
  {
    id: 'black-mamba',
    commonName: 'Black Mamba',
    scientificName: 'Dendroaspis polylepis',
    category: 'Reptile',
    mediaUrls: ['https://placehold.co/500x400.png?text=Black+Mamba&data-ai-hint=black+mamba+snake+africa+fast'],
    description: 'The black mamba is a species of highly venomous snake belonging to the family Elapidae. It is native to parts of sub-Saharan Africa. It is the fastest land snake, capable of moving at 11 km/h (6.8 mph) over short distances.',
    diet: 'Carnivorous, preying on small mammals (rodents, squirrels, hyraxes), birds, and lizards.',
    habitat: 'Savannas, woodlands, rocky outcrops, and sometimes riverine forests. Often found in termite mounds, hollow trees, or rock crevices.',
    behavior: 'Diurnal and primarily terrestrial, but also an agile climber. Known for its speed and nervous, aggressive disposition when threatened. It has a coffin-shaped head and a very dark mouth interior, which it displays when threatened.',
    size: 'Average 2-3 m (6.6-9.8 ft), can reach up to 4.3 m (14 ft).',
    weight: 'Average 1.6 kg (3.5 lb).',
    lifespan: 'Up to 11 years or more in the wild.',
    population: 'Not globally threatened, but may face local declines.',
    conservationStatus: 'Least Concern',
    threats: ['Habitat destruction.', 'Persecution by humans due to fear.'],
    funFacts: [
        'Despite its name, the black mamba is not black; its skin color is typically olive, brownish, gray, or khaki. The "black" refers to the inky black interior of its mouth.',
        'Its venom is highly neurotoxic and cardiotoxic, and a bite can be fatal within minutes without antivenom.',
        'It is one of the most feared snakes in Africa due to its speed, aggression when cornered, and potent venom.'
    ],
    distribution: {
        description: 'Found across a wide range in sub-Saharan Africa, from Eritrea and Ethiopia in the north, south to South Africa, and west to Namibia and Angola.',
        mapUrl: 'https://placehold.co/400x200.png?text=Black+Mamba+Distribution+Map&data-ai-hint=africa+map+sub+saharan',
    },
  },
   {
    id: 'gray-tree-frog',
    commonName: 'Gray Tree Frog',
    scientificName: 'Dryophytes versicolor / Dryophytes chrysoscelis',
    category: 'Amphibian',
    mediaUrls: ['https://placehold.co/500x400.png?text=Gray+Tree+Frog&data-ai-hint=gray+tree+frog+bark+camouflage'],
    description: 'Gray tree frogs are common in eastern North America. They are known for their excellent camouflage, often blending seamlessly with tree bark. There are two closely related species that are difficult to distinguish visually.',
    diet: 'Carnivorous, primarily feeding on insects and other small invertebrates.',
    habitat: 'Woodlands, forests, swamps, and suburban areas with trees and access to breeding ponds.',
    behavior: 'Arboreal and nocturnal. They are excellent climbers due to their large toe pads. Males have a loud, trilling mating call during spring and summer evenings.',
    size: '3.2 to 6 cm (1.25 to 2.4 inches).',
    weight: 'A few grams.',
    lifespan: 'Up to 7-9 years.',
    population: 'Generally common and widespread.',
    conservationStatus: 'Least Concern',
    threats: ['Habitat loss, pollution from pesticides.', 'Susceptible to chytrid fungus.'],
    funFacts: [
      'Gray tree frogs can change their color from gray to green or brown to better match their surroundings.',
      'They can tolerate freezing temperatures by producing glycerol in their blood, acting as an antifreeze.'
    ],
    distribution: {
      description: 'Eastern United States and southeastern Canada.',
      mapUrl: 'https://placehold.co/400x200.png?text=Gray+Tree+Frog+Distribution&data-ai-hint=north+america+map+eastern',
    },
  },
  {
    id: 'american-toad',
    commonName: 'American Toad',
    scientificName: 'Anaxyrus americanus',
    category: 'Amphibian',
    mediaUrls: ['https://placehold.co/500x400.png?text=American+Toad&data-ai-hint=american+toad+garden+ground'],
    description: 'The American toad is a common species of toad found throughout eastern North America. It has warty skin and prominent parotoid glands behind its eyes, which secrete a toxic substance to deter predators.',
    diet: 'Carnivorous, feeding on a wide variety of insects, spiders, worms, slugs, and other invertebrates.',
    habitat: 'Diverse habitats including forests, grasslands, gardens, agricultural fields, and suburban areas, often near sources of moisture.',
    behavior: 'Primarily nocturnal but can be active during the day, especially after rain. They burrow into loose soil or hide under logs and rocks during the day. Males have a long, musical trill for a mating call.',
    size: '5 to 9 cm (2 to 3.5 inches).',
    weight: 'Varies, typically 20-80 grams.',
    lifespan: 'Can live 5-10 years in the wild, potentially longer in captivity.',
    population: 'Abundant and widespread.',
    conservationStatus: 'Least Concern',
    threats: ['Habitat loss, road mortality, pollution (pesticides).', 'Chytrid fungus can affect populations.'],
    funFacts: [
      'One American toad can eat up to 1,000 insects each day.',
      'Despite folklore, handling toads does not cause warts in humans.',
      'Their skin contains bufotoxin, which can be irritating to mucous membranes and toxic if ingested by predators.'
    ],
    distribution: {
      description: 'Widespread across eastern North America, from southeastern Manitoba to James Bay in Canada, south to northern Georgia, Alabama, and west to eastern Texas and Oklahoma.',
      mapUrl: 'https://placehold.co/400x200.png?text=American+Toad+Distribution&data-ai-hint=north+america+map+eastern',
    },
  },
  {
    id: 'cane-toad',
    commonName: 'Cane Toad',
    scientificName: 'Rhinella marina',
    category: 'Amphibian',
    mediaUrls: ['https://placehold.co/500x400.png?text=Cane+Toad&data-ai-hint=cane+toad+large+invasive+ground'],
    description: 'The cane toad is a large, terrestrial true toad native to South and mainland Central America. It is a prolific breeder and an opportunistic feeder, and has been introduced to various islands throughout Oceania and the Caribbean, as well as northern Australia, often with devastating consequences for native wildlife due to its toxicity.',
    diet: 'Omnivorous and opportunistic. They eat a wide range of terrestrial invertebrates (insects, snails, worms) and small vertebrates (frogs, lizards, rodents), as well as carrion and pet food.',
    habitat: 'Highly adaptable, found in open grasslands, woodlands, agricultural areas, suburban gardens, and coastal dunes. Prefers areas with access to moisture.',
    behavior: 'Nocturnal. Ground-dwelling. Their large parotoid glands behind the eyes secrete a potent milky-white toxin (bufotoxin) that is poisonous to many animals if ingested. They are not agile and rely on their toxicity for defense.',
    size: 'Typically 10-15 cm (4-6 inches), but can grow much larger, with some individuals exceeding 20 cm (8 inches).',
    weight: 'Large individuals can weigh over 1 kg (2.2 lbs).',
    lifespan: '10-15 years in the wild, up to 35 years in captivity.',
    population: 'Extremely abundant and invasive in many introduced regions. Native populations are less studied but generally stable.',
    conservationStatus: 'Least Concern',
    threats: 'In their native range, natural predators. In introduced ranges, they are a major threat to native biodiversity through predation and poisoning of predators that attempt to eat them. Efforts to control their populations in invasive areas are ongoing.',
    funFacts: [
      'Cane toads were introduced to Australia in 1935 to control cane beetles in sugar cane fields, but they became a major pest themselves.',
      'Their toxin is potent enough to kill dogs, cats, and many native Australian predators.',
      'Female cane toads can lay tens of thousands of eggs at a time.'
    ],
    distribution: {
      description: 'Native to the Americas, from the Rio Grande Valley in Texas south to central Amazon and southeastern Peru. Widely introduced and invasive in Australia, many Pacific islands, and parts of the Caribbean.',
      mapUrl: 'https://placehold.co/400x200.png?text=Cane+Toad+Distribution&data-ai-hint=americas+australia+map+invasive',
    },
  },
  {
    id: 'fire-salamander',
    commonName: 'Fire Salamander',
    scientificName: 'Salamandra salamandra',
    category: 'Amphibian',
    mediaUrls: ['https://placehold.co/500x400.png?text=Fire+Salamander&data-ai-hint=fire+salamander+black+yellow+forest'],
    description: 'The fire salamander is a common species of salamander found in Europe. It is black with yellow spots or stripes; the pattern varies greatly. Some specimens can be nearly completely black while on others yellow is dominant.',
    diet: 'Carnivorous, feeding on various insects, spiders, earthworms, slugs, and occasionally small vertebrates like newts or young frogs.',
    habitat: 'Deciduous and mixed forests, typically in hilly areas, preferring moist environments near streams or ponds where they can reproduce.',
    behavior: 'Mostly nocturnal, hiding in cool, damp places during the day, such as under logs, rocks, or in burrows. They are terrestrial but return to water to lay their larvae (in most subspecies). Their bright coloration (aposematism) warns predators of their toxicity; they secrete a neurotoxin called samandarin from glands in their skin.',
    size: 'Typically 15-25 cm (6-10 inches) long, but can occasionally reach 30 cm.',
    weight: 'Around 40-100 grams.',
    lifespan: 'Can live for more than 20 years in the wild, and up to 50 years in captivity.',
    population: 'Generally common in suitable habitats, but populations can be threatened locally.',
    conservationStatus: 'Least Concern',
    threats: ['Habitat loss and fragmentation (deforestation, road construction).', 'Pollution of breeding waters.', 'The fungal disease *Batrachochytrium salamandrivorans* (Bsal) poses a significant threat to European salamander populations.', 'Collection for pet trade in some areas.'],
    funFacts: [
      'Ancient folklore associated fire salamanders with fire, believing they could live in flames or even extinguish them, likely because they would emerge from logs thrown onto fires.',
      'They can regenerate lost body parts, though not as extensively as some newts.',
      'Most subspecies are viviparous, meaning the female gives birth to live larvae, rather than laying eggs.'
    ],
    distribution: {
      description: 'Found across most of central, southern, and eastern Europe, as well as parts of North Africa and the Middle East.',
      mapUrl: 'https://placehold.co/400x200.png?text=Fire+Salamander+Distribution&data-ai-hint=europe+map+forest',
    },
  },
  {
    id: 'eastern-newt',
    commonName: 'Eastern Newt',
    scientificName: 'Notophthalmus viridescens',
    category: 'Amphibian',
    mediaUrls: ['https://placehold.co/500x400.png?text=Eastern+Newt&data-ai-hint=eastern+newt+red+eft+forest+pond'],
    description: 'The Eastern newt is a common newt of eastern North America. It frequents small lakes, ponds, and streams or nearby wet forests. It has a complex life cycle: aquatic larva, terrestrial juvenile (red eft), and aquatic adult.',
    diet: 'Carnivorous. Larvae eat small aquatic invertebrates. Red efts eat insects, spiders, mites, and snails found on the forest floor. Aquatic adults eat worms, insects, crustaceans, mollusks, and amphibian eggs and larvae.',
    habitat: 'Aquatic larvae and adults live in ponds, lakes, marshes, and slow-moving streams with aquatic vegetation. The terrestrial red eft stage lives in moist forests under logs, rocks, and leaf litter.',
    behavior: 'Aquatic adults are active during the day. Red efts are often seen wandering the forest floor after rain. Eastern newts produce toxins (tetrodotoxin) in their skin, making them unpalatable to many predators. The bright coloration of the red eft serves as a warning.',
    size: 'Adults 6.5-14 cm (2.5-5.5 inches) long.',
    weight: 'A few grams.',
    lifespan: 'Can live up to 12-15 years.',
    population: 'Common and widespread throughout its range.',
    conservationStatus: 'Least Concern',
    threats: ['Habitat loss and degradation (wetland drainage, deforestation).', 'Pollution from pesticides and herbicides.', 'Road mortality during migrations.', 'Collection for the pet trade, though less common now.'],
    funFacts: [
      'The terrestrial juvenile stage, known as the "red eft," is bright orange or reddish-brown and wanders on land for 2-7 years before returning to water to become an aquatic adult.',
      'Eastern newts have remarkable regenerative abilities, capable of regrowing limbs, tails, jaws, and even parts of their eyes and heart.',
      'Their skin toxins make them distasteful or poisonous to many predators.'
    ],
    distribution: {
      description: 'Found throughout eastern North America, from southern Canada south to Florida and west to Texas and the Great Lakes region.',
      mapUrl: 'https://placehold.co/400x200.png?text=Eastern+Newt+Distribution&data-ai-hint=north+america+map+eastern',
    },
  },
  {
    id: 'great-white-shark',
    commonName: 'Great White Shark',
    scientificName: 'Carcharodon carcharias',
    category: 'Fish',
    mediaUrls: ['https://placehold.co/500x400.png?text=Great+White+Shark&data-ai-hint=great+white+shark+ocean+predator'],
    description: 'The great white shark is a species of large lamniform shark which can be found in the coastal surface waters of all major oceans. It is notable for its size, with mature individuals growing up to 6.4 m (21 ft) in length.',
    diet: 'Carnivorous. Primarily feeds on marine mammals (seals, sea lions, dolphins), fish (including other sharks and rays), and seabirds. Younger sharks feed more on fish.',
    habitat: 'Coastal and offshore waters, typically in temperate and subtropical regions. They are epipelagic (living in the upper layer of the ocean) but can dive to considerable depths.',
    behavior: 'Apex predator. Known for its powerful predatory behavior, including breaching (leaping out of the water) when attacking prey. They are generally solitary but may gather in areas with abundant food. They have electroreceptors (ampullae of Lorenzini) to detect the electric fields of prey.',
    size: 'Average 4.3-5.5 m (14-18 ft), can reach over 6 m (20 ft).',
    weight: 'Average 680-1,100 kg (1,500-2,400 lb), large females can exceed 2,000 kg.',
    lifespan: 'Estimated to be 30-70 years.',
    population: 'Difficult to estimate accurately; populations are believed to be declining in many areas.',
    conservationStatus: 'Vulnerable',
    threats: ['Overfishing (targeted and bycatch).', 'Demand for fins, teeth, and jaws.', 'Negative public perception and persecution.', 'Pollution and habitat degradation.'],
    funFacts: [
      'Great white sharks have rows of serrated teeth that are continuously replaced throughout their lives.',
      'They can detect a single drop of blood in 100 liters (25 gallons) of water.',
      'They are warm-bodied (endothermic), allowing them to maintain a body temperature higher than the surrounding water.'
    ],
    distribution: {
      description: 'Found in most major oceans, primarily in temperate coastal waters, including off the coasts of the United States (California, Northeast), South Africa, Australia, New Zealand, Japan, and the Mediterranean.',
      mapUrl: 'https://placehold.co/400x200.png?text=Great+White+Shark+Map&data-ai-hint=world+ocean+map+coastal',
    },
  },
  {
    id: 'manta-ray',
    commonName: 'Manta Ray',
    scientificName: 'Mobula birostris / Mobula alfredi', // Genus Mobula, two main species
    category: 'Fish', // Cartilaginous fish
    mediaUrls: ['https://placehold.co/500x400.png?text=Manta+Ray&data-ai-hint=manta+ray+ocean+filter+feeding+wings'],
    description: 'Manta rays are large rays belonging to the genus Mobula (formerly Manta). The Manta genus includes the giant oceanic manta ray and the reef manta ray. They are characterized by their large triangular pectoral fins, horn-shaped cephalic fins and large, forward-facing mouths.',
    diet: 'Filter feeders. They primarily consume zooplankton, including krill, shrimp, and small fish, which they filter from the water using their gill rakers as they swim.',
    habitat: 'Found in tropical, subtropical, and temperate waters worldwide. Oceanic mantas are more pelagic, while reef mantas are often found near coastal reefs and atolls.',
    behavior: 'Graceful swimmers, often seen "flying" through the water with their large pectoral fins. They are social and intelligent animals, sometimes gathering in large groups for feeding or at cleaning stations (where smaller fish remove parasites). Known for breaching (leaping out of the water).',
    size: 'Giant oceanic manta rays can have a "wingspan" (disc width) of up to 7 m (23 ft) or more. Reef mantas are smaller, typically up to 5.5 m (18 ft).',
    weight: 'Giant oceanic manta rays can weigh up to 2,000 kg (4,400 lb).',
    lifespan: 'Estimated to be 20-30 years, possibly longer.',
    population: 'Populations are declining in many areas due to targeted fishing and bycatch.',
    conservationStatus: 'Endangered', // Giant Manta Ray (Mobula birostris) is Endangered. Reef Manta Ray (Mobula alfredi) is Vulnerable.
    threats: ['Targeted fishing for their gill rakers, which are used in traditional Chinese medicine.', 'Bycatch in other fisheries.', 'Entanglement in fishing nets and lines.', 'Habitat degradation of coral reefs and coastal areas.', 'Pollution and plastic ingestion.', 'Disturbance from unregulated tourism.'],
    funFacts: [
      'Manta rays have the largest brain-to-body size ratio of any fish.',
      'They are ovoviviparous, meaning eggs hatch inside the mother\'s body, and she gives birth to live young.',
      'Individual manta rays can be identified by the unique spot patterns on their ventral (underside) surface.'
    ],
    distribution: {
      description: 'Found in tropical, subtropical, and temperate oceans worldwide. Key aggregation sites include areas like the Maldives, Indonesia, Hawaii, Mexico, Ecuador (Galápagos), and Mozambique.',
      mapUrl: 'https://placehold.co/400x200.png?text=Manta+Ray+Distribution&data-ai-hint=world+ocean+map+tropical',
    },
  },
  {
    id: 'red-ant',
    scientificName: 'Solenopsis spp.',
    commonName: 'Red Ant (Fire Ant)',
    category: 'Insect',
    mediaUrls: ['https://placehold.co/500x400.png?text=Red+Ant&data-ai-hint=red+ant+colony+aggressive'],
    description: 'Red ants, often referring to fire ants of the Solenopsis genus, are known for their aggressive behavior and painful stings. They build mounds and live in large colonies.',
    diet: 'Omnivorous, feeding on insects, seeds, sweets, and carrion.',
    habitat: 'Open areas, lawns, fields, forests. Adaptable to various environments.',
    behavior: 'Highly social, forming large colonies with complex organization. Known for aggressive defense of their nests and painful stings.',
    size: 'Workers 2-6 mm.',
    weight: 'Very light.',
    lifespan: 'Workers live a few months; queens can live for several years.',
    population: 'Abundant, can be invasive in some regions.',
    conservationStatus: 'Not Evaluated', // Typically not assessed as a pest/common species
    threats: ['Considered pests in many areas; subject to control measures.'],
    funFacts: ['Fire ants can form living rafts to survive floods.', 'Their sting injects venom containing alkaloids.'],
    distribution: {
      description: 'Native to South America, but many species have spread globally and become invasive.',
      mapUrl: 'https://placehold.co/400x200.png?text=Red+Ant+Distribution&data-ai-hint=world+map+invasive+species',
    },
  },
  {
    id: 'carpenter-ant',
    scientificName: 'Camponotus spp.',
    commonName: 'Carpenter Ant',
    category: 'Insect',
    mediaUrls: ['https://placehold.co/500x400.png?text=Carpenter+Ant&data-ai-hint=carpenter+ant+wood+nest'],
    description: 'Carpenter ants are large ants indigenous to many forested parts of the world. They build nests by excavating galleries in wood, but unlike termites, they do not eat wood.',
    diet: 'Omnivorous, feeding on insects, honeydew (sweet secretions from aphids), plant sap, and human food scraps.',
    habitat: 'Forests, woodlands, and human structures where they can find moist or decaying wood for nesting.',
    behavior: 'Social insects living in colonies. They excavate galleries in wood for nesting, preferring damp or decaying wood. They are active foragers, often at night.',
    size: 'Workers vary greatly, 0.6 to 2.5 cm (0.25 to 1 inch).',
    weight: 'Very light.',
    lifespan: 'Workers live for a few months to a year; queens can live for many years.',
    population: 'Common in suitable habitats.',
    conservationStatus: 'Not Evaluated',
    threats: ['Can be considered pests when nesting in human structures.'],
    funFacts: ['Carpenter ants do not eat wood; they excavate it to create nests.', 'They are important decomposers in forest ecosystems.'],
    distribution: {
      description: 'Found worldwide, particularly in forested regions.',
      mapUrl: 'https://placehold.co/400x200.png?text=Carpenter+Ant+Distribution&data-ai-hint=world+map+forest+insect',
    },
  },
  {
    id: 'honeybee', 
    scientificName: 'Apis mellifera',
    commonName: 'Honeybee',
    category: 'Insect',
    mediaUrls: ['https://placehold.co/500x400.png?text=Honeybee&data-ai-hint=honeybee+flower+pollination'],
    description: 'Honeybees are social flying insects known for their construction of perennial colonial nests from wax, the large size of their colonies, and surplus production and storage of honey.',
    diet: 'Nectar and pollen from flowers.',
    habitat: 'Diverse, wherever flowering plants are present. Wild colonies nest in cavities; domesticated colonies in hives.',
    behavior: 'Highly social, complex colony structure with queen, workers, and drones. Communicate through waggle dance.',
    size: 'Workers 10-15 mm.',
    weight: 'Approx. 0.1 g.',
    lifespan: 'Workers a few weeks to months; queen several years.',
    population: 'Widespread (managed and wild).',
    conservationStatus: 'Not Evaluated', 
    threats: ['Colony Collapse Disorder, Varroa mites, pesticides, habitat loss.'],
    funFacts: ['A single bee may visit 50-100 flowers in one trip.', 'Bees are vital for pollinating many food crops.'],
    distribution: {
      description: 'Native to Europe, Africa, Middle East; introduced worldwide.',
      mapUrl: 'https://placehold.co/400x200.png?text=Honeybee+Distribution&data-ai-hint=world+map+global+insect',
    },
  },
   {
    id: 'mosquito', 
    scientificName: 'Culicidae family',
    commonName: 'Mosquito',
    category: 'Insect',
    mediaUrls: ['https://placehold.co/500x400.png?text=Mosquito&data-ai-hint=mosquito+biting+disease+vector'],
    description: 'Mosquitoes are small, midge-like flies constituting the family Culicidae. Females of most species are ectoparasites, whose tube-like mouthparts (proboscis) pierce the hosts\' skin to consume blood.',
    diet: 'Females feed on blood (for egg production); males and females feed on nectar and plant juices.',
    habitat: 'Found worldwide, especially near stagnant water sources where larvae develop.',
    behavior: 'Females locate hosts by detecting carbon dioxide, body odors, and heat. Known vectors for diseases like malaria, dengue, Zika.',
    size: 'Typically 3-6 mm.',
    weight: 'Very light, a few milligrams.',
    lifespan: 'Varies, typically a few weeks to a couple of months.',
    population: 'Extremely abundant globally.',
    conservationStatus: 'Not Evaluated',
    threats: ['Considered major pests and disease vectors; subject to extensive control measures.'],
    funFacts: ['Only female mosquitoes bite.', 'Mosquito larvae are aquatic and breathe through siphons.'],
    distribution: {
      description: 'Found on every continent except Antarctica.',
      mapUrl: 'https://placehold.co/400x200.png?text=Mosquito+Distribution&data-ai-hint=world+map+global+insect',
    },
  },
  {
    id: 'ladybug', 
    scientificName: 'Coccinellidae family',
    commonName: 'Ladybug (Ladybird)',
    category: 'Insect',
    mediaUrls: ['https://placehold.co/500x400.png?text=Ladybug&data-ai-hint=ladybug+leaf+aphid+pest+control'],
    description: 'Ladybugs, or ladybirds, are a family of small beetles, easily recognizable by their colorful, spotted elytra. Many species are beneficial insects, preying on agricultural pests like aphids.',
    diet: 'Primarily carnivorous, feeding on aphids, scale insects, mites, and other small pests. Some species also eat pollen or mildew.',
    habitat: 'Gardens, fields, forests, meadows – wherever their prey is found.',
    behavior: 'Active foragers. Many species exhibit aposematic (warning) coloration. They can secrete a distasteful fluid from their leg joints when threatened.',
    size: '0.8 to 18 mm, typically 5-8 mm.',
    weight: 'Very light.',
    lifespan: 'Often around one year, including larval and pupal stages.',
    population: 'Generally common; some species are used in biological pest control.',
    conservationStatus: 'Not Evaluated', 
    threats: ['Pesticide use can harm ladybug populations.', 'Habitat loss for some specialized species.'],
    funFacts: ['A single ladybug can eat thousands of aphids in its lifetime.', 'The spots on a ladybug are not an indication of its age.'],
    distribution: {
      description: 'Found worldwide in diverse habitats.',
      mapUrl: 'https://placehold.co/400x200.png?text=Ladybug+Distribution&data-ai-hint=world+map+global+insect',
    },
  },
  {
    id: 'goliath-birdeater',
    commonName: 'Goliath Birdeater',
    scientificName: 'Theraphosa blondi',
    category: 'Arachnid',
    mediaUrls: ['https://placehold.co/500x400.png?text=Goliath+Birdeater&data-ai-hint=goliath+tarantula+spider'],
    description: 'One of the largest tarantulas in the world, found in South American rainforests.',
    diet: 'Insects, small rodents, frogs, lizards.',
    habitat: 'Rainforest floor, burrows.',
    behavior: 'Nocturnal ambush predator. Can flick urticating hairs for defense.',
    size: 'Leg span up to 30 cm (12 inches).',
    weight: 'Up to 170g.',
    lifespan: 'Females 15-25 years, males 3-6 years.',
    population: 'Unknown, but threatened by habitat loss and pet trade.',
    conservationStatus: 'Not Evaluated',
    threats: ['Habitat destruction, collection for pet trade.'],
    funFacts: ['Despite its name, rarely eats birds.', 'Can make a hissing sound by rubbing bristles on its legs.'],
    distribution: {
      description: 'Northern South America: Suriname, Guyana, French Guiana, Brazil, Venezuela.',
      mapUrl: 'https://placehold.co/400x200.png?text=Goliath+Birdeater+Distribution&data-ai-hint=south+america+map',
    },
  },
  {
    id: 'pinktoe-tarantula',
    commonName: 'Pinktoe Tarantula',
    scientificName: 'Avicularia avicularia',
    category: 'Arachnid',
    mediaUrls: ['https://placehold.co/500x400.png?text=Pinktoe+Tarantula&data-ai-hint=pinktoe+tarantula+arboreal+spider'],
    description: 'An arboreal tarantula species known for its fuzzy appearance and pink-tipped legs.',
    diet: 'Insects like crickets, moths, flies.',
    habitat: 'Tropical rainforests of South America and the Caribbean, lives in trees.',
    behavior: 'Docile, fast-moving when startled. Builds silken tube webs in trees.',
    size: 'Leg span 10-13 cm (4-5 inches).',
    weight: 'Relatively light.',
    lifespan: 'Females 10-12 years, males 2-3 years.',
    population: 'Generally common in its range.',
    conservationStatus: 'Not Evaluated',
    threats: ['Habitat loss, pet trade (though often captive-bred).'],
    funFacts: ['Can jump short distances.', 'Often a popular choice for tarantula hobbyists due to its calmer nature.'],
    distribution: {
      description: 'Brazil, Guyana, French Guiana, Suriname, Trinidad and Tobago, Venezuela.',
      mapUrl: 'https://placehold.co/400x200.png?text=Pinktoe+Tarantula+Distribution&data-ai-hint=south+america+caribbean+map',
    },
  },
  {
    id: 'rabid-wolf-spider',
    commonName: 'Rabid Wolf Spider',
    scientificName: 'Rabidosa rabida',
    category: 'Arachnid',
    mediaUrls: ['https://placehold.co/500x400.png?text=Rabid+Wolf+Spider&data-ai-hint=wolf+spider+ground+hunting'],
    description: 'A common species of wolf spider in North America, recognizable by its striped pattern. Despite the name, they do not carry rabies.',
    diet: 'Insects and other small spiders.',
    habitat: 'Fields, forests, grasslands, gardens.',
    behavior: 'Active hunter, chases down prey rather than building webs. Females carry their egg sacs and later their spiderlings on their backs.',
    size: 'Body length up to 2.5 cm (1 inch), leg span larger.',
    weight: 'Very light.',
    lifespan: 'About one year.',
    population: 'Common and widespread.',
    conservationStatus: 'Not Evaluated',
    threats: ['Pesticides, habitat loss.'],
    funFacts: ['The name "rabid" likely comes from its erratic, fast movements, not from carrying rabies.', 'Excellent eyesight for hunting.'],
    distribution: {
      description: 'Found throughout much of North America, especially the eastern and central United States.',
      mapUrl: 'https://placehold.co/400x200.png?text=Rabid+Wolf+Spider+Distribution&data-ai-hint=north+america+map+insect',
    },
  },
  {
    id: 'emperor-scorpion',
    commonName: 'Emperor Scorpion',
    scientificName: 'Pandinus imperator',
    category: 'Arachnid',
    mediaUrls: ['https://placehold.co/500x400.png?text=Emperor+Scorpion&data-ai-hint=emperor+scorpion+large+forest'],
    description: 'One of the largest scorpions in the world, native to West African rainforests. Known for its glossy black appearance and large pincers.',
    diet: 'Insects, other arachnids, small lizards, and rodents.',
    habitat: 'Tropical rainforests and savannas, often burrows under logs, rocks, or in termite mounds.',
    behavior: 'Nocturnal. Relatively docile for a scorpion and uses its large pincers more readily than its stinger, which has relatively mild venom.',
    size: 'Up to 20 cm (8 inches) in length.',
    weight: 'Around 30 grams.',
    lifespan: '6-8 years.',
    population: 'Common in its range, but collection for pet trade can impact local populations.',
    conservationStatus: 'Not Evaluated', // CITES Appendix II
    threats: ['Habitat destruction, collection for the pet trade.'],
    funFacts: ['Glows blue-green under ultraviolet light.', 'Females give birth to live young and carry them on their backs.'],
    distribution: {
      description: 'West Africa: Benin, Burkina Faso, Ivory Coast, Gambia, Ghana, Guinea, Guinea-Bissau, Liberia, Mali, Nigeria, Senegal, Sierra Leone, Togo.',
      mapUrl: 'https://placehold.co/400x200.png?text=Emperor+Scorpion+Distribution&data-ai-hint=west+africa+map',
    },
  },
  {
    id: 'common-octopus',
    commonName: 'Common Octopus',
    scientificName: 'Octopus vulgaris',
    category: 'Mollusk',
    mediaUrls: ['https://placehold.co/500x400.png?text=Common+Octopus&data-ai-hint=common+octopus+coral+camouflage'],
    description: 'The common octopus is a mollusc belonging to the class Cephalopoda. Octopus vulgaris is the most studied of all octopus species.',
    diet: 'Carnivorous, preying on crabs, crayfish, and other molluscs such as whelks and clams.',
    habitat: 'Coral reefs, rocky bottoms, and seagrass beds in coastal waters.',
    behavior: 'Highly intelligent, capable of learning and problem-solving. Masters of camouflage, able to change color and texture. Uses ink for defense.',
    size: 'Mantle up to 25 cm (9.8 in), arms up to 1 m (3.3 ft).',
    weight: '3–10 kg (6.6–22.0 lb).',
    lifespan: '12–18 months.',
    population: 'Abundant in many areas, supports commercial fisheries.',
    conservationStatus: 'Not Evaluated',
    threats: ['Overfishing, habitat degradation, pollution.'],
    funFacts: ['Has three hearts and blue, copper-based blood.', 'Can squeeze through tiny openings.'],
    distribution: {
      description: 'Cosmopolitan distribution in tropical, subtropical, and temperate waters worldwide.',
      mapUrl: 'https://placehold.co/400x200.png?text=Common+Octopus+Distribution&data-ai-hint=world+ocean+map+tropical',
    },
  },
  {
    id: 'murex-snail',
    commonName: 'Murex Snail (Generic)',
    scientificName: 'Muricidae family',
    category: 'Mollusk',
    mediaUrls: ['https://placehold.co/500x400.png?text=Murex+Snail&data-ai-hint=murex+snail+spiny+shell+tidepool'],
    description: 'Murex snails belong to a large family of predatory sea snails known for their often elaborate and spiny shells. Some species were historically used to produce Tyrian purple dye.',
    diet: 'Carnivorous, typically preying on other mollusks by drilling through their shells.',
    habitat: 'Found in various marine environments, from shallow intertidal zones to deep waters, often on rocky or sandy substrates.',
    behavior: 'Active predators. Many have a strong operculum (trapdoor) to seal their shell opening.',
    size: 'Varies greatly by species, from small to very large.',
    weight: 'Varies.',
    lifespan: 'Varies by species, some can live for many years.',
    population: 'Many species are common, though some are collected for their shells.',
    conservationStatus: 'Not Evaluated', // Varies by specific species
    threats: ['Over-collection for shells, habitat degradation.'],
    funFacts: ['The ancient Tyrian purple dye was extracted from certain Murex species.', 'Shells often have intricate spines and frills for defense and stability.'],
    distribution: {
      description: 'Found in oceans worldwide, particularly in tropical and temperate waters.',
      mapUrl: 'https://placehold.co/400x200.png?text=Murex+Snail+Distribution&data-ai-hint=world+ocean+map+global',
    },
  },
  {
    id: 'hard-clam',
    commonName: 'Hard Clam (Quahog)',
    scientificName: 'Mercenaria mercenaria',
    category: 'Mollusk',
    mediaUrls: ['https://placehold.co/500x400.png?text=Hard+Clam&data-ai-hint=hard+clam+quahog+sand+shell'],
    description: 'The hard clam, also known as the quahog, is an edible marine bivalve mollusc that is native to the eastern shores of North America and Central America from Prince Edward Island to the Yucatán Peninsula.',
    diet: 'Filter feeder, consuming phytoplankton and other microscopic organic matter from the water.',
    habitat: 'Burrows in sand or mud in intertidal and subtidal zones of bays and estuaries.',
    behavior: 'Sessile filter feeder. Uses siphons to draw in and expel water for feeding and respiration.',
    size: 'Typically 7.5 to 12.5 cm (3 to 5 inches) in shell length.',
    weight: 'Varies.',
    lifespan: 'Can live for several decades, with some specimens recorded over 40 years old.',
    population: 'Supports important commercial and recreational fisheries, generally stable but subject to local conditions and harvesting pressures.',
    conservationStatus: 'Not Evaluated',
    threats: ['Overharvesting, habitat degradation (pollution, dredging), and diseases like QPX.'],
    funFacts: ['The growth rings on their shells can be used to estimate their age.', 'The term "quahog" comes from the Narragansett Native American word "poquauhock."'],
    distribution: {
      description: 'Native to the eastern coast of North America, from Canada to the Gulf of Mexico. Also introduced to other areas like the Pacific coast of North America and Europe.',
      mapUrl: 'https://placehold.co/400x200.png?text=Hard+Clam+Distribution&data-ai-hint=north+america+atlantic+coast+map',
    },
  }
];


/**
 * Retrieves detailed information about a specific animal based on its ID.
 *
 * @param animalId The unique identifier for the animal (e.g., "lion").
 * @returns A promise that resolves to an AnimalInfo object or null if not found.
 */
export async function getAnimalInfo(animalId: string): Promise<AnimalInfo | null> {
  console.log(`Fetching info for animalId: ${animalId}`);
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay

  const normalizedId = animalId.toLowerCase();
  const animal = mockAnimalDatabase.find(a => a.id.toLowerCase() === normalizedId);

  if (animal) {
    return animal;
  } else {
    console.error(`Animal with ID "${animalId}" not found in mock database.`);
    return null; // Return null instead of throwing an error for client-side handling
  }
}

/**
 * Retrieves a list of all available animals.
 *
 * @returns A promise that resolves to an array of AnimalInfo objects.
 */
export async function getAllAnimals(): Promise<AnimalInfo[]> {
  console.log('Fetching all animals');
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate network delay
  return [...mockAnimalDatabase];
}

    
