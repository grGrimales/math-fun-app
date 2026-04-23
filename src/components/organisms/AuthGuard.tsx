"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { useAuthStore } from "@/store/auth";
import { useTranslations } from "next-intl";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { user, _hasHydrated } = useAuthStore();
    const router = useRouter();
    const t = useTranslations("Common");

    useEffect(() => {
        if (_hasHydrated && !user) {
            router.push("/login");
        }
    }, [user, _hasHydrated, router]);


    if (!_hasHydrated || !user) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-100 border-t-primary" />
                    <p className="font-bold text-slate-400 text-xs uppercase tracking-widest animate-pulse">
                        {t("validateSession")}
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};