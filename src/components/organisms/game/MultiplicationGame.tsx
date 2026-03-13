"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/atoms/Button";
import { XIcon, Sparkles, Trophy, ArrowLeft, Timer } from "lucide-react";
import confetti from "canvas-confetti";
import { Progress } from "@/components/atoms/Progress";
import { useTranslations } from "next-intl";
import { Card } from "@/components/atoms/game/Card";
import { CardHeader } from "@/components/atoms/game/CardHeader";
import { CardContent } from "@/components/atoms/game/CardContent";
import { MathBackground } from "@/components/organisms/MathBackground";
import { useStats } from "@/hooks/useStats";
import { cn } from "@/libs/utils";

interface MultiplicationGameProps {
    difficulty: "easy" | "medium" | "hard";
    onExit: () => void;
}

export default function MultiplicationGame({ difficulty, onExit }: MultiplicationGameProps) {
    const t = useTranslations("Game");
    const { saveGameScore } = useStats();

    const config = {
        easy: { range: 5, time: 60 },    // Tablas del 1 al 5
        medium: { range: 10, time: 45 },  // Tablas del 1 al 10
        hard: { range: 12, time: 40 },    // Hasta la tabla del 12
    }[difficulty];

    const [problems, setProblems] = useState<any[]>([]);
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [correct, setCorrect] = useState<boolean | null>(null);
    const [status, setStatus] = useState<"playing" | "finished">("playing");
    const [timeLeft, setTimeLeft] = useState(config.time);

    const generateProblems = useCallback(() => {
        const list: any[] = [];
        for (let i = 0; i < 10; i++) {
            const num1 = Math.floor(Math.random() * config.range) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            const answer = num1 * num2;
            const options = [answer];

            while (options.length < 4) {
                const wrong = (Math.floor(Math.random() * config.range) + 1) * (Math.floor(Math.random() * 10) + 1);
                if (!options.includes(wrong)) options.push(wrong);
            }
            list.push({ num1, num2, answer, options: options.sort(() => 0.5 - Math.random()) });
        }
        setProblems(list);
    }, [config.range]);

    useEffect(() => { generateProblems(); }, [generateProblems]);

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
                colors: ["#d946ef", "#f5d0fe", "#701a75"],
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

    useEffect(() => {
        if (status === "finished") {
            saveGameScore({ gameType: 'multiplication', difficulty, score });
        }
    }, [status, difficulty, score, saveGameScore]);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null;

    return (
        <div className="w-full min-h-[70vh] flex items-center justify-center relative overflow-hidden rounded-[3rem]">
            <MathBackground />
            <Card className="w-full max-w-md mx-auto text-center shadow-2xl border-2 relative z-10 bg-white/95 backdrop-blur-sm">
                <CardHeader className="bg-fuchsia-100 relative">
                    <button onClick={onExit} className="absolute left-4 top-4 text-fuchsia-500 hover:scale-110 transition-transform">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center shadow">
                        <XIcon className="h-6 w-6 text-fuchsia-500" />
                    </div>
                    <h1 className="text-xl font-bold mt-4">{t("multiplication")} - {t(difficulty)}</h1>
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
                                {problems[current].num1} × {problems[current].num2} = ?
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {problems[current].options.map((opt: number, idx: number) => (
                                    <Button
                                        key={idx}
                                        onClick={() => handleSelect(opt)}
                                        disabled={selected !== null}
                                        className="h-16 text-xl font-bold rounded-xl"
                                        variant={selected === opt ? (correct ? "success" : "destructive") : (selected !== null && opt === problems[current].answer ? "success" : "outline")}
                                    >
                                        {opt}
                                    </Button>
                                ))}
                            </div>
                        </>
                    )}

                    {status === "finished" && (
                        <div className="py-6">
                            <Trophy className="mx-auto text-fuchsia-500 w-12 h-12 mb-4" />
                            <h3 className="text-xl font-bold mb-2">{t("gameOver")}</h3>
                            <p className="mb-8">{t("scoreResult", { score, total: problems.length })}</p>
                            <Button onClick={onExit} className="w-full bg-fuchsia-500 hover:bg-fuchsia-600">{t("backToLauncher")}</Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}