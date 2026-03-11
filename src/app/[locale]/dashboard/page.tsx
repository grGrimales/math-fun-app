// src/app/[locale]/dashboard/page.tsx
"use client";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/auth";
import { MathBackground } from "@/components/organisms/MathBackground";
import { Trophy, Target, Flame, Star, GamepadIcon, Plus, Minus } from "lucide-react";
import { GameCard } from "@/components/molecules/game/GameCard";
import { StatCard } from "@/components/molecules/dashboard/StatCard";
import { UserHeroHeader } from "@/components/organisms/dashboard/UserHeroHeader";

export default function DashboardPage() {
    const t = useTranslations("Dashboard");
    const { user } = useAuthStore();

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
                            <StatCard icon={<Target className="text-blue-500" />} label={t('stats.hits')} value="124" colorClass="border-blue-100" />
                            <StatCard icon={<Flame className="text-orange-500" />} label={t('stats.streak')} value={`5 ${t('stats.days')}`} colorClass="border-orange-100" />
                            <StatCard icon={<Star className="text-primary" />} label={t('stats.stars')} value="450" colorClass="border-pink-100" />
                        </div>
                    </section>

                    <section className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-black text-text flex items-center gap-2 uppercase tracking-tighter">
                            <GamepadIcon className="text-primary" /> {t('chooseMission')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}