
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { getAllAnimals, type AnimalInfo, type AnimalCategory, type ConservationStatus } from '@/services/animal-info';
import AnimalSummaryCard from '@/components/animal/animal-summary-card';
import { ArrowLeft, ListFilter, PawPrint, Bird, BugIcon as Bug, FishIcon as Fish, Shell, Waves, HelpCircle, Leaf, Skull, Squirrel /* SpiderIcon removed, using Bug for Arachnid for now */ } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import defaultMammalData from '@/data/default-mammal-data.json';

// Inline SVG for Spider as it's not in lucide-react - moved to category-view as it's used there
// const SpiderIcon = (props: React.SVGProps<SVGSVGElement>) => ( ... );

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

interface AnimalTypeDetails {
  name: AnimalCategory;
  formatted: string;
  icon: React.ElementType;
  introTitle: string;
  introDescription: string;
  examples: string;
  habitats: string;
  funFact: string;
  dataAiHint?: string; // For OG image hint
}

// Enhanced typeSlugMap with more details and dataAiHints
const typeSlugMap: Record<string, AnimalTypeDetails> = {
  'mammal': {
    name: 'Mammal',
    formatted: 'Mammals',
    icon: PawPrint,
    introTitle: '🦁 Mammals',
    introDescription: 'Warm-blooded vertebrates characterized by the presence of mammary glands which in females produce milk for feeding their young, a neocortex (a region of the brain), fur or hair, and three middle ear bones.',
    examples: 'Lions, Elephants, Whales, Bats, Humans, Tigers, Koalas, Snow Leopards',
    habitats: 'Forests, Grasslands, Deserts, Oceans, Mountains, Urban Areas',
    funFact: 'Bats are the only mammals capable of sustained flight, and blue whales are the largest animals on Earth.',
    dataAiHint: 'lion elephant whale bat group',
  },
  'bird': {
    name: 'Bird',
    formatted: 'Birds',
    icon: Bird,
    introTitle: '🐦 Birds',
    introDescription: 'A group of endothermic vertebrates, characterized by feathers, toothless beaked jaws, the laying of hard-shelled eggs, a high metabolic rate, a four-chambered heart, and a strong yet lightweight skeleton.',
    examples: 'Eagles, Parrots, Penguins, Sparrows, Ostriches, Hummingbirds',
    habitats: 'Skies, Forests, Wetlands, Mountains, Deserts, Oceans, Urban environments',
    funFact: 'The Bee Hummingbird is the smallest bird in the world, and some birds, like the Arctic Tern, migrate thousands of kilometers annually.',
    dataAiHint: 'eagle parrot penguin flying flock',
  },
  'reptile': {
    name: 'Reptile',
    formatted: 'Reptiles',
    icon: Skull, // Placeholder icon
    introTitle: '🐍 Reptiles',
    introDescription: 'Air-breathing, cold-blooded vertebrates that are characterized by laying shelled eggs (though some are viviparous), and having skin covered in scales or scutes.',
    examples: 'Snakes, Lizards, Turtles, Crocodiles, Alligators, Tuataras',
    habitats: 'Deserts, Forests, Swamps, Grasslands, Oceans, Rivers',
    funFact: 'Reptiles regulate their body temperature using external sources like the sun, and some turtles can live for over 100 years.',
    dataAiHint: 'snake lizard turtle crocodile scales',
  },
  'amphibian': {
    name: 'Amphibian',
    formatted: 'Amphibians',
    icon: Leaf, // Placeholder icon
    introTitle: '🐸 Amphibians',
    introDescription: 'Cold-blooded vertebrates that are distinguished by having an aquatic gill-breathing larval stage followed (typically) by a terrestrial lung-breathing adult stage. They have moist, permeable skin.',
    examples: 'Frogs, Salamanders, Toads, Newts, Caecilians',
    habitats: 'Wetlands, Forest Floors, Ponds, Rivers, Damp environments',
    funFact: 'Amphibians are sensitive indicators of environmental health due to their permeable skin, and many can breathe through their skin.',
    dataAiHint: 'frog salamander toad pond water',
  },
  'fish': {
    name: 'Fish',
    formatted: 'Fish',
    icon: Fish,
    introTitle: '🐠 Fish',
    introDescription: 'Aquatic, craniate, gill-bearing animals that lack limbs with digits. They form a sister group to the tunicates, together forming the olfactores.',
    examples: 'Salmon, Sharks, Clownfish, Eels, Tuna, Goldfish, Catfish',
    habitats: 'Oceans (all depths), Rivers, Lakes, Ponds, Estuaries',
    funFact: 'There are over 34,000 known species of fish, making them the most diverse group of vertebrates. Some fish can change gender.',
    dataAiHint: 'salmon shark clownfish school ocean',
  },
  'insect': {
    name: 'Insect',
    formatted: 'Insects',
    icon: Bug,
    introTitle: '🐜 Insects',
    introDescription: 'A class of hexapod invertebrates within the arthropod phylum. They have a chitinous exoskeleton, a three-part body (head, thorax, and abdomen), three pairs of jointed legs, compound eyes, and one pair of antennae.',
    examples: 'Butterflies, Ants, Bees, Beetles, Grasshoppers, Dragonflies, Mosquitoes',
    habitats: 'Nearly every terrestrial and freshwater habitat on Earth. Few are found in marine environments.',
    funFact: 'Insects are the most diverse group of animals on Earth, with over a million described species, representing more than half of all known living organisms.',
    dataAiHint: 'butterfly ant bee beetle swarm',
  },
  'arachnid': {
    name: 'Arachnid',
    formatted: 'Arachnids',
    icon: Bug, // Using Bug as placeholder for SpiderIcon
    introTitle: '🕷️ Arachnids',
    introDescription: 'A class of joint-legged invertebrate animals (arthropods), in the subphylum Chelicerata. All arachnids have eight legs, although the front pair of legs in some species has converted to a sensory function.',
    examples: 'Spiders, Scorpions, Ticks, Mites, Harvestmen (Daddy Longlegs)',
    habitats: 'Forests, Deserts, Caves, Grasslands, Human dwellings',
    funFact: 'Spider silk is incredibly strong for its weight, and some scorpions can glow under ultraviolet light.',
    dataAiHint: 'spider scorpion tick web desert',
  },
  'mollusk': {
    name: 'Mollusk',
    formatted: 'Mollusks',
    icon: Shell,
    introTitle: '🐚 Mollusks',
    introDescription: 'A large phylum of invertebrate animals, known for their soft bodies, which typically have a "head" and a "foot" region. Many mollusks also have a hard exoskeleton, like a shell.',
    examples: 'Octopuses, Snails, Clams, Squids, Oysters, Slugs, Cuttlefish',
    habitats: 'Oceans (from shallow waters to deep sea), Freshwater environments, Damp terrestrial habitats',
    funFact: 'Mollusks are the second-largest phylum of invertebrate animals after arthropods. The giant squid is one of the largest invertebrates.',
    dataAiHint: 'octopus snail clam squid shell ocean',
  },
  'marine-mammal': {
    name: 'Marine Mammal',
    formatted: 'Marine Mammals',
    icon: Waves,
    introTitle: '🐬 Marine Mammals',
    introDescription: 'Mammals that are adapted to life in marine environments. They breathe air but spend most oftheir lives in the water.',
    examples: 'Whales, Dolphins, Seals, Sea Lions, Walruses, Manatees, Sea Otters, Polar Bears (often considered marine mammals)',
    habitats: 'Oceans, Seas, Coastal Waters, Estuaries, some large river systems',
    funFact: 'Dolphins are known for their high intelligence and complex social structures. Blue whales are the largest animals to have ever lived on Earth.',
    dataAiHint: 'whale dolphin seal walrus ocean group',
  },
  'other-invertebrate': {
    name: 'Other Invertebrate',
    formatted: 'Other Invertebrates',
    icon: Squirrel, // Placeholder
    introTitle: '🐛 Other Invertebrates',
    introDescription: 'A vast and diverse group of animals without a vertebral column (backbone), not fitting into the more common large invertebrate groups like insects, arachnids, or mollusks.',
    examples: 'Worms (Earthworms, Flatworms, Roundworms), Sea Cucumbers, Starfish, Jellyfish, Corals, Sponges, Centipedes, Millipedes',
    habitats: 'Soil, Oceans, Freshwater, Coral Reefs, Leaf litter, Caves',
    funFact: 'Invertebrates make up about 97% of all animal species. Many play crucial roles in ecosystems, such as decomposition and pollination.',
    dataAiHint: 'worm starfish jellyfish coral sea',
  },
  'other': {
    name: 'Other',
    formatted: 'Other Animals',
    icon: HelpCircle,
    introTitle: '🌍 Other Animals',
    introDescription: 'This category includes animals that may not fit neatly into the primary classifications or represent unique or less commonly grouped types of life.',
    examples: 'Tardigrades (Water Bears), Rotifers, Various microscopic organisms, Protists (animal-like)',
    habitats: 'Varies widely: from mosses and soil to extreme environments like deep sea vents and hot springs.',
    funFact: 'Tardigrades are microscopic animals known for their incredible resilience and ability to survive extreme conditions, including radiation and the vacuum of space.',
    dataAiHint: 'microscope unknown species cell tardigrade',
  },
};


