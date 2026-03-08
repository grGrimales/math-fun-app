"use client";

import { useTranslations } from "next-intl";

export const HeroText = () => {
    const t = useTranslations("HomePage.hero");

    return (
        <>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t.rich('title', {
                    pink: (chunks) => <span className="text-primary">{chunks}</span>
                })}
            </h1>
            <p className="max-w-[700px] text-text md:text-xl">
                {t("description")}
            </p>
        </>
    );
};