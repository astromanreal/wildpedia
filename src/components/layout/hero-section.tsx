'use client';

import * as React from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const heroImages = [
  { src: 'https://cdn.pixabay.com/photo/2024/04/05/14/47/elephant-8677545_1280.jpg', alt: 'Elephant walking', dataAiHint: 'elephant walking savanna grass' },
  { src: 'https://cdn.pixabay.com/photo/2021/11/09/17/17/deer-6781976_1280.jpg', alt: 'Deer in forest', dataAiHint: 'deer forest woods sunlight' },
  { src: 'https://cdn.pixabay.com/photo/2019/09/15/04/23/rhinoceros-4477306_1280.jpg', alt: 'Rhinoceros', dataAiHint: 'rhinoceros rhino africa savanna' },
  { src: 'https://cdn.pixabay.com/photo/2022/08/18/06/57/monkey-7394077_1280.jpg', alt: 'Monkey in tree', dataAiHint: 'monkey tree jungle branch' },
  { src: 'https://cdn.pixabay.com/photo/2024/10/24/15/55/giraffe-9146077_1280.jpg', alt: 'Giraffe', dataAiHint: 'giraffe savanna africa tree' },
];

export default function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <div className="relative w-full mb-12">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="overflow-hidden border-none shadow-none bg-transparent">
                   <CardContent className="flex aspect-[24/10] items-center justify-center p-0 relative">
                     <Image
                       src={image.src}
                       alt={image.alt}
                       fill
                       style={{ objectFit: 'cover' }}
                       priority={index === 0}
                       data-ai-hint={image.dataAiHint}
                     />
                   </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
            <CarouselPrevious className="static translate-y-0 bg-background/50 hover:bg-background/80 border-primary/30 text-primary" />
            <CarouselNext className="static translate-y-0 bg-background/50 hover:bg-background/80 border-primary/30 text-primary" />
         </div>
      </Carousel>
    </div>
  );
}
