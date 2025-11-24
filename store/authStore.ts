import { create } from "zustand";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  login: (user, token) => {
    set({ user, token });
    localStorage.setItem("token", token);
  },
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
  },
  isAuthenticated: () => !!get().token,
}));
