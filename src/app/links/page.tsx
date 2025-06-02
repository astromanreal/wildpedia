
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Tv, Globe, Film, ExternalLink, ArrowLeft, Youtube, Microscope, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

export const metadata: Metadata = {
  title: 'Useful Wildlife Resources & Links - Photographers, Channels, Websites',
  description: 'Discover a curated list of valuable external resources related to wildlife, including renowned photographers, informative channels, conservation websites, and inspiring documentaries.',
  keywords: ['wildlife resources', 'conservation links', 'wildlife photographers', 'nature documentaries', 'animal channels', 'conservation websites', 'eco-education'],
  openGraph: {
    title: 'Useful Wildlife Resources & Links | Wildpedia',
    description: 'Explore external links for photographers, channels, websites, and documentaries about wildlife.',
    url: `${SITE_URL}/links`,
     images: [{ url: `${SITE_URL}/og-links.png`, alt: 'Wildlife Resources and Links' }],
  },
  twitter: {
    card: 'summary_large_image', // Changed to summary_large_image for better visual
    title: 'Useful Wildlife Resources & Links | Wildpedia',
    description: 'Explore external links for photographers, channels, websites, and documentaries about wildlife.',
    images: [`${SITE_URL}/twitter-links.png`], // Create a twitter-links.png if different from og-links
  },
};

const photographers = [
  { name: 'Paul Nicklen', imageSeed: 'paul-nicklen', link: 'https://paulnicklen.com/', bio: 'Arctic & wildlife conservation photographer.' },
  { name: 'Cristina Mittermeier', imageSeed: 'cristina-mittermeier', link: 'https://cristinamittermeier.com/', bio: 'Conservation photographer, co-founder SeaLegacy.' },
  { name: 'Ami Vitale', imageSeed: 'ami-vitale', link: 'https://www.amivitale.com/', bio: 'National Geographic photographer, filmmaker.' },
  { name: 'Frans Lanting', imageSeed: 'frans-lanting', link: 'https://www.lanting.com/', bio: 'Iconic nature photographer, focus on biodiversity.' },
  { name: 'Art Wolfe', imageSeed: 'art-wolfe', link: 'https://artwolfe.com/', bio: 'Photographer of wildlife, landscapes, and culture.' },
  { name: 'Beverly Joubert', imageSeed: 'beverly-joubert', link: 'https://wildlifefilms.com/', bio: 'National Geographic Explorer, filmmaker, focusing on African wildlife.' },
  { name: 'Joel Sartore', imageSeed: 'joel-sartore', link: 'https://www.joelsartore.com/photo-ark/', bio: 'Founder of the Photo Ark, documenting endangered species.' },
];

const channels = [
  { name: 'National Geographic Wild', link: 'https://www.nationalgeographic.com/tv/shows/nat-geo-wild', description: 'TV channel with stunning wildlife documentaries.', icon: Tv },
  { name: 'BBC Earth', link: 'https://www.youtube.com/user/BBCEarth', description: 'YouTube channel for BBC nature documentaries.', icon: Youtube },
  { name: 'Discovery Channel', link: 'https://www.discovery.com/', description: 'Features a wide range of nature and wildlife programming.', icon: Tv },
  { name: 'Wild Kratts', link: 'https://pbskids.org/wildkratts/', description: 'Animated series teaching kids about animals and science.', icon: Users },
  { name: 'Brave Wilderness', link: 'https://www.youtube.com/user/BreakingTrail', description: 'YouTube channel with exciting animal encounters.', icon: Youtube },
  { name: 'Smithsonian Channel', link: 'https://www.smithsonianchannel.com/', description: 'Offers high-quality nature and wildlife documentaries.', icon: Tv },
];

const websites = [
  { name: 'World Wildlife Fund (WWF)', link: 'https://www.worldwildlife.org/', description: 'Leading global conservation organization.', icon: Globe },
  { name: 'IUCN Red List', link: 'https://www.iucnredlist.org/', description: 'Comprehensive inventory of global conservation status of species.', icon: Globe },
  { name: 'Audubon Society', link: 'https://www.audubon.org/', description: 'Focuses on bird conservation and habitats.', icon: Globe },
  { name: 'Nature Conservancy', link: 'https://www.nature.org/', description: 'Works to protect ecologically important lands and waters.', icon: Globe },
  { name: 'BirdLife International', link: 'https://www.birdlife.org/', description: 'Global partnership for bird conservation.', icon: Globe },
  { name: 'Conservation International', link: 'https://www.conservation.org/', description: 'Works to protect nature for the benefit of people.', icon: Globe },
  { name: 'eBird', link: 'https://ebird.org/', description: 'Citizen science platform for bird observations.', icon: Globe },
  { name: 'ARKive (Archived)', link: 'https://www.arkive.org/', description: 'Multimedia database of endangered species (now archived).', icon: Globe },
];

