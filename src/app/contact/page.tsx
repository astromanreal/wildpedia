
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Twitter, Instagram, Github, UserCircle2, ArrowLeft } from 'lucide-react'; // Added Github and UserCircle2
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

export const metadata: Metadata = {
  title: 'Contact Us - Wildpedia',
  description: 'Get in touch with the Wildpedia team. We welcome your feedback, questions, and suggestions about our wildlife encyclopedia.',
  keywords: ['contact wildpedia', 'wildlife support', 'animal encyclopedia contact', 'feedback', 'github'],
  openGraph: {
    title: 'Contact Us | Wildpedia',
    description: 'Reach out to Wildpedia for inquiries or feedback.',
    url: `${SITE_URL}/contact`,
    type: 'profile',
    images: [{ url: `${SITE_URL}/og-contact.png`, alt: 'Contact Wildpedia' }],
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | Wildpedia',
    description: 'Reach out to Wildpedia for inquiries or feedback.',
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Wildpedia",
    "description": "Contact information for Wildpedia.",
    "url": `${SITE_URL}/contact`,
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${SITE_URL}/contact`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wildpedia",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    }
  };

  return (
    <div className="container mx-auto py-16 px-4"> {/* Increased py */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">
          Get In Touch
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          We're here to help and answer any question you might have. We look forward to hearing from you!
        </p>
      </div>

      <Card className="max-w-lg mx-auto bg-card shadow-xl border border-border/50 rounded-xl">
        <CardHeader className="items-center text-center pt-8 pb-4">
          <UserCircle2 className="h-16 w-16 text-primary mb-4" />
          <CardTitle className="text-2xl text-primary">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-8"> {/* Increased spacing and padding */}
          <ContactItem
            icon={Mail}
            href="mailto:astroman6569@gmail.com"
            label="astroman6569@gmail.com"
          />
          <ContactItem
            icon={Phone}
            href="tel:+918102116569"
            label="+91 8102116569"
          />
          <ContactItem
            icon={Twitter}
            href="https://x.com/Sathyamsarthak"
            label="@Sathyamsarthak"
            isExternal
          />
          <ContactItem
            icon={Instagram}
            href="https://www.instagram.com/srishikharji/"
            label="@srishikharji"
            isExternal
          />
          <ContactItem
            icon={Github}
            href="https://github.com/astromanreal"
            label="astromanreal"
            isExternal
          />
        </CardContent>
      </Card>

      <div className="mt-12 text-center"> {/* Increased margin top */}
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
        </div>
    </div>
  );
}

interface ContactItemProps {
  icon: React.ElementType;
  href: string;
  label: string;
  isExternal?: boolean;
}

function ContactItem({ icon: Icon, href, label, isExternal = false }: ContactItemProps) {
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 group"
    >
      <Icon className="h-6 w-6 text-accent flex-shrink-0 group-hover:scale-110 transition-transform" /> {/* Larger icon, hover effect */}
      <span className="text-foreground group-hover:text-primary text-base transition-colors"> {/* Slightly larger text */}
        {label}
      </span>
    </a>
  );
}

    