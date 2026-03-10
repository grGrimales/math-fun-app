"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { useAuth } from '@/hooks/useAuth';
import { LogIn } from 'lucide-react';

export const RegisterForm = () => {
    const t = useTranslations('Register');
    const { register, loading, error } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        register(name, email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <FormField
                id="name"
                labelText={t('nameLabel')}
                placeholder="Ej. Lucia"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <FormField
                id="email"
                labelText={t('emailLabel')}
                type="email"
                placeholder="exemplo@email.com"
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
                <p className="text-red-500 text-sm text-center font-bold mb-4 animate-soft-pulse">
                    {error}
                </p>
            )}


            <Button type="submit" className="bg-primary text-white hover:bg-accent w-full">
                <LogIn className="mr-2 h-5 w-5" />
                {loading ? t('buttonLoading') : t('buttonSubmit')}
            </Button>
        </form>
    );
};