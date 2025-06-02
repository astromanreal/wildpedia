
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Loader2, HelpCircle, ShieldAlert, ListTree, Sprout, Type, Droplets, MountainIcon as Mountain, SunIcon, WavesIcon, TreePineIcon, ShellIcon, BugIcon, FlowerIcon, PawPrint, Bird, FishIcon as Fish, Skull, Leaf, Squirrel, Dna, Home, Globe, UserCheck, Undo2, Brain, Map, Snowflake } from 'lucide-react';
import { getAllHabitats, type HabitatInfo } from '@/services/habitat-info';
import type { AnimalCategory, ConservationStatus } from '@/services/animal-info';
import CategoryItemCard, { type CategoryItemCardProps } from '@/components/explore/category-item-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

// Inline SVG for Spider as it's not in lucide-react
const SpiderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"/>
    <path d="M12 6.5C12 10.09 14.69 13 18 13"/>
    <path d="M18 13c3.31 0 6-2.91 6-6.5S21.31 0 18 0a6.47 6.47 0 0 0-3.49.96"/>
    <path d="M12 13v11"/>
    <path d="M9 20c-2.67.83-4.33.83-7 0"/>
    <path d="M15 20c2.67.83 4.33.83 7 0"/>
    <path d="M3.5 15.5c-1.33.67-2.33.67-3.5 0"/>
    <path d="M20.5 15.5c1.33.67 2.33.67 3.5 0"/>
  </svg>
);


interface CategoryViewProps {
  category: string;
}

const conservationStatusList: { name: ConservationStatus; slug: string; icon: React.ElementType, description: string }[] = [
  { name: 'Extinct', slug: 'extinct', icon: Skull, description: "No known individuals remaining." },
  { name: 'Extinct in the Wild', slug: 'extinct-in-the-wild', icon: ShieldAlert, description: "Known only to survive in captivity or as a naturalized population well outside the past range." },
  { name: 'Critically Endangered', slug: 'critically-endangered', icon: ShieldAlert, description: "Extremely high risk of extinction in the wild." },
  { name: 'Endangered', slug: 'endangered', icon: ShieldAlert, description: "Very high risk of extinction in the wild." },
  { name: 'Vulnerable', slug: 'vulnerable', icon: ShieldAlert, description: "High risk of extinction in the wild." },
  { name: 'Near Threatened', slug: 'near-threatened', icon: ShieldAlert, description: "Likely to become endangered in the near future." },
  { name: 'Least Concern', slug: 'least-concern', icon: ShieldAlert, description: "Lowest risk. Does not qualify for a more at-risk category." },
  { name: 'Data Deficient', slug: 'data-deficient', icon: HelpCircle, description: "Not enough data to make an assessment of its risk of extinction." },
  { name: 'Not Evaluated', slug: 'not-evaluated', icon: HelpCircle, description: "Has not yet been evaluated against the criteria." },
];

const animalTypeList: { name: AnimalCategory; slug: string; icon: React.ElementType, description: string }[] = [
  { name: 'Mammal', slug: 'mammal', icon: PawPrint, description: "Warm-blooded vertebrates with hair/fur." },
  { name: 'Bird', slug: 'bird', icon: Bird, description: "Warm-blooded vertebrates with feathers and wings." },
  { name: 'Reptile', slug: 'reptile', icon: Skull, description: "Cold-blooded vertebrates, typically with scales." }, // Skull as placeholder
  { name: 'Amphibian', slug: 'amphibian', icon: Leaf, description: "Cold-blooded vertebrates that start life in water." }, // Leaf as placeholder
  { name: 'Fish', slug: 'fish', icon: Fish, description: "Aquatic vertebrates with gills and fins." },
  { name: 'Insect', slug: 'insect', icon: BugIcon, description: "Arthropods with six legs and a three-part body." },
  { name: 'Arachnid', slug: 'arachnid', icon: SpiderIcon, description: "Arthropods with eight legs, like spiders and scorpions." },
  { name: 'Mollusk', slug: 'mollusk', icon: ShellIcon, description: "Invertebrates like snails, clams, and octopuses." },
  { name: 'Marine Mammal', slug: 'marine-mammal', icon: WavesIcon, description: "Mammals that live primarily in marine environments." },
  { name: 'Other Invertebrate', slug: 'other-invertebrate', icon: Squirrel, description: "Animals without a backbone, not fitting other categories." }, // Squirrel placeholder
  { name: 'Other', slug: 'other', icon: HelpCircle, description: "Animals not fitting into the primary categories." },
];

