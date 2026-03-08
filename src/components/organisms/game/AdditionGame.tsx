"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/game/Card";
import { CardContent } from "@/components/atoms/game/CardContent";
import { CardFooter } from "@/components/atoms/game/CardFooter";
import { CardHeader } from "@/components/atoms/game/CardHeader";
import { PlusIcon, Sparkles, Star, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { Progress } from "@/components/atoms/Progress";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Problem = {
  num1: number;
  num2: number;
  answer: number;
  options: number[];
};

export default function AdditionGame() {
  const t = useTranslations("Game");
  const [problems, setProblems] = useState<Problem[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [status, setStatus] = useState<"ready" | "playing" | "finished">("ready");
  const [timeLeft, setTimeLeft] = useState(30);

  const generateProblems = () => {
    const list: Problem[] = [];
    for (let i = 0; i < 10; i++) {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const answer = num1 + num2;
      const options = [answer];

      while (options.length < 4) {
        const wrong = Math.floor(Math.random() * 20) + 1;
        if (!options.includes(wrong)) options.push(wrong);
      }


      list.push({ num1, num2, answer, options: options.sort(() => 0.5 - Math.random()) });

    }

    setProblems(list);
  };

  const startGame = () => {
    generateProblems();
    setScore(0);
    setCurrent(0);
    setSelected(null);
    setCorrect(null);
    setTimeLeft(30);
    setStatus("playing");
  };

  const handleSelect = (opt: number) => {
    if (selected !== null) return;
    const isCorrect = opt === problems[current].answer;
    setSelected(opt);
    setCorrect(isCorrect);

    if (isCorrect) {
      setScore((s) => s + 1);
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#f50057", "#ff80ab", "#ff4081"],
      });
    }

    setTimeout(() => {
      if (current < problems.length - 1) {
        setCurrent((i) => i + 1);
        setSelected(null);
        setCorrect(null);
      } else {
        setStatus("finished");
      }
    }, 1200);
  };

  useEffect(() => {
    if (status === "playing") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setStatus("finished");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader className="bg-pink-100">
        <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center shadow">
          <PlusIcon className="h-6 w-6 text-pink-500" />
        </div>
        <h1 className="text-xl font-bold mt-4">{t("addition")}</h1>
        <p className="text-muted-foreground text-sm mt-2">{t("additionPractise")}</p>
      </CardHeader>

      <CardContent className="pt-6">
        {status === "ready" && (
          <>
            <h2 className="text-2xl font-bold">¡{t("addition")}!</h2>
            <div className="relative w-full h-40 my-6">
              <Image src="/placeholder.svg?height=160&width=300" alt={t("addition")} fill className="object-contain" />
            </div>
            <p className="text-text text-sm">{t("additionInstructions")}</p>

            <div className="mt-12 flex items-center justify-center">
              <Button onClick={startGame} size="md" className="animate-pulse">
                <Sparkles className="mr-2 h-5 w-5" />
                {t("start")}
              </Button>
            </div>
          </>
        )}

        {status === "playing" && problems.length > 0 && (
          <>
            <div className="flex justify-between mb-2 text-sm text-muted-foreground">
              <span>{t("questionCount", { current: current + 1, total: problems.length })}</span>
              <span className={timeLeft <= 5 ? "text-red-500 font-bold" : ""}>
                {t("time")}: {timeLeft}s
              </span>
            </div>

            <Progress value={(current / problems.length) * 100} className="h-2 mb-6" />

            <div className="text-3xl font-bold mb-6">
              {problems[current].num1} + {problems[current].num2} = ?
            </div>

            <div className="grid grid-cols-2 gap-4">
              {problems[current].options.map((opt, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleSelect(opt)}
                  disabled={selected !== null}
                  variant={
                    selected === opt
                      ? correct
                        ? "success"
                        : "destructive"
                      : selected !== null && opt === problems[current].answer
                        ? "success"
                        : "outline"
                  }
                >
                  {opt}
                  {selected === opt && correct && (
                    <Star className="ml-2 h-4 w-4 text-yellow-400 fill-yellow-400" />
                  )}
                </Button>
              ))}
            </div>
          </>
        )}

        {status === "finished" && (
          <>
            <Trophy className="mx-auto text-pink-500 w-10 h-10 mb-2" />
            <h3 className="text-lg font-bold">{t("gameOver")}</h3>
            <p className="text-sm text-muted-foreground">
              {t.rich("scoreResult", {
                score: score,
                total: problems.length,
                bold: (chunks) => <strong>{chunks}</strong>
              })}
            </p>
            <div className="mt-12 flex items-center justify-center">
              <Button onClick={startGame} size="md">
                <Sparkles className="mr-2 h-5 w-5" />
                {t("start")}
              </Button>
            </div>
          </>
        )}
      </CardContent>

      {status === "playing" && (
        <CardFooter className="justify-center">
          <Button variant="outline" size="lg" onClick={() => setStatus("finished")}>
            {t("finish")}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}