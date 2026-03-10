// src/components/organisms/LoginForm.tsx
"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { LogIn } from 'lucide-react';

export const LoginForm = () => {
    const t = useTranslations('Login');
    const { login, loading, error } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login({ email, pass: password });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <FormField
                id="email"
                labelText={t('emailLabel')}
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <FormField
                id="password"
                labelText={t('passwordLabel')}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {error && (
                <p className="text-red-500 text-sm text-center font-bold mb-4">
                    {t('errors.invalidCredentials')}
                </p>
            )}

            <Button type="submit" className="bg-primary text-white hover:bg-accent w-full">
                <LogIn className="mr-2 h-5 w-5" />
                {loading ? t('buttonLoading') : t('buttonSubmit')}
            </Button>
        </form>
    );
};