
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllAnimals, type AnimalInfo, type ConservationStatus } from '@/services/animal-info';
import AnimalSummaryCard from '@/components/animal/animal-summary-card';
import { ArrowLeft, ShieldAlert, ListFilter, Skull, AlertTriangle, LifeBuoy, Users, HeartPulse, Activity, Smile, Search, FileQuestion, BookOpen, HelpCircle, Clock } from 'lucide-react'; // Added Clock
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

// Helper to map slug to ConservationStatus and formatted name
const statusSlugMap: Record<string, { name: ConservationStatus; formatted: string, description: string, icon?: React.ElementType }> = {
  'extinct': { name: 'Extinct', formatted: 'Extinct', description: "No known individuals remaining.", icon: Skull },
  'extinct-in-the-wild': { name: 'Extinct in the Wild', formatted: 'Extinct in the Wild', description: "Known only to survive in cultivation, in captivity or as a naturalized population well outside the past range.", icon: LifeBuoy },
  'critically-endangered': { name: 'Critically Endangered', formatted: 'Critically Endangered', description: "Facing an extremely high risk of extinction in the wild.", icon: AlertTriangle },
  'endangered': { name: 'Endangered', formatted: 'Endangered', description: "Facing a very high risk of extinction in the wild.", icon: Users },
  'vulnerable': { name: 'Vulnerable', formatted: 'Vulnerable', description: "Facing a high risk of extinction in the wild.", icon: HeartPulse },
  'near-threatened': { name: 'Near Threatened', formatted: 'Near Threatened', description: "Likely to become endangered in the near future if threats are not addressed.", icon: Search },
  'least-concern': { name: 'Least Concern', formatted: 'Least Concern', description: "Lowest risk. Does not qualify for a more at-risk category.", icon: Smile },
  'data-deficient': { name: 'Data Deficient', formatted: 'Data Deficient', description: "Not enough data to make an assessment of its risk of extinction.", icon: FileQuestion },
  'not-evaluated': { name: 'Not Evaluated', formatted: 'Not Evaluated', description: "Has not yet been evaluated against the IUCN criteria.", icon: HelpCircle },
};

const famousExtinctAnimals = [
    {
        name: 'Dodo',
        scientificName: 'Raphus cucullatus',
        extinctionDate: 'c. 1662',
        region: 'Mauritius',
        cause: 'Hunting, habitat destruction, introduced species',
        imageUrl: 'https://placehold.co/300x180.png?text=Dodo',
        dataAiHint: 'dodo bird illustration historical'
    },
    {
        name: 'Passenger Pigeon',
        scientificName: 'Ectopistes migratorius',
        extinctionDate: '1914',
        region: 'North America',
        cause: 'Massive scale hunting, habitat loss',
        imageUrl: 'https://placehold.co/300x180.png?text=Passenger+Pigeon',
        dataAiHint: 'passenger pigeon illustration flock'
    },
    {
        name: 'Tasmanian Tiger (Thylacine)',
        scientificName: 'Thylacinus cynocephalus',
        extinctionDate: '1936 (last captive animal)',
        region: 'Tasmania, Australia',
        cause: 'Hunting bounty, habitat loss, disease',
        imageUrl: 'https://placehold.co/300x180.png?text=Tasmanian+Tiger',
        dataAiHint: 'thylacine tasmanian tiger historical photo'
    },
    {
        name: 'Steller\'s Sea Cow',
        scientificName: 'Hydrodamalis gigas',
        extinctionDate: 'c. 1768',
        region: 'Bering Sea',
        cause: 'Overhunting',
        imageUrl: 'https://placehold.co/300x180.png?text=Steller%27s+Sea+Cow',
        dataAiHint: 'stellers sea cow marine mammal skeleton'
    }
];

const famousExtinctInTheWildAnimals = [
    {
        name: 'Père David\'s Deer',
        scientificName: 'Elaphurus davidianus',
        statusNote: 'Survived only in captivity for centuries; reintroduction efforts have established some populations in reserves.',
        region: 'Native to China',
        imageUrl: 'https://placehold.co/300x180.png?text=Père+David%27s+Deer',
        dataAiHint: 'pere davids deer antlers mammal'
    },
    {
        name: 'Scimitar-horned Oryx',
        scientificName: 'Oryx dammah',
        statusNote: 'Declared Extinct in the Wild in 2000. Ambitious reintroduction programs are underway in North Africa.',
        region: 'North Africa (Sahel region)',
        imageUrl: 'https://placehold.co/300x180.png?text=Scimitar-horned+Oryx',
        dataAiHint: 'scimitar horned oryx desert mammal'
    },
    {
        name: 'Socorro Dove',
        scientificName: 'Zenaida graysoni',
        statusNote: 'Extinct in the wild since 1972 due to predation by feral cats. Survives in captivity with reintroduction efforts planned.',
        region: 'Socorro Island, Mexico',
        imageUrl: 'https://placehold.co/300x180.png?text=Socorro+Dove',
        dataAiHint: 'socorro dove bird captive'
    },
];

const famousCriticallyEndangeredAnimals = [
    {
        name: 'Amur Leopard',
        scientificName: 'Panthera pardus orientalis',
        region: 'Russian Far East, Northern China',
        population: 'Estimated around 100 individuals',
        threats: 'Poaching, habitat loss, prey scarcity',
        imageUrl: 'https://placehold.co/300x180.png?text=Amur+Leopard',
        dataAiHint: 'amur leopard snow forest winter'
    },
    {
        name: 'Vaquita',
        scientificName: 'Phocoena sinus',
        region: 'Northern Gulf of California, Mexico',
        population: 'Estimated fewer than 10 individuals',
        threats: 'Bycatch in illegal fishing nets for Totoaba',
        imageUrl: 'https://placehold.co/300x180.png?text=Vaquita',
        dataAiHint: 'vaquita porpoise ocean mexico small'
    },
    {
        name: 'Sumatran Orangutan',
        scientificName: 'Pongo abelii',
        region: 'Sumatra, Indonesia',
        population: 'Estimated around 13,800 individuals',
        threats: 'Habitat loss (palm oil, logging), poaching',
        imageUrl: 'https://placehold.co/300x180.png?text=Sumatran+Orangutan',
        dataAiHint: 'sumatran orangutan rainforest tree indonesia'
    },
    {
        name: 'Black Rhino',
        scientificName: 'Diceros bicornis',
        region: 'Eastern and Southern Africa',
        population: 'Increasing, but still approx. 6,000',
        threats: 'Poaching for horns',
        imageUrl: 'https://placehold.co/300x180.png?text=Black+Rhino',
        dataAiHint: 'black rhino africa savanna horn'
    }
];

const famousEndangeredAnimals = [
    {
        name: 'Tiger',
        scientificName: 'Panthera tigris',
        region: 'Asia (fragmented populations)',
        population: 'Estimated around 3,900-4,500 in the wild',
        threats: 'Poaching, habitat loss, human-wildlife conflict',
        imageUrl: 'https://placehold.co/300x180.png?text=Tiger',
        dataAiHint: 'tiger jungle stripes endangered'
    },
    {
        name: 'Giant Panda',
        scientificName: 'Ailuropoda melanoleuca',
        region: 'South Central China',
        population: 'Estimated around 1,864 in the wild',
        threats: 'Habitat loss and fragmentation, low reproductive rate',
        imageUrl: 'https://placehold.co/300x180.png?text=Giant+Panda',
        dataAiHint: 'giant panda bamboo eating china'
    },
    {
        name: 'Blue Whale',
        scientificName: 'Balaenoptera musculus',
        region: 'All oceans (migratory)',
        population: 'Estimated 10,000-25,000 individuals',
        threats: 'Historical whaling, ship strikes, entanglement, climate change',
        imageUrl: 'https://placehold.co/300x180.png?text=Blue+Whale',
        dataAiHint: 'blue whale ocean marine mammal'
    },
    {
        name: 'Asian Elephant',
        scientificName: 'Elephas maximus',
        region: 'South and Southeast Asia',
        population: 'Estimated 40,000-50,000 individuals',
        threats: 'Habitat loss, poaching for ivory, human-elephant conflict',
        imageUrl: 'https://placehold.co/300x180.png?text=Asian+Elephant',
        dataAiHint: 'asian elephant forest india mammal'
    }
];