// Helper function to map default mammal data to AnimalInfo structure
const mapDefaultMammalDataToAnimalInfo = (mammal: any): AnimalInfo => {
  const slug = mammal.name.toLowerCase().replace(/\s+/g, '-');
  return {
    id: slug,
    commonName: mammal.name,
    scientificName: mammal.scientificName,
    category: mammal.type as AnimalCategory,
    mediaUrls: mammal.image ? [mammal.image] : [`https://placehold.co/300x200.png?text=${encodeURIComponent(mammal.name)}`],
    description: mammal.description,
    diet: mammal.diet,
    habitat: mammal.habitat,
    behavior: "Behavior details not available for this entry.",
    size: "Size details not available for this entry.",
    weight: "Weight details not available for this entry.",
    lifespan: mammal.lifespan,
    population: "Population details not available for this entry.",
    conservationStatus: mammal.conservationStatus as ConservationStatus,
    threats: [],
    funFacts: [],
    distribution: {
      description: "Distribution details not available for this entry.",
      mapUrl: `https://placehold.co/400x200.png?text=Map+of+${encodeURIComponent(mammal.name)}`,
    },
  };
};


export async function generateMetadata(
  { params }: { params: { typeSlug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const typeSlug = params.typeSlug.toLowerCase();
  const typeInfo = typeSlugMap[typeSlug];
  const typeName = typeInfo ? typeInfo.formatted : typeSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const pageTitle = `Explore ${typeName} | Wildpedia`;
  const pageDescription = typeInfo
    ? typeInfo.introDescription
    : `Discover various ${typeName.toLowerCase()} on Wildpedia. Learn about different species within this animal type.`;
  
  // Using a generic OG image for now, but dataAiHint is available in typeInfo for dynamic generation
  const ogImageUrl = `${SITE_URL}/og-animal-type.png`; // Create public/og-animal-type.png

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [typeName, 'animal type', 'wildlife classification', 'species', typeSlug],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${SITE_URL}/explore/type/${typeSlug}`,
      type: 'website',
      images: [{ url: ogImageUrl, alt: `Wildpedia - ${typeName}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImageUrl],
    },
  };
}

