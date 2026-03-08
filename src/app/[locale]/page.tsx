import { HowItWorksSection } from "@/components/molecules/HowItWorksSection";
import { FeaturesSection } from "@/components/organisms/FeaturesSection";
import { Hero } from "@/components/organisms/Hero";
import { Navbar } from "@/components/organisms/Navbar";
import Testimonials from "@/components/organisms/Testimonials";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  await params;

  return (
    <>
      <Navbar />
      <Hero />

      <main>
        <FeaturesSection />
        <HowItWorksSection />
        <Testimonials />
      </main>


    </>

  );
}
