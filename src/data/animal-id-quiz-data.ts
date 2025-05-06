/**
 * @fileOverview Mock data for the Animal Identification Quiz.
 */

export interface QuizQuestion {
  id: number;
  image?: string; // URL to an animal image
  description?: string; // Text description if no image
  options: string[];
  correctAnswer: string;
  dataAiHint?: string; // Hint for image generation if using placeholders
}

export const animalIdQuizData: QuizQuestion[] = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/lion/400/300',
    dataAiHint: 'lion savanna daytime',
    options: ['Tiger', 'Lion', 'Leopard', 'Cheetah'],
    correctAnswer: 'Lion',
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/penguin/400/300',
    dataAiHint: 'emperor penguin snow ice',
    options: ['Puffin', 'Albatross', 'Penguin', 'Seagull'],
    correctAnswer: 'Penguin',
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/elephant/400/300',
    dataAiHint: 'african elephant waterhole',
    options: ['Rhinoceros', 'Hippopotamus', 'Giraffe', 'Elephant'],
    correctAnswer: 'Elephant',
  },
  {
    id: 4,
    image: 'https://picsum.photos/seed/red-panda/400/300',
    dataAiHint: 'red panda climbing tree',
    options: ['Raccoon', 'Red Panda', 'Fox', 'Weasel'],
    correctAnswer: 'Red Panda',
  },
  {
    id: 5,
    description: 'I am a large, black and white bear native to south-central China. I primarily eat bamboo.',
    options: ['Grizzly Bear', 'Polar Bear', 'Giant Panda', 'Sloth Bear'],
    correctAnswer: 'Giant Panda',
  },
   {
    id: 6,
    image: 'https://picsum.photos/seed/koala/400/300',
    dataAiHint: 'koala sleeping eucalyptus tree',
    options: ['Koala', 'Sloth', 'Opossum', 'Lemur'],
    correctAnswer: 'Koala',
  },
  {
    id: 7,
    image: 'https://picsum.photos/seed/gorilla/400/300',
    dataAiHint: 'silverback gorilla jungle foliage',
    options: ['Chimpanzee', 'Orangutan', 'Gorilla', 'Baboon'],
    correctAnswer: 'Gorilla',
  },
  {
    id: 8,
    description: 'I am the fastest land animal, known for my spotted coat and incredible speed.',
    options: ['Leopard', 'Jaguar', 'Lion', 'Cheetah'],
    correctAnswer: 'Cheetah',
  },
    {
    id: 9,
    image: 'https://picsum.photos/seed/arctic-fox/400/300',
    dataAiHint: 'arctic fox white snow winter',
    options: ['Snow Leopard', 'Arctic Fox', 'Siberian Husky', 'Polar Bear Cub'],
    correctAnswer: 'Arctic Fox',
  },
  {
    id: 10,
    image: 'https://picsum.photos/seed/toucan/400/300',
    dataAiHint: 'toucan colorful beak rainforest branch',
    options: ['Parrot', 'Macaw', 'Hornbill', 'Toucan'],
    correctAnswer: 'Toucan',
  },
];
