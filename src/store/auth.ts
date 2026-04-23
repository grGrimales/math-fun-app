import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: UserData | null;
  token: string | null;
  _hasHydrated: boolean;
  login: (userData: UserData, token: string) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      _hasHydrated: false,
      login: (userData, token) => set({ user: userData, token }),
      logout: () => set({ user: null, token: null }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "math-auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);