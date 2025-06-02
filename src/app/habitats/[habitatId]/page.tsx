
import type { Metadata, ResolvingMetadata } from 'next';
import { getHabitatInfo, type HabitatInfo } from '@/services/habitat-info';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Thermometer, Sprout, Map, AlertTriangle, ArrowLeft } from 'lucide-react'; // Removed Droplets as it might be redundant if climate covers it

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

export async function generateMetadata(
  { params }: { params: { habitatId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const habitatId = params.habitatId.toLowerCase();
  try {
    const habitatInfo = await getHabitatInfo(habitatId);
    if (!habitatInfo) {
      return {
        title: 'Habitat Not Found',
        description: 'The requested habitat could not be found on Wildpedia.',
        robots: { index: false },
      };
    }

    const pageTitle = `${habitatInfo.name} - Wildlife Habitat | Wildpedia`;
    const pageDescription = `Explore the ${habitatInfo.name.toLowerCase()} habitat: its climate, typical species like ${habitatInfo.speciesExamples.slice(0,2).join(', ')}, and conservation concerns. ${habitatInfo.description.substring(0, 150).replace(/\s+/g, ' ').trim()}...`;
    const imageUrl = habitatInfo.mapImageUrl?.startsWith('http') ? habitatInfo.mapImageUrl : `${SITE_URL}/placehold.co/500x350.png?text=${encodeURIComponent(habitatInfo.name)}`;

    return {
      title: pageTitle,
      description: pageDescription,
      keywords: [habitatInfo.name, 'wildlife habitat', 'ecosystem', 'nature', habitatInfo.climate, ...habitatInfo.speciesExamples.slice(0,3)],
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: `${SITE_URL}/habitats/${habitatId}`,
        type: 'article',
        images: [
          {
            url: imageUrl,
            width: 500,
            height: 350,
            alt: `Image of ${habitatInfo.name} habitat`,
          },
        ],
         article: {
          publishedTime: new Date().toISOString(),
          authors: [`${SITE_URL}/about`],
          section: "Wildlife Habitats",
          tags: [habitatInfo.name, ...habitatInfo.conservationConcerns.slice(0,2)],
        }
      },
      twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description: pageDescription,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata for habitat:', habitatId, error);
    return {
      title: 'Error Loading Habitat Information',
      description: 'There was an error loading detailed information for this habitat.',
    };
  }
}

export default async function HabitatDetailPage({ params }: { params: { habitatId: string } }) {
  const habitatId = params.habitatId;
  let habitatInfo: HabitatInfo | null = null;
  let error: string | null = null;
  let habitatJsonLd: object | null = null;

  try {
    habitatInfo = await getHabitatInfo(habitatId);
    if (!habitatInfo) {
      throw new Error(`Habitat "${habitatId}" not found.`);
    }
     habitatJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article", // Changed to Article for more detailed content
        "headline": `Understanding the ${habitatInfo.name} Habitat`,
        "name": habitatInfo.name,
        "description": habitatInfo.description,
        "image": habitatInfo.mapImageUrl || `${SITE_URL}/og-default.png`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${SITE_URL}/habitats/${habitatId}`
        },
        "publisher": {
          "@type": "Organization",
          "name": "Wildpedia",
          "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` }
        },
        "keywords": [habitatInfo.name, "ecosystem", habitatInfo.climate].join(", ")
      };
  } catch (e: any) {
    console.error(`Error fetching habitat data for ${habitatId}:`, e);
    error = e.message || 'Could not load habitat information.';
  }

   if (error || !habitatInfo) {
     return (
       <div className="container mx-auto py-12 px-4 text-center">
         <Map size={64} className="mx-auto text-destructive mb-4" />
         <h1 className="text-2xl font-semibold text-destructive mb-2">Error Loading Habitat</h1>
         <p className="text-muted-foreground">{error || 'Habitat information is currently unavailable.'}</p>
         <Link href="/habitats" className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
           Back to Habitats
         </Link>
       </div>
     );
   }

  return (
    <div className="container mx-auto py-12 px-4">
      {habitatJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(habitatJsonLd) }}
        />
      )}
       <Link href="/habitats" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
         <ArrowLeft className="h-4 w-4" /> Back to Habitats
       </Link>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-1 space-y-6">
           <Card className="overflow-hidden shadow-lg bg-card">
               <Image
                 src={habitatInfo.mapImageUrl || `https://placehold.co/500x350.png?text=${encodeURIComponent(habitatInfo.name)}`}
                 alt={`Representative image of ${habitatInfo.name}`}
                 width={500}
                 height={350}
                 className="w-full h-56 object-cover"
                 data-ai-hint={habitatInfo.dataAiHint || `${habitatInfo.name.toLowerCase()} landscape`}
                 priority
               />
             <CardHeader>
               <div className="flex items-center gap-3 mb-2">
                   {habitatInfo.icon && <habitatInfo.icon className="h-8 w-8 text-primary" />}
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

         <div className="lg:col-span-2 space-y-6">
           <Card className="bg-card">
             <CardHeader>
               <CardTitle className="text-2xl flex items-center gap-2 text-primary"><Sprout size={24}/> Notable Species</CardTitle>
                <CardDescription>Some animals commonly found in this habitat. Click to learn more.</CardDescription>
             </CardHeader>
             <CardContent>
                 {habitatInfo.speciesExamples && habitatInfo.speciesExamples.length > 0 ? (
                     <div className="flex flex-wrap gap-2">
                         {habitatInfo.speciesExamples.map((species, index) => (
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
         </div>
       </div>
    </div>
  );
}
