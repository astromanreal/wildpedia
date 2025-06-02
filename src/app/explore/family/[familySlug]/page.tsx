
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Dna, ListTree, HelpCircle, PawPrint, Utensils, ShieldCheck, Info, HomeIcon, Leaf, MessageCircle, Activity, Bird, Skull, Fish, Bug, Shell } from 'lucide-react';
import Image from 'next/image';
import type { ConservationStatus } from '@/services/animal-info';

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

// Lucide Icons for broader categories (if needed)
const BirdIcon = Bird;
const SkullIcon = Skull;
const LeafIcon = Leaf; // For Amphibians, already used
const FishIcon = Fish;
const BugIcon = Bug;
const ShellIcon = Shell;


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

interface FamilyMemberExample {
    id: string;
    name: string;
    habitat: string;
    diet?: string;
    status: ConservationStatus;
    interestingFact?: string;
    traits?: string;
    behavior?: string;
    imageUrl?: string;
    dataAiHint: string;
}

interface FamilyDetail {
  displayName: string;
  slug: string;
  introduction: string;
  heroImageHint: string;
  icon: React.ElementType;
  exampleMembers?: FamilyMemberExample[];
  evolutionaryInsights?: string;
}

// Helper function to determine the badge color based on conservation status
function getConservationStatusColorClass(status: ConservationStatus): string {
  switch (status) {
    case 'Critically Endangered':
    case 'Endangered':
      return 'bg-destructive/20 text-destructive border-destructive/30';
    case 'Vulnerable':
      return 'bg-orange-500/20 text-orange-600 border-orange-500/30 dark:text-orange-400';
    case 'Near Threatened':
      return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30 dark:text-yellow-400';
    case 'Least Concern':
      return 'bg-green-500/20 text-green-600 border-green-500/30 dark:text-green-400';
    case 'Extinct':
    case 'Extinct in the Wild':
      return 'bg-gray-700/20 text-gray-300 border-gray-700/30';
    case 'Data Deficient':
    case 'Not Evaluated':
    default:
      return 'bg-muted/50 text-muted-foreground border-muted-foreground/30';
  }
}

