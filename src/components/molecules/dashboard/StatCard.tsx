interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    colorClass: string;
}

export const StatCard = ({ icon, label, value, colorClass }: StatCardProps) => (
    <div className={`bg-white p-4 rounded-2xl border-2 ${colorClass} shadow-sm flex items-center gap-4 transition-transform hover:scale-105`}>
        <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
        <div>
            <p className="text-xs font-bold text-muted uppercase tracking-tighter">{label}</p>
            <p className="text-xl font-black text-text">{value}</p>
        </div>
    </div>
);