
/**
 * @fileOverview Provides AI-powered suggestions for similar animals based on a given animal's information.
 *
 * - suggestSimilarAnimals - A function that suggests similar animals based on the provided animal information.
 * - SuggestSimilarAnimalsInput - The input type for the suggestSimilarAnimals function.
 * - SuggestSimilarAnimalsOutput - The return type for the suggestSimilarAnimals function.
 */

'use server';
import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestSimilarAnimalsInputSchema = z.object({
  animalInfo: z.object({
    scientificName: z.string().describe('The scientific name of the animal.'),
    commonName: z.string().describe('The common name of the animal.'),
    description: z.string().describe('A detailed description of the animal.'),
    diet: z.string().describe('The animal’s diet.'),
    habitat: z.string().describe('The animal’s habitat.'),
    behavior: z.string().describe('The animal’s typical behavior.'),
    size: z.string().describe('The typical size of the animal.'),
    weight: z.string().describe('The typical weight of the animal.'),
    lifespan: z.string().describe('The typical lifespan of the animal.'),
    population: z.string().describe('The estimated population of the animal.'),
    conservationStatus: z
      .enum([
        'Extinct',
        'Extinct in the Wild',
        'Critically Endangered',
        'Endangered',
        'Vulnerable',
        'Near Threatened',
        'Least Concern',
        'Data Deficient',
        'Not Evaluated',
      ])
      .describe('The animal’s conservation status according to the IUCN Red List.'),
    funFacts: z.array(z.string()).describe('Interesting facts about the animal.'),
  }).describe('Detailed information about the animal used for finding similar species.'),
  numberOfSuggestions: z.number().describe('The number of similar animals to suggest.')
});

export type SuggestSimilarAnimalsInput = z.infer<typeof SuggestSimilarAnimalsInputSchema>;

const SuggestSimilarAnimalsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of suggested similar animal names.')
});

export type SuggestSimilarAnimalsOutput = z.infer<typeof SuggestSimilarAnimalsOutputSchema>;

export async function suggestSimilarAnimals(input: SuggestSimilarAnimalsInput): Promise<SuggestSimilarAnimalsOutput> {
  return suggestSimilarAnimalsFlow(input);
}

const suggestSimilarAnimalsPrompt = ai.definePrompt({
  name: 'suggestSimilarAnimalsPrompt',
  input: {
    schema: SuggestSimilarAnimalsInputSchema
  },
  output: {
    schema: SuggestSimilarAnimalsOutputSchema
  },
  prompt: `Based on the following animal information, suggest {{{numberOfSuggestions}}} similar animals. Consider factors like habitat, diet, behavior, and general appearance/description. Return only the common names of the animals.\n\nAnimal Information:\nCommon Name: {{{animalInfo.commonName}}}\nScientific Name: {{{animalInfo.scientificName}}}\nDescription: {{{animalInfo.description}}}\nDiet: {{{animalInfo.diet}}}\nHabitat: {{{animalInfo.habitat}}}\nBehavior: {{{animalInfo.behavior}}}\nSize: {{{animalInfo.size}}}\nWeight: {{{animalInfo.weight}}}\nLifespan: {{{animalInfo.lifespan}}}\nPopulation: {{{animalInfo.population}}}\nConservation Status: {{{animalInfo.conservationStatus}}}\nFun Facts: {{#each animalInfo.funFacts}}- {{{this}}}\n{{/each}}`
});

const suggestSimilarAnimalsFlow = ai.defineFlow<
  typeof SuggestSimilarAnimalsInputSchema,
  typeof SuggestSimilarAnimalsOutputSchema
>({
  name: 'suggestSimilarAnimalsFlow',
  inputSchema: SuggestSimilarAnimalsInputSchema,
  outputSchema: SuggestSimilarAnimalsOutputSchema
}, async input => {
  const {output} = await suggestSimilarAnimalsPrompt(input);
  return output!;
});
