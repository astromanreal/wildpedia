
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
    image: 'https://placehold.co/400x300.png?text=Lion',
    dataAiHint: 'lion savanna daytime quiz',
    options: ['Tiger', 'Lion', 'Leopard', 'Cheetah'],
    correctAnswer: 'Lion',
  },
  {
    id: 2,
    image: 'https://placehold.co/400x300.png?text=Penguin',
    dataAiHint: 'emperor penguin snow ice quiz',
    options: ['Puffin', 'Albatross', 'Penguin', 'Seagull'],
    correctAnswer: 'Penguin',
  },
  {
    id: 3,
    image: 'https://placehold.co/400x300.png?text=Elephant',
    dataAiHint: 'african elephant waterhole quiz',
    options: ['Rhinoceros', 'Hippopotamus', 'Giraffe', 'Elephant'],
    correctAnswer: 'Elephant',
  },
  {
    id: 4,
    image: 'https://placehold.co/400x300.png?text=Red+Panda',
    dataAiHint: 'red panda climbing tree quiz',
    options: ['Raccoon', 'Red Panda', 'Fox', 'Weasel'],
    correctAnswer: 'Red Panda',
  },
  {
    id: 5,
    description: 'I am a large, black and white bear native to south-central China. I primarily eat bamboo.',
    dataAiHint: 'giant panda bamboo eating text quiz', // Added hint for text-based
    options: ['Grizzly Bear', 'Polar Bear', 'Giant Panda', 'Sloth Bear'],
    correctAnswer: 'Giant Panda',
  },
   {
    id: 6,
    image: 'https://placehold.co/400x300.png?text=Koala',
    dataAiHint: 'koala sleeping eucalyptus tree quiz',
    options: ['Koala', 'Sloth', 'Opossum', 'Lemur'],
    correctAnswer: 'Koala',
  },
  {
    id: 7,
    image: 'https://placehold.co/400x300.png?text=Gorilla',
    dataAiHint: 'silverback gorilla jungle foliage quiz',
    options: ['Chimpanzee', 'Orangutan', 'Gorilla', 'Baboon'],
    correctAnswer: 'Gorilla',
  },
  {
    id: 8,
    description: 'I am the fastest land animal, known for my spotted coat and incredible speed.',
    dataAiHint: 'cheetah running speed text quiz',
    options: ['Leopard', 'Jaguar', 'Lion', 'Cheetah'],
    correctAnswer: 'Cheetah',
  },
    {
    id: 9,
    image: 'https://placehold.co/400x300.png?text=Arctic+Fox',
    dataAiHint: 'arctic fox white snow winter quiz',
    options: ['Snow Leopard', 'Arctic Fox', 'Siberian Husky', 'Polar Bear Cub'],
    correctAnswer: 'Arctic Fox',
  },
  {
    id: 10,
    image: 'https://placehold.co/400x300.png?text=Toucan',
    dataAiHint: 'toucan colorful beak rainforest quiz',
    options: ['Parrot', 'Macaw', 'Hornbill', 'Toucan'],
    correctAnswer: 'Toucan',
  },
];