interface FamilyItem {
  name: string;
  slug: string;
  examples: string;
  icon?: React.ElementType;
  tagline?: string;
}

interface FamilyClassGroup {
  className: string;
  classIcon: React.ElementType;
  families: FamilyItem[];
}

const familyData: FamilyClassGroup[] = [
  {
    className: 'Mammalian Families',
    classIcon: PawPrint,
    families: [
      { name: 'Felidae (Cats)', slug: 'felidae', examples: 'Lions, Tigers, Leopards, Domestic Cats', icon: Dna, tagline: 'Agile predators with retractable claws and keen senses.' },
      { name: 'Canidae (Dogs)', slug: 'canidae', examples: 'Wolves, Foxes, Jackals, Domestic Dogs', icon: Dna, tagline: 'Intelligent and social carnivores, often pack hunters.' },
      { name: 'Ursidae (Bears)', slug: 'ursidae', examples: 'Grizzly Bear, Polar Bear, Panda', icon: Dna, tagline: 'Large, powerful omnivores found in diverse habitats.' },
      { name: 'Hominidae (Great Apes)', slug: 'hominidae', examples: 'Humans, Gorillas, Chimpanzees, Orangutans', icon: Dna, tagline: 'Highly intelligent primates with complex social structures.' },
      { name: 'Elephantidae (Elephants)', slug: 'elephantidae', examples: 'African Elephant, Asian Elephant', icon: Dna, tagline: 'The largest land animals, known for their trunks and tusks.' },
      { name: 'Cervidae (Deer)', slug: 'cervidae', examples: 'Moose, Reindeer, Elk, White-tailed Deer', icon: Dna, tagline: 'Herbivorous mammals characterized by antlers in most males.' },
      { name: 'Bovidae (Cattle)', slug: 'bovidae', examples: 'Buffalo, Antelope, Bison, Cows', icon: Dna, tagline: 'Diverse family of ruminant herbivores, many with horns.' },
    ]
  },
  {
    className: 'Avian (Bird) Families',
    classIcon: Bird,
    families: [
      { name: 'Accipitridae (Raptors)', slug: 'accipitridae', examples: 'Eagles, Hawks, Kites, Buzzards', icon: Dna, tagline: 'Skilled hunters dominating the skies with sharp talons and keen eyesight.' },
      { name: 'Strigidae (Owls)', slug: 'strigidae', examples: 'Barn Owl, Snowy Owl, Great Horned Owl', icon: Dna, tagline: 'Nocturnal birds of prey known for silent flight and exceptional hearing.' },
      { name: 'Anatidae (Waterfowl)', slug: 'anatidae', examples: 'Ducks, Geese, Swans', icon: Dna, tagline: 'Aquatic birds adapted for swimming, diving, and often long-distance migration.' },
      { name: 'Psittacidae (Parrots)', slug: 'psittacidae', examples: 'Macaws, Parakeets, Cockatoos', icon: Dna, tagline: 'Colorful and intelligent birds known for mimicry and strong social bonds.' },
      { name: 'Columbidae (Pigeons)', slug: 'columbidae', examples: 'Doves, Pigeons', icon: Dna, tagline: 'Adaptable birds with remarkable navigation skills, found worldwide.' },
    ]
  },
  {
    className: 'Reptilian Families',
    classIcon: Skull,
    families: [
      { name: 'Crocodylidae (Crocodiles)', slug: 'crocodylidae', examples: 'Nile Crocodile, Saltwater Crocodile', tagline: 'Powerful ambush predators from riverbanks and estuaries.', icon: Dna },
      { name: 'Testudinidae (Tortoises)', slug: 'testudinidae', examples: 'Galápagos Tortoise, Indian Star Tortoise', tagline: 'Long-lived, land-dwelling reptiles with armored shells.', icon: Dna },
      { name: 'Viperidae (Vipers)', slug: 'viperidae', examples: 'Russell’s Viper, Gaboon Viper', tagline: 'Venomous snakes with hinged fangs and lightning-fast strikes.', icon: Dna },
      { name: 'Elapidae (Cobras & Coral Snakes)', slug: 'elapidae', examples: 'King Cobra, Black Mamba', tagline: 'Agile neurotoxic predators with a fearsome reputation.', icon: Dna },
    ]
  },
  {
    className: 'Amphibian Families',
    classIcon: Leaf,
    families: [
      { name: 'Bufonidae (True Toads)', slug: 'bufonidae', examples: 'American Toad, Cane Toad', tagline: 'Warty-skinned ground-dwellers known for their toxic defenses.', icon: Dna },
      { name: 'Hylidae (Tree Frogs)', slug: 'hylidae', examples: 'Red-eyed Tree Frog, Gray Tree Frog', tagline: 'Lightweight climbers with strong toes and vivid colors.', icon: Dna },
      { name: 'Salamandridae (Salamanders & Newts)', slug: 'salamandridae', examples: 'Fire Salamander, Eastern Newt', tagline: 'Moist-skinned creatures with remarkable regeneration abilities.', icon: Dna },
    ]
  },
  {
    className: 'Fish Families',
    classIcon: Fish,
    families: [
      { name: 'Salmonidae (Salmon & Trout)', slug: 'salmonidae', examples: 'Atlantic Salmon, Rainbow Trout', tagline: 'Cold-water fish known for epic upstream migrations.', icon: Dna },
      { name: 'Cyprinidae (Carps & Minnows)', slug: 'cyprinidae', examples: 'Common Carp, Goldfish', tagline: 'The most diverse freshwater family — adaptable and ornamental.', icon: Dna },
      { name: 'Serranidae (Groupers)', slug: 'serranidae', examples: 'Giant Grouper, Nassau Grouper', tagline: 'Reef-dwelling giants with ambush hunting tactics.', icon: Dna },
      { name: 'Chondrichthyans (Cartilaginous Fish)', slug: 'chondrichthyans', examples: 'Great White Shark, Manta Ray', tagline: 'Ancient fish with skeletons of cartilage — sharks, rays, and more.', icon: Dna },
    ]
  },
  {
    className: 'Insect Families',
    classIcon: BugIcon,
    families: [
      { name: 'Formicidae (Ants)', slug: 'formicidae', examples: 'Red Ants, Carpenter Ants', tagline: 'Social masterminds that build vast underground empires.', icon: Dna },
      { name: 'Apidae (Bees)', slug: 'apidae', examples: 'Honeybee, Bumblebee', tagline: 'Pollination pros with complex colonies and communication.', icon: Dna },
      { name: 'Culicidae (Mosquitoes)', slug: 'culicidae', examples: 'Aedes, Anopheles', tagline: 'Tiny but impactful — vectors of major diseases.', icon: Dna },
      { name: 'Coccinellidae (Ladybugs)', slug: 'coccinellidae', examples: 'Seven-spot Ladybird, Asian Lady Beetle', tagline: 'Nature’s pest control — colorful, charming, and helpful.', icon: Dna },
    ]
  },
  {
    className: 'Arachnid Families',
    classIcon: SpiderIcon,
    families: [
      { name: 'Theraphosidae (Tarantulas)', slug: 'theraphosidae', examples: 'Goliath Birdeater, Pinktoe Tarantula', tagline: 'Hairy giants of the spider world — slow-moving, but powerful hunters.', icon: Dna },
      { name: 'Lycosidae (Wolf Spiders)', slug: 'lycosidae', examples: 'Rabid Wolf Spider', tagline: 'Agile, ground-dwelling stalkers with keen eyesight.', icon: Dna },
      { name: 'Scorpionidae (Scorpions)', slug: 'scorpionidae', examples: 'Emperor Scorpion', tagline: 'Armored survivors from ancient times, armed with venomous stingers.', icon: Dna },
    ]
  },
  {
    className: 'Mollusk Families',
    classIcon: ShellIcon,
    families: [
      { name: 'Octopodidae (Octopuses)', slug: 'octopodidae', examples: 'Common Octopus, Giant Pacific Octopus', tagline: 'Masters of disguise with brilliant minds and no bones.', icon: Dna },
      { name: 'Muricidae (Sea Snails)', slug: 'muricidae', examples: 'Murex Snail', tagline: 'Beautiful shells, ancient predators of the tidepools.', icon: Dna },
      { name: 'Veneridae (Clams)', slug: 'veneridae', examples: 'Hard Clam, Manila Clam', tagline: 'Buried filter-feeders — quietly cleaning our oceans.', icon: Dna },
    ]
  },
];

