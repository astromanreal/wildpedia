import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Camera } from 'lucide-react';
import Link from 'next/link';

export default function TourismPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto bg-card shadow-lg border-blue-300 dark:border-blue-700">
        <CardHeader className="text-center">
          <Plane className="h-12 w-12 mx-auto text-blue-500 mb-4" />
          <CardTitle className="text-3xl font-bold text-primary">Wildlife Tourism</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Explore responsible wildlife tourism and eco-travel opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground">Information about ethical wildlife tourism is coming soon.</p>
          <p className="text-muted-foreground">Discover destinations and operators committed to conservation and animal welfare.</p>
           <Link href="/" className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Back to Explore
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}