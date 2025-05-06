/**
 * @fileOverview Service for fetching habitat information. Includes type definitions.
 */
import type { LucideIcon } from 'lucide-react';
import { habitatData } from '@/data/habitat-data'; // Import the mock data

// Re-export the type from the data file for easier use
export type { HabitatInfo } from '@/data/habitat-data';

/**
 * Retrieves information about a specific habitat based on its ID (slug).
 *
 * @param habitatId The unique identifier (slug) for the habitat (e.g., "forests").
 * @returns A promise that resolves to a HabitatInfo object or null if not found.
 * @throws Will throw an error if the habitatId is not found in the mock database.
 */
export async function getHabitatInfo(habitatId: string): Promise<HabitatInfo | null> {
  console.log(`Fetching info for habitatId: ${habitatId}`); // Debug log
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50)); // Short delay

  const normalizedId = habitatId.toLowerCase(); // Normalize ID

  const habitat = habitatData.find(h => h.id === normalizedId);

  if (habitat) {
    return habitat;
  } else {
    console.error(`Habitat with ID "${habitatId}" not found in mock database.`);
    // In a real scenario, you might return null or a specific error object
    // For now, return null to allow the page component to handle 'not found'
    return null;
    // Or throw an error: throw new Error(`Habitat "${habitatId}" not found.`);
  }
}

/**
 * Retrieves a list of all available habitats.
 *
 * @returns A promise that resolves to an array of HabitatInfo objects.
 */
export async function getAllHabitats(): Promise<HabitatInfo[]> {
  console.log('Fetching all habitats'); // Debug log
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50)); // Short delay

  // Return a copy of the mock data
  return [...habitatData];
}