"use client";
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export const LanguageSwitcher = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPath);
    };

    return (
        <select
            value={locale}
            onChange={handleChange}
            className="bg-white border rounded p-1 text-sm shadow-sm"
        >
            <option value="es">🇪🇸 ES</option>
            <option value="pt">🇧🇷 PT</option>
            <option value="en">🇺🇸 EN</option>
        </select>
    );
};