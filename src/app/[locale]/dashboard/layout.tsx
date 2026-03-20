import { AuthGuard } from "@/components/organisms/AuthGuard";
import { Navbar } from "@/components/organisms/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                {children}
            </div>
        </AuthGuard>
    );
}