import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const login = async (credentials: { email: string; pass: string }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.pass
                }),
            });

            if (!response.ok) throw new Error('AUTH_ERROR');

            const data = await response.json();
            localStorage.setItem('math-token', data.access_token);

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};