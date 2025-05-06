import { getHabitatInfo, type HabitatInfo } from '@/services/habitat-info';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Thermometer, Droplets, Sprout, Map, AlertTriangle, ArrowLeft } from 'lucide-react'; // Icons for sections

export default async function HabitatDetailPage({ params }: { params: { habitatId: string } }) {
  const habitatId = params.habitatId;
  let habitatInfo: HabitatInfo | null = null;
  let error: string | null = null;

  try {
    habitatInfo = await getHabitatInfo(habitatId);
    if (!habitatInfo) {
      throw new Error(`Habitat "${habitatId}" not found.`);
    }
  } catch (e: any) {
    console.error(`Error fetching habitat data for ${habitatId}:`, e);
    error = e.message || 'Could not load habitat information.';
    // Optional: Assign placeholder data for layout debugging, but showing error is better
    // habitatInfo = { ... };
  }

   if (error || !habitatInfo) {
     return (
       <div className="container mx-auto py-12 px-4 text-center">
         <Map size={64} className="mx-auto text-destructive mb-4" /> {/* Use Map icon */}
         <h1 className="text-2xl font-semibold text-destructive mb-2">Error Loading Habitat</h1>
         <p className="text-muted-foreground">{error || 'Habitat information is currently unavailable.'}</p>
         <Link href="/habitats" className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
           Back to Habitats List
         </Link>
       </div>
     );
   }


  return (
    <div className="container mx-auto py-12 px-4">
       <Link href="/habitats" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
         <ArrowLeft className="h-4 w-4" /> Back to Habitats List
       </Link>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left Column: Image & Basic Info */}
         <div className="lg:col-span-1 space-y-6">
           <Card className="overflow-hidden shadow-lg bg-card">
               <Image
                 src={habitatInfo.mapImageUrl || `https://picsum.photos/seed/${habitatInfo.id}-map/500/350`} // Use provided URL or placeholder
                 alt={`Representative image of ${habitatInfo.name}`}
                 width={500}
                 height={350}
                 className="w-full h-56 object-cover" // Adjusted height
                 data-ai-hint={habitatInfo.dataAiHint} // AI Hint
                 priority // Prioritize loading the main image
               />
             <CardHeader>
               <div className="flex items-center gap-3 mb-2">
                   <habitatInfo.icon className="h-8 w-8 text-primary" />
                   <CardTitle className="text-3xl font-bold text-primary">{habitatInfo.name}</CardTitle>
               </div>
               <CardDescription className="text-lg text-muted-foreground">A glimpse into the {habitatInfo.name.toLowerCase()} environment.</CardDescription>
             </CardHeader>
             <CardContent>
               <p className="text-foreground">{habitatInfo.description}</p>
             </CardContent>
           </Card>

            <Card className="bg-card">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2 text-primary"><Thermometer size={20}/> Climate</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-foreground">{habitatInfo.climate}</p>
                </CardContent>
            </Card>

         </div>

         {/* Right Column: Species & Conservation */}
         <div className="lg:col-span-2 space-y-6">
           <Card className="bg-card">
             <CardHeader>
               <CardTitle className="text-2xl flex items-center gap-2 text-primary"><Sprout size={24}/> Notable Species</CardTitle>
                <CardDescription>Some animals commonly found in this habitat.</CardDescription>
             </CardHeader>
             <CardContent>
                 {habitatInfo.speciesExamples && habitatInfo.speciesExamples.length > 0 ? (
                     <div className="flex flex-wrap gap-2">
                         {habitatInfo.speciesExamples.map((species, index) => (
                           // Link to animal page if it exists
                           <Link key={index} href={`/animal/${species.toLowerCase().replace(/\s+/g, '-')}`} passHref>
                             <Badge variant="secondary" className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                               {species}
                             </Badge>
                           </Link>
                         ))}
                     </div>
                 ) : (
                     <p className="text-muted-foreground italic">Specific species examples not listed.</p>
                 )}
             </CardContent>
           </Card>

           <Card className="bg-card border-orange-300 dark:border-orange-700">
             <CardHeader>
               <CardTitle className="text-2xl flex items-center gap-2 text-orange-600 dark:text-orange-400"><AlertTriangle size={24}/> Conservation Concerns</CardTitle>
               <CardDescription>Key challenges facing this habitat.</CardDescription>
             </CardHeader>
             <CardContent>
                 {habitatInfo.conservationConcerns && habitatInfo.conservationConcerns.length > 0 ? (
                     <ul className="list-disc list-inside space-y-1 text-foreground">
                       {habitatInfo.conservationConcerns.map((concern, index) => (
                         <li key={index}>{concern}</li>
                       ))}
                     </ul>
                 ): (
                     <p className="text-muted-foreground italic">No specific conservation concerns listed.</p>
                 )}
             </CardContent>
           </Card>

             {/* Placeholder for Distribution Map specific to this habitat type if needed */}
             {/* <Card className="bg-card">
                 <CardHeader>
                 <CardTitle className="text-xl flex items-center gap-2 text-primary"><Map size={20}/> Global Distribution</CardTitle>
                 </CardHeader>
                 <CardContent>
                     <Image
                         src={`https://picsum.photos/seed/${habitatInfo.id}-distribution/600/300`}
                         alt={`Global distribution map for ${habitatInfo.name}`}
                         width={600}
                         height={300}
                         className="w-full h-auto rounded-md border object-contain bg-muted"
                         data-ai-hint={`world map ${habitatInfo.name} distribution`}
                     />
                     <p className="text-xs text-muted-foreground mt-2 text-center">Note: Represents general areas where this habitat type occurs.</p>
                 </CardContent>
             </Card> */}

         </div>
       </div>
    </div>
  );
}