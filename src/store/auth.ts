import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  user: any | null;
  token: string | null;
  login: (userData: any, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (userData, token) => {
        set({ user: userData, token });
      },
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "math-auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);