import { createContext, useContext, useState, ReactNode } from 'react';

export interface Usuario {
  nombre: string;
  email: string;
  telefono: string;
  avatar: string;
  citasAnteriores: number;
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (u: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const login = (u: Usuario) => setUsuario(u);
  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
