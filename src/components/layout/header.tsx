import Link from 'next/link';
import { Leaf, MoreVertical, Compass, Gamepad2, Shield, Skull, Plane, Link2 as LinkIcon, User, Mail, Settings, Mountain } from 'lucide-react'; // Added Compass, Gamepad2
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose, // Import SheetClose
} from '@/components/ui/sheet'; // Import Sheet components
import { Separator } from '@/components/ui/separator'; // Import Separator
import type { ReactNode } from 'react';

// Helper component for links inside the Sheet, closes sheet on click
const SheetNavLink = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
     <SheetClose asChild>
       <Link href={href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
         {children}
       </Link>
     </SheetClose>
  );
};


export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center space-x-2 mr-4"> {/* Added right margin */}
           <Leaf className="h-6 w-6 text-primary" />
           <span className="font-bold sm:inline-block text-lg">
             Wildpedia
           </span>
         </Link>

        {/* Right Side: Explore, Games, Theme Toggle, and Nav Menu Trigger */}
        {/* Simplified spacing class to resolve hydration error */}
        <div className="flex items-center space-x-2">
           {/* Explore Link */}
           <Link href="/explore" passHref>
             <Button variant="ghost" size="icon" aria-label="Explore Animals">
               <Compass className="h-5 w-5" />
             </Button>
           </Link>

           {/* Games Link */}
           <Link href="/games" passHref>
             <Button variant="ghost" size="icon" aria-label="Games & Quizzes">
               <Gamepad2 className="h-5 w-5" />
             </Button>
           </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

           {/* Right Nav Sheet Trigger */}
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-background p-0 flex flex-col"> {/* Added width and flex-col */}
               <SheetHeader className="p-4 border-b">
                  {/* Add a visually hidden title for accessibility */}
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="text-lg font-semibold text-primary flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                     <span>More Sections</span>
                  </div>
                </SheetHeader>
                 {/* Navigation Links inside Sheet */}
                 <nav className="flex-grow p-4 space-y-1 overflow-y-auto"> {/* Made scrollable */}
                       {/* Main Navigation */}
                       <SheetNavLink href="/explore">
                           <Compass />
                           <span>Explore Animals</span>
                       </SheetNavLink>
                       <SheetNavLink href="/games">
                           <Gamepad2 />
                           <span>Games & Quizzes</span>
                       </SheetNavLink>
                       <SheetNavLink href="/habitats">
                           <Mountain /> {/* Habitats Icon */}
                           <span>Explore Habitats</span>
                       </SheetNavLink>
                       <SheetNavLink href="/conservation-zones">
                           <Shield /> {/* Conservation Zones Icon */}
                           <span>Conservation Zones</span>
                       </SheetNavLink>
                      <SheetNavLink href="/loss-extinction">
                          <Skull />
                          <span>Loss & Extinction</span>
                      </SheetNavLink>
                      <SheetNavLink href="/tourism">
                          <Plane />
                          <span>Tourism</span>
                      </SheetNavLink>
                      <SheetNavLink href="/links">
                          <LinkIcon />
                          <span>Links</span>
                      </SheetNavLink>

                      <Separator className="my-3" /> {/* Separator */}

                      {/* Footer Links using SheetNavLink */}
                      <SheetNavLink href="/profile">
                          <User />
                          <span>Profile</span>
                      </SheetNavLink>
                      <SheetNavLink href="/contact">
                          <Mail />
                          <span>Contact</span>
                      </SheetNavLink>
                      <SheetNavLink href="/settings">
                           <Settings />
                           <span>Settings</span>
                      </SheetNavLink>
                 </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
