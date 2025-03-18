import { HowItWorksSection } from "@/components/molecules/HowItWorksSection";
import { FeaturesSection } from "@/components/organisms/FeaturesSection";
import Testimonials from "@/components/organisms/Testimonials";


export default function Home() {
  return (
    <main>
      <FeaturesSection />
      <HowItWorksSection  />
      <Testimonials/>
    </main> 
  );
}
