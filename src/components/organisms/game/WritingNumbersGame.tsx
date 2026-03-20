"use client";
import { useState, useEffect, useCallback } from "react";
import writtenNumber from "written-number";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { CheckCircle2, XCircle, RefreshCw, PlusIcon, ArrowLeft } from "lucide-react";
import { apiRequest } from "@/libs/api";
import confetti from "canvas-confetti";
import { CardHeader } from "@/components/atoms/game/CardHeader";

type Difficulty = 'easy' | 'medium' | 'hard';

interface Props {
    difficulty?: Difficulty;
    onExit?: () => void;
}

export const WritingNumbersGame = ({ difficulty = 'easy', onExit }: Props) => {
    const locale = useLocale();
    const t = useTranslations("WritingGame");

    const [number, setNumber] = useState(0);
    const [expectedText, setExpectedText] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState<{ status: 'correct' | 'error' | 'idle', message?: string }>({ status: 'idle' });

    const fireConfetti = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ED22F1', '#4D62E5', '#F59E0B']
        });
    };

    const generateNewChallenge = useCallback(() => {
        let min = 10;
        let max = 99;

        if (difficulty === 'medium') {
            min = 100;
            max = 999;
        } else if (difficulty === 'hard') {
            min = 1000;
            max = 9999;
        }



        const newNum = Math.floor(Math.random() * (max - min + 1)) + min;

        setNumber(newNum);
        setExpectedText(writtenNumber(newNum, { lang: locale as any }));
        setUserAnswer("");
        setFeedback({ status: 'idle' });
    }, [difficulty, locale]);

    useEffect(() => {
        generateNewChallenge();
    }, [generateNewChallenge]);

    const handleCheck = async () => {
        const cleanUser = userAnswer.trim().toLowerCase();
        const cleanExpected = expectedText.toLowerCase();

        if (cleanUser === cleanExpected) {
            setFeedback({ status: 'correct' });
            fireConfetti();

            await apiRequest('/stats/save-score', {
                method: 'POST',
                body: JSON.stringify({
                    gameType: 'writing',
                    score: difficulty === 'hard' ? 30 : difficulty === 'medium' ? 20 : 10,
                    difficulty
                })
            });
        } else {
            setFeedback({
                status: 'error',
                message: expectedText
            });
        }
    };
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null;

    return (
        <div className="max-w-sm mx-auto bg-white p-8 rounded-[2.5rem] shadow-2xl border-2 border-pink-50 text-center animate-in zoom-in-95 duration-500">
            <CardHeader className="bg-pink-100 relative">
                <button
                    onClick={onExit}
                    className="absolute left-4 top-4 text-pink-500 hover:scale-110 transition-transform"
                >
                    <ArrowLeft size={24} />
                </button>
                <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center shadow">
                    <PlusIcon className="h-6 w-6 text-pink-500" />
                </div>
                <h1 className="text-xl font-bold mt-4">
                    {t("title")} - {t(`levels.${difficulty}`)}
                </h1>
            </CardHeader>
            <div className="mb-4 inline-block px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500">
                {t(`levels.${difficulty}`)}
            </div>

            <div className="bg-pink-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-100 rotate-3 transition-transform hover:rotate-0">
                <span className="text-white text-3xl font-black">{number}</span>
            </div>

            <p className="text-slate-500 mb-6 font-bold text-sm uppercase tracking-widest leading-tight">
                {t('instruction')}
            </p>

            <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="..."
                className="text-center text-lg font-bold border-2 border-slate-100 focus:border-primary rounded-2xl h-14 mb-6 transition-all"
                disabled={feedback.status === 'correct'}
                autoFocus
            />

            <div className="flex gap-2">
                {feedback.status === 'idle' ? (
                    <Button onClick={handleCheck} fullWidth className="h-12 rounded-xl bg-primary text-white font-bold shadow-lg active:scale-95 transition-transform">
                        {t('check')}
                    </Button>
                ) : (
                    <Button onClick={generateNewChallenge} fullWidth className="h-12 rounded-xl bg-slate-800 text-white font-bold gap-2 active:scale-95 transition-transform">
                        <RefreshCw size={18} /> {t('next')}
                    </Button>
                )}
            </div>

            {feedback.status === 'correct' && (
                <div className="mt-6 flex items-center justify-center gap-2 text-green-500 font-black animate-bounce">
                    <CheckCircle2 /> {t('success')}
                </div>
            )}

            {feedback.status === 'error' && (
                <div className="mt-6 p-4 bg-red-50 rounded-2xl border border-red-100 animate-in shake-1">
                    <div className="flex items-center justify-center gap-2 text-red-500 font-bold text-sm mb-1">
                        <XCircle size={16} /> {t('wrong')}
                    </div>
                    <p className="text-slate-600 font-black text-primary italic">"{feedback.message}"</p>
                </div>
            )}
        </div>
    );
};