import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-center text-primary">Contact Us</h1>
      <p className="mb-12 text-lg text-center text-muted-foreground max-w-2xl mx-auto">
        Get in touch with us through the following channels. We'd love to hear from you!
      </p>
      <Card className="max-w-md mx-auto bg-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-primary">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-accent flex-shrink-0" />
            <a href="mailto:astroman6569@gmail.com" className="text-foreground hover:text-primary transition-colors">
              astroman6569@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-accent flex-shrink-0" />
            <a href="tel:+918102116569" className="text-foreground hover:text-primary transition-colors">
              +91 8102116569
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <Twitter className="h-5 w-5 text-accent flex-shrink-0" />
            <a href="https://x.com/Sathyamsarthak" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              @Sathyamsarthak
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <Instagram className="h-5 w-5 text-accent flex-shrink-0" />
            <a href="https://www.instagram.com/srishikharji/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              @srishikharji
            </a>
          </div>
        </CardContent>
      </Card>
       <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                &larr; Back to Explore
            </Link>
        </div>
    </div>
  );
}
