"use client";

import { useTranslations } from "next-intl";
import { GamepadIcon, Trophy, Settings } from "lucide-react";
import { FeatureCard } from "../molecules/FeatureCard";

export const FeaturesSection = () => {
  const t = useTranslations("HomePage.features");

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<GamepadIcon className="h-8 w-8 text-primary" />}
            title={t("funGames")}
            description={t("funGamesDesc")}
          />
          <FeatureCard
            icon={<Trophy className="h-8 w-8 text-primary" />}
            title={t("progress")}
            description={t("progressDesc")}
          />
          <FeatureCard
            icon={<Settings className="h-8 w-8 text-primary" />}
            title={t("custom")}
            description={t("customDesc")}
          />
        </div>
      </div>
    </section>
  );
};