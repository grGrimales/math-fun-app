import { useState, useCallback } from 'react';
import { useAuthStore } from '@/store/auth';
import { apiRequest } from '@/libs/api';
import { useTranslations } from 'next-intl';

export const useStats = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = useAuthStore((state) => state.token);

    const t = useTranslations("ErrorPage");

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
            setError(t('errorSavingProgress'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const fetchSummary = useCallback(async () => {
        setLoading(true);
        try {
            const data = await apiRequest('/stats/dashboard-summary');
            return data;
        } catch (err) {
            setError(t('errorLoadingStats'));
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchRecent = useCallback(async () => {
        setLoading(true);
        try {
            const data = await apiRequest('/stats/recent');
            return data;
        } catch (err) {
            setError(t('errorLoadingStats'));
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    return { saveGameScore, fetchSummary, fetchRecent, loadingApi: loading, error };
};