const famousVulnerableAnimals = [
    {
        name: 'Cheetah',
        scientificName: 'Acinonyx jubatus',
        region: 'Africa and parts of the Middle East',
        population: 'Estimated around 7,100 individuals',
        threats: 'Habitat loss, human-wildlife conflict, illegal trade',
        imageUrl: 'https://placehold.co/300x180.png?text=Cheetah',
        dataAiHint: 'cheetah running savanna africa'
    },
    {
        name: 'Great White Shark',
        scientificName: 'Carcharodon carcharias',
        region: 'Coastal waters in all major oceans',
        population: 'Difficult to estimate, but declining',
        threats: 'Overfishing (bycatch, targeted), pollution, habitat degradation',
        imageUrl: 'https://placehold.co/300x180.png?text=Great+White+Shark',
        dataAiHint: 'great white shark ocean predator underwater'
    },
    {
        name: 'African Savanna Elephant', // Loxodonta africana specifically, as L. cyclotis (Forest Elephant) is Critically Endangered
        scientificName: 'Loxodonta africana',
        region: 'Sub-Saharan Africa',
        population: 'Around 350,000 (IUCN assessment for savanna elephants specifically)',
        threats: 'Poaching for ivory, habitat loss, human-elephant conflict',
        imageUrl: 'https://placehold.co/300x180.png?text=African+Elephant',
        dataAiHint: 'african savanna elephant herd'
    },
    {
        name: 'Snow Leopard',
        scientificName: 'Panthera uncia',
        region: 'Mountain ranges of Central and South Asia',
        population: 'Estimated 4,000 - 6,500 individuals',
        threats: 'Poaching, habitat loss, retaliatory killings',
        imageUrl: 'https://placehold.co/300x180.png?text=Snow+Leopard',
        dataAiHint: 'snow leopard mountains asia winter'
    }
];

const famousNearThreatenedAnimals = [
    {
        name: 'Jaguar',
        scientificName: 'Panthera onca',
        region: 'Americas (from Southwestern US to Northern Argentina)',
        population: 'Declining, difficult to estimate accurately, but likely in the tens of thousands.',
        threats: 'Habitat loss and fragmentation (deforestation for agriculture, ranching), human-wildlife conflict, poaching for skins and body parts.',
        imageUrl: 'https://placehold.co/300x180.png?text=Jaguar',
        dataAiHint: 'jaguar rainforest americas big cat'
    },
    {
        name: 'Emperor Penguin',
        scientificName: 'Aptenodytes forsteri',
        region: 'Antarctica',
        population: 'Estimated 595,000 breeding pairs',
        threats: 'Climate change leading to sea ice loss (critical for breeding and feeding), ocean warming affecting prey availability.',
        imageUrl: 'https://placehold.co/300x180.png?text=Emperor+Penguin',
        dataAiHint: 'emperor penguin antarctica ice snow'
    },
     {
        name: 'Maned Wolf',
        scientificName: 'Chrysocyon brachyurus',
        region: 'South America (grasslands and scrub forests)',
        population: 'Estimated around 17,000 mature individuals',
        threats: 'Habitat loss (conversion of grasslands to agriculture), roadkills, persecution by humans, disease.',
        imageUrl: 'https://placehold.co/300x180.png?text=Maned+Wolf',
        dataAiHint: 'maned wolf south america grassland tall legs'
    }
];

const famousLeastConcernAnimals = [
    {
        name: 'American Robin',
        scientificName: 'Turdus migratorius',
        region: 'North America',
        population: 'Estimated at over 370 million individuals',
        notes: 'Widespread and abundant, common in urban and suburban areas.',
        imageUrl: 'https://placehold.co/300x180.png?text=American+Robin',
        dataAiHint: 'american robin bird garden lawn'
    },
    {
        name: 'Common House Mouse',
        scientificName: 'Mus musculus',
        region: 'Worldwide (commensal with humans)',
        population: 'Extremely abundant globally',
        notes: 'Thrives in human-modified environments.',
        imageUrl: 'https://placehold.co/300x180.png?text=House+Mouse',
        dataAiHint: 'house mouse rodent small pest'
    },
    {
        name: 'Red Fox',
        scientificName: 'Vulpes vulpes',
        region: 'Widespread across Northern Hemisphere, Australia',
        population: 'Abundant and adaptable across its range',
        notes: 'Highly adaptable predator found in diverse habitats, including urban areas.',
        imageUrl: 'https://placehold.co/300x180.png?text=Red+Fox',
        dataAiHint: 'red fox forest field mammal'
    },
    {
        name: 'Feral Pigeon (Rock Dove)',
        scientificName: 'Columba livia',
        region: 'Worldwide in cities and towns',
        population: 'Extremely abundant globally',
        notes: 'Originally native to coastal cliffs, now thrives in urban environments.',
        imageUrl: 'https://placehold.co/300x180.png?text=Pigeon',
        dataAiHint: 'pigeon city bird urban'
    }
];


