/**
 * Generates a random wildlife-related username.
 * Ensures this runs client-side if used directly in components
 * due to Math.random().
 */

const adjectives = [
  'Swift', 'Silent', 'Majestic', 'Curious', 'Wise', 'Brave', 'Gentle', 'Wild',
  'Keen', 'Agile', 'Ancient', 'Soaring', 'Prowling', 'Forest', 'River', 'Arctic',
  'Desert', 'Jungle', 'Mountain', 'Coastal'
];

const nouns = [
  'Eagle', 'Fox', 'Wolf', 'Bear', 'Owl', 'Tiger', 'Lion', 'Panda', 'Leopard',
  'Lynx', 'Hawk', 'Falcon', 'Heron', 'Bison', 'Elk', 'Moose', 'Otter', 'Badger',
  'Jaguar', 'Puma'
];

export function generateRandomUsername(): string {
    // IMPORTANT: Math.random() makes this function client-side only
    // if called during render. Wrap calls in useEffect in components.
    const adjIndex = Math.floor(Math.random() * adjectives.length);
    const nounIndex = Math.floor(Math.random() * nouns.length);
    const randomNumber = Math.floor(Math.random() * 100); // Add a number for uniqueness

    return `${adjectives[adjIndex]}${nouns[nounIndex]}${randomNumber}`;
}
