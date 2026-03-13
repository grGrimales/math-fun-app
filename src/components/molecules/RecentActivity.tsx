import { Target, Calendar, Star } from "lucide-react";
import { useTranslations } from "next-intl";

export const RecentActivity = ({ activities }: { activities: any[] }) => {
    const t = useTranslations("Dashboard");

    if (activities.length === 0) {
        return <p className="text-sm text-muted-foreground text-center py-4">{t('noActivity')}</p>;
    }

    return (
        <div className="space-y-4">

            {activities.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border bg-white shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
                            <Target size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-sm capitalize">{t(`games.${item.gameType}`)}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar size={12} /> {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-black text-pink-500 flex items-center gap-1 justify-end">
                            +{item.score} <Star size={14} className="fill-pink-500" />
                        </p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground">{item.difficulty}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};