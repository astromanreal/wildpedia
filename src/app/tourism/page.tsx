
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Plane, Camera, ArrowLeft, ShieldCheck, MapPin, Search, CheckCircle, XCircle, BookOpen, BarChart3, CalendarDays, ExternalLink, Handshake, Palette, Trees, Award, Compass, Building, Activity } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

export const metadata: Metadata = {
  title: 'Wildlife Tourism - Responsible Eco-Travel Guide | Wildpedia',
  description: 'Explore responsible wildlife tourism and eco-travel. Learn about ethical practices, top destinations like Serengeti and Ranthambore, and how your travel can support conservation.',
  keywords: ['wildlife tourism', 'eco-travel', 'responsible travel', 'conservation tourism', 'sustainable tourism', 'animal watching', 'safaris', 'ethical wildlife tours'],
  openGraph: {
    title: 'Wildlife Tourism Guide - Explore Responsibly | Wildpedia',
    description: 'Discover ethical wildlife tourism destinations, operators, and experiences. Learn how to travel responsibly and support conservation efforts.',
    url: `${SITE_URL}/tourism`,
    images: [{ url: `${SITE_URL}/og-tourism.png`, alt: 'Wildlife Tourism with Wildpedia - A collage of responsible wildlife encounters' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wildlife Tourism Guide - Explore Responsibly | Wildpedia',
    description: 'Discover ethical wildlife tourism destinations, operators, and experiences.',
    images: [`${SITE_URL}/twitter-tourism.png`],
  },
};

const topDestinations = [
  {
    region: 'Africa',
    name: 'Serengeti, Tanzania',
    highlight: 'Witness the Great Migration of wildebeest and zebra. Vast plains teeming with predators and diverse herbivores.',
    icon: Compass,
    mapLink: 'https://maps.google.com/?q=Serengeti+National+Park',
  },
  {
    region: 'Asia',
    name: 'Ranthambore, India',
    highlight: 'Opportunity to spot majestic Bengal tigers in their natural habitat. Historic forts and rich biodiversity.',
    icon: Compass,
    mapLink: 'https://maps.google.com/?q=Ranthambore+National+Park',
  },
  {
    region: 'South America',
    name: 'Galápagos Islands, Ecuador',
    highlight: 'Unique endemic wildlife that inspired Darwin. Unparalleled snorkeling and birdwatching experiences.',
    icon: Compass,
    mapLink: 'https://maps.google.com/?q=Galapagos+Islands',
  },
   {
    region: 'North America',
    name: 'Yellowstone, USA',
    highlight: 'Geysers, bison, wolves, and bears. North America\'s first national park with stunning landscapes.',
    icon: Compass,
    mapLink: 'https://maps.google.com/?q=Yellowstone+National+Park',
  },
  {
    region: 'Oceania',
    name: 'Great Barrier Reef, Australia',
    highlight: 'World\'s largest coral reef system, offering incredible diving and snorkeling with vibrant marine life.',
    icon: Compass,
    mapLink: 'https://maps.google.com/?q=Great+Barrier+Reef',
  },
   {
    region: 'Europe',
    name: 'Plitvice Lakes, Croatia',
    highlight: 'Stunning terraced lakes connected by waterfalls, surrounded by lush forests. Diverse flora and fauna.',
    icon: Compass,
    mapLink: 'https://maps.google.com/?q=Plitvice+Lakes+National+Park',
  }
];

const tourOperators = [
  {
    name: 'Wild Planet Adventures',
    country: 'USA/Global',
    focus: 'Small group eco-tours, strong conservation focus, unique wildlife encounters.',
    accreditation: 'Global Sustainable Tourism Council Certified',
    tourTypes: ['Safari', 'Jungle Trekking', 'Marine Expeditions'],
    link: 'https://www.wildplanetadventures.com',
    icon: Building,
  },
  {
    name: 'Natural Habitat Adventures',
    country: 'USA/Global',
    focus: 'Official travel partner of WWF, focuses on nature and wildlife conservation holidays.',
    accreditation: 'Various eco-certifications, B Corp',
    tourTypes: ['Polar Expeditions', 'Photography Tours', 'African Safaris'],
    link: 'https://www.nathab.com',
    icon: Building,
  },
];

const experiences = [
  { name: 'Safari in Open Plains', icon: Palette, description: 'Classic game drives to witness iconic wildlife.' },
  { name: 'Whale Watching Expeditions', icon: Plane, description: 'Observe majestic marine giants in their ocean homes.' },
  { name: 'Birdwatching Tours', icon: Camera, description: 'Discover diverse avian species with expert guides.' },
  { name: 'Snorkeling in Marine Reserves', icon: Trees, description: 'Explore vibrant underwater ecosystems.' },
  { name: 'Jungle Camping Adventures', icon: Trees, description: 'Immersive experiences in dense tropical forests.' },
  { name: 'Wildlife Volunteering', icon: Handshake, description: 'Contribute directly to conservation projects on the ground.' },
];

export default function TourismPage() {
  const tourismPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Wildlife Tourism - Responsible Eco-Travel Guide | Wildpedia",
    "description": "Explore responsible wildlife tourism and eco-travel. Learn about ethical practices, top destinations, and how your travel can support conservation.",
    "url": `${SITE_URL}/tourism`,
    "publisher": {
        "@type": "Organization",
        "name": "Wildpedia",
        "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` }
    },
    "mainEntity": {
        "@type": "Article",
        "headline": "A Guide to Responsible Wildlife Tourism",
        "image": `${SITE_URL}/og-tourism.png`,
        "author": { "@type": "Organization", "name": "Wildpedia" },
        "datePublished": new Date().toISOString(),
         "keywords": ["wildlife tourism", "eco-travel", "responsible tourism", "conservation", "safari", "ethical travel"]
    }
  };

  return (
    <div className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourismPageJsonLd) }}
      />

      {/* 1. Hero Section */}
      <div className="relative h-[350px] md:h-[450px] w-full bg-gradient-to-b from-muted to-background">
        <Image
          src="https://i.pinimg.com/736x/06/cf/f4/06cff43ef28ff8586551ea177e9f925f.jpg"
          alt="Panoramic view of a wildlife safari scene"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          data-ai-hint="wildlife safari panoramic africa savanna"
          className="opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/10 to-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
          <Plane className="h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-3">Wildlife Tourism</h1>
          <p className="text-xl md:text-2xl text-white drop-shadow-lg mb-6">Explore the wild — responsibly.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/conservation-zones">Explore Conservation Zones</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 space-y-16">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1 absolute top-4 left-4 z-20 bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-full text-white/90 hover:text-white transition-colors md:hidden">
            <ArrowLeft className="h-4 w-4" /> Home
        </Link>
         <Link href="/" className="text-sm text-muted-foreground hover:text-primary mb-6 hidden md:inline-flex items-center gap-1 absolute top-6 left-6 z-20 bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-full text-white/90 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        {/* 2. What is Wildlife Tourism? */}
        <section id="what-is" className="max-w-3xl mx-auto text-center pt-8">
          <h2 className="text-3xl font-semibold text-primary mb-4 flex items-center justify-center gap-2"><Search className="h-7 w-7"/>What is Wildlife Tourism?</h2>
          <p className="text-lg text-muted-foreground mb-3">
            Wildlife tourism refers to travel focused on observing, conserving, or learning about wild animals in their natural habitats. It combines adventure, education, and conservation — if done responsibly.
          </p>
          <p className="text-md text-foreground">
            This includes experiences like safaris, birdwatching tours, marine expeditions, jungle treks, and eco-volunteering opportunities.
          </p>
        </section>

        {/* 3. Ethical Guidelines */}
        <section id="ethical-guidelines" className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-primary mb-6 text-center flex items-center justify-center gap-2"><ShieldCheck className="h-7 w-7"/>Ethical Wildlife Tourism</h2>
          <Accordion type="single" collapsible className="w-full" defaultValue="dos">
            <AccordionItem value="dos" className="bg-card border border-border/30 rounded-lg shadow-sm mb-4 px-4">
              <AccordionTrigger className="text-xl font-medium text-green-600 dark:text-green-400 hover:no-underline">
                <div className="flex items-center gap-3"><CheckCircle className="h-5 w-5"/>Do's of Responsible Travel</div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2 pt-2">
                <p>✓ Choose licensed, conservation-focused tour operators and accommodations.</p>
                <p>✓ Maintain a respectful distance from wildlife; use binoculars and zoom lenses.</p>
                <p>✓ Support legitimate sanctuaries and rescue centers that prioritize animal welfare.</p>
                <p>✓ Learn about local cultures and conservation efforts; support local communities.</p>
                <p>✓ Minimize your environmental footprint: reduce waste, conserve water, stay on marked trails.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="donts" className="bg-card border border-border/30 rounded-lg shadow-sm px-4">
              <AccordionTrigger className="text-xl font-medium text-destructive hover:no-underline">
                 <div className="flex items-center gap-3"><XCircle className="h-5 w-5"/>Don'ts of Wildlife Tourism</div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2 pt-2">
                <p>✗ Avoid direct interactions like elephant rides, petting wild animals, or selfies with captive predators.</p>
                <p>✗ Never feed wildlife, as it disrupts their natural behavior and can be harmful.</p>
                <p>✗ Do not purchase souvenirs made from endangered wildlife products (ivory, shells, skins).</p>
                <p>✗ Refrain from supporting attractions that exploit animals for entertainment.</p>
                <p>✗ Avoid off-road driving unless with authorized guides in designated areas, to protect fragile habitats.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* 4. Top Destinations by Region */}
        <section id="destinations">
          <h2 className="text-3xl font-semibold text-primary mb-8 text-center flex items-center justify-center gap-2"><MapPin className="h-7 w-7"/>Top Destinations by Region</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topDestinations.map((dest) => {
              const Icon = dest.icon || Compass;
              return (
                <Card key={dest.name} className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col border border-border/40 hover:border-accent/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-1">
                      <Icon className="h-6 w-6 text-accent flex-shrink-0" />
                      <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors">{dest.name}</CardTitle>
                    </div>
                    <CardDescription className="text-xs text-muted-foreground">{dest.region}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-foreground flex-grow">
                    <p>{dest.highlight}</p>
                  </CardContent>
                  <CardFooter className="pt-4 pb-4 border-t border-border/20">
                    <Button variant="link" asChild className="p-0 h-auto text-accent hover:underline">
                      <Link href={dest.mapLink} target="_blank" rel="noopener noreferrer">Explore Location <ExternalLink className="ml-1 h-3 w-3"/></Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 5. Wildlife-Friendly Tour Operators */}
        <section>
          <h2 className="text-3xl font-semibold text-primary mb-8 text-center flex items-center justify-center gap-2"><Award className="h-7 w-7"/>Wildlife-Friendly Tour Operators</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tourOperators.map((op) => {
              const Icon = op.icon || Building;
              return (
              <Card key={op.name} className="bg-card shadow-md hover:shadow-lg transition-shadow duration-300 border border-border/40 hover:border-primary/40 group">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors"/>
                    <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors">{op.name}</CardTitle>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground pt-1">{op.country} - {op.tourTypes.join(', ')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong className="text-foreground">Focus:</strong> {op.focus}</p>
                  <p><strong className="text-foreground">Accreditation:</strong> {op.accreditation}</p>
                </CardContent>
                <CardFooter className="pt-3 pb-4">
                  <Button variant="outline" asChild className="group-hover:border-accent group-hover:text-accent transition-colors">
                    <Link href={op.link} target="_blank" rel="noopener noreferrer">Visit Website <ExternalLink className="ml-1 h-3 w-3"/></Link>
                  </Button>
                </CardFooter>
              </Card>
              );
            })}
          </div>
        </section>

        {/* 6. Experiences & Activities */}
        <section>
          <h2 className="text-3xl font-semibold text-primary mb-8 text-center flex items-center justify-center gap-2"><Activity className="h-7 w-7"/>Experiences & Activities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => {
              const Icon = exp.icon || Palette;
              return (
                <Card key={exp.name} className="bg-card shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center p-6 group border border-border/30 hover:border-secondary">
                   <div className="p-3 bg-secondary/20 rounded-full mb-3 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-8 w-8 text-secondary-foreground group-hover:text-accent transition-colors" />
                   </div>
                  <h3 className="text-lg font-medium text-primary mb-1">{exp.name}</h3>
                  <p className="text-xs text-muted-foreground flex-grow">{exp.description}</p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 7. Conservation Impact */}
        <section id="conservation-impact" className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-primary mb-6 text-center flex items-center justify-center gap-2"><BarChart3 className="h-7 w-7"/>Conservation Impact</h2>
          <Card className="bg-card shadow-sm border-border/30">
            <CardContent className="p-6 space-y-3 text-muted-foreground">
              <p>Responsible wildlife tourism can significantly contribute to conservation efforts. Funds generated often support park management, anti-poaching initiatives, and community development projects that reduce human-wildlife conflict.</p>
              <p>For example, gorilla tourism in Rwanda has been instrumental in funding conservation programs for the endangered mountain gorilla, leading to population increases.</p>
              <p className="italic">Detailed case studies, statistics, and graphs illustrating the positive impact of eco-tourism will be featured here soon.</p>
            </CardContent>
          </Card>
        </section>

        {/* 9. Planning Your Wildlife Trip */}
        <section id="planning" className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-primary mb-6 text-center flex items-center justify-center gap-2"><CalendarDays className="h-7 w-7"/>Planning Your Wildlife Trip</h2>
          <Card className="bg-card shadow-sm border-border/30">
            <CardContent className="p-6 space-y-4 text-muted-foreground">
              <p>Proper planning is key to a successful and responsible wildlife adventure. Consider the following:</p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li><strong>What to Pack:</strong> Neutral-colored clothing, good binoculars, camera, appropriate footwear, insect repellent, sun protection.</li>
                <li><strong>Best Times to Visit:</strong> Research seasonal animal movements, weather patterns, and peak tourist seasons for your chosen destination.</li>
                <li><strong>Visa &amp; Health:</strong> Check visa requirements and consult your doctor for necessary vaccinations and health precautions.</li>
                <li><strong>Travel Insurance:</strong> Essential for adventure travel, covering medical emergencies, cancellations, and equipment.</li>
              </ul>
              <p className="italic">More detailed guides and external resource links (e.g., WWF Travel, Lonely Planet) will be added here.</p>
            </CardContent>
          </Card>
        </section>

        {/* Back to Home Link - Footer of Content Area */}
        <div className="text-center mt-12 border-t border-border/30 pt-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
