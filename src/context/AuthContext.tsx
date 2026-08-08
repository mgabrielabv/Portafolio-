import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { LoginPayload, RegisterPayload, User } from "@/types";
import * as authService from "@/services/auth";

interface AuthContextValue {
  user: User | null;
  initializing: boolean;
  login: (payload: LoginPayload) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const session = authService.getSession();
    setUser(session?.user ?? null);
    setInitializing(false);
  }, []);

  const login = async (payload: LoginPayload) => {
    const u = await authService.login(payload);
    setUser(u);
    return u;
  };

  const register = async (payload: RegisterPayload) => {
    const u = await authService.register(payload);
    setUser(u);
    return u;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, initializing, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
