"use client";

import { use, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Star, Zap, Target } from "lucide-react";
import AdditionGame from "@/components/organisms/game/AdditionGame";
import { Card } from "@/components/atoms/game/Card";
import { CardHeader } from "@/components/atoms/game/CardHeader";
import { CardContent } from "@/components/atoms/game/CardContent";
import { MathBackground } from "@/components/organisms/MathBackground";
import { cn } from "@/libs/utils";
import SubtractionGame from "@/components/organisms/game/SubtractionGame";
import MultiplicationGame from "@/components/organisms/game/MultiplicationGame";
import { WritingNumbersGame } from "@/components/organisms/game/WritingNumbersGame";
import DivisionGame from "@/components/organisms/game/DivisionGame";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function GameLauncherPage({ params }: PageProps) {

  const { id } = use(params);
  const t = useTranslations("GameLauncher");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null);

  const levels = [
    { id: "easy", icon: <Star size={20} />, color: "bg-green-100 text-green-600 border-green-200" },
    { id: "medium", icon: <Target size={20} />, color: "bg-blue-100 text-blue-600 border-blue-200" },
    { id: "hard", icon: <Zap size={20} />, color: "bg-red-100 text-red-600 border-red-200" },
  ];

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  if (!isMounted) return null;
  if (difficulty) {
    return (
      <div className="container mx-auto py-10 flex justify-center animate-in fade-in zoom-in-95 duration-300">
        {id === "multiplication" ? (
          <MultiplicationGame difficulty={difficulty} onExit={() => setDifficulty(null)} />
        ) : id === "subtraction" ? (
          <SubtractionGame difficulty={difficulty} onExit={() => setDifficulty(null)} />
        ) : id === "addition" ? (
          <AdditionGame difficulty={difficulty} onExit={() => setDifficulty(null)} />
        ) : id === "writing" ? (
          <WritingNumbersGame difficulty={difficulty} onExit={() => setDifficulty(null)} />
        ) : id === "division" ? (
          <DivisionGame difficulty={difficulty} onExit={() => setDifficulty(null)} />
        ) : null}
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4 relative overflow-hidden rounded-[3rem]">
      <MathBackground />

      <Card className="w-full max-w-sm shadow-2xl border-2 overflow-hidden relative z-10 bg-white/90 backdrop-blur-md">
        <CardHeader className="bg-pink-100/50 pt-8 pb-4 border-b">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-primary">
              <Star className="fill-primary h-6 w-6" />
            </div>
          </div>
          <h1 className="text-xl font-black text-center text-text uppercase tracking-tight">
            {t('selectDifficulty')}
          </h1>
        </CardHeader>

        <CardContent className="p-8">
          <div className="flex justify-between gap-3">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setDifficulty(level.id as "easy" | "medium" | "hard")}
                className={cn(
                  "cursor-pointer flex-1 flex flex-col items-center gap-2 p-4 rounded-3xl border-2 transition-all active:scale-90 hover:shadow-md hover:-translate-y-1",
                  level.color
                )}
              >
                <div className="p-2 bg-white rounded-full shadow-inner">
                  {level.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-tighter">
                  {t(level.id)}
                </span>
              </button>
            ))}
          </div>

          <p className="text-center text-muted text-[11px] font-medium mt-6 px-4 leading-tight">
            {t('chooseHowBig')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}