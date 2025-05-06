import { conservationZonesData, type ConservationZone } from '@/data/conservation-zones-data';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Mountain, PawPrint, CalendarDays, ListChecks, Award, Globe } from 'lucide-react'; // Replaced Mountains with Mountain

// Server-side function to get zone data (simulated)
async function getZoneInfo(zoneId: string): Promise<ConservationZone | null> {
  // Simulate fetching data
  await new Promise(resolve => setTimeout(resolve, 50));
  const zone = conservationZonesData.find(z => z.id === zoneId);
  return zone || null;
}

export default async function ZoneDetailPage({ params }: { params: { zoneId: string } }) {
  const zoneId = params.zoneId;
  const zoneInfo = await getZoneInfo(zoneId);

  if (!zoneInfo) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <Globe size={64} className="mx-auto text-destructive mb-4" />
        <h1 className="text-2xl font-semibold text-destructive mb-2">Zone Not Found</h1>
        <p className="text-muted-foreground">The requested conservation zone could not be found.</p>
        <Link href="/conservation-zones" className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
          Back to Conservation Zones List
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Link href="/conservation-zones" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
        <ArrowLeft className="h-4 w-4" /> Back to Conservation Zones List
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image & Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden shadow-lg bg-card">
            <Image
              src={zoneInfo.image}
              alt={`Image of ${zoneInfo.name}`}
              width={500}
              height={350}
              className="w-full h-64 object-cover"
              data-ai-hint={zoneInfo.dataAiHint}
              priority
            />
            <CardHeader>
                <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-3xl font-bold text-primary">{zoneInfo.name}</CardTitle>
                    <Badge variant="secondary" className="text-sm">{zoneInfo.category}</Badge>
                </div>
              <CardDescription className="text-lg text-muted-foreground flex items-center gap-2">
                 <MapPin size={16}/> {zoneInfo.location}
              </CardDescription>
               <CardDescription className="text-md text-muted-foreground flex items-center gap-2 pt-1">
                 <Mountain size={16}/> Area: {zoneInfo.area} {/* Used Mountain icon */}
              </CardDescription>
            </CardHeader>
             <CardContent>
                <h3 className="font-semibold text-primary mb-2 flex items-center gap-2"><Award size={18}/> Significance</h3>
                <p className="text-foreground text-sm">{zoneInfo.significance}</p>
            </CardContent>
          </Card>

           <Card className="bg-card">
             <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 text-primary"><CalendarDays size={20}/> Best Time to Visit</CardTitle>
             </CardHeader>
             <CardContent>
                <p className="text-foreground">{zoneInfo.bestVisitTime}</p>
             </CardContent>
           </Card>

        </div>

        {/* Right Column: Species & Rules */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 text-primary"><PawPrint size={24}/> Key Species</CardTitle>
              <CardDescription>Notable wildlife found in {zoneInfo.name}.</CardDescription>
            </CardHeader>
            <CardContent>
              {zoneInfo.keySpecies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {zoneInfo.keySpecies.map((species, index) => (
                    <Badge key={index} variant="outline">{species}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground italic">Specific key species not listed.</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-amber-300 dark:border-amber-700">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 text-amber-600 dark:text-amber-400"><ListChecks size={24}/> Visitor Rules & Guidelines</CardTitle>
               <CardDescription>Important rules to follow during your visit.</CardDescription>
            </CardHeader>
            <CardContent>
              {zoneInfo.rules.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  {zoneInfo.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground italic">No specific rules listed. Always follow park regulations.</p>
              )}
            </CardContent>
          </Card>

          {/* Optional: Placeholder for interactive map for this specific zone */}
           {/* <Card className="bg-card">
             <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 text-primary"><Map size={20}/> Zone Map</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="h-64 bg-muted flex items-center justify-center text-muted-foreground italic rounded-md border">
                    Detailed map coming soon...
                </div>
             </CardContent>
           </Card> */}

        </div>
      </div>
    </div>
  );
}

// Optional: Generate static paths if you know all the zone IDs upfront
// export async function generateStaticParams() {
//   return conservationZonesData.map((zone) => ({
//     zoneId: zone.id,
//   }));
// }
