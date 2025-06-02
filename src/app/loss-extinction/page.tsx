
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skull, Target, Scissors, Bug, Link as LinkIcon, AlertTriangle, Clock, Ban, Globe, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

export const metadata: Metadata = {
  title: 'Wildlife Loss & Extinction - Causes and Impacts',
  description: 'Learn about the critical issue of wildlife loss, species extinction, and the anthropogenic factors driving the biodiversity crisis. Understand the causes like habitat destruction, overexploitation, and climate change.',
  keywords: ['wildlife extinction', 'biodiversity loss', 'conservation crisis', 'endangered species', 'habitat destruction', 'climate change impact', 'sixth mass extinction'],
  openGraph: {
    title: 'Wildlife Loss & Extinction - Causes and Impacts | Wildpedia',
    description: 'Explore the driving factors behind the current biodiversity crisis and species extinction on Wildpedia.',
    url: `${SITE_URL}/loss-extinction`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og-extinction.png`, alt: 'Wildlife Loss & Extinction' }], // Create public/og-extinction.png
     article: {
        publishedTime: new Date().toISOString(), // Placeholder
        authors: [`${SITE_URL}/about`],
        section: "Conservation",
        tags: ["extinction", "biodiversity", "conservation", "habitat loss"],
      }
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wildlife Loss & Extinction - Causes and Impacts | Wildpedia',
    description: 'Explore the driving factors behind the current biodiversity crisis and species extinction on Wildpedia.',
    images: [`${SITE_URL}/twitter-extinction.png`], // Create public/twitter-extinction.png
  },
};

const extinctAnimals = [
    {
        name: 'Dodo',
        scientificName: 'Raphus cucullatus',
        extinctionDate: 'c. 1662',
        region: 'Mauritius',
        cause: 'Hunting, habitat destruction, introduced species',
        imageUrl: 'https://www.extinctanimals.org/wp-content/uploads/2015/07/Dodo-Bird-Images.jpg',
        dataAiHint: 'dodo bird illustration historical'
    },
    {
        name: 'Passenger Pigeon',
        scientificName: 'Ectopistes migratorius',
        extinctionDate: '1914',
        region: 'North America',
        cause: 'Massive scale hunting, habitat loss',
        imageUrl: 'https://www.extinctanimals.org/wp-content/uploads/2015/07/Passenger-Pigeon-Flying.jpg',
        dataAiHint: 'passenger pigeon illustration flock'
    },
    {
        name: 'Tasmanian Tiger (Thylacine)',
        scientificName: 'Thylacinus cynocephalus',
        extinctionDate: '1936 (last captive animal)',
        region: 'Tasmania, Australia',
        cause: 'Hunting bounty, habitat loss, disease',
        imageUrl: 'https://www.extinctanimals.org/wp-content/uploads/2015/07/Thylacine-Photos.jpg',
        dataAiHint: 'thylacine tasmanian tiger historical photo'
    },
    {
        name: 'Steller\'s Sea Cow',
        scientificName: 'Hydrodamalis gigas',
        extinctionDate: 'c. 1768',
        region: 'Bering Sea',
        cause: 'Overhunting',
        imageUrl: 'https://www.extinctanimals.org/wp-content/uploads/2015/07/Stellers-Sea-Cow-Skeleton.jpg',
        dataAiHint: 'stellers sea cow illustration marine mammal skeleton'
    }
];


export default function LossExtinctionPage() {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Understanding Wildlife Loss & Extinction",
    "description": "An overview of the causes and consequences of species extinction and biodiversity loss.",
    "image": `${SITE_URL}/og-extinction.png`,
    "author": {
      "@type": "Organization",
      "name": "Wildpedia"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wildpedia",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    },
    "datePublished": new Date().toISOString(), // Placeholder
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${SITE_URL}/loss-extinction`
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <Link href="/" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <Card className="max-w-4xl mx-auto bg-card shadow-lg border-destructive/30 mb-8">
        <CardHeader className="text-center">
          <Skull className="h-16 w-16 mx-auto text-destructive mb-4" />
          <CardTitle className="text-4xl font-bold text-primary">Wildlife Loss & Extinction</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Understanding the alarming rate of species decline and the human impact driving the current biodiversity crisis, often called the Sixth Mass Extinction.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-6 pb-6">
           <div className="bg-destructive/10 border-l-4 border-destructive text-destructive-foreground p-4 rounded-md" role="alert">
              <div className="flex items-center gap-3">
                 <AlertTriangle className="h-6 w-6 text-destructive" />
                 <p className="font-semibold text-destructive">A Global Crisis:</p>
              </div>
              <p className="mt-2 text-sm text-destructive/90">
                 Recent studies suggest nearly half of monitored species show population declines due to human actions. The UN estimates roughly <strong>1 million species</strong> face extinction within decades. Immediate, large-scale efforts are crucial to prevent further losses.
              </p>
           </div>

          <p className="text-center text-muted-foreground pt-4">
            Explore the primary anthropogenic (human-caused) drivers of this crisis:
          </p>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto mb-12">
        <AccordionItem value="item-1" className="bg-card border rounded-lg shadow-sm mb-4 px-4">
          <AccordionTrigger className="text-xl font-semibold text-primary hover:no-underline">
             <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-accent" />
                <span>Overkill / Overexploitation</span>
             </div>
          </AccordionTrigger>
          <AccordionContent className="text-foreground space-y-3 pt-2">
             <p>Hunting or fishing rates exceeding a population's reproductive capacity. Slow-growing or isolated populations are particularly vulnerable.</p>
             <p>Initially, sustainable hunting might lower competition, but continued excessive rates lead to decline and potential extinction.</p>
          </AccordionContent>
        </AccordionItem>

         <AccordionItem value="item-poaching" className="bg-card border rounded-lg shadow-sm mb-4 px-4">
            <AccordionTrigger className="text-xl font-semibold text-primary hover:no-underline">
                <div className="flex items-center gap-3">
                    <Ban className="h-5 w-5 text-accent" />
                    <span>Poaching & Illegal Wildlife Trade</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="text-foreground space-y-3 pt-2">
                <p>The illegal hunting or capturing of wild animals, often for specific body parts (like ivory, horns, or skins) traded on the black market.</p>
                <p>This multi-billion dollar industry drives many iconic species like elephants, rhinos, and tigers towards extinction.</p>
            </AccordionContent>
         </AccordionItem>

        <AccordionItem value="item-2" className="bg-card border rounded-lg shadow-sm mb-4 px-4">
          <AccordionTrigger className="text-xl font-semibold text-primary hover:no-underline">
             <div className="flex items-center gap-3">
                <Scissors className="h-5 w-5 text-accent" />
                <span>Habitat Destruction & Fragmentation</span>
             </div>
          </AccordionTrigger>
          <AccordionContent className="text-foreground space-y-3 pt-2">
            <p>Human activities (agriculture, logging, urban expansion, infrastructure) destroy or break habitats into smaller, isolated patches, reducing their ability to support wildlife.</p>
            <Image
                src="https://cdn.pixabay.com/photo/2022/04/13/09/01/pxclimateaction-7129875_1280.jpg"
                alt="Habitat destruction example - deforestation aerial view"
                width={600}
                height={200}
                className="w-full h-auto rounded-md my-3 object-cover border"
                data-ai-hint="deforestation climate change aerial view"
            />
            <p>Fragmentation hinders movement, mating, resource access, and gene flow, making populations more vulnerable.</p>
          </AccordionContent>
        </AccordionItem>

         <AccordionItem value="item-climate" className="bg-card border rounded-lg shadow-sm mb-4 px-4">
            <AccordionTrigger className="text-xl font-semibold text-primary hover:no-underline">
                <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-accent" />
                    <span>Climate Change</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="text-foreground space-y-3 pt-2">
                <p>Global warming alters weather patterns, causes sea-level rise, melts ice caps, and shifts habitat ranges faster than many species can adapt.</p>
                <p>Impacts include disrupted breeding cycles, reduced food availability (e.g., coral bleaching affecting fish), and increased frequency of extreme weather events.</p>
            </AccordionContent>
         </AccordionItem>


        <AccordionItem value="item-3" className="bg-card border rounded-lg shadow-sm mb-4 px-4">
          <AccordionTrigger className="text-xl font-semibold text-primary hover:no-underline">
              <div className="flex items-center gap-3">
                  <Bug className="h-5 w-5 text-accent" />
                  <span>Impact of Introduced / Invasive Species</span>
              </div>
          </AccordionTrigger>
          <AccordionContent className="text-foreground space-y-3 pt-2">
            <p>Non-native species introduced (intentionally or accidentally) can become invasive, outcompeting or preying on native wildlife due to lack of natural controls in the new environment.</p>
            <p>Examples include cats, rabbits, certain plants, and diseases disrupting ecosystems and driving native species decline, especially on islands.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-pollution" className="bg-card border rounded-lg shadow-sm mb-4 px-4">
            <AccordionTrigger className="text-xl font-semibold text-primary hover:no-underline">
                <div className="flex items-center gap-3">
                    <Trash2 className="h-5 w-5 text-accent" />
                    <span>Pollution</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="text-foreground space-y-3 pt-2">
                <p>Contaminants released into the environment harm wildlife directly (e.g., toxins) or indirectly (e.g., habitat degradation).</p>
                <p>Major concerns include plastic pollution (ingestion, entanglement), chemical runoff from agriculture and industry, oil spills, and noise pollution affecting marine life.</p>
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="bg-card border rounded-lg shadow-sm mb-4 px-4">
          <AccordionTrigger className="text-xl font-semibold text-primary hover:no-underline">
            <div className="flex items-center gap-3">
                <LinkIcon className="h-5 w-5 text-accent" />
                <span>Chains of Extinction (Co-extinction)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-foreground space-y-3 pt-2">
            <p>Secondary extinctions caused by the disappearance of a species that another species depends on (domino effect).</p>
            <p>For example, the extinction of a specific plant can lead to the extinction of insects that feed solely on it, which in turn affects birds or other animals that prey on those insects.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

       <div className="mt-12 max-w-5xl mx-auto">
         <h2 className="text-3xl font-semibold text-center text-primary mb-8 flex items-center justify-center gap-2">
           <Skull className="h-8 w-8 text-destructive"/> Notable Extinctions
         </h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {extinctAnimals.map((animal) => (
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
                   <p><span className="font-medium text-muted-foreground">Region:</span> {animal.region}</p>
                   <p><span className="font-medium text-muted-foreground">Extinct:</span> {animal.extinctionDate}</p>
                   <p><span className="font-medium text-muted-foreground">Cause:</span> {animal.cause}</p>
                 </div>
               </CardContent>
             </Card>
           ))}
         </div>
          <p className="text-center text-sm text-muted-foreground mt-8 italic">
                This is just a small selection; countless other species have been lost.
          </p>
       </div>

    </div>
  );
}

    