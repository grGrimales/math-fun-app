"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Button } from "@/components/atoms/Button";
import { Divide, Sparkles, Star, Trophy, ArrowLeft, Timer } from "lucide-react";
import confetti from "canvas-confetti";
import { Progress } from "@/components/atoms/Progress";
import { useTranslations } from "next-intl";
import { Card } from "@/components/atoms/game/Card";
import { CardHeader } from "@/components/atoms/game/CardHeader";
import { CardContent } from "@/components/atoms/game/CardContent";
import { CardFooter } from "@/components/atoms/game/CardFooter";
import { cn } from "@/libs/utils";
import { MathBackground } from "@/components/organisms/MathBackground";
import { useStats } from "@/hooks/useStats";

interface DivisionGameProps {
    difficulty: "easy" | "medium" | "hard";
    onExit: () => void;
}

type Problem = {
    dividend: number;
    divisor: number;
    answer: number;
    options: number[];
};

const GAME_CONFIG = {
    easy: { divisorMin: 2, divisorMax: 10, quotientMin: 2, quotientMax: 10, time: 60 },
    medium: { divisorMin: 2, divisorMax: 15, quotientMin: 5, quotientMax: 20, time: 45 },
    hard: { divisorMin: 5, divisorMax: 25, quotientMin: 10, quotientMax: 30, time: 30 },
};

function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function DivisionGame({ difficulty, onExit }: DivisionGameProps) {
    const t = useTranslations("Game");
    const { saveGameScore } = useStats();
    const config = GAME_CONFIG[difficulty];

    const [problems, setProblems] = useState<Problem[]>([]);
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [correct, setCorrect] = useState<boolean | null>(null);
    const [status, setStatus] = useState<"playing" | "finished">("playing");
    const [timeLeft, setTimeLeft] = useState(config.time);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    }, []);

    const generateProblems = useCallback(() => {
        const list: Problem[] = [];
        for (let i = 0; i < 10; i++) {
            const divisor = randInt(config.divisorMin, config.divisorMax);
            const answer = randInt(config.quotientMin, config.quotientMax);
            const dividend = divisor * answer;

            const options = new Set<number>([answer]);
            while (options.size < 4) {
                const delta = randInt(1, Math.max(3, Math.floor(answer * 0.4)));
                const wrong = Math.random() < 0.5 ? answer + delta : Math.max(1, answer - delta);
                if (wrong !== answer) options.add(wrong);
            }

            list.push({
                dividend,
                divisor,
                answer,
                options: [...options].sort(() => 0.5 - Math.random()),
            });
        }
        setProblems(list);
    }, [config]);

    useEffect(() => {
        generateProblems();
    }, [generateProblems]);

    const handleSelect = (opt: number) => {
        if (selected !== null) return;
        const isCorrect = opt === problems[current].answer;
        setSelected(opt);
        setCorrect(isCorrect);

        if (isCorrect) {
            setScore((s) => s + 1);
            confetti({
                particleCount: 120,
                spread: 65,
                origin: { y: 0.6 },
                colors: ["#f97316", "#fed7aa", "#ea580c"],
            });
        }

        timeoutRef.current = setTimeout(() => {
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

    useEffect(() => {
        if (status === "finished") {
            saveGameScore({ gameType: "division", difficulty, score });
        }
    }, [status, difficulty, score, saveGameScore]);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);
    if (!isMounted) return null;

    const problem = problems[current];

    return (

        <div className="w-full min-h-[70vh] flex items-center justify-center relative overflow-hidden rounded-[3rem]">
            <MathBackground />

            <Card className="w-full max-w-md mx-auto text-center shadow-2xl border-2 relative z-10 bg-white/95 backdrop-blur-sm">
                <CardHeader className="bg-orange-100 relative">
                    <button
                        onClick={onExit}
                        className="absolute left-4 top-4 text-orange-500 hover:scale-110 transition-transform"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center shadow">
                        <Divide className="h-6 w-6 text-orange-500" />
                    </div>
                    <h1 className="text-xl font-bold mt-4">
                        {t("division")} - {t(difficulty)}
                    </h1>
                </CardHeader>

                <CardContent className="pt-6">
                    {status === "playing" && problems.length > 0 && (
                        <>
                            <div className="flex justify-between mb-2 text-sm text-muted-foreground font-bold">
                                <span>{t("questionCount", { current: current + 1, total: problems.length })}</span>
                                <span className={cn(timeLeft <= 5 ? "text-red-500 animate-pulse" : "")}>
                                    <Timer className="inline-block mr-1" size={16} /> {timeLeft}s
                                </span>
                            </div>
                            <Progress value={(current / problems.length) * 100} className="h-2 mb-6" />

                            <div className="text-4xl font-black mb-8 text-text tabular-nums">
                                {problem.dividend} ÷ {problem.divisor} = ?
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {problem.options.map((opt, idx) => (
                                    <Button
                                        key={idx}
                                        onClick={() => handleSelect(opt)}
                                        disabled={selected !== null}
                                        className="h-16 text-xl font-bold rounded-xl"
                                        variant={
                                            selected === opt
                                                ? correct ? "success" : "destructive"
                                                : selected !== null && opt === problem.answer
                                                    ? "success"
                                                    : "outline"
                                        }
                                    >
                                        {opt}
                                        {selected === opt && correct && (
                                            <Star className="ml-2 h-5 w-5 text-yellow-400 fill-yellow-400" />
                                        )}
                                    </Button>
                                ))}
                            </div>
                        </>
                    )}

                    {status === "finished" && (
                        <>
                            <Trophy className="mx-auto text-orange-500 w-10 h-10 mb-2" />
                            <h3 className="text-lg font-bold">{t("gameOver")}</h3>
                            <p className="text-sm text-muted-foreground">
                                {t.rich("scoreResult", {
                                    score,
                                    total: problems.length,
                                    bold: (chunks) => <strong>{chunks}</strong>,
                                })}
                            </p>
                            <div className="mt-12 flex flex-col">
                                <Button
                                    className="mb-4"
                                    onClick={() => {
                                        setStatus("playing");
                                        setCurrent(0);
                                        setScore(0);
                                        setTimeLeft(config.time);
                                        generateProblems();
                                    }}
                                    size="md"
                                >
                                    <Sparkles className="mr-2 h-5 w-5" />
                                    {t("playAgain")}
                                </Button>
                                <Button variant="ghost" onClick={onExit} className="text-muted font-bold">
                                    {t("backToLauncher")}
                                </Button>
                            </div>
                        </>
                    )}
                </CardContent>

                {status === "playing" && (
                    <CardFooter>
                        <Button size="lg" className="w-full mt-4" onClick={() => setStatus("finished")}>
                            <Sparkles className="mr-2 h-5 w-5" />
                            {t("finish")}
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
