"use client";

import { PlusIcon, MinusIcon, XIcon, Sparkles, PenLine } from "lucide-react";
import { GameCard } from "@/components/molecules/game/GameCard";
import { useTranslations } from "next-intl";

export const GamePage = () => {
  const t = useTranslations("Game");

  const games = [
    {
      id: "addition",
      title: t("addition"),
      description: t("additionDesc"),
      icon: <PlusIcon className="h-10 w-10 text-pink-500" />,
      bgColor: "bg-pink-100",
      level: t("levelBeginner"),
      ageRange: t("age69"),
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "subtraction",
      title: t("subtraction"),
      description: t("subtractionDesc"),
      icon: <MinusIcon className="h-10 w-10 text-purple-500" />,
      bgColor: "bg-purple-100",
      level: t("levelBeginner"),
      ageRange: t("age69"),
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "multiplication",
      title: t("multiplication"),
      description: t("multiplicationDesc"),
      icon: <XIcon className="h-10 w-10 text-fuchsia-500" />,
      bgColor: "bg-fuchsia-100",
      level: t("levelAdvanced"),
      ageRange: t("age811"),
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "writing",
      title: t("writing"),
      description: t("writingDesc"),
      icon: <PenLine className="h-10 w-10 text-orange-500" />,
      bgColor: "bg-orange-100",
      level: t("levelIntermediate"),
      ageRange: t("age79"),
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <div className="relative container py-12 px-10">
      {/* 🔹 Burbujas flotantes */}
      <div className="bubble w-32 h-32 top-20 left-[10%] animate-float"></div>
      <div className="bubble w-24 h-24 top-40 right-[15%] animate-float" style={{ animationDelay: "1s" }}></div>

      {/* Encabezado traducido */}
      <div className="text-center mb-12 relative">
        <div className="inline-block bg-primary/20 p-2 rounded-full mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tighter mb-2">{t("title")}</h1>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          {t("description")}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
};