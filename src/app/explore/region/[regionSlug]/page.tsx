
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { continentData, type ContinentInfo } from '@/data/continent-data';
import { subregionData, type SubregionInfo } from '@/data/subregion-data'; // Import subregion data
import ContinentAnimalCard from '@/components/explore/continent-animal-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'; // Import Accordion
import { ArrowLeft, Globe, Map, Leaf, Trees, Sun } from 'lucide-react'; // Added Leaf, Trees, Sun for subregions

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

interface RegionDetails {
  type: 'continent' | 'subregion';
  data: ContinentInfo | SubregionInfo;
}

async function getRegionDetails(slug: string): Promise<RegionDetails | null> {
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate async fetch
  const continent = continentData.find(c => c.id === slug);
  if (continent) {
    return { type: 'continent', data: continent };
  }
  const subregion = subregionData.find(s => s.id === slug);
  if (subregion) {
    return { type: 'subregion', data: subregion };
  }
  return null;
}

export async function generateStaticParams() {
  const continentSlugs = continentData.map(continent => ({ regionSlug: continent.id }));
  const subregionSlugs = subregionData.map(subregion => ({ regionSlug: subregion.id }));
  return [...continentSlugs, ...subregionSlugs];
}

export async function generateMetadata(
  { params }: { params: { regionSlug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const regionSlug = params.regionSlug;
  const regionDetails = await getRegionDetails(regionSlug);

  if (!regionDetails) {
    return {
      title: 'Region Not Found',
      description: 'The requested geographic region or biome could not be found on Wildpedia.',
      robots: { index: false },
    };
  }

  const { type, data } = regionDetails;
  const pageTitle = data.pageTitle || `${data.name} - Details | Wildpedia`;
  const pageDescription = data.pageDescription || `Explore the diverse wildlife, habitats, and key species of ${data.name} on Wildpedia.`;
  const imageUrl = data.heroImage.startsWith('http') ? data.heroImage : `${SITE_URL}/placehold.co/1200x630.png?text=${encodeURIComponent(data.name)}`;
  const keywordsBase = [data.name, 'wildlife', 'animals', 'ecosystems', 'nature', regionSlug];
  const keywordsSpecific = type === 'continent' ? (data as ContinentInfo).keyAnimals.map(a => a.name).slice(0,3) : (data as SubregionInfo).representativeAnimals.map(a => a.name).slice(0,3);


  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [...keywordsBase, ...keywordsSpecific],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${SITE_URL}/explore/region/${regionSlug}`,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.heroImageAlt || `Wildlife of ${data.name}`,
        },
      ],
       article: {
        publishedTime: new Date().toISOString(),
        authors: [`${SITE_URL}/about`],
        section: "Geographic Regions & Biomes",
        tags: [data.name, ...keywordsSpecific],
      }
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
    },
  };
}

export default async function RegionDetailPage({ params }: { params: { regionSlug: string } }) {
  const regionSlug = params.regionSlug;
  const regionDetails = await getRegionDetails(regionSlug);

  if (!regionDetails) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <Map size={64} className="mx-auto text-destructive mb-4" />
        <h1 className="text-2xl font-semibold text-destructive mb-2">Region Not Found</h1>
        <p className="text-muted-foreground">The geographic region or biome you're looking for doesn't exist or is under construction.</p>
        <Link href="/explore/region" className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
          <ArrowLeft className="inline-block h-4 w-4 mr-1" /> Back to Regions
        </Link>
      </div>
    );
  }
  
  const { type, data } = regionDetails;
  const regionJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Wildlife of ${data.name}`,
    "name": data.name,
    "description": data.introduction,
    "image": data.heroImage,
    "publisher": {
      "@type": "Organization",
      "name": "Wildpedia",
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` }
    },
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${SITE_URL}/explore/region/${regionSlug}`
    }
  };

  const PageIcon = type === 'continent' ? Globe : (data.name === 'Rainforests' ? Trees : (data.name === 'Deserts' ? Sun : Leaf));


  return (
    <div className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(regionJsonLd) }}
      />
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] w-full mb-8">
        <Image
          src={data.heroImage}
          alt={data.heroImageAlt}
          fill
          style={{ objectFit: 'cover' }}
          priority
          data-ai-hint={data.heroImageDataAiHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">{data.name}</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-md">{data.introduction}</p>
        </div>
         <Link href="/explore/region" className="absolute top-4 left-4 z-20 text-sm text-white/80 hover:text-white bg-black/30 hover:bg-black/50 px-3 py-1 rounded-full inline-flex items-center gap-1 transition-colors">
           <ArrowLeft className="h-4 w-4" /> Back to Regions
         </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        {type === 'continent' && (data as ContinentInfo).keyAnimals.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-primary mb-6 flex items-center gap-2">
              <PageIcon className="h-7 w-7 text-accent" />
              Key Animals of {data.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(data as ContinentInfo).keyAnimals.map((animal) => (
                <ContinentAnimalCard key={animal.id} animal={animal} continentSlug={data.id} />
              ))}
            </div>
          </section>
        )}

        {type === 'subregion' && (
          <>
            {(data as SubregionInfo).featuredLocations && (data as SubregionInfo).featuredLocations.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-semibold text-primary mb-6 flex items-center gap-2">
                  <Map className="h-7 w-7 text-accent" />
                  Featured Locations in {data.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {(data as SubregionInfo).featuredLocations.map(location => (
                    <Card key={location.name} className="bg-muted/50">
                      <CardContent className="p-4">
                        <p className="font-medium text-foreground">{location.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {(data as SubregionInfo).representativeAnimals.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-semibold text-primary mb-6 flex items-center gap-2">
                  <PageIcon className="h-7 w-7 text-accent" />
                  Representative Species of {data.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {(data as SubregionInfo).representativeAnimals.map((animal) => (
                    <ContinentAnimalCard key={animal.id} animal={animal} continentSlug={data.id} />
                  ))}
                </div>
              </section>
            )}

            {(data as SubregionInfo).ecologicalSignificance && (
              <section className="mb-12">
                <h2 className="text-3xl font-semibold text-primary mb-6 flex items-center gap-2">
                  <Leaf className="h-7 w-7 text-accent" />
                  Ecological Significance
                </h2>
                <Accordion type="single" collapsible className="w-full bg-card border rounded-lg shadow-sm p-1">
                  <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="text-xl font-semibold text-primary hover:no-underline px-4 py-3">
                        Why {data.name} Matters
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground space-y-3 pt-0 px-4 pb-4">
                      <p>{(data as SubregionInfo).ecologicalSignificance}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

