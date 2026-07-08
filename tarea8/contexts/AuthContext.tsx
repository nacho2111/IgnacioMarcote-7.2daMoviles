import React, { createContext, useState, ReactNode } from 'react';

type Usuario = { nombre: string } | null;

type AuthContextType = {
  usuario: Usuario;
  login: (nombre: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  usuario: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario>(null);

  const login = (nombre: string) => setUsuario({ nombre });
  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