const familyDetailsMap: Record<string, FamilyDetail> = {
  'felidae': {
    displayName: 'Felidae – The Cat Family',
    slug: 'felidae',
    icon: Dna,
    introduction: 'The Felidae family includes all wild and domestic cats, from the mighty lion to the familiar house cat. Known for their retractable claws (in most species), sharp vision, and stealthy hunting prowess, felines have adapted to diverse environments across every continent except Antarctica and Australia (though domestic cats are now global).',
    heroImageHint: 'felidae family collage tiger lion leopard domestic cat',
    exampleMembers: [
        { id: 'lion', name: 'Lion (Panthera leo)', habitat: 'Savannas, grasslands', diet: 'Carnivore', status: 'Vulnerable', interestingFact: 'Lives in prides and is the only social big cat.', dataAiHint: 'lion savanna pride' },
        { id: 'tiger', name: 'Tiger (Panthera tigris)', habitat: 'Forests and mangroves', diet: 'Carnivore', status: 'Endangered', interestingFact: 'Largest of the big cats, with unique stripe patterns.', dataAiHint: 'tiger jungle stripes' },
        { id: 'domestic-cat', name: 'Domestic Cat (Felis catus)', habitat: 'Global (with humans)', diet: 'Carnivore', status: 'Not Evaluated', interestingFact: 'Domesticated around 9,000 years ago.', traits: 'Night vision, hunting instinct, purring', dataAiHint: 'domestic cat playing home' },
    ],
    evolutionaryInsights: '**Key Traits:**\n- Retractable claws (most species)\n- Excellent night vision\n- Powerful bite force\n- Highly developed senses of smell and hearing\n\n**Adaptations:**\n- Stealthy hunting techniques\n- Diverse coat patterns for camouflage\n- Specialized teeth for tearing flesh\n\n**Evolutionary Tree (Simplified):**\n→ Common Ancestor\n    ├── Panthera (Lions, Tigers, Leopards, Jaguars)\n    ├── Felis (Domestic Cats, Wildcat)\n    └── Other Genera (Cheetahs, Pumas, Lynx, etc.)'
  },
  'canidae': {
    displayName: 'Canidae – The Dog Family',
    slug: 'canidae',
    icon: Dna,
    introduction: 'The Canidae family comprises dogs, wolves, foxes, jackals, coyotes, and other extant and extinct dog-like carnivorans. Canids are known for their intelligence, social behaviors (often in packs), and keen senses, particularly smell.',
    heroImageHint: 'canidae family collage wolf fox domestic dog',
    evolutionaryInsights: '**Key Traits:**\n- Non-retractable claws\n- Elongated muzzles and powerful jaws\n- Excellent sense of smell and hearing\n\n**Adaptations:**\n- Pack hunting strategies in many species (e.g., wolves)\n- Diverse vocalizations for communication\n- Endurance for long-distance pursuit\n\n**Domestication:**\n- Dogs (Canis familiaris) were among the first animals domesticated by humans, leading to a vast array of breeds.'
  },
  'ursidae': {
    displayName: 'Ursidae – The Bear Family',
    slug: 'ursidae',
    icon: Dna,
    introduction: 'The Ursidae family includes bears, which are large, heavily built omnivorous mammals. They are found in diverse habitats across the Northern Hemisphere and parts of the Southern Hemisphere.',
    heroImageHint: 'ursidae family collage grizzly bear polar bear panda',
    evolutionaryInsights: '**Key Traits:**\n- Large, stocky bodies with powerful limbs\n- Plantigrade feet (walk on soles)\n- Non-retractable claws\n\n**Adaptations:**\n- Omnivorous diet in most species (exceptions: polar bear - carnivore, giant panda - herbivore)\n- Hibernation or winter lethargy in some species\n- Excellent sense of smell\n\n**Diversity:**\n- Ranges from the Arctic polar bear to tropical sun bears.'
  },
  'hominidae': {
    displayName: 'Hominidae – The Great Ape Family',
    slug: 'hominidae',
    icon: Dna,
    introduction: 'The Hominidae family, also known as great apes, includes humans, chimpanzees, gorillas, and orangutans. They are characterized by large brains, complex social behavior, and a lack of tails.',
    heroImageHint: 'hominidae family collage human chimpanzee gorilla orangutan',
    evolutionaryInsights: '**Key Traits:**\n- Large relative brain size\n- Opposable thumbs (and sometimes toes)\n- Lack of a tail\n- Complex social structures\n\n**Adaptations:**\n- Tool use (especially chimpanzees and humans)\n- Advanced problem-solving abilities\n- Capacity for learning and cultural transmission\n\n**Human Evolution:**\n- Humans (Homo sapiens) share a recent common ancestor with chimpanzees and bonobos. The study of hominids provides crucial insights into human evolution and cognitive abilities.'
  },
   'elephantidae': {
    displayName: 'Elephantidae – The Elephant Family',
    slug: 'elephantidae',
    icon: Dna,
    introduction: 'Elephantidae is the family of elephants and mammoths. Modern elephants are the largest living terrestrial animals, known for their long trunks, large ears, and tusks.',
    heroImageHint: 'elephantidae family african elephant asian elephant mammoth fossil',
    evolutionaryInsights: '**Key Traits:**\n- Long, muscular trunk (proboscis)\n- Large ears for thermoregulation\n- Tusks (modified incisor teeth)\n- Pillar-like legs\n\n**Adaptations:**\n- Complex social structure (matriarchal herds)\n- Advanced intelligence and memory\n- Infrasound communication over long distances\n\n**Evolutionary History:**\n- Descended from a long line of proboscideans, including mammoths and mastodons.'
  },
  'cervidae': {
    displayName: 'Cervidae – The Deer Family',
    slug: 'cervidae',
    icon: Dna,
    introduction: 'The Cervidae family includes deer, elk, moose, and reindeer/caribou. Most male cervids (and female reindeer) grow and shed new antlers each year.',
    heroImageHint: 'cervidae family deer elk moose antlers',
    evolutionaryInsights: '**Key Traits:**\n- Antlers (bony, branched, and shed annually) in most males\n- Herbivorous diet (browsers and grazers)\n- Long legs adapted for running\n\n**Adaptations:**\n- Ruminant digestion\n- Cryptic coloration for camouflage\n- Antlers used for display, defense, and sparring during mating season.'
  },
  'bovidae': {
    displayName: 'Bovidae – The Cattle Family',
    slug: 'bovidae',
    icon: Dna,
    introduction: 'The Bovidae family is diverse, including cattle, goats, sheep, antelope, buffalo, and bison. Most bovids have unbranched horns (unlike deer antlers) that are permanent.',
    heroImageHint: 'bovidae family cattle antelope bison horns',
    evolutionaryInsights: '**Key Traits:**\n- Permanent, unbranched horns (in at least males, often both sexes)\n- Herbivorous diet (grazers and browsers)\n- Four-chambered stomach for ruminant digestion\n\n**Adaptations:**\n- Herding behavior for protection\n- Diverse horn shapes for defense and display\n- Many species adapted for open grasslands and migration\n\n**Domestication:**\n- Many bovid species (cattle, sheep, goats) have been domesticated for millennia.'
  },
  'accipitridae': {
    displayName: 'Accipitridae – The Raptors',
    slug: 'accipitridae',
    icon: Dna,
    introduction: 'Accipitridae includes the most skilled hunters in the bird kingdom — eagles, hawks, kites, and buzzards. These birds are known for sharp talons, keen eyesight, and dominance in the skies.',
    heroImageHint: 'bald eagle flight hawk dive majesty power',
    exampleMembers: [
        { id: 'eagle', name: 'Bald Eagle (Haliaeetus leucocephalus)', habitat: 'North America, near lakes and rivers', diet: 'Fish, small mammals', status: 'Least Concern', interestingFact: 'National bird of the United States.', dataAiHint: 'bald eagle flying fish' },
        { id: 'red-tailed-hawk', name: 'Red-tailed Hawk (Buteo jamaicensis)', habitat: 'Open fields, woodlands', diet: 'Small mammals, reptiles', status: 'Least Concern', interestingFact: 'Known for its piercing cry and soaring circles over open fields.', dataAiHint: 'red tailed hawk soaring field' },
        { id: 'black-kite', name: 'Black Kite (Milvus migrans)', habitat: 'Varied, often near human settlements', diet: 'Scavenger, small animals', status: 'Least Concern', interestingFact: 'Common in Asia and Africa, often seen scavenging.', dataAiHint: 'black kite flying city' },
    ],
    evolutionaryInsights: '**Key Traits:**\n- Hooked beaks for tearing flesh\n- Forward-facing eyes for binocular vision and depth perception\n- Strong feet with sharp talons (claws) for grasping prey\n- Typically solitary nesting behavior.'
  },
  'strigidae': {
    displayName: 'Strigidae – The True Owls',
    slug: 'strigidae',
    icon: Dna,
    introduction: 'Strigidae, or true owls, are a family of nocturnal birds of prey known for their upright stance, large forward-facing eyes, and silent flight. They are highly adapted for hunting in low-light conditions.',
    heroImageHint: 'owl night forest moon silent flight',
    evolutionaryInsights: '**Key Adaptations:**\n- **Nocturnal Vision:** Large eyes gather maximum light.\n- **Facial Discs:** Feathers around the eyes channel sound to their ears.\n- **Silent Flight:** Soft-edged flight feathers muffle sound.\n- **Asymmetrical Ears (in some species):** Allows precise sound localization for hunting in darkness.'
  },
  'anatidae': {
    displayName: 'Anatidae – Ducks, Geese, and Swans',
    slug: 'anatidae',
    icon: Dna,
    introduction: 'The Anatidae family comprises diverse waterfowl such as ducks, geese, and swans. They are adapted to aquatic environments, with webbed feet and waterproof feathers.',
    heroImageHint: 'ducks geese swans water lake migration',
    evolutionaryInsights: '**Key Adaptations:**\n- **Webbed Feet:** For efficient swimming.\n- **Waterproof Feathers:** Oiled feathers keep them dry and buoyant.\n- **Diverse Bill Shapes:** Adapted for different feeding strategies (filtering, grazing, dabbling).\n- **Migratory Behavior:** Many species undertake long seasonal migrations.\n- **Strong Family Bonds:** Often form long-term pair bonds and exhibit parental care.'
  },
  'psittacidae': {
    displayName: 'Psittacidae – True Parrots',
    slug: 'psittacidae',
    icon: Dna,
    introduction: 'Psittacidae, the true parrots, are a large family of colorful and intelligent birds found in tropical and subtropical regions. They are known for their strong beaks and ability to mimic sounds.',
    heroImageHint: 'parrot colorful macaw tropical rainforest mimicry',
    evolutionaryInsights: '**Key Characteristics:**\n- **Strong, Hooked Beaks:** For cracking nuts, seeds, and manipulating objects.\n- **Zygodactyl Feet:** Two toes forward, two backward, for agile climbing and grasping.\n- **High Intelligence:** Capable of problem-solving and complex vocal learning (mimicry).\n- **Vivid Plumage:** Often brightly colored, playing roles in camouflage and communication.\n- **Social Behavior:** Many species are highly social, forming flocks and strong pair bonds.'
  },
  'columbidae': {
    displayName: 'Columbidae – Pigeons and Doves',
    slug: 'columbidae',
    icon: Dna,
    introduction: 'The Columbidae family includes pigeons and doves, which are stout-bodied birds with short necks and short slender bills. They are found worldwide and are known for their remarkable navigation abilities.',
    heroImageHint: 'pigeon dove city flight navigation',
    evolutionaryInsights: '**Key Traits:**\n- **Navigation Skills:** Exceptional homing ability, utilizing magnetic fields, sun, and landmarks.\n- **Crop Milk Production:** Both sexes produce a nutritious "milk" from their crop lining to feed young.\n- **Adaptability:** Many species thrive in diverse environments, including urban areas.\n- **Distinctive Cooing Calls:** Used for communication.'
  },
  'crocodylidae': {
    displayName: 'Crocodylidae – The Crocodile Family',
    slug: 'crocodylidae',
    icon: Dna,
    introduction: 'Crocodylidae represents one of Earth’s oldest surviving predator lineages. These reptiles are masters of stealth and power, often ambushing prey with explosive force. Their lineage dates back to the era of dinosaurs.',
    heroImageHint: 'nile crocodile murky water armored back',
    exampleMembers: [
        { id: 'nile-crocodile', name: 'Nile Crocodile', habitat: 'Sub-Saharan Africa', diet: 'Carnivore', status: 'Least Concern', interestingFact: 'Known to take down prey as large as zebras or buffalo.', dataAiHint: 'nile crocodile ambush prey water' },
        { id: 'saltwater-crocodile', name: 'Saltwater Crocodile', habitat: 'Southeast Asia & Australia', diet: 'Carnivore', status: 'Least Concern', interestingFact: 'Largest living reptile, can swim across open ocean for hundreds of kilometers.', dataAiHint: 'saltwater crocodile swimming ocean' },
    ],
    evolutionaryInsights: '**Key Adaptations:**\n- **Ambush Predator:** Powerful jaws, sharp teeth, and stealthy approach.\n- **Aquatic Lifestyle:** Flattened body and tail for swimming, upward-facing nostrils and eyes.\n- **Thermoregulation:** Bask in sun to raise body temperature, seek shade or water to cool down.\n- **Parental Care:** Some species exhibit nest guarding and care for hatchlings.'
  },
  'testudinidae': {
    displayName: 'Testudinidae – The Tortoise Family',
    slug: 'testudinidae',
    icon: Dna,
    introduction: 'Testudinidae includes land-dwelling chelonians known as tortoises. They are characterized by their heavy, domed shells that provide protection and their slow, deliberate movement. Many species are exceptionally long-lived.',
    heroImageHint: 'galapagos tortoise giant shell dry land',
    exampleMembers: [
        { id: 'galapagos-tortoise', name: 'Galápagos Tortoise', habitat: 'Galápagos Islands', diet: 'Herbivore', status: 'Vulnerable', interestingFact: 'Famous for island gigantism and varying shell shapes.', dataAiHint: 'galapagos tortoise large island endemic' },
        { id: 'indian-star-tortoise', name: 'Indian Star Tortoise', habitat: 'Dry forests, scrublands of India & Sri Lanka', diet: 'Herbivore', status: 'Vulnerable', interestingFact: 'Known for its beautifully patterned star-like shell.', dataAiHint: 'indian star tortoise shell pattern' },
    ],
    evolutionaryInsights: '**Key Characteristics:**\n- **Protective Shell:** High-domed carapace for defense against predators.\n- **Herbivorous Diet:** Primarily feed on grasses, leaves, flowers, and cacti.\n- **Longevity:** Many species are among the longest-living animals on Earth.\n- **Adaptations to Arid Environments:** Ability to conserve water and survive long periods without it.\n- **Island Gigantism/Dwarfism:** Some island species show significant size variations (e.g., Galápagos tortoises).'
  },
  'viperidae': {
    displayName: 'Viperidae – The Viper Family',
    slug: 'viperidae',
    icon: Dna,
    introduction: 'Viperidae is a family of venomous snakes found throughout most of the world, except in Antarctica, Australia, New Zealand, Ireland, Madagascar, Hawaii, and various other isolated islands. All have relatively long, hinged fangs that permit deep penetration and injection of venom.',
    heroImageHint: 'viper snake coiled camouflage venomous',
    exampleMembers: [
        { id: 'russells-viper', name: 'Russell’s Viper', habitat: 'Open grassy areas, farmland in Asia', diet: 'Carnivore (rodents)', status: 'Least Concern', interestingFact: 'One of the most medically significant snakes in Asia due to venom potency.', dataAiHint: 'russells viper snake asia' },
        { id: 'gaboon-viper', name: 'Gaboon Viper', habitat: 'Rainforests and savannas of sub-Saharan Africa', diet: 'Carnivore (mammals, birds)', status: 'Least Concern', interestingFact: 'Possesses the longest fangs of any snake and a very high venom yield.', dataAiHint: 'gaboon viper africa camouflage pattern' },
    ],
    evolutionaryInsights: '**Key Adaptations:**\n- **Venom Delivery System:** Long, hollow, hinged (solenoglyphous) fangs that fold back when not in use.\n- **Heat-Sensing Pits (in pit vipers):** Allow detection of warm-blooded prey in darkness.\n- **Cryptic Camouflage:** Elaborate skin patterns for blending with surroundings.\n- **Ambush Predation:** Typically lie in wait for prey rather than active pursuit.\n- **Diverse Venoms:** Primarily hemotoxic (affecting blood and tissues), but some have neurotoxic components.'
  },
  'elapidae': {
    displayName: 'Elapidae – Cobras, Mambas & Coral Snakes Family',
    slug: 'elapidae',
    icon: Dna,
    introduction: 'Elapidae is a family of venomous snakes characterized by their proteroglyphous (fixed front) fangs. This diverse family includes cobras, mambas, sea snakes, coral snakes, and kraits, many of which possess potent neurotoxic venom.',
    heroImageHint: 'cobra hood display coral snake pattern',
    exampleMembers: [
        { id: 'king-cobra', name: 'King Cobra', habitat: 'Forests of India and Southeast Asia', diet: 'Carnivore (primarily other snakes)', status: 'Vulnerable', interestingFact: 'The world\'s longest venomous snake, known for its hooding display.', dataAiHint: 'king cobra hood display snake' },
        { id: 'black-mamba', name: 'Black Mamba', habitat: 'Savannas and rocky hills of southern and eastern Africa', diet: 'Carnivore (small mammals, birds)', status: 'Least Concern', interestingFact: 'One of the fastest land snakes and highly venomous.', dataAiHint: 'black mamba africa snake fast' },
    ],
    evolutionaryInsights: '**Key Characteristics:**\n- **Fixed Front Fangs:** Relatively short, permanently erect fangs at the front of the mouth.\n- **Potent Venom:** Often primarily neurotoxic (affecting the nervous system), though some species have cardiotoxic or cytotoxic components.\n- **Warning Displays:** Many species exhibit distinct warning behaviors (e.g., cobra hoods, bright colors of coral snakes).\n- **Diverse Lifestyles:** Includes terrestrial, arboreal, and fully marine species (sea snakes).'
  },
  'bufonidae': {
    displayName: 'Bufonidae – The True Toad Family',
    slug: 'bufonidae',
    icon: Dna,
    introduction: 'Bufonidae, commonly known as true toads, are a family of amphibians characterized by their warty skin, stout bodies, and prominent parotoid glands behind their eyes which secrete toxins.',
    heroImageHint: 'cane toad warty skin ground',
    exampleMembers: [
      { id: 'american-toad', name: 'American Toad', habitat: 'Gardens, woodlands, fields', diet: 'Carnivore (insects, worms)', status: 'Least Concern', interestingFact: 'Can eat up to 1,000 insects per day.', dataAiHint: 'american toad garden' },
      { id: 'cane-toad', name: 'Cane Toad', habitat: 'Open grasslands, woodlands (invasive in many areas)', diet: 'Omnivore (opportunistic)', status: 'Least Concern', interestingFact: 'Highly toxic and an invasive species in many countries.', dataAiHint: 'cane toad large invasive' },
    ],
    evolutionaryInsights: '**Key Characteristics:**\n- **Warty Skin:** Dry, bumpy skin providing some protection and aiding camouflage.\n- **Parotoid Glands:** Large glands behind the eyes that secrete bufotoxins, a defense mechanism against predators.\n- **Terrestrial Lifestyle:** Most are ground-dwelling, though some can climb.\n- **Short Limbs:** Adapted for hopping or walking rather than long leaps.'
  },
  'hylidae': {
    displayName: 'Hylidae – The Tree Frog Family',
    slug: 'hylidae',
    icon: Dna,
    introduction: 'Hylidae, or tree frogs, are agile climbers adapted to life in the treetops. With adhesive toe pads and lightweight bodies, they leap between leaves in rainforests, woodlands, and even backyards. Their bright colors often serve as camouflage or warning signals.',
    heroImageHint: 'red eyed tree frog rainforest branch dew',
    exampleMembers: [
      { id: 'frog', name: 'Red-eyed Tree Frog', habitat: 'Central American rainforests', diet: 'Carnivore (insects)', status: 'Least Concern', interestingFact: 'Bright red eyes startle predators.', traits: 'Adhesive toe pads, bright colors', behavior: 'Nocturnal, arboreal', dataAiHint: 'red eyed tree frog bright eyes leaf' },
      { id: 'gray-tree-frog', name: 'Gray Tree Frog', habitat: 'Eastern North America woodlands', diet: 'Carnivore (insects)', status: 'Least Concern', interestingFact: 'Excellent camouflage; can change color.', traits: 'Color changing ability, loud trill call', behavior: 'Nocturnal, hibernates', dataAiHint: 'gray tree frog bark camouflage' },
    ],
    evolutionaryInsights: '**Habitats & Adaptations:**\n- **Adhesive Toe Pads:** Allow them to cling to leaves, branches, and even vertical surfaces.\n- **Arboreal Lifestyle:** Most species spend the majority of their lives in trees.\n- **Diverse Vocalizations:** Males produce calls to attract mates and defend territories.\n- **Varied Reproductive Strategies:** Some lay eggs on leaves overhanging water, others in bromeliads or tree holes.\n- **Camouflaged skin** that blends with leaves.\n- **Vocal sacs** for mating calls.\n- **Mostly arboreal** but some adapt to ponds or bushes.'
  },
  'salamandridae': {
    displayName: 'Salamandridae – Salamanders & Newts Family',
    slug: 'salamandridae',
    icon: Dna,
    introduction: 'Salamandridae includes true salamanders and newts. These amphibians often have vibrant warning colors and possess remarkable regenerative capabilities, able to regrow lost limbs and other body parts.',
    heroImageHint: 'fire salamander yellow black markings',
    exampleMembers: [
      { id: 'fire-salamander', name: 'Fire Salamander', habitat: 'European forests near water', diet: 'Carnivore (insects, slugs, worms)', status: 'Least Concern', interestingFact: 'Striking black and yellow/orange patterns warn predators of its toxicity.', dataAiHint: 'fire salamander forest floor' },
      { id: 'eastern-newt', name: 'Eastern Newt', habitat: 'Eastern North American ponds and forests', diet: 'Carnivore (insects, worms, crustaceans)', status: 'Least Concern', interestingFact: 'Has a complex life cycle with aquatic larval, terrestrial juvenile (red eft), and aquatic adult stages.', dataAiHint: 'eastern newt red eft forest' },
    ],
    evolutionaryInsights: '**Key Characteristics:**\n- **Moist Skin:** Requires damp environments to prevent desiccation.\n- **Skin Toxins:** Many species produce toxins as a defense mechanism (e.g., tetrodotoxin in newts).\n- **Regenerative Abilities:** Capable of regrowing lost limbs, tails, and even parts of organs.\n- **Complex Life Cycles:** Often involve aquatic larval stages and terrestrial or aquatic adult stages. Some newts have a terrestrial "eft" stage.'
  },
  'salmonidae': {
    displayName: 'Salmonidae – Salmon & Trout Family',
    slug: 'salmonidae',
    icon: Dna,
    introduction: 'The Salmonidae family includes salmon, trout, chars, graylings, and whitefishes. They are ray-finned fish, typically found in cold-water environments of the Northern Hemisphere. Many are anadromous, migrating from saltwater to freshwater to spawn.',
    heroImageHint: 'salmon leaping upstream river',
    evolutionaryInsights: '**Key Traits & Adaptations:**\n- **Anadromous Lifestyle (many species):** Born in freshwater, migrate to saltwater to mature, and return to freshwater to reproduce.\n- **Adipose Fin:** A small, fleshy fin on the back behind the dorsal fin.\n- **Adaptation to Cold Water:** Require cool, well-oxygenated water.\n- **Strong Swimmers:** Capable of navigating strong currents and leaping obstacles during migration.\n- **Homing Instinct:** Remarkable ability to return to their natal streams to spawn.'
  },
  'cyprinidae': {
    displayName: 'Cyprinidae – Carps & Minnows Family',
    slug: 'cyprinidae',
    icon: Dna,
    introduction: 'Cyprinidae is the largest family of freshwater fish, with over 3,000 species, including carps, minnows, barbs, and danios. They are found worldwide, except in South America, Australia, and Antarctica. Many are popular aquarium fish.',
    heroImageHint: 'goldfish pond colorful carp',
    evolutionaryInsights: '**Key Characteristics:**\n- **Lack of Jaw Teeth:** Possess pharyngeal teeth in their throats for processing food.\n- **Diverse Diets:** Includes herbivores, omnivores, and insectivores.\n- **Wide Range of Sizes:** From tiny minnows to large carps.\n- **Adaptability:** Found in a vast array of freshwater habitats, from fast-flowing rivers to stagnant ponds.\n- **Schooling Behavior:** Many species form schools for protection and foraging efficiency.'
  },
  'serranidae': {
    displayName: 'Serranidae – Groupers & Sea Bass Family',
    slug: 'serranidae',
    icon: Dna,
    introduction: 'Serranidae is a large family of marine perciform fish, commonly known as sea basses, groupers, and anthias. Most are predatory fish found in tropical and subtropical seas, often associated with coral reefs.',
    heroImageHint: 'grouper coral reef large fish',
    evolutionaryInsights: '**Key Adaptations & Traits:**\n- **Predatory Lifestyle:** Typically ambush predators with large mouths for engulfing prey.\n- **Protogynous Hermaphroditism:** Many species are born female and can change sex to male later in life.\n- **Territorial Behavior:** Often defend territories on reefs.\n- **Importance in Reef Ecosystems:** Play a crucial role as top predators in coral reef food webs.'
  },
  'chondrichthyans': {
    displayName: 'Chondrichthyans – Cartilaginous Fish',
    slug: 'chondrichthyans',
    icon: Dna,
    introduction: 'Chondrichthyans are a class of jawed fish with skeletons made of cartilage instead of bone. This ancient group includes sharks, rays, and chimaeras – marine predators that rely on keen senses, flexible movement, and evolutionary finesse.',
    heroImageHint: 'great white shark deep ocean',
    exampleMembers: [
      { id: 'great-white-shark', name: 'Great White Shark', habitat: 'Coastal and open ocean', traits: 'Electroreception, rows of regenerating teeth', status: 'Vulnerable', dataAiHint: 'great white shark ocean predator' },
      { id: 'manta-ray', name: 'Manta Ray', habitat: 'Tropical oceans', traits: 'Large wingspan, filter-feeding', behavior: 'Social and intelligent; known for breaching', status: 'Endangered', dataAiHint: 'manta ray ocean filter feeding' },
    ],
    evolutionaryInsights: '**Notable Adaptations:**\n- **Cartilaginous Skeletons:** Provides flexibility and reduces weight compared to bone.\n- **Electroreception (Ampullae of Lorenzini):** Sensory organs that detect weak electric fields produced by prey.\n- **Dermal Denticles (Placoid Scales):** Tooth-like scales covering their skin, reducing drag and providing protection.\n- **Internal Fertilization:** Unlike most bony fish.\n- **Diverse Reproductive Strategies:** Oviparous (egg-laying), viviparous (live birth), or ovoviviparous (eggs hatch inside the mother).\n\n**Ecosystems:**\nOpen ocean, coral reefs, coastal shallows. Migratory patterns tied to currents, food, and breeding.'
  },
  'formicidae': {
    displayName: 'Formicidae – Ants',
    slug: 'formicidae',
    icon: Dna,
    introduction: 'Formicidae, the ant family, includes more than 12,000 known species. They live in colonies with defined roles and communicate using pheromones, vibrations, and touch. Ants shape ecosystems through soil turnover, seed dispersal, and predation.',
    heroImageHint: 'ants macro carrying leaves chain',
    exampleMembers: [
      { id: 'red-ant', name: 'Red Ant (Solenopsis)', habitat: 'Forests, fields, urban areas', diet: 'Omnivore', traits: 'Aggressive, painful sting', behavior: 'Known for organized raids', status: 'Not Evaluated', dataAiHint: 'red ant colony close up' },
      { id: 'carpenter-ant', name: 'Carpenter Ant', habitat: 'Woodlands, homes', diet: 'Omnivore', traits: 'Tunnel into wood (but don’t eat it)', behavior: 'Create structural galleries for nests', status: 'Not Evaluated', dataAiHint: 'carpenter ant wood tunnel' },
    ],
    evolutionaryInsights: `**Colony Organization:**\n- Queens: Reproductive leaders\n- Workers: Builders, foragers, defenders\n- Soldiers: Defend colony from invaders\n\n**Notable Adaptations:**\n- Pheromone trails for communication\n- Strong mandibles for carrying objects\n- Ability to form living bridges or rafts\n\n**Ecosystem Impact:**\n- Soil aeration, nutrient recycling\n- Predation on pest species\n- Seed dispersal in some ecosystems`
  },
  'apidae': {
    displayName: 'Apidae – Bees',
    slug: 'apidae',
    icon: Dna,
    introduction: 'Apidae is a large family of bees, including honey bees, bumblebees, stingless bees, and orchid bees. They are vital pollinators with complex social structures and communication methods.',
    heroImageHint: 'bee gathering nectar flower macro',
    evolutionaryInsights: '**Key Characteristics:**\n- **Pollination:** Essential for reproduction of many flowering plants, including agricultural crops.\n- **Eusociality (many species):** Complex colonies with queen, workers, and drones (e.g., honey bees, bumblebees).\n- **Communication:** Honey bees use the "waggle dance" to communicate food source locations.\n- **Wax Production (honey bees):** Used to construct honeycomb.\n- **Diverse Nesting Habits:** From large hives to underground burrows.'
  },
  'culicidae': {
    displayName: 'Culicidae – Mosquitoes',
    slug: 'culicidae',
    icon: Dna,
    introduction: 'Culicidae, the mosquito family, comprises over 3,500 species of small flies. Female mosquitoes are infamous for biting humans and animals to obtain blood meals necessary for egg development, acting as vectors for numerous diseases.',
    heroImageHint: 'mosquito microscope proboscis',
    evolutionaryInsights: '**Key Adaptations & Impact:**\n- **Blood-Feeding (females):** Specialized mouthparts (proboscis) for piercing skin and sucking blood.\n- **Sensory Mechanisms:** Detect hosts via CO2, body heat, and specific odors.\n- **Disease Vectors:** Transmit serious diseases like malaria, dengue fever, Zika virus, and West Nile virus.\n- **Aquatic Larval Stage:** Larvae (wrigglers) develop in stagnant water.'
  },
  'coccinellidae': {
    displayName: 'Coccinellidae – Ladybugs',
    slug: 'coccinellidae',
    icon: Dna,
    introduction: 'Coccinellidae, commonly known as ladybugs or ladybirds, are a family of small beetles easily recognized by their colorful, spotted elytra (wing covers). They are beneficial insects, primarily preying on aphids and scale insects.',
    heroImageHint: 'ladybug green leaf aphids',
    evolutionaryInsights: '**Key Characteristics:**\n- **Predatory Behavior:** Most species are voracious predators of aphids, scale insects, and other soft-bodied pests, making them beneficial for agriculture.\n- **Aposematic Coloration:** Bright colors (red, orange, yellow) with spots serve as a warning to predators about their distastefulness.\n- **Reflex Bleeding:** Can release a distasteful, toxic hemolymph from their leg joints when threatened.\n- **Overwintering Aggregations:** Some species gather in large groups to hibernate during winter.'
  },
  'theraphosidae': {
    displayName: 'Theraphosidae – Tarantulas',
    slug: 'theraphosidae',
    icon: Dna,
    introduction: 'Theraphosidae is a family of large and often hairy spiders, commonly known as tarantulas. They are found in tropical to temperate regions worldwide and are known for their size and sometimes venomous bites, though most are not dangerous to humans.',
    heroImageHint: 'tarantula hairy spider jungle floor',
    exampleMembers: [
      { id: 'goliath-birdeater', name: 'Goliath Birdeater', habitat: 'South American rainforests', diet: 'Insects, small rodents, frogs, lizards', status: 'Not Evaluated', interestingFact: 'One of the largest tarantulas. Rarely eats birds.', dataAiHint: 'goliath tarantula spider' },
      { id: 'pinktoe-tarantula', name: 'Pinktoe Tarantula', habitat: 'Tropical rainforests of South America', diet: 'Insects', status: 'Not Evaluated', interestingFact: 'Arboreal and relatively docile.', dataAiHint: 'pinktoe tarantula arboreal spider' },
    ],
    evolutionaryInsights: '**Key Characteristics:**\n- **Large Size & Hairy Appearance:** Iconic features of the family.\n- **Burrowing or Arboreal Lifestyles:** Some live in burrows on the ground, others in trees.\n- **Urticating Hairs (New World species):** Barbed hairs on the abdomen that can be flicked at predators, causing irritation.\n- **Long Lifespans:** Females can live for many years (15-30+ years in some species).\n- **Venom:** Primarily used to subdue prey (insects, small vertebrates); bites on humans are typically painful but not medically significant for most species.'
  },
  'lycosidae': {
    displayName: 'Lycosidae – Wolf Spiders',
    slug: 'lycosidae',
    icon: Dna,
    introduction: 'Lycosidae, or wolf spiders, are agile hunters with excellent eyesight. They typically hunt on the ground and do not spin webs to catch prey, instead relying on their speed and camouflage.',
    heroImageHint: 'wolf spider camouflaged ground leaves',
     exampleMembers: [
      { id: 'rabid-wolf-spider', name: 'Rabid Wolf Spider', habitat: 'Fields, forests, gardens', diet: 'Insects, other spiders', status: 'Not Evaluated', interestingFact: 'Name comes from erratic movements, not rabies.', dataAiHint: 'wolf spider ground hunting' },
    ],
    evolutionaryInsights: '**Key Characteristics:**\n- **Active Ground Hunters:** Chase down prey rather than trapping it in webs.\n- **Excellent Eyesight:** Possess large eyes, particularly the posterior median eyes, crucial for hunting.\n- **Maternal Care:** Females carry their egg sacs attached to their spinnerets. After hatching, spiderlings climb onto the mother\'s back and are carried for a period.\n- **Unique Eye Arrangement:** Typically three rows of eyes (four small ones in the bottom row, two large ones in the middle, and two medium-sized ones on top).'
  },
  'scorpionidae': {
    displayName: 'Scorpionidae – Scorpions',
    slug: 'scorpionidae',
    icon: Dna,
    introduction: 'Scorpionidae, a family of true scorpions, have existed for over 400 million years. With armored exoskeletons and venomous tails, these arachnids have adapted to deserts, forests, and caves across the globe.',
    heroImageHint: 'emperor scorpion uv light desert forest',
    exampleMembers: [
      { id: 'emperor-scorpion', name: 'Emperor Scorpion (Pandinus imperator)', habitat: 'West African rainforests', traits: 'One of the largest scorpions', behavior: 'Mild venom; uses pincers more than sting', status: 'Not Evaluated', dataAiHint: 'emperor scorpion large rainforest' }
    ],
    evolutionaryInsights: `**Hunting & Defense:**\n- Detects vibrations with tiny hairs on legs\n- Ambush predator — grabs prey with pincers, injects venom\n- Glows blue-green under UV light due to cuticle compounds\n\n**Interesting Facts:**\n- Can survive long periods without food\n- Mothers carry young on their backs until first molt\n- Scorpion venom is being studied for medical uses\n\n**Ecosystem Role:**\n- Controls insect populations\n- Prey for birds, mammals, and other predators\n- Indicator species for healthy ecosystems`
  },
  'octopodidae': {
    displayName: 'Octopodidae – Octopuses',
    slug: 'octopodidae',
    icon: Dna,
    introduction: 'Octopodidae includes the most intelligent and flexible invertebrates on Earth. Octopuses are solitary, curious, and capable of astounding feats of escape, camouflage, and problem-solving.',
    heroImageHint: 'giant pacific octopus rocky reef camouflage',
    exampleMembers: [
      { id: 'common-octopus', name: 'Common Octopus (Octopus vulgaris)', habitat: 'Shallow coral reefs and rocky shores', traits: 'Can squeeze through coin-sized openings', behavior: 'Ink clouds, rapid jet propulsion, and color change for defense.', status: 'Not Evaluated', dataAiHint: 'common octopus coral camouflage' },
      { id: 'giant-pacific-octopus', name: 'Giant Pacific Octopus (Enteroctopus dofleini)', habitat: 'Cold North Pacific waters', traits: 'Largest known octopus species.', behavior: 'Lifespan: 3–5 years.', status: 'Not Evaluated', dataAiHint: 'giant pacific octopus deep sea' },
    ],
    evolutionaryInsights: `**Intelligence & Behavior:**\n- Capable of unscrewing jars and solving puzzles\n- Recognizes individuals and can mimic other marine species\n- Changes color and texture for camouflage or mood display\n\n**Ecosystem Role:**\n- Apex invertebrate predator\n- Feeds on crustaceans, mollusks, and even small sharks\n- Vital in maintaining balance in reef ecosystems\n\n**Fun Facts:**\n- Three hearts and blue blood\n- No bones — can squeeze into impossibly tight spaces\n- Short but complex lives with dramatic mating rituals`
  },
  'muricidae': {
    displayName: 'Muricidae – Sea Snails',
    slug: 'muricidae',
    icon: Dna,
    introduction: 'Muricidae, often called murex snails or rock snails, are a large and diverse family of predatory sea snails. They are known for their often elaborate and spiny shells, and some species were historically important for producing purple dye.',
    heroImageHint: 'murex snail spiny shell tidepool',
    exampleMembers: [
        { id: 'murex-snail', name: 'Murex Snail (Generic Example)', habitat: 'Marine environments, rocky/sandy bottoms', diet: 'Carnivore (other mollusks)', status: 'Not Evaluated', interestingFact: 'Some species used for Tyrian purple dye.', dataAiHint: 'murex snail colorful shell' },
    ],
    evolutionaryInsights: '**Key Characteristics:**\n- **Predatory Behavior:** Many species drill holes into the shells of other mollusks to feed.\n- **Elaborate Shells:** Often feature spines, knobs, or frills, providing protection and stability.\n- **Operculum:** Possess a "trapdoor" to seal the shell opening.\n- **Historical Significance:** Some species (e.g., *Bolinus brandaris*) were the source of Tyrian purple dye, highly valued in antiquity.'
  },
  'veneridae': {
    displayName: 'Veneridae – Venus Clams',
    slug: 'veneridae',
    icon: Dna,
    introduction: 'Veneridae, commonly known as Venus clams, are a large family of saltwater clams, marine bivalve mollusks. Many species are edible and commercially important.',
    heroImageHint: 'venus clams sand beach edible',
    exampleMembers: [
        { id: 'hard-clam', name: 'Hard Clam (Quahog)', habitat: 'Intertidal/subtidal sand or mud', diet: 'Filter feeder', status: 'Not Evaluated', interestingFact: 'Growth rings on shell indicate age.', dataAiHint: 'hard clam quahog shell beach' },
    ],
    evolutionaryInsights: '**Key Characteristics:**\n- **Filter Feeders:** Use siphons to draw in water and filter out phytoplankton and organic matter.\n- **Burrowing Lifestyle:** Typically live buried in sand or mud in intertidal or subtidal zones.\n- **Two Shells (Bivalves):** Possess two hinged shells for protection.\n- **Commercial Importance:** Many species (e.g., quahogs, littlenecks) are harvested for food.'
  },
};