const continentData: { name: string, slug: string, icon: React.ElementType, examples: string }[] = [
    { name: 'Africa', slug: 'africa', icon: Globe, examples: 'Lions, elephants, giraffes, meerkats' },
    { name: 'Asia', slug: 'asia', icon: Globe, examples: 'Tigers, pandas, snow leopards, cobras' },
    { name: 'Europe', slug: 'europe', icon: Globe, examples: 'Red foxes, brown bears, lynxes' },
    { name: 'North America', slug: 'north-america', icon: Globe, examples: 'Grizzly bears, bald eagles, raccoons' },
    { name: 'South America', slug: 'south-america', icon: Globe, examples: 'Jaguars, capybaras, anacondas' },
    { name: 'Australia & Oceania', slug: 'australia-oceania', icon: Globe, examples: 'Kangaroos, koalas, cassowaries' },
    { name: 'Antarctica', slug: 'antarctica', icon: Snowflake, examples: 'Penguins, seals, orcas' },
];

const subregionData: { name: string, slug: string, icon: React.ElementType, description: string }[] = [
    { name: 'Rainforests (Amazon, Congo)', slug: 'rainforests', icon: TreePineIcon, description: 'Lush, biodiverse ecosystems teeming with life.' },
    { name: 'Savannas (Serengeti)', slug: 'savannas', icon: FlowerIcon, description: 'Vast grasslands supporting iconic herbivores and predators.' },
    { name: 'Deserts (Sahara, Gobi)', slug: 'deserts', icon: SunIcon, description: 'Arid landscapes home to specially adapted species.' },
    { name: 'Mountains (Himalayas, Andes)', slug: 'mountains', icon: Mountain, description: 'High-altitude environments with unique flora and fauna.' },
    { name: 'Polar Regions (Arctic, Antarctic)', slug: 'polar-regions', icon: Snowflake, description: 'Icy realms of extreme cold and specialized wildlife.' },
    { name: 'Islands (Madagascar, Galápagos)', slug: 'islands', icon: Map, description: 'Isolated havens fostering unique evolutionary paths.' },
];


