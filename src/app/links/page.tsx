import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Tv, Globe, Film, ExternalLink } from 'lucide-react'; // Added icons
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // For photographer profile pics

// Placeholder Data
const photographers = [
  { name: 'Paul Nicklen', imageSeed: 'paul-nicklen', link: 'https://paulnicklen.com/', bio: 'Arctic & wildlife conservation photographer.' },
  { name: 'Cristina Mittermeier', imageSeed: 'cristina-mittermeier', link: 'https://cristinamittermeier.com/', bio: 'Conservation photographer, co-founder SeaLegacy.' },
  { name: 'Ami Vitale', imageSeed: 'ami-vitale', link: 'https://www.amivitale.com/', bio: 'National Geographic photographer, filmmaker.' },
];

const channels = [
  { name: 'National Geographic Wild', link: 'https://www.nationalgeographic.com/tv/shows/nat-geo-wild' },
  { name: 'BBC Earth', link: 'https://www.bbcearth.com/' },
  { name: 'Discovery Channel', link: 'https://www.discovery.com/' },
];

const websites = [
  { name: 'World Wildlife Fund (WWF)', link: 'https://www.worldwildlife.org/' },
  { name: 'IUCN Red List', link: 'https://www.iucnredlist.org/' },
  { name: 'Audubon Society', link: 'https://www.audubon.org/' },
];

const documentaries = [
  { name: 'Planet Earth II', link: 'https://www.bbc.co.uk/programmes/p02544td' },
  { name: 'Blue Planet II', link: 'https://www.bbc.co.uk/programmes/p04tjbtx' },
  { name: 'My Octopus Teacher', link: 'https://www.netflix.com/title/81045007' }, // Example Netflix link
];


export default function LinksPage() {
  return (
    <div className="container mx-auto py-16 px-4 perspective-1000">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-center text-primary">Useful Resources</h1>
      <p className="mb-12 text-lg text-center text-muted-foreground max-w-2xl mx-auto">
        Discover external resources, talented photographers, and inspiring media related to wildlife and conservation.
      </p>

      {/* Photographers Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center text-primary flex items-center justify-center gap-2">
          <Camera className="h-8 w-8 text-accent"/> Wildlife Photographers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photographers.map((photographer) => (
             <a key={photographer.name} href={photographer.link} target="_blank" rel="noopener noreferrer" className="block group">
               <Card className="
                 transform-style-preserve-3d transition-transform duration-500 ease-out
                 hover:scale-105 hover:shadow-2xl hover:-rotate-y-3 hover:-rotate-x-1
                 cursor-pointer h-full flex flex-col bg-card border border-border/50 hover:border-accent/50 overflow-hidden relative
               ">
                 <div className="absolute inset-0 bg-gradient-to-br from-card via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backface-hidden"></div>
                 <CardHeader className="items-center text-center z-10 pt-6">
                    <Avatar className="h-20 w-20 mb-3 border-4 border-background shadow-md">
                        <AvatarImage src={`https://picsum.photos/seed/${photographer.imageSeed}/100/100`} alt={photographer.name} data-ai-hint="photographer portrait person" />
                        <AvatarFallback>{photographer.name.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                   <CardTitle className="text-xl font-semibold text-primary">{photographer.name}</CardTitle>
                 </CardHeader>
                 <CardContent className="text-center px-4 pb-6 flex-grow z-10">
                   <p className="text-sm text-muted-foreground mb-4">{photographer.bio}</p>
                   <span className="text-xs text-accent inline-flex items-center gap-1 group-hover:underline">
                        Visit Profile <ExternalLink className="h-3 w-3"/>
                   </span>
                 </CardContent>
               </Card>
             </a>
          ))}
        </div>
      </section>

      {/* Channels Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center text-primary flex items-center justify-center gap-2">
          <Tv className="h-8 w-8 text-accent"/> Channels
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((item) => (
             <a key={item.name} href={item.link} target="_blank" rel="noopener noreferrer" className="block group">
                <Card className="
                  transform-style-preserve-3d transition-transform duration-300 ease-out
                  hover:scale-103 hover:shadow-lg
                  cursor-pointer h-full bg-card border border-border/40 hover:border-accent/40 relative overflow-hidden p-5
                  ">
                     <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backface-hidden"></div>
                    <div className="flex justify-between items-center z-10 relative">
                        <span className="text-lg font-medium text-primary">{item.name}</span>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors"/>
                    </div>
                </Card>
             </a>
          ))}
        </div>
      </section>

      {/* Websites Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center text-primary flex items-center justify-center gap-2">
          <Globe className="h-8 w-8 text-accent"/> Websites
        </h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((item) => (
             <a key={item.name} href={item.link} target="_blank" rel="noopener noreferrer" className="block group">
                <Card className="
                  transform-style-preserve-3d transition-transform duration-300 ease-out
                  hover:scale-103 hover:shadow-lg
                  cursor-pointer h-full bg-card border border-border/40 hover:border-accent/40 relative overflow-hidden p-5
                  ">
                     <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backface-hidden"></div>
                    <div className="flex justify-between items-center z-10 relative">
                        <span className="text-lg font-medium text-primary">{item.name}</span>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors"/>
                    </div>
                </Card>
             </a>
            ))}
         </div>
      </section>

      {/* Documentaries Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center text-primary flex items-center justify-center gap-2">
          <Film className="h-8 w-8 text-accent"/> Documentaries
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentaries.map((item) => (
             <a key={item.name} href={item.link} target="_blank" rel="noopener noreferrer" className="block group">
                <Card className="
                  transform-style-preserve-3d transition-transform duration-300 ease-out
                  hover:scale-103 hover:shadow-lg
                  cursor-pointer h-full bg-card border border-border/40 hover:border-accent/40 relative overflow-hidden p-5
                  ">
                     <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backface-hidden"></div>
                    <div className="flex justify-between items-center z-10 relative">
                        <span className="text-lg font-medium text-primary">{item.name}</span>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors"/>
                    </div>
                </Card>
             </a>
          ))}
        </div>
      </section>

      <div className="mt-16 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
              &larr; Back to Explore
          </Link>
      </div>
    </div>
  );
}
