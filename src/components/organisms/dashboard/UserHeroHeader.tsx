import { User } from "lucide-react";
import { LevelProgress } from "../../molecules/dashboard/LevelProgress";

interface UserHeroHeaderProps {
    name?: string;
    welcomeText: string;
    readyText: string;
    levelLabel: string;
}

export const UserHeroHeader = ({ welcomeText, readyText, levelLabel }: UserHeroHeaderProps) => (
    <header className="bg-white rounded-[2rem] p-8 shadow-xl border-2 border-pink-50 flex flex-col md:flex-row items-center gap-6 mb-10">
        <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center text-white shadow-lg rotate-3">
            <User size={48} strokeWidth={3} />
        </div>
        <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-black text-text tracking-tight italic">
                {welcomeText}
            </h1>
            <p className="text-muted font-bold text-lg">{readyText}</p>
        </div>
        <LevelProgress level={5} progress={60} label={levelLabel} />
    </header>
);