export default function CategoryView({ category: mainCategorySlug }: CategoryViewProps) {
  const [itemsToDisplay, setItemsToDisplay] = useState<CategoryItemCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageTitle, setPageTitle] = useState('Explore');
  const [pageDescription, setPageDescription] = useState('Browse different categories.');

  const formattedMainCategoryName = mainCategorySlug
    ? mainCategorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : 'Categories';

  useEffect(() => {
    const loadCategoryItems = async () => {
      setIsLoading(true);
      setError(null);
      let loadedItems: CategoryItemCardProps[] = [];
      let tempPageTitle = `Explore ${formattedMainCategoryName}`;
      let tempPageDescription = `Browse sub-categories within ${formattedMainCategoryName.toLowerCase()}.`;

      try {
        if (mainCategorySlug === 'habitat') {
          const habitats = await getAllHabitats();
          loadedItems = habitats.map(h => ({
            id: h.id,
            name: h.name,
            description: h.description.substring(0, 100) + (h.description.length > 100 ? '...' : ''),
            icon: h.icon,
            link: `/habitats/${h.id}`,
          }));
          tempPageTitle = 'Explore Wildlife Habitats';
          tempPageDescription = 'Discover animals based on their natural environments like forests, oceans, or deserts.';
        } else if (mainCategorySlug === 'conservation') {
          loadedItems = conservationStatusList.map(s => ({
            id: s.slug,
            name: s.name,
            description: s.description,
            icon: s.icon,
            link: `/explore/conservation/${s.slug}`,
          }));
          tempPageTitle = 'Explore by Conservation Status';
          tempPageDescription = 'Learn about animals based on their IUCN Red List status (e.g., Endangered, Vulnerable).';
        } else if (mainCategorySlug === 'type') {
           tempPageTitle = 'Explore by Animal Type';
           tempPageDescription = 'Discover the incredible diversity of animal life on Earth. From mammals roaming the land to marine creatures swimming in our oceans, every type plays a crucial role in nature’s balance. Explore each category below:';
           loadedItems = animalTypeList.map(t => ({
             id: t.slug,
             name: t.name,
             description: t.description,
             icon: t.icon,
             link: `/explore/type/${t.slug}`,
           }));
        } else if (mainCategorySlug === 'family') {
          if (formattedMainCategoryName === 'Reptilian Families') {
             tempPageDescription = 'Reptiles are ancient survivors, with evolutionary roots tracing back over 300 million years. Explore their biological families to discover the diverse, specialized adaptations of crocodiles, tortoises, vipers, and cobras.';
          } else if (formattedMainCategoryName === 'Avian (Bird) Families') {
              tempPageDescription = 'Birds belong to diverse biological families, each with distinct behaviors, adaptations, and environments. From powerful raptors to colorful parrots, discover how feathered lifeforms evolved across the skies.';
          } else if (formattedMainCategoryName === 'Amphibian Families') {
              tempPageDescription = 'Amphibians are nature’s environmental indicators — sensitive to water, climate, and pollution. Grouping them by biological family reveals fascinating adaptations, from burrowing toads to tree-dwelling frogs and vibrant salamanders.';
          } else if (formattedMainCategoryName === 'Fish Families') {
             tempPageDescription = 'From shimmering salmon in northern rivers to powerful sharks of the deep sea, fish families span a vast evolutionary spectrum. Explore species grouped by biological families to uncover their unique traits, behaviors, and aquatic ecosystems.';
          } else if (formattedMainCategoryName === 'Insect Families') {
             tempPageDescription = 'Insects are the most diverse group of animals on Earth. Discover how different species of ants, bees, mosquitoes, and ladybugs are grouped into biological families — revealing surprising traits, evolutionary connections, and ecological roles.';
          } else if (formattedMainCategoryName === 'Arachnid Families') {
            tempPageDescription = 'From tarantulas to scorpions, arachnids are a fascinating group of eight-legged creatures. Exploring them by biological family reveals their evolutionary paths, hunting strategies, and environmental adaptations.';
          } else if (formattedMainCategoryName === 'Mollusk Families') {
            tempPageDescription = 'Soft-bodied, often shelled, and remarkably diverse — mollusks span from the intelligent octopus to the humble sea snail. Exploring them by family reveals evolutionary ingenuity in form, function, and habitat.';
          }
          else {
             tempPageDescription = 'Animals are grouped into biological families based on shared evolutionary traits. Explore how lions are related to your house cat or how pandas and polar bears share a surprising ancestor.';
          }
          tempPageTitle = 'Explore by Biological Family';
          loadedItems = [];
        } else if (mainCategorySlug === 'domesticity') {
          tempPageTitle = 'Understanding Animal Domesticity';
          tempPageDescription = 'Explore the distinctions between domesticated, wild, tamed, and feral animals, and their significance.';
          loadedItems = []; 
        } else if (mainCategorySlug === 'region') {
            tempPageTitle = 'Explore Wildlife by Geographic Region';
            tempPageDescription = 'Discover animals from different continents and major biogeographic regions around the world.';
            loadedItems = [];
        }
         else {
          setError(`Detailed breakdown for "${formattedMainCategoryName}" is coming soon! This category requires more specific data setup.`);
          tempPageTitle = `Explore ${formattedMainCategoryName}`;
          tempPageDescription = `Information about ${formattedMainCategoryName.toLowerCase()} will be available soon.`;
          loadedItems = [];
        }
        setItemsToDisplay(loadedItems);
        setPageTitle(tempPageTitle);
        setPageDescription(tempPageDescription);
        document.title = `${tempPageTitle} | Wildpedia`;

      } catch (err: any) {
        console.error("Error loading category items:", err);
        const errorMsg = `Failed to load items for "${formattedMainCategoryName}". ${err.message || ''}`;
        setError(errorMsg);
        setItemsToDisplay([]);
        setPageTitle(`Error - ${formattedMainCategoryName}`);
        setPageDescription(errorMsg);
        document.title = `Error | Wildpedia`;
      } finally {
        setIsLoading(false);
      }
    };

    if (mainCategorySlug) {
      loadCategoryItems();
    } else {
      setIsLoading(false);
      setError("No category specified.");
      setPageTitle('Explore Categories');
      setPageDescription('Please select a category to explore.');
      document.title = `Explore Categories | Wildpedia`;
    }
  }, [mainCategorySlug, formattedMainCategoryName]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
     return (
       <div className="container mx-auto py-12 px-4 text-center">
         <HelpCircle size={48} className="mx-auto text-muted-foreground mb-4" />
         <p className="text-xl text-muted-foreground">{error}</p>
         <Link href="/explore" className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
           Back to Categories
         </Link>
       </div>
     );
  }


  if (mainCategorySlug === 'domesticity') {
    return (
        <div className="container mx-auto py-12 px-4">
            <Link href="/explore" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">&larr; Back to Explore Categories</Link>
            <h1 className="mb-2 text-4xl font-bold tracking-tight text-primary">{pageTitle}</h1>
            <p className="mb-10 text-lg text-muted-foreground max-w-3xl">{pageDescription}</p>

            <div className="space-y-8">
                <Card className="bg-card border border-border shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                            <Brain className="h-6 w-6 text-accent" /> What is Domestication?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-foreground">
                        <p>Domestication is a complex, multi-generational process where a population of animals becomes adapted to living in close proximity to humans and under human control. This process involves genetic changes that affect an animal's behavior, physiology, and appearance, making them distinct from their wild ancestors.</p>
                        <p>It's important to distinguish domestication from <strong className="text-accent">taming</strong>. Taming refers to an individual wild animal becoming habituated to human presence, often through hand-rearing. A tamed animal is not domesticated; its offspring will still be wild. Domestication is a genetic change occurring in an entire population over many generations.</p>
                         <Image src="https://placehold.co/600x300.png?text=Domestication+Concept" alt="Illustration of domestication concept" width={600} height={300} className="w-full h-auto rounded-md my-3 object-cover border" data-ai-hint="domestication farm animals human interaction" />
                    </CardContent>
                </Card>

                <Card className="bg-card border border-border shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                            <Home className="h-6 w-6 text-accent" /> Domesticated Animals
                        </CardTitle>
                         <CardDescription>Animals selectively bred by humans over generations for specific purposes.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-foreground">
                        <p><strong className="text-primary">Characteristics:</strong> Often rely on humans for food and shelter, may exhibit neoteny (retention of juvenile traits), bred for specific traits (e.g., milk production, temperament, companionship), generally less fearful of humans.</p>
                        <p><strong className="text-primary">Examples:</strong></p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li><strong>Dogs (Canis familiaris):</strong> Bred for companionship, hunting, herding, guarding.</li>
                            <li><strong>Cats (Felis catus):</strong> Initially for pest control, now primarily for companionship.</li>
                            <li><strong>Cattle (Bos taurus/indicus):</strong> For meat, milk, and draft power.</li>
                            <li><strong>Chickens (Gallus gallus domesticus):</strong> For eggs and meat.</li>
                            <li><strong>Horses (Equus caballus):</strong> For transportation, work, and recreation.</li>
                            <li><strong>Sheep (Ovis aries) & Goats (Capra aegagrus hircus):</strong> For wool, milk, and meat.</li>
                        </ul>
                        <p className="mt-3 italic text-muted-foreground text-sm">Detailed listings of domesticated animals coming soon.</p>
                    </CardContent>
                </Card>

                <Card className="bg-card border border-border shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                            <Globe className="h-6 w-6 text-accent" /> Wild Animals
                        </CardTitle>
                        <CardDescription>Animals living in their natural habitat, not under direct human control.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-foreground">
                        <p><strong className="text-primary">Characteristics:</strong> Live independently of humans, exhibit natural behaviors and instincts, not genetically altered by human selection (though their populations and habitats are often impacted by human activities).</p>
                        <p><strong className="text-primary">Examples:</strong></p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li><strong>Lions, Tigers, Bears:</strong> Apex predators in their respective ecosystems.</li>
                            <li><strong>Deer, Eagles, Wolves:</strong> Common examples of wild fauna.</li>
                            <li><strong>Elephants, Rhinos, Giraffes:</strong> Iconic megafauna of savannas and forests.</li>
                        </ul>
                         <p className="mt-3 italic text-muted-foreground text-sm">Explore our animal database for detailed profiles of various wild species.</p>
                    </CardContent>
                </Card>

                <Card className="bg-card border border-border shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                            <UserCheck className="h-6 w-6 text-accent" /> Tamed Animals
                        </CardTitle>
                        <CardDescription>Individual wild animals habituated to human presence but not genetically domesticated.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-foreground">
                        <p><strong className="text-primary">Characteristics:</strong> Individual wild animals that have lost their fear of humans, often through prolonged contact or hand-rearing. They retain their wild instincts and are not genetically different from their wild counterparts. Taming does not result in heritable changes.</p>
                        <p><strong className="text-primary">Examples:</strong> A hand-reared fox that interacts with humans, a wild bird that regularly takes food from a person's hand. Historically, some circus animals were tamed wild animals (though this practice has significant ethical concerns).</p>
                        <p className="font-semibold text-primary">Important Note:</p>
                        <p>Taming wild animals can be dangerous and is often detrimental to the animal's well-being and ability to survive in the wild. It is generally discouraged and often illegal without special permits. True domestication involves genetic adaptation over many generations.</p>
                    </CardContent>
                </Card>

                 <Card className="bg-card border border-border shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                            <Undo2 className="h-6 w-6 text-accent" /> Feral Animals
                        </CardTitle>
                        <CardDescription>Domesticated animals that have returned to live in a wild or semi-wild state.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-foreground">
                        <p><strong className="text-primary">Characteristics:</strong> Descendants of domesticated animals that now live and reproduce in the wild, without direct human intervention. They may exhibit some behaviors adapted to wild living but are genetically still considered domesticated.</p>
                        <p><strong className="text-primary">Examples:</strong></p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li><strong>Feral Cats:</strong> Domestic cats living wild, often impacting native bird and small mammal populations.</li>
                            <li><strong>Feral Pigeons (Rock Doves):</strong> Common in cities, descended from domesticated pigeons.</li>
                            <li><strong>Feral Pigs/Hogs:</strong> Descendants of domestic pigs, can cause significant ecological damage.</li>
                            <li><strong>Mustangs (North American Wild Horses):</strong> Descendants of horses brought by Europeans.</li>
                        </ul>
                        <p><strong className="text-primary">Ecological Impact:</strong> Feral animals can sometimes have negative impacts on native ecosystems by competing with native wildlife, predating on them, or damaging habitats.</p>
                    </CardContent>
                </Card>

                <Card className="bg-card border border-border shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
                            <HelpCircle className="h-6 w-6 text-accent" /> Why Understanding Domesticity Matters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-foreground">
                       <p>Understanding the differences between these categories is crucial for several reasons:</p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li><strong>Conservation:</strong> Effective conservation strategies often depend on distinguishing between truly wild populations and feral populations. Feral animals might require different management approaches.</li>
                            <li><strong>Animal Welfare:</strong> The needs of domesticated animals (often reliant on human care) differ significantly from those of wild animals. Ethical treatment considers these distinctions.</li>
                            <li><strong>Agriculture & Society:</strong> Domesticated animals play a vital role in human societies for food, companionship, work, and research.</li>
                            <li><strong>Ecology:</strong> Understanding the origins and impacts of feral animals is important for managing ecosystems.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
  }

  if (mainCategorySlug === 'region') {
    return (
      <div className="container mx-auto py-12 px-4">
        <Link href="/explore" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">&larr; Back to Explore Categories</Link>
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-primary">{pageTitle}</h1>
        <p className="mb-10 text-lg text-muted-foreground max-w-3xl">{pageDescription}</p>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-6 flex items-center gap-3">
            <Globe className="h-7 w-7 text-accent" />
            Continents
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 perspective-1000">
            {continentData.map((continent) => (
              <CategoryItemCard
                key={continent.slug}
                id={continent.slug}
                name={continent.name}
                description={`E.g., ${continent.examples}`}
                icon={continent.icon}
                link={`/explore/region/${continent.slug}`} 
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-primary mb-6 flex items-center gap-3">
            <Map className="h-7 w-7 text-accent" />
            Subregions & Biomes
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 perspective-1000">
            {subregionData.map((subregion) => (
              <CategoryItemCard
                key={subregion.slug}
                id={subregion.slug}
                name={subregion.name}
                description={subregion.description}
                icon={subregion.icon}
                link={`/explore/region/${subregion.slug}`} 
              />
            ))}
          </div>
        </section>
      </div>
    );
  }


  return (
    <div className="container mx-auto py-12 px-4">
      <Link href="/explore" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">&larr; Back to Explore Categories</Link>
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-primary">{pageTitle}</h1>
      <p className="mb-8 text-lg text-muted-foreground max-w-3xl">{pageDescription}</p>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : error ? (
         <div className="text-center py-16">
            <HelpCircle size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">{error}</p>
            <Link href="/explore" className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Back to Categories
            </Link>
         </div>
      ) : mainCategorySlug === 'family' ? (
        <div className="space-y-12"> {/* Increased space between family class groups */}
          {familyData.map((group) => {
            const GroupIcon = group.classIcon;
            return (
              <section key={group.className}>
                <h2 className="text-3xl font-semibold text-primary mb-6 flex items-center gap-2 border-b border-border/50 pb-3"> {/* Enhanced section title */}
                  <GroupIcon className="h-8 w-8 text-accent" /> {/* Slightly larger icon */}
                  {group.className}
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 perspective-1000">
                  {group.families.map((family) => (
                    <CategoryItemCard
                      key={family.slug}
                      id={family.slug}
                      name={family.name}
                      description={family.tagline || family.examples}
                      icon={family.icon || Dna}
                      link={`/explore/family/${family.slug}`}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : itemsToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 perspective-1000">
          {itemsToDisplay.map((item) => (
            <CategoryItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              icon={item.icon}
              link={item.link}
            />
          ))}
        </div>
      ) : (
        !error && <p className="text-center text-muted-foreground mt-12">No items found in the '{formattedMainCategoryName}' category yet, or this section is under construction.</p>
      )}
    </div>
  );
}

