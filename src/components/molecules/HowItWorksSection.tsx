"use client";

import { useTranslations } from "next-intl";
import { HowItWorksCard } from "./HowItWorksCard";

export const HowItWorksSection = () => {
  const t = useTranslations("HomePage.howItWorks");

  return (
    <section className="w-full py-12 md:py-24 bg-[#F7F3F5] relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">
            {t("title")}
          </h2>
          <p className="max-w-[700px] text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <HowItWorksCard
            step={1}
            title={t("step1Title")}
            description={t("step1Desc")}
            imageSrc="/placeholder.svg?height=128&width=256"
          />
          <HowItWorksCard
            step={2}
            title={t("step2Title")}
            description={t("step2Desc")}
            imageSrc="/placeholder.svg?height=128&width=256"
            delay="0.2s"
          />
          <HowItWorksCard
            step={3}
            title={t("step3Title")}
            description={t("step3Desc")}
            imageSrc="/placeholder.svg?height=128&width=256"
            delay="0.4s"
          />
        </div>
      </div>
    </section>
  );
};