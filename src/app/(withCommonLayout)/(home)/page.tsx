
import WorkSection from "@/components/ui/core/shared/WorkSection";
import FeaturedListing from "@/components/ui/modules/home/FeaturedListing";
import HeroSection from "@/components/ui/modules/home/HeroSection";


const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedListing />
      <WorkSection />
    </div>
  );
};

export default HomePage;