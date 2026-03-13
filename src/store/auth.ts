import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  user: UserData | null;
  token: string | null;
  login: (userData: UserData, token: string) => void;
  logout: () => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
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