import ExploreCategoriesPage from '@/components/pages/explore-page'; // Updated import name
import HeroSection from '@/components/layout/hero-section'; // Import HeroSection

export default function Home() {
  return (
    <>
      <HeroSection /> {/* Add Hero Section */}
      {/* Render the explore categories page below the hero */}
      <ExploreCategoriesPage />
    </>
  );
}
