
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { HelpCircle } from 'lucide-react'; // Default icon

export interface CategoryItemCardProps {
  id: string;
  name: string;
  description?: string;
  icon?: LucideIcon; // Icon for the category item
  link: string;
}

export default function CategoryItemCard({ id, name, description, icon: IconComponent, link }: CategoryItemCardProps) {
  const Icon = IconComponent || HelpCircle; // Fallback to a default icon

  return (
    <Link href={link} passHref>
      <Card className="
        transform-style-preserve-3d transition-transform duration-500 ease-out
        hover:scale-105 hover:shadow-2xl hover:rotate-y-3 hover:rotate-x-1
        cursor-pointer h-full flex flex-col bg-card border border-border/50 hover:border-accent/50 group relative overflow-hidden
      ">
        <div className="absolute inset-0 bg-gradient-to-br from-card via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backface-hidden z-0"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 z-10 pt-4 px-4">
          <CardTitle className="text-lg font-semibold text-primary group-hover:text-accent transition-colors duration-300">{name}</CardTitle>
          <Icon className="h-5 w-5 text-accent flex-shrink-0" />
        </CardHeader>
        <CardContent className="flex-grow z-10 px-4 pb-4">
          {description && <p className="text-xs text-muted-foreground line-clamp-3">{description}</p>}
        </CardContent>
      </Card>
    </Link>
  );
}
