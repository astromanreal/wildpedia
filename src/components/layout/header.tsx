
import Link from 'next/link';
import { Leaf, MoreVertical, Compass, Gamepad2, Shield, Skull, Plane, Link2 as LinkIcon, User, Mail, Settings, Mountain } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import type { ReactNode } from 'react';

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
        <Link href="/" className="flex items-center space-x-2 mr-4">
           <Leaf className="h-6 w-6 text-primary" />
           <span className="font-bold sm:inline-block text-lg">
             Wildpedia
           </span>
         </Link>

        <div className="flex items-center space-x-2">
           <Link href="/explore" passHref>
             <Button variant="ghost" size="icon" aria-label="Explore Animals">
               <Compass className="h-5 w-5" />
             </Button>
           </Link>

           <Link href="/games" passHref>
             <Button variant="ghost" size="icon" aria-label="Games & Quizzes">
               <Gamepad2 className="h-5 w-5" />
             </Button>
           </Link>

          <ThemeToggle />

           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-background p-0 flex flex-col">
               <SheetHeader className="p-4 border-b">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="text-lg font-semibold text-primary flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                     <span>More Sections</span>
                  </div>
                </SheetHeader>
                 <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
                       <SheetNavLink href="/explore">
                           <Compass />
                           <span>Explore Animals</span>
                       </SheetNavLink>
                       <SheetNavLink href="/games">
                           <Gamepad2 />
                           <span>Games & Quizzes</span>
                       </SheetNavLink>
                       <SheetNavLink href="/habitats">
                           <Mountain />
                           <span>Explore Habitats</span>
                       </SheetNavLink>
                       <SheetNavLink href="/conservation-zones">
                           <Shield />
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

                      <Separator className="my-3" />

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
