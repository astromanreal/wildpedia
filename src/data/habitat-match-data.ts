
/**
 * @fileOverview Mock data for the Habitat Match Game.
 */

export interface Habitat {
  id: string;
  name: string;
  image: string; // URL or path to habitat image
  dataAiHint: string;
}

export interface Animal {
  id: string;
  name: string;
  image: string; // URL or path to animal image
  correctHabitatId: string;
  dataAiHint: string;
}

export const habitats: Habitat[] = [
  {
    id: 'savanna',
    name: 'African Savanna',
    image: 'https://placehold.co/300x200.png?text=Savanna',
    dataAiHint: 'african savanna landscape sunset game',
  },
  {
    id: 'arctic',
    name: 'Arctic Tundra',
    image: 'https://placehold.co/300x200.png?text=Arctic',
    dataAiHint: 'arctic tundra snow ice winter game',
  },
  {
    id: 'rainforest',
    name: 'Amazon Rainforest',
    image: 'https://placehold.co/300x200.png?text=Rainforest',
    dataAiHint: 'amazon rainforest dense jungle river game',
  },
   {
    id: 'ocean',
    name: 'Coral Reef',
    image: 'https://placehold.co/300x200.png?text=Coral+Reef',
    dataAiHint: 'coral reef underwater fish ocean game',
  },
];

export const animals: Animal[] = [
  {
    id: 'lion',
    name: 'Lion',
    image: 'https://placehold.co/100x100.png?text=Lion',
    correctHabitatId: 'savanna',
    dataAiHint: 'lion face close up game',
  },
  {
    id: 'polar-bear',
    name: 'Polar Bear',
    image: 'https://placehold.co/100x100.png?text=Polar+Bear',
    correctHabitatId: 'arctic',
    dataAiHint: 'polar bear snow walking game',
  },
  {
    id: 'toucan',
    name: 'Toucan',
    image: 'https://placehold.co/100x100.png?text=Toucan',
    correctHabitatId: 'rainforest',
    dataAiHint: 'toucan colorful beak profile game',
  },
  {
    id: 'clownfish',
    name: 'Clownfish',
    image: 'https://placehold.co/100x100.png?text=Clownfish',
    correctHabitatId: 'ocean',
     dataAiHint: 'clownfish sea anemone underwater game',
  },
    {
    id: 'zebra',
    name: 'Zebra',
    image: 'https://placehold.co/100x100.png?text=Zebra',
    correctHabitatId: 'savanna',
    dataAiHint: 'zebra stripes profile game',
    },
    {
    id: 'arctic-fox',
    name: 'Arctic Fox',
    image: 'https://placehold.co/100x100.png?text=Arctic+Fox',
    correctHabitatId: 'arctic',
    dataAiHint: 'arctic fox white fur snow game',
    },
    {
    id: 'monkey',
    name: 'Howler Monkey',
    image: 'https://placehold.co/100x100.png?text=Howler+Monkey',
    correctHabitatId: 'rainforest',
    dataAiHint: 'howler monkey tree branch jungle game',
   },
    {
    id: 'sea-turtle',
    name: 'Sea Turtle',
    image: 'https://placehold.co/100x100.png?text=Sea+Turtle',
    correctHabitatId: 'ocean',
    dataAiHint: 'sea turtle swimming underwater ocean game',
    },
];
