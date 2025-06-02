
import type { Metadata } from 'next';
import CategoryView from './category-view'; // Import the new client component
import { continentData } from '@/data/continent-data'; // To list in JSON-LD
import { subregionData } from '@/data/subregion-data'; // To list in JSON-LD

// SITE_URL for metadata
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildpedia.app';

export async function generateMetadata(
  { params }: { params: { category: string } }
): Promise<Metadata> {
  const categorySlug = params.category;
  const formattedCategory = categorySlug
    ? categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : 'Animals';

  let pageTitle = `Explore Animals by ${formattedCategory} | Wildpedia`;
  let pageDescription = `Browse and discover animals categorized under ${formattedCategory} on Wildpedia. Learn about various species within this classification.`;
  let ogImage = `${SITE_URL}/og-default.png`; // Default OG image
  let keywords = [formattedCategory, 'animal category', 'wildlife', 'explore species', categorySlug];

  if (categorySlug === 'family') {
    pageTitle = `Explore Animals by Biological Family | Wildpedia`;
    pageDescription = `Animals are grouped into biological families based on shared evolutionary traits. Explore how lions are related to your house cat or how pandas and polar bears share a surprising ancestor. Discover animal taxonomy on Wildpedia.`;
    ogImage = `${SITE_URL}/og-explore-family.png`; 
    keywords = ['biological family', 'animal classification', 'taxonomy', 'species groups', 'evolutionary traits', 'animal families', formattedCategory];
  } else if (categorySlug === 'type') {
     pageTitle = `Explore Animals by Type | Wildpedia`;
     pageDescription = `Discover the incredible diversity of animal life on Earth. From mammals roaming the land to marine creatures swimming in our oceans, every type plays a crucial role in nature’s balance.`;
     ogImage = `${SITE_URL}/og-explore-type.png`; 
     keywords = ['animal types', 'mammals', 'birds', 'reptiles', 'fish', 'insects', formattedCategory];
  } else if (categorySlug === 'conservation') {
     pageTitle = `Explore Animals by Conservation Status | Wildpedia`;
     pageDescription = `Learn about animals based on their IUCN Red List status, such as Endangered, Vulnerable, or Least Concern, and understand their conservation needs.`;
     ogImage = `${SITE_URL}/og-explore-conservation.png`;
     keywords = ['conservation status', 'iucn red list', 'endangered species', 'vulnerable animals', formattedCategory];
  } else if (categorySlug === 'habitat') {
     pageTitle = `Explore Wildlife Habitats | Wildpedia`;
     pageDescription = `Discover animals based on their natural environments like forests, oceans, deserts, grasslands, and more on Wildpedia.`;
     ogImage = `${SITE_URL}/og-explore-habitat.png`; // Ensure public/og-explore-habitat.png exists
     keywords = ['wildlife habitats', 'ecosystems', 'animal environments', 'forests', 'oceans', 'deserts', formattedCategory];
  } else if (categorySlug === 'domesticity') {
    pageTitle = `Understanding Animal Domesticity | Wildpedia`;
    pageDescription = `Explore the distinctions between domesticated, wild, tamed, and feral animals. Learn about the process of domestication and its impact on animal behavior, genetics, and human society.`;
    ogImage = `${SITE_URL}/og-explore-domesticity.png`; // Ensure public/og-explore-domesticity.png exists
    keywords = ['animal domesticity', 'domesticated animals', 'wild animals', 'tamed animals', 'feral animals', 'animal behavior', 'genetics', formattedCategory];
  } else if (categorySlug === 'region') {
    pageTitle = `Explore Wildlife by Geographic Region: Continents & Biomes | Wildpedia`;
    pageDescription = `Discover animals from different continents like Africa, Asia, and unique biomes such as Rainforests and Deserts. Explore global wildlife distribution patterns and ecosystems on Wildpedia.`;
    ogImage = `${SITE_URL}/og-explore-region.png`; // Ensure public/og-explore-region.png exists
    keywords = ['geographic regions', 'continents', 'biomes', 'animal distribution', 'biogeography', 'ecosystems', 'continental wildlife', 'regional species', 'explore by map', formattedCategory];
  }


  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${SITE_URL}/explore/${categorySlug}`,
      type: 'website',
      images: [{ url: ogImage, alt: `Wildpedia - Explore by ${formattedCategory}` }],
    },
    twitter: {
      card: 'summary_large_image', 
      title: pageTitle,
      description: pageDescription,
      images: [ogImage], 
    },
  };
}

// This is now a Server Component
export default function CategoryPageServer({ params }: { params: { category: string } }) {
  const { category } = params;
  let pageJsonLd: object | null = null;

  if (category === 'region') {
    const pageTitle = `Explore Wildlife by Geographic Region: Continents & Biomes | Wildpedia`;
    const pageDescription = `Discover animals from different continents like Africa, Asia, and unique biomes such as Rainforests and Deserts. Explore global wildlife distribution patterns and ecosystems on Wildpedia.`;
    pageJsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": pageTitle,
      "description": pageDescription,
      "url": `${SITE_URL}/explore/region`,
      "publisher": {
        "@type": "Organization",
        "name": "Wildpedia",
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/logo.png`
        }
      },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          ...continentData.map((continent, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "WebPage", // Could also be Place, but WebPage is safer here for list items
              "name": continent.name,
              "description": continent.introduction.substring(0, 100) + "...", // Short description
              "url": `${SITE_URL}/explore/region/${continent.id}`
            }
          })),
          ...subregionData.map((subregion, index) => ({
            "@type": "ListItem",
            "position": continentData.length + index + 1,
            "item": {
              "@type": "WebPage",
              "name": subregion.name,
              "description": subregion.introduction.substring(0, 100) + "...", // Short description
              "url": `${SITE_URL}/explore/region/${subregion.id}`
            }
          }))
        ]
      }
    };
  } else if (category === 'family') {
     pageJsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Explore Animals by Biological Family | Wildpedia",
        "description": "Discover animals grouped by their scientific families, revealing evolutionary relationships and shared traits.",
        "url": `${SITE_URL}/explore/family`,
        "publisher": {
            "@type": "Organization",
            "name": "Wildpedia"
        }
        // Individual families can be listed as itemListElement if familyData is imported here
     }
  }


  return (
    <>
      {pageJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
        />
      )}
      <CategoryView category={category} />
    </>
  );
}

