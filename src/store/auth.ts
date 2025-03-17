import { create } from "zustand";

interface AuthState {
  user: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: false, // Inicialmente no autenticado
  login: () => set({ user: true }),
  logout: () => set({ user: false }),
}));
