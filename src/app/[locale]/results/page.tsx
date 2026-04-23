"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Trophy, Star, Target, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/atoms/game/Card";
import { MathBackground } from "@/components/organisms/MathBackground";
import { useStats } from "@/hooks/useStats";
import { useEffect, useState } from "react";

export default function ResultsPage() {
    const t = useTranslations("Results");
    const { fetchRecent } = useStats();
    type GameActivity = { gameType: string; createdAt: string; difficulty: string; score: number };
    const [history, setHistory] = useState<GameActivity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const data = await fetchRecent();
            setHistory(data || []);
            setLoading(false);
        };
        fetchHistory();
    }, [fetchRecent]);

    // Cálculo de totales rápidos para el resumen
    const totalStars = history.reduce((acc, curr) => acc + (curr.score / 10), 0);
    const gamesPlayed = history.length;

    return (
        <main className="min-h-screen relative py-12 px-6">
            <MathBackground />

            <div className="container mx-auto max-w-4xl relative z-10">
                {/* Cabecera */}
                <div className="flex items-center justify-between mb-8">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="rounded-full bg-white/50 backdrop-blur-sm">
                            <ArrowLeft className="mr-2" size={20} /> {t("back")}
                        </Button>
                    </Link>
                    <div className="text-right">
                        <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">
                            {t("title")}
                        </h1>
                        <p className="text-slate-500 font-bold">{t("subtitle")}</p>
                    </div>
                </div>

                {/* 🏆 Resumen General (Tarjetas rápidas) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatSummaryCard
                        icon={<Trophy className="text-yellow-500" />}
                        label={t("gamesPlayed")}
                        value={gamesPlayed}
                        color="bg-yellow-50"
                    />
                    <StatSummaryCard
                        icon={<Star className="text-pink-500" />}
                        label={t("totalStars")}
                        value={totalStars}
                        color="bg-pink-50"
                    />
                    <StatSummaryCard
                        icon={<Target className="text-blue-500" />}
                        label={t("bestLevel")}
                        value="Pro"
                        color="bg-blue-50"
                    />
                </div>

                {/* 📜 Lista de Resultados */}
                <Card className="bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-xl border-none overflow-hidden">
                    <div className="p-8">
                        <h2 className="text-xl font-black text-slate-700 mb-6 flex items-center gap-2">
                            <Calendar className="text-primary" size={22} />
                            {t("recentHistory")}
                        </h2>

                        {loading ? (
                            <div className="py-20 text-center animate-pulse text-slate-400 font-bold">
                                {t("loading")}...
                            </div>
                        ) : history.length > 0 ? (
                            <div className="space-y-4">
                                {history.map((item, index) => (
                                    <ResultItem key={index} item={item} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                <p className="font-bold text-slate-400">{t("noData")}</p>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </main>
    );
}

// --- Micro-componentes para organización ---

const StatSummaryCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) => (
    <div className={`p-6 rounded-[2rem] ${color} flex items-center gap-4 border-b-4 border-black/5`}>
        <div className="bg-white p-3 rounded-2xl shadow-sm">{icon}</div>
        <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
            <p className="text-2xl font-black text-slate-700">{value}</p>
        </div>
    </div>
);

const ResultItem = ({ item }: { item: { gameType: string; createdAt: string; difficulty: string; score: number } }) => {
    const t = useTranslations("Game");
    return (
        <div className="flex items-center justify-between p-4 bg-white border       border-slate-100 rounded-2xl hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary font-bold">
                    {item.gameType[0].toUpperCase()}
                </div>
                <div>
                    <p className="font-black text-slate-700 leading-none">{t(item.gameType)}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                        {new Date(item.createdAt).toLocaleDateString()} • {item.difficulty}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                <Star size={14} className="text-green-500 fill-green-500" />
                <span className="font-black text-green-600">+{item.score}</span>
            </div>
        </div>
    );
};