export async function generateMetadata(
  { params }: { params: { statusSlug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const statusSlug = params.statusSlug.toLowerCase();
  const statusInfo = statusSlugMap[statusSlug];
  
  let pageTitle = `Animals Classified as "${statusInfo ? statusInfo.formatted : statusSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}" | Wildpedia`;
  let pageDescription = `Explore animals on Wildpedia that are classified under the conservation status: ${statusInfo ? statusInfo.formatted : statusSlug}. ${statusInfo ? statusInfo.description : ''}`;
  let keywords = [statusInfo ? statusInfo.formatted : statusSlug, 'conservation status', 'wildlife', 'animal species', statusSlug];
  let ogImage = `${SITE_URL}/og-conservation-status.png`; 

  if (statusSlug === 'extinct') {
    pageTitle = 'Extinct Species - Remembering Lost Wildlife | Wildpedia';
    pageDescription = 'Learn about species that have gone extinct, the causes, and the importance of conservation to prevent further losses. Featuring the Dodo, Tasmanian Tiger, and more.';
    keywords = ['extinct species', 'extinction', 'dodo', 'passenger pigeon', 'thylacine', 'conservation history', 'biodiversity loss'];
    ogImage = `${SITE_URL}/og-extinct-species.png`;
  } else if (statusSlug === 'extinct-in-the-wild') {
    pageTitle = 'Extinct in the Wild - Conservation\'s Last Stand | Wildpedia';
    pageDescription = 'Discover species that survive only in captivity or as naturalized populations outside their historic range, and learn about efforts to reintroduce them to the wild.';
    keywords = ['extinct in the wild', 'ew species', 'captive breeding', 'reintroduction programs', 'conservation efforts', 'endangered animals'];
    ogImage = `${SITE_URL}/og-extinct-in-wild.png`;
  } else if (statusSlug === 'critically-endangered') {
    pageTitle = 'Critically Endangered Species - On the Brink | Wildpedia';
    pageDescription = 'Explore species facing an extremely high risk of extinction in the wild. Learn about their plight and vital conservation efforts on Wildpedia.';
    keywords = ['critically endangered', 'cr species', 'wildlife protection', 'verge of extinction', 'conservation action', 'endangered animals', 'iucn red list'];
    ogImage = `${SITE_URL}/og-critically-endangered.png`;
  } else if (statusSlug === 'endangered') {
    pageTitle = 'Endangered Species - High Risk of Extinction | Wildpedia';
    pageDescription = 'Discover species classified as Endangered (EN), facing a very high risk of extinction in the wild. Learn about their threats and conservation status on Wildpedia.';
    keywords = ['endangered species', 'en species', 'wildlife conservation', 'high risk extinction', 'iucn red list', 'animal protection'];
    ogImage = `${SITE_URL}/og-endangered-species.png`;
  } else if (statusSlug === 'vulnerable') {
    pageTitle = 'Vulnerable Species - High Risk of Extinction | Wildpedia';
    pageDescription = 'Explore species classified as Vulnerable (VU), facing a high risk of extinction in the wild. Learn about their threats and conservation needs on Wildpedia.';
    keywords = ['vulnerable species', 'vu species', 'wildlife conservation', 'high risk extinction', 'iucn red list', 'animal protection'];
    ogImage = `${SITE_URL}/og-vulnerable-species.png`; 
  } else if (statusSlug === 'near-threatened') {
    pageTitle = 'Near Threatened Species - Requiring Close Monitoring | Wildpedia';
    pageDescription = 'Discover species classified as Near Threatened (NT), which are close to qualifying for or are likely to become endangered in the near future unless circumstances improve. Learn about their status on Wildpedia.';
    keywords = ['near threatened species', 'nt species', 'wildlife conservation', 'monitoring', 'iucn red list', 'species at risk'];
    ogImage = `${SITE_URL}/og-near-threatened.png`;
  } else if (statusSlug === 'least-concern') {
    pageTitle = 'Least Concern Species - Stable Populations | Wildpedia';
    pageDescription = 'Explore species classified as Least Concern (LC) by the IUCN. These species have stable populations and are not currently facing major threats to their survival.';
    keywords = ['least concern species', 'lc species', 'wildlife conservation', 'stable populations', 'iucn red list', 'common animals'];
    ogImage = `${SITE_URL}/og-least-concern.png`;
  } else if (statusSlug === 'data-deficient') {
    pageTitle = 'Data Deficient Species - More Information Needed | Wildpedia';
    pageDescription = 'Learn about species classified as Data Deficient (DD) by the IUCN, for which there is inadequate information to make a direct, or indirect, assessment of their risk of extinction.';
    keywords = ['data deficient species', 'dd species', 'wildlife conservation', 'unknown risk', 'iucn red list', 'species research'];
    ogImage = `${SITE_URL}/og-data-deficient.png`;
  } else if (statusSlug === 'not-evaluated') {
    pageTitle = 'Not Evaluated Species - Awaiting Assessment | Wildpedia';
    pageDescription = 'Discover species that have not yet been evaluated against the IUCN Red List criteria. Learn why assessment is important for conservation planning.';
    keywords = ['not evaluated species', 'ne species', 'iucn red list', 'conservation assessment', 'species data'];
    ogImage = `${SITE_URL}/og-not-evaluated.png`; // Create public/og-not-evaluated.png
  }


  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${SITE_URL}/explore/conservation/${statusSlug}`,
      type: 'article',
      images: [{ url: ogImage, alt: pageTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
  };
}

export default async function ConservationStatusPage({ params }: { params: { statusSlug: string } }) {
  const statusSlug = params.statusSlug.toLowerCase();
  const statusInfo = statusSlugMap[statusSlug];
  const targetStatus = statusInfo ? statusInfo.name : null;
  const formattedStatusName = statusInfo ? statusInfo.formatted : statusSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const statusPageDescription = statusInfo ? statusInfo.description : "Discover animals based on their IUCN Red List classification.";
  const StatusIcon = statusInfo?.icon || ShieldAlert;

  let animals: AnimalInfo[] = [];
  let error: string | null = null;

  if (!targetStatus) {
    error = `Invalid conservation status: "${formattedStatusName}".`;
  } else {
    try {
      const allAnimals = await getAllAnimals();
      animals = allAnimals.filter(animal => animal.conservationStatus === targetStatus);
    } catch (e: any) {
      console.error("Error fetching animals for conservation status:", e);
      error = "Could not load animal data at this time.";
    }
  }

  const pageJsonLdBase = {
    "@context": "https://schema.org",
    "publisher": { "@type": "Organization", "name": "Wildpedia" },
    "url": `${SITE_URL}/explore/conservation/${statusSlug}`,
  };
  
  let pageJsonLd: object;

  if (statusSlug === 'extinct') {
     pageJsonLd = {
        ...pageJsonLdBase,
        "@type": "Article",
        "headline": "Understanding Extinction: Remembering Lost Wildlife",
        "name": "Extinct Species on Wildpedia",
        "description": "Information about species that have gone extinct, the causes, and the importance of conservation.",
        "image": `${SITE_URL}/og-extinct-species.png`,
        "keywords": "extinct species, biodiversity loss, conservation, dodo, passenger pigeon",
     };
  } else if (statusSlug === 'extinct-in-the-wild') {
    pageJsonLd = {
        ...pageJsonLdBase,
        "@type": "Article",
        "headline": "Extinct in the Wild: Conservation's Last Stand and Hope for Return",
        "name": "Extinct in the Wild Species on Wildpedia",
        "description": "Explore species classified as Extinct in the Wild (EW), their stories, and the vital role of captive breeding and reintroduction programs.",
        "image": `${SITE_URL}/og-extinct-in-wild.png`,
        "keywords": "Extinct in the Wild, EW, captive breeding, reintroduction, conservation, endangered species",
    };
  } else if (statusSlug === 'critically-endangered') {
    pageJsonLd = {
        ...pageJsonLdBase,
        "@type": "Article",
        "headline": "Critically Endangered Species: Understanding the Highest Risk Category",
        "name": "Critically Endangered Species on Wildpedia",
        "description": "A detailed look at Critically Endangered species, the threats they face, and urgent conservation measures.",
        "image": `${SITE_URL}/og-critically-endangered.png`,
        "keywords": "critically endangered, CR, conservation, wildlife protection, IUCN Red List",
    };
  } else if (statusSlug === 'endangered') {
    pageJsonLd = {
        ...pageJsonLdBase,
        "@type": "Article",
        "headline": "Endangered Species: High Risk of Extinction, Conservation Focus",
        "name": "Endangered Species on Wildpedia",
        "description": "Information about species classified as Endangered (EN), their threats, and conservation strategies.",
        "image": `${SITE_URL}/og-endangered-species.png`,
        "keywords": "endangered species, EN, conservation, wildlife protection, IUCN Red List, animal protection",
    };
  } else if (statusSlug === 'vulnerable') {
    pageJsonLd = {
        ...pageJsonLdBase,
        "@type": "Article",
        "headline": "Vulnerable Species: Understanding High Risk and Conservation Needs",
        "name": "Vulnerable Species on Wildpedia",
        "description": "Information about species classified as Vulnerable (VU), their threats, and key conservation strategies to prevent further decline.",
        "image": `${SITE_URL}/og-vulnerable-species.png`,
        "keywords": "vulnerable species, VU, conservation, wildlife protection, IUCN Red List, high risk",
    };
  } else if (statusSlug === 'near-threatened') {
    pageJsonLd = {
        ...pageJsonLdBase,
        "@type": "Article",
        "headline": "Near Threatened Species: Monitoring and Preventative Conservation",
        "name": "Near Threatened Species on Wildpedia",
        "description": "Information about species classified as Near Threatened (NT), their current status, potential threats, and the importance of monitoring.",
        "image": `${SITE_URL}/og-near-threatened.png`,
        "keywords": "near threatened species, NT, conservation, wildlife monitoring, IUCN Red List, at risk",
    };
  } else if (statusSlug === 'least-concern') {
    pageJsonLd = {
        ...pageJsonLdBase,
        "@type": "Article",
        "headline": "Least Concern Species: Stable Populations and Continued Monitoring",
        "name": "Least Concern Species on Wildpedia",
        "description": "Information about species classified as Least Concern (LC), their characteristics, and why ongoing observation is still valuable.",
        "image": `${SITE_URL}/og-least-concern.png`,
        "keywords": "least concern species, LC, conservation, wildlife monitoring, IUCN Red List, common animals",
    };
  } else if (statusSlug === 'data-deficient') {
    pageJsonLd = {
        ...pageJsonLdBase,
        "@type": "Article",
        "headline": "Data Deficient Species: Understanding the Unknowns in Conservation",
        "name": "Data Deficient Species on Wildpedia",
        "description": "Explore species classified as Data Deficient (DD) by the IUCN, highlighting the need for more research to determine their conservation status.",
        "image": `${SITE_URL}/og-data-deficient.png`,
        "keywords": "data deficient, DD, conservation, wildlife research, IUCN Red List, unknown status",
    };
  } else if (statusSlug === 'not-evaluated') {
    pageJsonLd = {
        ...pageJsonLdBase,
        "@type": "Article",
        "headline": "Not Evaluated Species: Awaiting IUCN Assessment",
        "name": "Not Evaluated Species on Wildpedia",
        "description": "Information about species that have not yet been evaluated against the IUCN Red List criteria for conservation status.",
        "image": `${SITE_URL}/og-not-evaluated.png`,
        "keywords": "not evaluated, NE, conservation status, IUCN Red List, species assessment",
    };
  }
   else {
      pageJsonLd = {
        ...pageJsonLdBase,
        "@type": "CollectionPage",
        "name": `Animals: ${formattedStatusName} | Wildpedia`,
        "description": `A collection of animals classified as ${formattedStatusName} on Wildpedia. ${statusPageDescription}`,
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": animals.map((animal, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Thing",
              "name": animal.commonName,
              "description": animal.description.substring(0,100) + "...",
              "url": `${SITE_URL}/animal/${animal.id}`,
              "image": animal.mediaUrls[0] || `${SITE_URL}/placeholder-animal.png`
            }
          }))
        }
      };
  }


  if (statusSlug === 'extinct') {
    return (
      <div className="container mx-auto py-12 px-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
        />
        <Link href="/explore/conservation" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Conservation
        </Link>

        <Card className="mb-10 bg-destructive/10 border-destructive/30 shadow-lg">
          <CardHeader className="items-center text-center pt-8">
            <Skull className="h-16 w-16 text-destructive mb-3" />
            <CardTitle className="text-4xl font-bold text-destructive">
              Extinct: Gone Forever
            </CardTitle>
            <CardDescription className="text-lg text-destructive/90 pt-2 max-w-3xl mx-auto">
              When a species is declared extinct, it signifies the irreversible loss of a unique part of Earth's biodiversity. It means there is no reasonable doubt that the last individual of that species has died.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-8 text-center">
            <p className="text-destructive-foreground/80">
              Understanding these past losses is crucial for informing present-day conservation efforts to prevent further irreversible disappearances.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-semibold text-primary mb-8 text-center">Remembering the Lost: Notable Extinctions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {famousExtinctAnimals.map(animal => (
            <Card key={animal.name} className="bg-card shadow-md overflow-hidden flex flex-col h-full border border-border/50">
              <CardHeader className="p-0 relative">
                 <Image
                    src={animal.imageUrl}
                    alt={`Illustration or representation of ${animal.name}, an extinct animal`}
                    width={300}
                    height={180}
                    className="w-full h-40 object-cover"
                    data-ai-hint={animal.dataAiHint}
                 />
                 <div className="absolute top-2 right-2 bg-destructive/80 text-destructive-foreground text-xs font-semibold px-2 py-0.5 rounded">EXTINCT</div>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col">
                 <CardTitle className="text-lg font-bold text-primary mb-1">{animal.name}</CardTitle>
                 <CardDescription className="text-sm italic text-muted-foreground mb-2">{animal.scientificName}</CardDescription>
                 <div className="text-xs text-foreground space-y-1 mt-auto pt-2 border-t border-border/30">
                   <p><span className="font-semibold text-muted-foreground">Extinct:</span> {animal.extinctionDate}</p>
                   <p><span className="font-semibold text-muted-foreground">Region:</span> {animal.region}</p>
                   <p><span className="font-semibold text-muted-foreground">Cause:</span> {animal.cause}</p>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {animals.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Extinct Species in Our Database</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {animals.map((animal) => (
                <AnimalSummaryCard key={animal.id} animal={animal} />
              ))}
            </div>
          </>
        )}
        {animals.length === 0 && !error && (
           <p className="text-center text-muted-foreground mt-8 italic">
             Our database currently does not list specific animals with the "Extinct" status beyond the historical examples shown.
           </p>
        )}

        <Card className="mt-12 bg-muted/50 border-primary/20">
            <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2"><BookOpen className="text-primary"/> Learning from Loss</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-foreground">
                <p>The stories of extinct species serve as a stark reminder of the fragility of biodiversity and the profound impact human actions can have on the natural world. Each extinction represents a lost thread in the web of life.</p>
                <p>By studying the causes of past extinctions, we gain critical insights to inform and strengthen current conservation strategies. Protecting endangered and vulnerable species today is our responsibility to prevent future irreversible losses.</p>
                <div className="pt-2">
                    <Link href="/loss-extinction" className="text-primary hover:underline font-semibold">
                        Learn more about Wildlife Loss & the broader Extinction Crisis &rarr;
                    </Link>
                </div>
            </CardContent>
        </Card>
      </div>
    );
  } else if (statusSlug === 'extinct-in-the-wild') {
    return (
      <div className="container mx-auto py-12 px-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
        />
        <Link href="/explore/conservation" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Conservation
        </Link>

        <Card className="mb-10 bg-amber-500/10 border-amber-500/30 shadow-lg">
          <CardHeader className="items-center text-center pt-8">
            <LifeBuoy className="h-16 w-16 text-amber-600 mb-3" />
            <CardTitle className="text-4xl font-bold text-amber-700 dark:text-amber-500">
              Extinct in the Wild
            </CardTitle>
            <CardDescription className="text-lg text-amber-800/90 dark:text-amber-300/90 pt-2 max-w-3xl mx-auto">
              This status means a species only survives in captivity (like zoos or botanical gardens) or as a naturalized population outside its historical native range. No free-living, natural populations remain in their original habitat.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-8 text-center">
            <p className="text-amber-900/80 dark:text-amber-200/80">
              While dire, "Extinct in the Wild" offers a sliver of hope. Intensive conservation efforts, including captive breeding and habitat restoration, can sometimes lead to reintroduction back into their native ecosystems.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-semibold text-primary mb-8 text-center">Stories of Survival (in Captivity): Notable EW Species</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {famousExtinctInTheWildAnimals.map(animal => (
            <Card key={animal.name} className="bg-card shadow-md overflow-hidden flex flex-col h-full border border-border/50">
              <CardHeader className="p-0 relative">
                 <Image
                    src={animal.imageUrl}
                    alt={`Image of ${animal.name}, a species Extinct in the Wild`}
                    width={300}
                    height={180}
                    className="w-full h-40 object-cover"
                    data-ai-hint={animal.dataAiHint}
                 />
                 <div className="absolute top-2 right-2 bg-amber-500/80 text-white text-xs font-semibold px-2 py-0.5 rounded">EXTINCT IN THE WILD</div>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col">
                 <CardTitle className="text-lg font-bold text-primary mb-1">{animal.name}</CardTitle>
                 <CardDescription className="text-sm italic text-muted-foreground mb-2">{animal.scientificName}</CardDescription>
                  <p className="text-xs text-foreground mb-2">
                    <span className="font-semibold text-muted-foreground">Native to:</span> {animal.region}
                  </p>
                 <div className="text-xs text-foreground space-y-1 mt-auto pt-2 border-t border-border/30">
                   <p><span className="font-semibold text-muted-foreground">Status Note:</span> {animal.statusNote}</p>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {animals.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">EW Species in Our Database</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {animals.map((animal) => (
                <AnimalSummaryCard key={animal.id} animal={animal} />
              ))}
            </div>
          </>
        )}
         {animals.length === 0 && !error && (
           <p className="text-center text-muted-foreground mt-8 italic">
             Our database currently does not list specific animals with the "Extinct in the Wild" status beyond the historical examples shown.
           </p>
        )}

        <Card className="mt-12 bg-muted/50 border-primary/20">
            <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2"><Search className="text-green-600"/> The Role of Conservation Programs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-foreground">
                <p>Species classified as Extinct in the Wild highlight the critical role of <strong className="text-primary">captive breeding programs</strong> and <strong className="text-primary">ex-situ conservation</strong> (conservation outside natural habitats). These programs aim to:</p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>Maintain viable populations and genetic diversity in a controlled environment.</li>
                    <li>Conduct research to better understand species' biology and needs.</li>
                    <li>Serve as a potential source for future reintroduction efforts if wild habitats can be restored and threats mitigated.</li>
                </ul>
                <p>Successful reintroductions are complex and challenging, requiring suitable habitat, removal of original threats, and post-release monitoring. However, they represent the ultimate goal for many EW species – a return to the wild.</p>
                 <div className="pt-2">
                    <Link href="/loss-extinction" className="text-primary hover:underline font-semibold">
                        Learn more about Conservation Challenges & Successes &rarr;
                    </Link>
                </div>
            </CardContent>
        </Card>
      </div>
    );
  } else if (statusSlug === 'critically-endangered') {
     return (
      <div className="container mx-auto py-12 px-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
        />
        <Link href="/explore/conservation" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Conservation
        </Link>

        <Card className="mb-10 bg-red-600/10 border-red-600/30 shadow-lg dark:bg-red-900/20 dark:border-red-700/50">
          <CardHeader className="items-center text-center pt-8">
            <AlertTriangle className="h-16 w-16 text-red-600 dark:text-red-500 mb-3" />
            <CardTitle className="text-4xl font-bold text-red-700 dark:text-red-400">
              Critically Endangered: On the Brink
            </CardTitle>
            <CardDescription className="text-lg text-red-800/90 dark:text-red-300/90 pt-2 max-w-3xl mx-auto">
              Species classified as Critically Endangered (CR) by the IUCN face an extremely high risk of extinction in the wild. This is the highest risk category for wild species. Urgent conservation action is vital for their survival.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-8 text-center">
            <p className="text-red-900/80 dark:text-red-200/80">
              Without intensive, targeted conservation efforts, these species could disappear forever.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-semibold text-primary mb-8 text-center">Guardians of Hope: Iconic Critically Endangered Species</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {famousCriticallyEndangeredAnimals.map(animal => (
            <Card key={animal.name} className="bg-card shadow-md overflow-hidden flex flex-col h-full border border-border/50">
              <CardHeader className="p-0 relative">
                 <Image
                    src={animal.imageUrl}
                    alt={`Image of ${animal.name}, a Critically Endangered species`}
                    width={300}
                    height={180}
                    className="w-full h-40 object-cover"
                    data-ai-hint={animal.dataAiHint}
                 />
                 <div className="absolute top-2 right-2 bg-red-600/80 text-white text-xs font-semibold px-2 py-0.5 rounded">CRITICALLY ENDANGERED</div>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col">
                 <CardTitle className="text-lg font-bold text-primary mb-1">{animal.name}</CardTitle>
                 <CardDescription className="text-sm italic text-muted-foreground mb-2">{animal.scientificName}</CardDescription>
                  <p className="text-xs text-foreground mb-1"><span className="font-semibold text-muted-foreground">Region:</span> {animal.region}</p>
                  <p className="text-xs text-foreground mb-1"><span className="font-semibold text-muted-foreground">Est. Population:</span> {animal.population}</p>
                 <div className="text-xs text-foreground space-y-1 mt-auto pt-2 border-t border-border/30">
                   <p><span className="font-semibold text-muted-foreground">Key Threats:</span> {animal.threats}</p>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {animals.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Critically Endangered Species in Our Database</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {animals.map((animal) => (
                <AnimalSummaryCard key={animal.id} animal={animal} />
              ))}
            </div>
          </>
        )}
         {animals.length === 0 && !error && (
           <p className="text-center text-muted-foreground mt-8 italic">
             Our database currently does not list specific animals with the "Critically Endangered" status beyond the examples shown.
           </p>
        )}

        <Card className="mt-12 bg-muted/50 border-primary/20">
            <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2"><HeartPulse className="text-red-600"/> Conservation Imperative</CardTitle>
                 <CardDescription>The fight to save Critically Endangered species requires immediate and multifaceted action.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-foreground">
                <p>For species on the brink, conservation efforts are often intensive and diverse, including:</p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                    <li><strong className="text-primary">Anti-Poaching Patrols:</strong> Protecting animals from illegal hunting and wildlife trade.</li>
                    <li><strong className="text-primary">Habitat Protection & Restoration:</strong> Securing and improving the natural environments these species depend on.</li>
                    <li><strong className="text-primary">Captive Breeding & Reintroduction:</strong> Breeding species in controlled environments with the aim of releasing them back into suitable wild habitats.</li>
                    <li><strong className="text-primary">Community Engagement:</strong> Working with local communities to foster stewardship and find sustainable solutions that benefit both people and wildlife.</li>
                    <li><strong className="text-primary">Research & Monitoring:</strong> Understanding species' biology, threats, and population trends to guide effective conservation strategies.</li>
                    <li><strong className="text-primary">Policy & Advocacy:</strong> Pushing for stronger laws and international agreements to protect endangered wildlife.</li>
                </ul>
                <p>Every action, big or small, contributes to the collective effort to prevent these unique species from vanishing.</p>
                 <div className="pt-2">
                    <Link href="/loss-extinction#conservation-efforts" className="text-primary hover:underline font-semibold">
                        Learn more about Global Conservation Efforts &rarr;
                    </Link>
                </div>
            </CardContent>
        </Card>
      </div>
    );
  } else if (statusSlug === 'endangered') {
     return (
      <div className="container mx-auto py-12 px-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
        />
        <Link href="/explore/conservation" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Conservation
        </Link>

        <Card className="mb-10 bg-orange-500/10 border-orange-500/30 shadow-lg dark:bg-orange-900/20 dark:border-orange-700/50">
          <CardHeader className="items-center text-center pt-8">
            <Users className="h-16 w-16 text-orange-600 dark:text-orange-500 mb-3" />
            <CardTitle className="text-4xl font-bold text-orange-700 dark:text-orange-400">
              Endangered: High Risk
            </CardTitle>
            <CardDescription className="text-lg text-orange-800/90 dark:text-orange-300/90 pt-2 max-w-3xl mx-auto">
              Species classified as Endangered (EN) by the IUCN face a very high risk of extinction in the wild. While not as immediately perilous as Critically Endangered, these species require significant conservation attention to prevent further decline.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-8 text-center">
            <p className="text-orange-900/80 dark:text-orange-200/80">
              Targeted conservation actions are crucial to stabilize and recover populations of Endangered species.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-semibold text-primary mb-8 text-center">Profiles in Peril: Iconic Endangered Species</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {famousEndangeredAnimals.map(animal => (
            <Card key={animal.name} className="bg-card shadow-md overflow-hidden flex flex-col h-full border border-border/50">
              <CardHeader className="p-0 relative">
                 <Image
                    src={animal.imageUrl}
                    alt={`Image of ${animal.name}, an Endangered species`}
                    width={300}
                    height={180}
                    className="w-full h-40 object-cover"
                    data-ai-hint={animal.dataAiHint}
                 />
                 <div className="absolute top-2 right-2 bg-orange-600/80 text-white text-xs font-semibold px-2 py-0.5 rounded">ENDANGERED</div>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col">
                 <CardTitle className="text-lg font-bold text-primary mb-1">{animal.name}</CardTitle>
                 <CardDescription className="text-sm italic text-muted-foreground mb-2">{animal.scientificName}</CardDescription>
                  <p className="text-xs text-foreground mb-1"><span className="font-semibold text-muted-foreground">Region:</span> {animal.region}</p>
                  <p className="text-xs text-foreground mb-1"><span className="font-semibold text-muted-foreground">Est. Population:</span> {animal.population}</p>
                 <div className="text-xs text-foreground space-y-1 mt-auto pt-2 border-t border-border/30">
                   <p><span className="font-semibold text-muted-foreground">Key Threats:</span> {animal.threats}</p>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {animals.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Endangered Species in Our Database</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {animals.map((animal) => (
                <AnimalSummaryCard key={animal.id} animal={animal} />
              ))}
            </div>
          </>
        )}
         {animals.length === 0 && !error && (
           <p className="text-center text-muted-foreground mt-8 italic">
             Our database currently does not list specific animals with the "Endangered" status beyond the examples shown.
           </p>
        )}

        <Card className="mt-12 bg-muted/50 border-primary/20">
            <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2"><ShieldAlert className="text-orange-600"/> Conservation Focus for Endangered Species</CardTitle>
                 <CardDescription>Actions to protect Endangered species often involve long-term strategies and broad collaboration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-foreground">
                <p>Conservation efforts for Endangered species aim to address the root causes of their decline and promote population recovery. Key strategies include:</p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                    <li><strong className="text-primary">Habitat Protection and Management:</strong> Preserving and restoring critical habitats, including creating protected areas and corridors.</li>
                    <li><strong className="text-primary">Anti-Poaching and Law Enforcement:</strong> Combating illegal wildlife trade and strengthening enforcement against poaching.</li>
                    <li><strong className="text-primary">Sustainable Livelihoods for Communities:</strong> Engaging local communities in conservation and providing alternative income sources to reduce pressure on wildlife.</li>
                    <li><strong className="text-primary">Research and Population Monitoring:</strong> Ongoing scientific research to understand species needs and track population trends to adapt conservation plans.</li>
                    <li><strong className="text-primary">International Cooperation:</strong> Collaboration between countries for species that cross borders or are affected by international trade.</li>
                    <li><strong className="text-primary">Public Awareness and Education:</strong> Raising awareness about the plight of endangered species and the importance of biodiversity.</li>
                </ul>
                <p>Many Endangered species benefit from dedicated Species Survival Plans (SSPs) and conservation breeding programs, which sometimes include reintroduction efforts.</p>
                 <div className="pt-2">
                    <Link href="/loss-extinction#conservation-efforts" className="text-primary hover:underline font-semibold">
                        Explore Global Conservation Efforts &rarr;
                    </Link>
                </div>
            </CardContent>
        </Card>
      </div>
    );
  } else if (statusSlug === 'vulnerable') {
     return (
      <div className="container mx-auto py-12 px-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
        />
        <Link href="/explore/conservation" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Conservation
        </Link>

        <Card className="mb-10 bg-yellow-500/10 border-yellow-500/30 shadow-lg dark:bg-yellow-800/20 dark:border-yellow-700/50">
          <CardHeader className="items-center text-center pt-8">
            <HeartPulse className="h-16 w-16 text-yellow-600 dark:text-yellow-500 mb-3" />
            <CardTitle className="text-4xl font-bold text-yellow-700 dark:text-yellow-400">
              Vulnerable: High Risk
            </CardTitle>
            <CardDescription className="text-lg text-yellow-800/90 dark:text-yellow-300/90 pt-2 max-w-3xl mx-auto">
              Species classified as Vulnerable (VU) by the IUCN face a high risk of extinction in the wild. While not as critical as Endangered, this status indicates significant threats that, if unaddressed, could lead to further decline.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-8 text-center">
            <p className="text-yellow-900/80 dark:text-yellow-200/80">
              Proactive conservation measures are essential to stabilize Vulnerable populations and prevent them from becoming Endangered.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-semibold text-primary mb-8 text-center">At Risk: Notable Vulnerable Species</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {famousVulnerableAnimals.map(animal => (
            <Card key={animal.name} className="bg-card shadow-md overflow-hidden flex flex-col h-full border border-border/50">
              <CardHeader className="p-0 relative">
                 <Image
                    src={animal.imageUrl}
                    alt={`Image of ${animal.name}, a Vulnerable species`}
                    width={300}
                    height={180}
                    className="w-full h-40 object-cover"
                    data-ai-hint={animal.dataAiHint}
                 />
                 <div className="absolute top-2 right-2 bg-yellow-500/80 text-white text-xs font-semibold px-2 py-0.5 rounded">VULNERABLE</div>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col">
                 <CardTitle className="text-lg font-bold text-primary mb-1">{animal.name}</CardTitle>
                 <CardDescription className="text-sm italic text-muted-foreground mb-2">{animal.scientificName}</CardDescription>
                  <p className="text-xs text-foreground mb-1"><span className="font-semibold text-muted-foreground">Region:</span> {animal.region}</p>
                  <p className="text-xs text-foreground mb-1"><span className="font-semibold text-muted-foreground">Est. Population:</span> {animal.population}</p>
                 <div className="text-xs text-foreground space-y-1 mt-auto pt-2 border-t border-border/30">
                   <p><span className="font-semibold text-muted-foreground">Key Threats:</span> {animal.threats}</p>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {animals.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Vulnerable Species in Our Database</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {animals.map((animal) => (
                <AnimalSummaryCard key={animal.id} animal={animal} />
              ))}
            </div>
          </>
        )}
         {animals.length === 0 && !error && (
           <p className="text-center text-muted-foreground mt-8 italic">
             Our database currently does not list specific animals with the "Vulnerable" status beyond the examples shown.
           </p>
        )}

        <Card className="mt-12 bg-muted/50 border-primary/20">
            <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2"><Activity className="text-yellow-600"/> Conservation Priorities for Vulnerable Species</CardTitle>
                 <CardDescription>Preventing further decline requires targeted action and monitoring.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-foreground">
                <p>For Vulnerable species, conservation focuses on mitigating known threats and monitoring populations to ensure they don't slip into higher risk categories. Key actions include:</p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                    <li><strong className="text-primary">Effective Habitat Management:</strong> Protecting and restoring critical habitats, ensuring connectivity between fragmented areas.</li>
                    <li><strong className="text-primary">Combating Illegal Trade & Poaching:</strong> Strengthening law enforcement and addressing demand for illegal wildlife products.</li>
                    <li><strong className="text-primary">Addressing Human-Wildlife Conflict:</strong> Implementing measures to reduce negative interactions between humans and wildlife, such as crop protection or compensation schemes.</li>
                    <li><strong className="text-primary">Population Monitoring & Research:</strong> Regular surveys to track population trends and research into species-specific threats and ecological needs.</li>
                    <li><strong className="text-primary">Community Engagement & Sustainable Practices:</strong> Involving local communities in conservation efforts and promoting sustainable resource use.</li>
                    <li><strong className="text-primary">Policy and Legal Frameworks:</strong> Ensuring adequate national and international laws are in place and enforced to protect these species.</li>
                </ul>
                <p>Early intervention and consistent conservation efforts are crucial for the recovery of Vulnerable species.</p>
                 <div className="pt-2">
                    <Link href="/loss-extinction#conservation-efforts" className="text-primary hover:underline font-semibold">
                        Learn About Global Conservation Initiatives &rarr;
                    </Link>
                </div>
            </CardContent>
        </Card>
      </div>
    );
  } else if (statusSlug === 'near-threatened') {
     return (
      <div className="container mx-auto py-12 px-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
        />
        <Link href="/explore/conservation" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Conservation
        </Link>

        <Card className="mb-10 bg-sky-500/10 border-sky-500/30 shadow-lg dark:bg-sky-800/20 dark:border-sky-700/50">
          <CardHeader className="items-center text-center pt-8">
            <Search className="h-16 w-16 text-sky-600 dark:text-sky-500 mb-3" />
            <CardTitle className="text-4xl font-bold text-sky-700 dark:text-sky-400">
              Near Threatened: Close Watch
            </CardTitle>
            <CardDescription className="text-lg text-sky-800/90 dark:text-sky-300/90 pt-2 max-w-3xl mx-auto">
              Species classified as Near Threatened (NT) by the IUCN are close to qualifying for a threatened category (Vulnerable, Endangered, or Critically Endangered) in the near future, or are likely to qualify for one should ongoing conservation measures cease.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-8 text-center">
            <p className="text-sky-900/80 dark:text-sky-200/80">
              These species require ongoing monitoring and preventative conservation actions to ensure they do not slip into higher-risk categories.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-semibold text-primary mb-8 text-center">Species to Monitor: Notable Near Threatened Examples</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {famousNearThreatenedAnimals.map(animal => (
            <Card key={animal.name} className="bg-card shadow-md overflow-hidden flex flex-col h-full border border-border/50">
              <CardHeader className="p-0 relative">
                 <Image
                    src={animal.imageUrl}
                    alt={`Image of ${animal.name}, a Near Threatened species`}
                    width={300}
                    height={180}
                    className="w-full h-40 object-cover"
                    data-ai-hint={animal.dataAiHint}
                 />
                 <div className="absolute top-2 right-2 bg-sky-500/80 text-white text-xs font-semibold px-2 py-0.5 rounded">NEAR THREATENED</div>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col">
                 <CardTitle className="text-lg font-bold text-primary mb-1">{animal.name}</CardTitle>
                 <CardDescription className="text-sm italic text-muted-foreground mb-2">{animal.scientificName}</CardDescription>
                  <p className="text-xs text-foreground mb-1"><span className="font-semibold text-muted-foreground">Region:</span> {animal.region}</p>
                  <p className="text-xs text-foreground mb-1"><span className="font-semibold text-muted-foreground">Est. Population:</span> {animal.population}</p>
                 <div className="text-xs text-foreground space-y-1 mt-auto pt-2 border-t border-border/30">
                   <p><span className="font-semibold text-muted-foreground">Key Threats:</span> {animal.threats}</p>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {animals.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Near Threatened Species in Our Database</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {animals.map((animal) => (
                <AnimalSummaryCard key={animal.id} animal={animal} />
              ))}
            </div>
          </>
        )}
         {animals.length === 0 && !error && (
           <p className="text-center text-muted-foreground mt-8 italic">
             Our database currently does not list specific animals with the "Near Threatened" status beyond the examples shown.
           </p>
        )}

        <Card className="mt-12 bg-muted/50 border-primary/20">
            <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2"><Search className="text-sky-600"/> Conservation Focus for Near Threatened Species</CardTitle>
                 <CardDescription>Preventative action and careful monitoring are key for NT species.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-foreground">
                <p>For Near Threatened species, conservation efforts emphasize proactive measures:</p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                    <li><strong className="text-primary">Population Monitoring:</strong> Regular surveys and research to track population trends and detect early signs of decline.</li>
                    <li><strong className="text-primary">Threat Assessment & Mitigation:</strong> Identifying and addressing potential or emerging threats before they become severe.</li>
                    <li><strong className="text-primary">Habitat Management:</strong> Maintaining and protecting existing habitats to ensure they remain suitable for the species.</li>
                    <li><strong className="text-primary">Sustainable Management Practices:</strong> If the species is utilized by humans (e.g., fisheries), ensuring that harvests are sustainable.</li>
                    <li><strong className="text-primary">Addressing Climate Change Impacts:</strong> Developing strategies to help species adapt to changing environmental conditions.</li>
                </ul>
                <p>The goal is to prevent Near Threatened species from becoming Vulnerable or Endangered through timely intervention and informed management.</p>
                 <div className="pt-2">
                    <Link href="/loss-extinction#conservation-efforts" className="text-primary hover:underline font-semibold">
                        Learn About Global Conservation Initiatives &rarr;
                    </Link>
                </div>
            </CardContent>
        </Card>
      </div>
    );
  } else if (statusSlug === 'least-concern') {
    return (
      <div className="container mx-auto py-12 px-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
        />
        <Link href="/explore/conservation" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Conservation
        </Link>

        <Card className="mb-10 bg-green-500/10 border-green-500/30 shadow-lg dark:bg-green-900/20 dark:border-green-700/50">
          <CardHeader className="items-center text-center pt-8">
            <Smile className="h-16 w-16 text-green-600 dark:text-green-500 mb-3" />
            <CardTitle className="text-4xl font-bold text-green-700 dark:text-green-400">
              Least Concern: Generally Secure
            </CardTitle>
            <CardDescription className="text-lg text-green-800/90 dark:text-green-300/90 pt-2 max-w-3xl mx-auto">
              Species classified as Least Concern (LC) by the IUCN are widespread and abundant. They do not qualify for a more at-risk category and are not currently facing major, widespread threats to their survival.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-8 text-center">
            <p className="text-green-900/80 dark:text-green-200/80">
              While these species are currently stable, ongoing monitoring is still important as environmental conditions can change.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-semibold text-primary mb-8 text-center">Examples of Least Concern Species</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {famousLeastConcernAnimals.map(animal => (
            <Card key={animal.name} className="bg-card shadow-md overflow-hidden flex flex-col h-full border border-border/50">
              <CardHeader className="p-0 relative">
                 <Image
                    src={animal.imageUrl}
                    alt={`Image of ${animal.name}, a Least Concern species`}
                    width={300}
                    height={180}
                    className="w-full h-40 object-cover"
                    data-ai-hint={animal.dataAiHint}
                 />
                 <div className="absolute top-2 right-2 bg-green-600/80 text-white text-xs font-semibold px-2 py-0.5 rounded">LEAST CONCERN</div>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col">
                 <CardTitle className="text-lg font-bold text-primary mb-1">{animal.name}</CardTitle>
                 <CardDescription className="text-sm italic text-muted-foreground mb-2">{animal.scientificName}</CardDescription>
                  <p className="text-xs text-foreground mb-1"><span className="font-semibold text-muted-foreground">Region:</span> {animal.region}</p>
                  <p className="text-xs text-foreground mb-1"><span className="font-semibold text-muted-foreground">Population:</span> {animal.population}</p>
                 <div className="text-xs text-foreground space-y-1 mt-auto pt-2 border-t border-border/30">
                   <p><span className="font-semibold text-muted-foreground">Notes:</span> {animal.notes}</p>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {animals.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Least Concern Species in Our Database</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {animals.map((animal) => (
                <AnimalSummaryCard key={animal.id} animal={animal} />
              ))}
            </div>
          </>
        )}
         {animals.length === 0 && !error && (
           <p className="text-center text-muted-foreground mt-8 italic">
             Our database currently does not list specific animals with the "Least Concern" status beyond the examples shown.
           </p>
        )}

        <Card className="mt-12 bg-muted/50 border-primary/20">
            <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2"><Search className="text-green-600"/> Why Still Monitor Least Concern Species?</CardTitle>
                 <CardDescription>Even common species benefit from ongoing observation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-foreground">
                <p>While "Least Concern" indicates current stability, it's not a guarantee for the future. Monitoring these species helps to:</p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                    <li><strong className="text-primary">Detect Early Declines:</strong> Identify if a common species starts facing unexpected threats or population drops.</li>
                    <li><strong className="text-primary">Understand Ecosystem Health:</strong> Abundant species often play crucial roles in their ecosystems. Changes in their populations can indicate broader environmental issues.</li>
                    <li><strong className="text-primary">Inform Management:</strong> Data on common species can help inform management of habitats and resources that also benefit rarer species.</li>
                    <li><strong className="text-primary">Track Climate Change Impacts:</strong> Observe how common species are adapting or being affected by changing climatic conditions.</li>
                </ul>
                <p>Conservation is a dynamic field, and the status of species can change over time due to various environmental and human-induced factors.</p>
            </CardContent>
        </Card>
      </div>
    );
  } else if (statusSlug === 'data-deficient') {
    return (
      <div className="container mx-auto py-12 px-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
        />
        <Link href="/explore/conservation" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Conservation
        </Link>

        <Card className="mb-10 bg-blue-500/10 border-blue-500/30 shadow-lg dark:bg-blue-900/20 dark:border-blue-700/50">
          <CardHeader className="items-center text-center pt-8">
            <FileQuestion className="h-16 w-16 text-blue-600 dark:text-blue-500 mb-3" />
            <CardTitle className="text-4xl font-bold text-blue-700 dark:text-blue-400">
              Data Deficient: More Information Needed
            </CardTitle>
            <CardDescription className="text-lg text-blue-800/90 dark:text-blue-300/90 pt-2 max-w-3xl mx-auto">
              Species classified as Data Deficient (DD) by the IUCN are those for which there is inadequate information to make a direct, or indirect, assessment of their risk of extinction based on distribution and/or population status.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-8 text-center">
            <p className="text-blue-900/80 dark:text-blue-200/80">
              A DD listing is not a statement that the species is not threatened. In fact, many DD species may be at high risk, but more research is required to determine their true status.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-card border-border/50">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center gap-2"><HelpCircle className="text-accent"/> Why Data Deficient?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-foreground text-sm">
                    <p>Species may be classified as Data Deficient for several reasons:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>They are naturally rare or have very restricted distributions.</li>
                        <li>They inhabit remote, inaccessible, or poorly studied regions (e.g., deep sea, dense rainforests).</li>
                        <li>There is taxonomic uncertainty, making it difficult to assess distinct populations.</li>
                        <li>They are elusive, nocturnal, or difficult to detect and monitor.</li>
                        <li>There is a lack of research funding or focus on these particular species.</li>
                        <li>They may have been recently discovered.</li>
                    </ul>
                </CardContent>
            </Card>
             <Card className="bg-card border-border/50">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center gap-2"><BookOpen className="text-accent"/> The Importance of Research</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-foreground text-sm">
                    <p>Addressing data deficiencies is crucial for effective conservation:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>DD species could be facing significant threats without our knowledge.</li>
                        <li>Further research (surveys, population studies, ecological assessments) is needed to determine their actual conservation status.</li>
                        <li>Once sufficient data is available, species can be re-categorized, allowing for targeted conservation actions if necessary.</li>
                        <li>Prioritizing research on DD species, especially those suspected to be in decline or with limited ranges, is essential.</li>
                    </ul>
                     <p className="pt-2 italic text-muted-foreground">Many deep-sea creatures, lesser-known insects, fungi, and some cryptic small mammals often fall into this category.</p>
                </CardContent>
            </Card>
        </div>


        {animals.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Data Deficient Species in Our Database</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {animals.map((animal) => (
                <AnimalSummaryCard key={animal.id} animal={animal} />
              ))}
            </div>
          </>
        )}
         {animals.length === 0 && !error && (
           <p className="text-center text-muted-foreground mt-8 italic">
             Our database currently does not list specific animals with the "Data Deficient" status.
           </p>
        )}
      </div>
    );
  } else if (statusSlug === 'not-evaluated') {
    return (
      <div className="container mx-auto py-12 px-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
        />
        <Link href="/explore/conservation" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to Conservation
        </Link>

        <Card className="mb-10 bg-gray-500/10 border-gray-500/30 shadow-lg dark:bg-gray-800/20 dark:border-gray-700/50">
          <CardHeader className="items-center text-center pt-8">
            <HelpCircle className="h-16 w-16 text-gray-600 dark:text-gray-500 mb-3" />
            <CardTitle className="text-4xl font-bold text-gray-700 dark:text-gray-400">
              Not Evaluated: Awaiting Assessment
            </CardTitle>
            <CardDescription className="text-lg text-gray-800/90 dark:text-gray-300/90 pt-2 max-w-3xl mx-auto">
              Species classified as Not Evaluated (NE) by the IUCN have not yet been assessed against the Red List criteria. This means their conservation status is currently unknown.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-8 text-center">
            <p className="text-gray-900/80 dark:text-gray-200/80">
              The vast majority of species on Earth fall into this category. Evaluation is an ongoing process.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-card border-border/50">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center gap-2"><Clock className="text-accent"/> Why Not Evaluated?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-foreground text-sm">
                    <p>A species might be "Not Evaluated" for several reasons:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>It may be a newly discovered species.</li>
                        <li>There might be insufficient information or research available to conduct a proper assessment.</li>
                        <li>It has not yet been prioritized for evaluation by the IUCN or relevant assessment bodies.</li>
                        <li>The species might be very common or widespread, and thus not considered a high priority for immediate assessment, though this can change.</li>
                        <li>Taxonomic changes or reclassifications can lead to a species needing a new evaluation.</li>
                    </ul>
                </CardContent>
            </Card>
             <Card className="bg-card border-border/50">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center gap-2"><BookOpen className="text-accent"/> The Importance of Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-foreground text-sm">
                    <p>The IUCN Red List assessment process is crucial for:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>Identifying species that are at risk of extinction.</li>
                        <li>Providing a global standard for species conservation status.</li>
                        <li>Guiding conservation priorities and resource allocation.</li>
                        <li>Informing policy and decision-making related to biodiversity.</li>
                        <li>Tracking trends in biodiversity loss over time.</li>
                    </ul>
                     <p className="pt-2 italic text-muted-foreground">Millions of species are estimated to exist, and evaluating all of them is a monumental and ongoing task.</p>
                </CardContent>
            </Card>
        </div>


        {animals.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Not Evaluated Species in Our Database</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {animals.map((animal) => (
                <AnimalSummaryCard key={animal.id} animal={animal} />
              ))}
            </div>
          </>
        )}
         {animals.length === 0 && !error && (
           <p className="text-center text-muted-foreground mt-8 italic">
             Our database currently does not list specific animals with the "Not Evaluated" status. Most species in focused databases are typically assessed.
           </p>
        )}
      </div>
    );
  }


  // Default rendering for other conservation statuses (e.g., if a slug doesn't match any specific layout)
  return (
    <div className="container mx-auto py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <Link href="/explore/conservation" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
        <ArrowLeft className="h-4 w-4" /> Back to Conservation
      </Link>

      <div className="mb-8 p-6 bg-card border border-border rounded-lg shadow-md">
        <div className="flex items-center gap-3 mb-2">
            <StatusIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">
            Animals: {formattedStatusName}
            </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          {statusPageDescription}
        </p>
      </div>

      {error ? (
        <div className="text-center py-16">
          <ListFilter size={48} className="mx-auto text-destructive mb-4" />
          <p className="text-xl text-destructive">{error}</p>
          <Link href="/explore/conservation" className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Choose a different status
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
          <StatusIcon size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">
            No animals found with the status "{formattedStatusName}" in our current database.
          </p>
           <p className="text-sm text-muted-foreground mt-2">
            This could be because the status is very rare, data is still being compiled, or our database is still growing. For "Not Evaluated", species haven't yet been assessed against IUCN criteria.
           </p>
        </div>
      )}
    </div>
  );
}

