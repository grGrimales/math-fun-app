import { useState, useCallback } from 'react';
import { useAuthStore } from '@/store/auth';
import { apiRequest } from '@/libs/api';

export const useStats = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = useAuthStore((state) => state.token);

    console.log("useStats initialized. Token:", token);

    const saveGameScore = useCallback(async (gameData: {
        gameType: string;
        score: number;
        difficulty: string;
    }) => {

        if (!token) return;

        setLoading(true);
        try {
            await apiRequest('/stats/save', {
                method: 'POST',
                body: JSON.stringify(gameData),
            });
            setError(null);
        } catch (err) {
            setError('No se pudo guardar el progreso');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const fetchSummary = useCallback(async () => {
        setLoading(true);
        try {
            const data = await apiRequest('/stats/dashboard-summary');
            console.log("Resumen de estadísticas:", data);
            return data;
        } catch (err) {
            setError('Error cargando estadísticas');
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { saveGameScore, fetchSummary, loading, error };
};