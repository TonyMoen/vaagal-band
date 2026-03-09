import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "./api";

interface AuthState {
  email: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("vaagal-token");
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .authMe()
      .then((res) => setEmail(res.email))
      .catch(() => localStorage.removeItem("vaagal-token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.login(email, password);
    localStorage.setItem("vaagal-token", res.token);
    setEmail(res.email);
  };

  const logout = () => {
    localStorage.removeItem("vaagal-token");
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ email, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