const documentaries = [
  { name: 'Planet Earth II (BBC)', link: 'https://www.bbc.co.uk/programmes/p02544td', description: 'Iconic series showcasing Earth\'s diverse habitats and wildlife.', icon: Film },
  { name: 'Blue Planet II (BBC)', link: 'https://www.bbc.co.uk/programmes/p04tjbtx', description: 'Explores the wonders and challenges of marine life.', icon: Film },
  { name: 'Our Planet (Netflix)', link: 'https://www.ourplanet.com/', description: 'Visually stunning series highlighting Earth\'s natural beauty and conservation.', icon: Film },
  { name: 'My Octopus Teacher (Netflix)', link: 'https://www.netflix.com/title/81045007', description: 'A unique bond between a filmmaker and an octopus.', icon: Film },
  { name: 'Dancing with the Birds (Netflix)', link: 'https://www.netflix.com/title/80197593', description: 'Focuses on the spectacular birds-of-paradise.', icon: Film },
  { name: 'Virunga (Netflix)', link: 'https://virungamovie.com/', description: 'Investigative documentary on conservation efforts in Virunga National Park.', icon: Film },
  { name: 'Chasing Coral (Netflix)', link: 'https://www.chasingcoral.com/', description: 'Documents the alarming disappearance of coral reefs.', icon: Film },
];


export default function LinksPage() {
  const linksPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Useful Wildlife Resources and Links",
    "description": "A curated list of external resources for wildlife enthusiasts, including photographers, channels, websites, and documentaries.",
    "url": `${SITE_URL}/links`,
    "publisher": {
        "@type": "Organization",
        "name": "Wildpedia"
    },
    "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
            ...photographers.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": { "@type": "Person", "name": item.name, "url": item.link, "jobTitle": "Wildlife Photographer" }
            })),
            ...channels.map((item, index) => ({
                "@type": "ListItem",
                "position": photographers.length + index + 1,
                "item": { "@type": "WebPage", "name": item.name, "url": item.link, "description": item.description }
            })),
             ...websites.map((item, index) => ({
                "@type": "ListItem",
                "position": photographers.length + channels.length + index + 1,
                "item": { "@type": "WebSite", "name": item.name, "url": item.link, "description": item.description }
            })),
             ...documentaries.map((item, index) => ({
                "@type": "ListItem",
                "position": photographers.length + channels.length + websites.length + index + 1,
                "item": { "@type": "Movie", "name": item.name, "url": item.link, "description": item.description }
            })),
        ]
    }
  };

  return (
    <div className="container mx-auto py-16 px-4 perspective-1000">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(linksPageJsonLd) }}
      />
      <Link href="/" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
         <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-center text-primary">Useful Resources</h1>
      <p className="mb-12 text-lg text-center text-muted-foreground max-w-2xl mx-auto">
        Discover external resources, talented photographers, and inspiring media related to wildlife and conservation.
      </p>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center text-primary flex items-center justify-center gap-2">
          <Camera className="h-8 w-8 text-accent"/> Wildlife Photographers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {photographers.map((photographer) => (
             <a key={photographer.name} href={photographer.link} target="_blank" rel="noopener noreferrer" className="block group">
               <Card className="
                 transform-style-preserve-3d transition-transform duration-300 ease-out
                 hover:scale-105 hover:shadow-2xl hover:-rotate-y-2 hover:-rotate-x-1
                 cursor-pointer h-full flex flex-col bg-card border border-border/50 hover:border-accent/50 overflow-hidden relative
               ">
                 <div className="absolute inset-0 bg-gradient-to-br from-card via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backface-hidden"></div>
                 <CardHeader className="items-center text-center z-10 pt-6 pb-3">
                    <Avatar className="h-24 w-24 mb-3 border-4 border-background shadow-lg group-hover:scale-105 transition-transform">
                        <AvatarImage src={`https://picsum.photos/seed/${photographer.imageSeed}/120/120`} alt={photographer.name} data-ai-hint="photographer portrait person nature" />
                        <AvatarFallback className="text-2xl bg-muted text-muted-foreground">{photographer.name.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                   <CardTitle className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">{photographer.name}</CardTitle>
                 </CardHeader>
                 <CardContent className="text-center px-4 pb-6 flex-grow z-10 flex flex-col">
                   <p className="text-sm text-muted-foreground mb-4 flex-grow">{photographer.bio}</p>
                   <span className="text-xs text-accent inline-flex items-center gap-1 group-hover:underline justify-center mt-auto">
                        Visit Profile <ExternalLink className="h-3 w-3"/>
                   </span>
                 </CardContent>
               </Card>
             </a>
          ))}
        </div>
      </section>

      {[
        { title: 'Channels', items: channels, icon: Tv },
        { title: 'Websites', items: websites, icon: Globe },
        { title: 'Documentaries', items: documentaries, icon: Film },
      ].map((section) => (
        <section key={section.title} className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-primary flex items-center justify-center gap-2">
            <section.icon className="h-8 w-8 text-accent"/> {section.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item) => (
               <a key={item.name} href={item.link} target="_blank" rel="noopener noreferrer" className="block group">
                  <Card className="
                    transform-style-preserve-3d transition-all duration-300 ease-out
                    hover:scale-103 hover:shadow-lg
                    cursor-pointer h-full bg-card border border-border/40 hover:border-accent/40 relative overflow-hidden p-5 flex flex-col
                  ">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backface-hidden"></div>
                    <div className="flex items-start gap-3 z-10 relative mb-2">
                        {item.icon && <item.icon className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />}
                        <span className="text-lg font-medium text-primary group-hover:text-accent transition-colors">{item.name}</span>
                    </div>
                    {item.description && <p className="text-xs text-muted-foreground mb-3 z-10 relative flex-grow">{item.description}</p>}
                    <div className="mt-auto text-right z-10 relative">
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors"/>
                    </div>
                  </Card>
               </a>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-16 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
      </div>
    </div>
  );
}

    
