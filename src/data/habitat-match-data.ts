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
    image: 'https://picsum.photos/seed/savanna-habitat/300/200',
    dataAiHint: 'african savanna landscape sunset',
  },
  {
    id: 'arctic',
    name: 'Arctic Tundra',
    image: 'https://picsum.photos/seed/arctic-habitat/300/200',
    dataAiHint: 'arctic tundra snow ice winter',
  },
  {
    id: 'rainforest',
    name: 'Amazon Rainforest',
    image: 'https://picsum.photos/seed/rainforest-habitat/300/200',
    dataAiHint: 'amazon rainforest dense jungle river',
  },
   {
    id: 'ocean',
    name: 'Coral Reef',
    image: 'https://picsum.photos/seed/ocean-habitat/300/200',
    dataAiHint: 'coral reef underwater fish ocean',
  },
];

export const animals: Animal[] = [
  {
    id: 'lion',
    name: 'Lion',
    image: 'https://picsum.photos/seed/lion-animal/100/100',
    correctHabitatId: 'savanna',
    dataAiHint: 'lion face close up',
  },
  {
    id: 'polar-bear',
    name: 'Polar Bear',
    image: 'https://picsum.photos/seed/polar-bear-animal/100/100',
    correctHabitatId: 'arctic',
    dataAiHint: 'polar bear snow walking',
  },
  {
    id: 'toucan',
    name: 'Toucan',
    image: 'https://picsum.photos/seed/toucan-animal/100/100',
    correctHabitatId: 'rainforest',
    dataAiHint: 'toucan colorful beak profile',
  },
  {
    id: 'clownfish',
    name: 'Clownfish',
    image: 'https://picsum.photos/seed/clownfish-animal/100/100',
    correctHabitatId: 'ocean',
     dataAiHint: 'clownfish sea anemone underwater',
  },
    {
    id: 'zebra',
    name: 'Zebra',
    image: 'https://picsum.photos/seed/zebra-animal/100/100',
    correctHabitatId: 'savanna',
    dataAiHint: 'zebra stripes profile',
    },
    {
    id: 'arctic-fox',
    name: 'Arctic Fox',
    image: 'https://picsum.photos/seed/arctic-fox-animal/100/100',
    correctHabitatId: 'arctic',
    dataAiHint: 'arctic fox white fur snow',
    },
    {
    id: 'monkey',
    name: 'Howler Monkey',
    image: 'https://picsum.photos/seed/monkey-animal/100/100',
    correctHabitatId: 'rainforest',
    dataAiHint: 'howler monkey tree branch jungle',
   },
    {
    id: 'sea-turtle',
    name: 'Sea Turtle',
    image: 'https://picsum.photos/seed/sea-turtle-animal/100/100',
    correctHabitatId: 'ocean',
    dataAiHint: 'sea turtle swimming underwater ocean',
    },
];