export async function generateMetadata(
  { params }: { params: { familySlug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const familySlug = params.familySlug.toLowerCase();
  const familyDetail = familyDetailsMap[familySlug] || { displayName: familySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' Family', slug: familySlug, icon: HelpCircle, introduction: `Learn more about the ${familySlug} family.`, heroImageHint: `${familySlug} wildlife` };
  const familyName = familyDetail.displayName;

  const pageTitle = `${familyName} - Animal Classification | Wildpedia`;
  const pageDescription = familyDetail.introduction || `Learn about animals belonging to the ${familyName} on Wildpedia. Discover their characteristics and evolutionary connections.`;
  const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(familyName.split('–')[0].trim())}&hint=${encodeURIComponent(familyDetail.heroImageHint || 'wildlife family')}`;


  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [familyName, 'animal family', 'biological classification', 'taxonomy', 'species', familySlug],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${SITE_URL}/explore/family/${familySlug}`,
      type: 'article',
      images: [{ url: ogImageUrl, alt: `Wildpedia - ${familyName}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImageUrl],
    },
  };
}

export default async function BiologicalFamilyPage({ params }: { params: { familySlug: string } }) {
  const familySlug = params.familySlug.toLowerCase();
  const familyDetail = familyDetailsMap[familySlug];

  if (!familyDetail) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <HelpCircle size={64} className="mx-auto text-destructive mb-4" />
        <h1 className="text-2xl font-semibold text-destructive mb-2">Family Not Found</h1>
        <p className="text-muted-foreground">The requested biological family could not be found.</p>
        <Link href="/explore/family" className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
          Back to Families
        </Link>
      </div>
    );
  }

  const { displayName, introduction, heroImageHint, icon: FamilyIcon, exampleMembers, evolutionaryInsights } = familyDetail;

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${displayName} | Wildpedia`,
    "description": introduction,
    "url": `${SITE_URL}/explore/family/${familySlug}`,
    "publisher": { "@type": "Organization", "name": "Wildpedia" }
  };

  return (
    <div className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <div className="relative h-[300px] md:h-[400px] w-full mb-8">
        <Image
          src={`https://placehold.co/1200x400.png?text=${encodeURIComponent(displayName.split('–')[0].trim())}`}
          alt={`Hero image for the ${displayName}`}
          fill
          style={{ objectFit: 'cover' }}
          priority
          data-ai-hint={heroImageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2 flex items-center gap-3">
            <FamilyIcon className="h-10 w-10 text-white/80" /> {displayName}
          </h1>
        </div>
         <Link href="/explore/family" className="absolute top-4 left-4 z-20 text-sm text-white/80 hover:text-white bg-black/30 hover:bg-black/50 px-3 py-1 rounded-full inline-flex items-center gap-1 transition-colors">
           <ArrowLeft className="h-4 w-4" /> Back to Families
         </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-12 bg-card shadow-lg border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">About the {displayName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-foreground leading-relaxed">{introduction}</p>
          </CardContent>
        </Card>

        <section className="mb-12">
            <h2 className="text-3xl font-semibold text-primary mb-6 flex items-center gap-2">
                <ListTree className="h-7 w-7 text-accent"/> Member Species
            </h2>
            {exampleMembers && exampleMembers.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exampleMembers.map(member => (
                        <Card key={member.id} className="bg-card shadow-md overflow-hidden border border-border/50 group hover:shadow-xl transition-shadow duration-300 flex flex-col">
                            <Image
                                src={member.imageUrl || `https://placehold.co/300x180.png?text=${encodeURIComponent(member.name)}`}
                                alt={member.name}
                                width={300}
                                height={180}
                                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                                data-ai-hint={member.dataAiHint}
                            />
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors">{member.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-1.5 text-muted-foreground flex-grow">
                                {member.habitat && <div className="flex items-start gap-1.5"><HomeIcon size={14} className="text-accent mt-0.5 shrink-0" /><span><strong>Habitat:</strong> {member.habitat}</span></div>}
                                {member.diet && <div className="flex items-start gap-1.5"><Utensils size={14} className="text-accent mt-0.5 shrink-0" /><span><strong>Diet:</strong> {member.diet}</span></div>}
                                {member.status &&
                                  <div className="flex items-start gap-1.5">
                                    <ShieldCheck size={14} className="text-accent mt-0.5 shrink-0" />
                                    <strong>Status:</strong>&nbsp;
                                    <Badge variant="outline" className={`text-xs py-0 px-1.5 ${getConservationStatusColorClass(member.status)}`}>{member.status}</Badge>
                                  </div>
                                }
                                {member.interestingFact && <div className="flex items-start gap-1.5"><Info size={14} className="text-accent mt-0.5 shrink-0" /><span><strong>Fact:</strong> {member.interestingFact}</span></div>}
                                {member.traits && <div className="flex items-start gap-1.5"><Leaf size={14} className="text-accent mt-0.5 shrink-0" /><span><strong>Traits:</strong> {member.traits}</span></div>}
                                {member.behavior && <div className="flex items-start gap-1.5"><Activity size={14} className="text-accent mt-0.5 shrink-0" /><span><strong>Behavior:</strong> {member.behavior}</span></div>}
                            </CardContent>
                            <CardFooter className="mt-auto pt-3 pb-4 px-4">
                                <Link href={`/animal/${member.id}`} className="text-sm text-accent hover:underline font-medium w-full text-right">
                                    Learn More &rarr;
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                 </div>
            ) : (
                <Card className="bg-muted/50 border-dashed border-border">
                    <CardContent className="p-6 text-center">
                        <ListTree size={32} className="mx-auto text-muted-foreground mb-3" />
                        <p className="text-muted-foreground">
                           Example species for the {displayName} family are being curated.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                           Check back soon for detailed member profiles!
                        </p>
                    </CardContent>
                </Card>
            )}
        </section>

        {evolutionaryInsights && (
            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-primary mb-6 flex items-center gap-2">
                    <Dna className="h-7 w-7 text-accent"/> Evolutionary Traits & Adaptations
                </h2>
                <Card className="bg-card shadow-md border-border/50">
                    <CardContent className="p-6">
                        <div className="text-foreground leading-relaxed whitespace-pre-line prose prose-sm dark:prose-invert max-w-none"
                             dangerouslySetInnerHTML={{ __html: evolutionaryInsights.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-primary">$1</strong>').replace(/\n/g, '<br />') }} />
                        <div className="mt-4 p-4 bg-muted/50 rounded-md text-center">
                            <p className="text-sm text-muted-foreground italic">More detailed evolutionary tree visualization coming soon.</p>
                        </div>
                    </CardContent>
                </Card>
            </section>
        )}
      </div>
    </div>
  );
}

