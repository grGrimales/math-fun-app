import { Star } from "lucide-react";

interface LevelProgressProps {
    level: number;
    progress: number;
    label: string;
}

export const LevelProgress = ({ level, progress, label }: LevelProgressProps) => (
    <div className="bg-bg-secondary px-6 py-4 rounded-2xl border-2 border-primary/10">
        <div className="flex items-center gap-2 mb-1">
            <Star className="text-yellow-400 fill-yellow-400 h-5 w-5" />
            <span className="font-black text-primary uppercase text-xs tracking-widest">
                {label} {level}
            </span>
        </div>
        <div className="w-32 h-3 bg-white rounded-full overflow-hidden border border-pink-100">
            <div
                className="bg-primary h-full rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
            />
        </div>
    </div>
);