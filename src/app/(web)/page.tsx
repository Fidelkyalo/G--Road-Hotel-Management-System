import FeaturedRoom from '@/components/FeaturedRoom/FeaturedRoom';
import Gallery from '@/components/Gallery/Gallery';
import HeroSection from '@/components/HeroSection/HeroSection';
import NewsLetter from '@/components/NewsLetter/NewsLetter';
import PageSearch from '@/components/PageSearch/PageSearch';
import { getFeaturedRoom } from '@/libs/apis';

/**
 * Home Page component.
 * Fetches and displays the featured room, gallery, and newsletter sections.
 */
const Home = async () => {
  const featuredRoom = await getFeaturedRoom();

  return (
    <>
      <HeroSection />
      <PageSearch />
      {featuredRoom ? <FeaturedRoom featuredRoom={featuredRoom} /> : null}
      <Gallery />
      <NewsLetter />
    </>
  );
};

export default Home;
