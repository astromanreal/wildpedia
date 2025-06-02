
import type { Metadata, ResolvingMetadata } from 'next';
import { getAnimalInfo, type AnimalInfo } from '@/services/animal-info';
import { suggestSimilarAnimals } from '@/ai/flows/suggest-similar-animals';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Scale, Heart, Users, ShieldCheck, BookOpen, Lightbulb, Leaf, PawPrint, HelpCircle, AlertTriangle, ListTree, ArrowLeft } from 'lucide-react';
import AnimalSuggestionCard from '@/components/animal/animal-suggestion-card';
import { Badge } from '@/components/ui/badge';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

export async function generateMetadata(
  { params }: { params: { animalId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const animalId = params.animalId.toLowerCase();
  try {
    const animalInfo = await getAnimalInfo(animalId);
    if (!animalInfo) {
      return {
        title: 'Animal Not Found',
        description: 'The requested animal could not be found on Wildpedia.',
        robots: { index: false },
      };
    }

    const pageTitle = `${animalInfo.commonName} - Animal Profile | Wildpedia`;
    const pageDescription = `Discover the ${animalInfo.commonName}: its habitat (${animalInfo.habitat}), diet (${animalInfo.diet}), conservation status (${animalInfo.conservationStatus}), and fascinating facts. ${animalInfo.description.substring(0, 160).replace(/\s+/g, ' ').trim()}...`;
    const imageUrl = animalInfo.mediaUrls[0]?.startsWith('http') ? animalInfo.mediaUrls[0] : `${SITE_URL}/placehold.co/500x400.png?text=${encodeURIComponent(animalInfo.commonName)}`;

    return {
      title: pageTitle,
      description: pageDescription,
      keywords: [animalInfo.commonName, animalInfo.scientificName, animalInfo.category, animalInfo.habitat, 'wildlife facts', 'animal species', 'conservation'],
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: `${SITE_URL}/animal/${animalId}`,
        type: 'article',
        images: animalInfo.mediaUrls.length > 0 ? [
          {
            url: imageUrl,
            width: 500,
            height: 400,
            alt: `Image of ${animalInfo.commonName}`,
          },
        ] : [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630, alt: 'Wildpedia' }],
        article: {
          publishedTime: new Date().toISOString(), // Consider adding a real published/updated date
          authors: [`${SITE_URL}/about`],
          section: animalInfo.category,
          tags: [animalInfo.commonName, animalInfo.conservationStatus, animalInfo.habitat, animalInfo.diet],
        }
      },
      twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description: pageDescription,
        images: animalInfo.mediaUrls.length > 0 ? [imageUrl] : [`${SITE_URL}/twitter-default.png`],
      },
    };
  } catch (error) {
    console.error('Error generating metadata for animal:', animalId, error);
    return {
      title: 'Error Loading Animal Information',
      description: 'There was an error loading detailed information for this animal.',
    };
  }
}

