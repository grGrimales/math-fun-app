import { useAuthStore } from "@/store/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
    const token = useAuthStore.getState().token;
    if (!token) return

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: No autorizado`);
    }

    if (response.status === 401) {
        useAuthStore.getState().logout();
        return;
    }

    return response.json();
}