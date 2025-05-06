import { getAnimalInfo, type AnimalInfo } from '@/services/animal-info';
import { suggestSimilarAnimals } from '@/ai/flows/suggest-similar-animals'; // Import AI flow
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Scale, Heart, Users, ShieldCheck, BookOpen, Lightbulb, Leaf, PawPrint, HelpCircle, AlertTriangle, ListTree } from 'lucide-react'; // Added ListTree, AlertTriangle
import AnimalSuggestionCard from '@/components/animal/animal-suggestion-card'; // Import Suggestion Card
import { Badge } from '@/components/ui/badge'; // Import Badge for Category

export default async function AnimalProfilePage({ params }: { params: { animalId: string } }) {
  const animalId = params.animalId;
  let animalInfo: AnimalInfo | null = null;
  let similarAnimals: string[] = [];
  let error: string | null = null;

  try {
    animalInfo = await getAnimalInfo(animalId);

    if (animalInfo) { // Only run AI suggestion if animalInfo was successfully fetched
      // Prepare input for AI suggestion (exclude mediaUrls and distribution mapUrl)
      const aiInput = {
        animalInfo: {
          scientificName: animalInfo.scientificName,
          commonName: animalInfo.commonName,
          // category: animalInfo.category, // AI doesn't need category for similarity yet
          description: animalInfo.description,
          diet: animalInfo.diet,
          habitat: animalInfo.habitat,
          behavior: animalInfo.behavior,
          size: animalInfo.size,
          weight: animalInfo.weight,
          lifespan: animalInfo.lifespan,
          population: animalInfo.population,
          conservationStatus: animalInfo.conservationStatus,
          // threats: animalInfo.threats, // AI doesn't need threats for similarity yet
          funFacts: animalInfo.funFacts,
        },
        numberOfSuggestions: 3, // Request 3 similar animals
      };
      const suggestionsOutput = await suggestSimilarAnimals(aiInput);
      similarAnimals = suggestionsOutput.suggestions;
    } else {
       throw new Error(`Animal "${animalId}" data could not be loaded.`); // Handle case where getAnimalInfo might return null unexpectedly
    }

  } catch (e: any) {
    console.error('Error fetching animal data or suggestions:', e);
    error = e.message || `Could not load information for "${animalId}". Please try another animal.`;
    // Assign placeholder data only if needed for layout debugging, better to show error
    // animalInfo = { ... } // Removed placeholder assignment in error case
  }

  if (error) {
     return (
       <div className="container mx-auto py-12 px-4 text-center">
         <Leaf size={64} className="mx-auto text-destructive mb-4" />
         <h1 className="text-2xl font-semibold text-destructive mb-2">Error Loading Animal</h1>
         <p className="text-muted-foreground">{error}</p>
         <Link href="/" className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
           Back to Explore
         </Link>
       </div>
     );
   }

   // This check is redundant now due to the error handling above, but kept for safety
   if (!animalInfo) {
     return (
        <div className="container mx-auto py-12 px-4 text-center">
           <p className="text-muted-foreground">Animal information is currently unavailable.</p>
           <Link href="/" className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
             Back to Explore
           </Link>
        </div>
     );
   }


  return (
    <div className="container mx-auto py-12 px-4">
      <Link href="/" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-block">&larr; Back to Explore</Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image & Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden shadow-lg bg-card">
            {animalInfo.mediaUrls.length > 0 ? (
              <Image
                src={animalInfo.mediaUrls[0]} // Display first image
                alt={`Image of ${animalInfo.commonName}`}
                width={500}
                height={400}
                className="w-full h-64 object-cover"
                data-ai-hint={`${animalInfo.commonName} ${animalInfo.habitat}`} // AI Hint
                priority // Prioritize loading the main image
              />
              // TODO: Add carousel or video player for multiple media items
            ) : (
               <div className="w-full h-64 bg-muted flex items-center justify-center">
                 <PawPrint className="w-16 h-16 text-muted-foreground" />
               </div>
            )}
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">{animalInfo.commonName}</CardTitle>
              <CardDescription className="text-lg italic text-muted-foreground">{animalInfo.scientificName}</CardDescription>
               <Badge variant="secondary" className="mt-2 w-fit">{animalInfo.category}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{animalInfo.description}</p>
            </CardContent>
          </Card>

           <Card className="bg-card">
             <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 text-primary"><ListTree /> Classification</CardTitle>
             </CardHeader>
             <CardContent className="space-y-2">
                <div>
                  <h3 className="font-semibold text-primary flex items-center gap-1"><ShieldCheck size={16}/> Conservation Status</h3>
                  <p className={`font-semibold ${getConservationStatusColor(animalInfo.conservationStatus)}`}>
                    {animalInfo.conservationStatus}
                  </p>
                   <p className="text-xs text-muted-foreground">IUCN Red List Status</p>
                </div>
                 <div>
                   <h3 className="font-semibold text-primary flex items-center gap-1"><HelpCircle size={16} /> Category</h3>
                   <p>{animalInfo.category}</p>
                </div>
             </CardContent>
           </Card>


           <Card className="bg-card">
             <CardHeader>
               <CardTitle className="text-xl flex items-center gap-2 text-primary"><MapPin /> Distribution</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-foreground mb-2">{animalInfo.distribution.description}</p>
               {animalInfo.distribution.mapUrl && (
                 <Image
                   src={animalInfo.distribution.mapUrl.startsWith('http') ? animalInfo.distribution.mapUrl : 'https://picsum.photos/seed/worldmap/400/200'} // Use real URL or placeholder
                   alt={`Distribution map of ${animalInfo.commonName}`}
                   width={400}
                   height={200}
                   className="w-full h-auto rounded-md border object-contain bg-muted" // Added bg-muted
                    data-ai-hint="world map distribution range"
                 />
                  // Replace above with actual map component if available, e.g., @vis.gl/react-google-maps
               )}
             </CardContent>
           </Card>
        </div>

        {/* Right Column: Detailed Info & Suggestions */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Characteristics &amp; Behavior</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem icon={Leaf} title="Diet" value={animalInfo.diet} />
              <InfoItem icon={BookOpen} title="Habitat" value={animalInfo.habitat} />
              <InfoItem icon={PawPrint} title="Behavior" value={animalInfo.behavior} />
              <InfoItem icon={Scale} title="Size" value={animalInfo.size} />
              <InfoItem icon={Scale} title="Weight" value={animalInfo.weight} />
              <InfoItem icon={Heart} title="Lifespan" value={animalInfo.lifespan} />
              <InfoItem icon={Users} title="Population Estimate" value={animalInfo.population} />
            </CardContent>
          </Card>

           {/* Threats Section */}
           {animalInfo.threats && animalInfo.threats.length > 0 && (
             <Card className="bg-card border-destructive/30">
               <CardHeader>
                 <CardTitle className="text-xl flex items-center gap-2 text-destructive"><AlertTriangle /> Major Threats</CardTitle>
               </CardHeader>
               <CardContent>
                 <ul className="list-disc list-inside space-y-1 text-foreground">
                   {animalInfo.threats.map((threat, index) => (
                     <li key={index}>{threat}</li>
                   ))}
                 </ul>
               </CardContent>
             </Card>
           )}

          {/* Fun Facts Section */}
          {animalInfo.funFacts.length > 0 && (
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 text-primary"><Lightbulb /> Fun Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-foreground">
                  {animalInfo.funFacts.map((fact, index) => (
                    <li key={index}>{fact}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* AI Suggestions Section */}
          {similarAnimals.length > 0 && (
            <Card className="bg-secondary/50 border-accent">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Similar Animals</CardTitle>
                <CardDescription>Discover other animals you might find interesting.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {similarAnimals.map((name) => (
                  <AnimalSuggestionCard key={name} animalName={name} />
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper component for displaying info items
interface InfoItemProps {
  icon: React.ElementType;
  title: string;
  value: string;
}

function InfoItem({ icon: Icon, title, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
      <div>
        <h3 className="font-semibold text-primary">{title}</h3>
        <p className="text-foreground">{value || 'N/A'}</p> {/* Handle potentially empty values */}
      </div>
    </div>
  );
}


// Helper function to get text color based on conservation status
function getConservationStatusColor(status: AnimalInfo['conservationStatus']): string {
  switch (status) {
    case 'Critically Endangered':
    case 'Endangered':
    case 'Extinct in the Wild':
    case 'Extinct':
      return 'text-destructive font-bold'; // Made destructive bold
    case 'Vulnerable':
      return 'text-orange-600 dark:text-orange-400 font-semibold'; // Made vulnerable semi-bold
    case 'Near Threatened':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'Least Concern':
      return 'text-green-600 dark:text-green-400';
    case 'Data Deficient':
    case 'Not Evaluated':
    default:
      return 'text-muted-foreground italic'; // Made default italic
  }
}
