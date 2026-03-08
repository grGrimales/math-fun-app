"use client";

import { useState } from "react";
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing'; // Usando tu routing personalizado
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/libs/utils";

export const LanguageSwitcher = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: "es", label: "Español", flag: "🇪🇸" },
        { code: "pt", label: "Português", flag: "🇧🇷" },
        { code: "en", label: "English", flag: "🇺🇸" },
    ];

    const currentLanguage = languages.find((l) => l.code === locale);

    const handleLocaleChange = (newLocale: string) => {
        router.push(pathname, { locale: newLocale });
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 bg-pink-50 text-primary border-2 border-primary/20 px-3 py-1.5 rounded-full hover:bg-pink-100 transition-all text-sm font-semibold shadow-sm"
            >
                <Globe className="h-4 w-4" />
                <span>{currentLanguage?.flag}</span>
                <span className="uppercase">{locale}</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

                    <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-xl border border-pink-100 py-1 z-20 overflow-hidden">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLocaleChange(lang.code)}
                                className={cn(
                                    "flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-primary transition-colors",
                                    locale === lang.code && "bg-pink-50 text-primary font-bold"
                                )}
                            >
                                <span className="mr-3 text-lg">{lang.flag}</span>
                                {lang.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};