export default async function AnimalProfilePage({ params }: { params: { animalId: string } }) {
  const animalId = params.animalId;
  let animalInfo: AnimalInfo | null = null;
  let similarAnimals: string[] = [];
  let error: string | null = null;
  let animalJsonLd: object | null = null;

  try {
    animalInfo = await getAnimalInfo(animalId);

    if (animalInfo) {
      const aiInput = {
        animalInfo: {
          scientificName: animalInfo.scientificName,
          commonName: animalInfo.commonName,
          description: animalInfo.description,
          diet: animalInfo.diet,
          habitat: animalInfo.habitat,
          behavior: animalInfo.behavior,
          size: animalInfo.size,
          weight: animalInfo.weight,
          lifespan: animalInfo.lifespan,
          population: animalInfo.population,
          conservationStatus: animalInfo.conservationStatus,
          funFacts: animalInfo.funFacts,
        },
        numberOfSuggestions: 3,
      };
      const suggestionsOutput = await suggestSimilarAnimals(aiInput);
      similarAnimals = suggestionsOutput.suggestions;

      animalJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "name": animalInfo.commonName,
        "headline": `All about the ${animalInfo.commonName}`,
        "description": animalInfo.description,
        "image": animalInfo.mediaUrls[0] || `${SITE_URL}/og-default.png`,
        "author": { "@type": "Organization", "name": "Wildpedia" },
        "publisher": {
          "@type": "Organization",
          "name": "Wildpedia",
          "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` }
        },
        "datePublished": new Date().toISOString(),
        "mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE_URL}/animal/${animalId}` },
        "keywords": [animalInfo.commonName, animalInfo.scientificName, animalInfo.category, animalInfo.conservationStatus].join(", ")
      };
    } else {
       throw new Error(`Animal "${animalId}" data could not be loaded.`);
    }

  } catch (e: any) {
    console.error('Error fetching animal data or suggestions:', e);
    error = e.message || `Could not load information for "${animalId}". Please try another animal.`;
  }

  if (error) {
     return (
       <div className="container mx-auto py-12 px-4 text-center">
         <Leaf size={64} className="mx-auto text-destructive mb-4" />
         <h1 className="text-2xl font-semibold text-destructive mb-2">Error Loading Animal</h1>
         <p className="text-muted-foreground">{error}</p>
         <Link href="/" className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            <ArrowLeft className="inline-block h-4 w-4 mr-1" /> Back to Home
         </Link>
       </div>
     );
   }

   if (!animalInfo) {
     return (
        <div className="container mx-auto py-12 px-4 text-center">
           <p className="text-muted-foreground">Animal information is currently unavailable.</p>
           <Link href="/" className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
             <ArrowLeft className="inline-block h-4 w-4 mr-1" /> Back to Home
           </Link>
        </div>
     );
   }

  return (
    <div className="container mx-auto py-12 px-4">
      {animalJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(animalJsonLd) }}
        />
      )}
      <Link href="/" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden shadow-lg bg-card">
            {animalInfo.mediaUrls.length > 0 && animalInfo.mediaUrls[0] ? (
              <Image
                src={animalInfo.mediaUrls[0]}
                alt={`Image of ${animalInfo.commonName}`}
                width={500}
                height={400}
                className="w-full h-64 object-cover"
                data-ai-hint={`${animalInfo.commonName} ${animalInfo.habitat}`}
                priority
              />
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
             <CardContent className="space-y-3">
                <div>
                  <h3 className="font-semibold text-primary flex items-center gap-1"><ShieldCheck size={16}/> Conservation Status</h3>
                  <p className={`font-semibold ${getConservationStatusColor(animalInfo.conservationStatus)}`}>
                    {animalInfo.conservationStatus}
                  </p>
                   <p className="text-xs text-muted-foreground">IUCN Red List Status</p>
                </div>
                 <div>
                   <h3 className="font-semibold text-primary flex items-center gap-1"><HelpCircle size={16} /> Category</h3>
                   <p className="text-foreground">{animalInfo.category}</p>
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
                   src={animalInfo.distribution.mapUrl.startsWith('http') ? animalInfo.distribution.mapUrl : `https://placehold.co/400x200.png?text=Map+of+${encodeURIComponent(animalInfo.commonName)}`}
                   alt={`Distribution map of ${animalInfo.commonName}`}
                   width={400}
                   height={200}
                   className="w-full h-auto rounded-md border object-contain bg-muted"
                   data-ai-hint="world map animal distribution"
                 />
               )}
             </CardContent>
           </Card>
        </div>

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
        <p className="text-foreground">{value || 'N/A'}</p>
      </div>
    </div>
  );
}

function getConservationStatusColor(status: AnimalInfo['conservationStatus']): string {
  switch (status) {
    case 'Extinct':
    case 'Extinct in the Wild':
    case 'Critically Endangered':
    case 'Endangered':
      return 'text-destructive font-bold';
    case 'Vulnerable':
      return 'text-orange-600 dark:text-orange-400 font-semibold'; // Ensure consistent styling
    case 'Near Threatened':
      return 'text-yellow-600 dark:text-yellow-400'; // Ensure consistent styling
    case 'Least Concern':
      return 'text-green-600 dark:text-green-400'; // Ensure consistent styling
    case 'Data Deficient':
    case 'Not Evaluated':
    default:
      return 'text-muted-foreground italic';
  }
}

    