export default async function AnimalTypePage({ params }: { params: { typeSlug: string } }) {
  const typeSlug = params.typeSlug.toLowerCase();
  const typeInfo = typeSlugMap[typeSlug];

  let animals: AnimalInfo[] = [];
  let error: string | null = null;

  if (!typeInfo) {
    error = `Invalid animal type: "${typeSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}".`;
  } else {
    if (typeSlug === 'mammal') {
      animals = defaultMammalData.map(mapDefaultMammalDataToAnimalInfo);
    } else {
      try {
        const allAnimals = await getAllAnimals();
        animals = allAnimals.filter(animal => animal.category === typeInfo.name);
      } catch (e: any) {
        console.error("Error fetching animals for type:", e);
        error = "Could not load animal data at this time.";
      }
    }
  }

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Explore ${typeInfo?.formatted || typeSlug} on Wildpedia`,
    "description": `A collection of ${typeInfo?.formatted.toLowerCase() || typeSlug} found on Wildpedia. Featuring: ${typeInfo?.introDescription || ''}`,
    "url": `${SITE_URL}/explore/type/${typeSlug}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": animals.map((animal, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Thing", // Could be more specific if Animal type exists and is widely supported
          "name": animal.commonName,
          "description": animal.description.substring(0,100) + "...",
          "url": `${SITE_URL}/animal/${animal.id}`,
          "image": animal.mediaUrls[0] || `${SITE_URL}/placeholder-animal.png`
        }
      }))
    },
    "publisher": { "@type": "Organization", "name": "Wildpedia" }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <Link href="/explore/type" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
        <ArrowLeft className="h-4 w-4" /> Back to Types
      </Link>

      {typeInfo && (
        <Card className="mb-10 bg-card border border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary flex items-center gap-3">
              {typeInfo.icon && <typeInfo.icon className="h-8 w-8 text-accent" />}
              {typeInfo.introTitle}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-1">
              {typeInfo.introDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-foreground">
            <p><strong className="text-primary">Examples:</strong> {typeInfo.examples}</p>
            <p><strong className="text-primary">Typical Habitats:</strong> {typeInfo.habitats}</p>
            <p><strong className="text-primary">Fun Fact:</strong> {typeInfo.funFact}</p>
          </CardContent>
        </Card>
      )}

      {!typeInfo && !error && (
         <div className="mb-8 p-6 bg-card border border-border rounded-lg shadow">
            <div className="flex items-center gap-3 mb-2">
                <PawPrint className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold text-primary">
                 Explore {typeSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h1>
            </div>
            <p className="text-muted-foreground">
              Browse and learn about various species classified as {typeSlug.toLowerCase().replace(/-/g, ' ')}.
            </p>
         </div>
      )}

      {error ? (
        <div className="text-center py-16">
          <ListFilter size={48} className="mx-auto text-destructive mb-4" />
          <p className="text-xl text-destructive">{error}</p>
          <Link href="/explore/type" className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Choose a different animal type
          </Link>
        </div>
      ) : animals.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 perspective-1000">
          {animals.map((animal) => (
            <AnimalSummaryCard key={animal.id} animal={animal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <ListFilter size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">
            No animals found classified as "{typeInfo?.formatted || typeSlug}" in our current database.
          </p>
           <p className="text-sm text-muted-foreground mt-2">
            This could be because our database for this type is still growing or under construction.
          </p>
        </div>
      )}
    </div>
  );
}
