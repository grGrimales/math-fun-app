import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const loginStore = useAuthStore((state) => state.login);

    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${url}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error('AUTH_ERROR');
            const data = await response.json();

            localStorage.setItem('math-token', data.access_token);
            loginStore(data.user, data.access_token);

            router.push('/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const register = async (name: string, email: string, pass: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${url}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password: pass }),
            });

            if (!response.ok) throw new Error('SIGNUP_ERROR');

            await login(email, pass);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { login, register, loading, error };
};