import { HowItWorksSection } from "@/components/molecules/HowItWorksSection";
import { FeaturesSection } from "@/components/organisms/FeaturesSection";
import { Hero } from "@/components/organisms/Hero";
import Testimonials from "@/components/organisms/Testimonials";


export default function Home() {
  return (
    <>
      <Hero />

      <main>
        <FeaturesSection />
        <HowItWorksSection />
        <Testimonials />
      </main>


    </>

  );
}
