"use client";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/auth";
import { MathBackground } from "@/components/organisms/MathBackground";
import { Trophy, Target, Flame, Star, GamepadIcon, Plus, Minus, XIcon } from "lucide-react";
import { GameCard } from "@/components/molecules/game/GameCard";
import { StatCard } from "@/components/molecules/dashboard/StatCard";
import { UserHeroHeader } from "@/components/organisms/dashboard/UserHeroHeader";
import { apiRequest } from "@/libs/api";
import { useEffect, useState } from "react";
import { useStats } from "@/hooks/useStats";
import { RecentActivity } from "@/components/molecules/RecentActivity";

export default function DashboardPage() {
    const t = useTranslations("Dashboard");

    const { user } = useAuthStore();
    const { fetchSummary, fetchRecent, loadingApi } = useStats();


    const [summary, setSummary] = useState({ hits: 0, stars: 0, streak: 0 });
    const [loading, setLoading] = useState(true);
    const [recent, setRecent] = useState([]);


    useEffect(() => {
        async function loadStats() {
            try {
                const data = await apiRequest('/stats/dashboard-summary');
                setSummary(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        loadStats();
    }, []);

    useEffect(() => {
        async function loadDashboard() {
            const [summaryData, recentData] = await Promise.all([
                fetchSummary(),
                fetchRecent()
            ]);
            if (summaryData) setSummary(summaryData);
            if (recentData) setRecent(recentData);
        }
        loadDashboard();
    }, [fetchSummary, fetchRecent]);

    return (
        <main className="min-h-screen bg-bg-secondary/20 pb-20 relative overflow-hidden">
            <MathBackground />

            <div className="container mx-auto px-6 pt-10 relative z-10">
                <UserHeroHeader
                    welcomeText={t('welcome', { name: user?.name || 'Genio' })}
                    readyText={t('readyToPlay')}
                    levelLabel={t('level')}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-text flex items-center gap-2 uppercase tracking-tighter">
                            <Trophy className="text-yellow-500" /> {t('myStats')}
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            <StatCard icon={<Target className="text-blue-500" />} label={t('stats.hits')} value={loading ? "..." : summary?.hits || 0} colorClass="border-blue-100" />
                            <StatCard icon={<Flame className="text-orange-500" />} label={t('stats.streak')} value={loading ? "..." : `${summary?.streak || 0} ${t('stats.days')}`} colorClass="border-orange-100" />
                            <StatCard icon={<Star className="text-primary" />} label={t('stats.stars')} value={loading ? "..." : summary?.stars || 0} colorClass="border-pink-100" />
                        </div>
                    </section>
                    <section className="mt-8">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="w-2 h-6 bg-pink-500 rounded-full" />
                            {t('recentActivity')}
                        </h2>
                        {loadingApi ? (
                            <div className="animate-pulse space-y-3">
                                {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-xl" />)}
                            </div>
                        ) : (
                            <RecentActivity activities={recent} />
                        )}
                    </section>



                    <section className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-black text-text flex items-center gap-2 uppercase tracking-tighter">
                            <GamepadIcon className="text-primary" /> {t('chooseMission')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                            <GameCard
                                id="addition"
                                title={t('games.sums.title')}
                                description={t('games.sums.desc')}
                                bgColor="bg-blue-50"
                                level="1" ageRange="5-7"
                                icon={<Plus className="text-blue-600" size={32} />}
                                image=""
                            />
                            <GameCard
                                id="subtractions"
                                title={t('games.subtractions.title')}
                                description={t('games.subtractions.desc')}
                                bgColor="bg-purple-50"
                                level="2" ageRange="6-8"
                                icon={<Minus className="text-purple-600" size={32} />}
                                image=""
                            />

                            <GameCard
                                id="multiplication"
                                title={t('games.multiplication')}
                                description={t('games.multiplicationDesc')}
                                bgColor="bg-yellow-50"
                                level="3" ageRange="7-9"
                                icon={<XIcon className="text-yellow-600" size={32} />}
                                image=""
                            />
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}