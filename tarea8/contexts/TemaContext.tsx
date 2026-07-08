import React, { createContext, useState, ReactNode } from 'react';

type Tema = 'claro' | 'oscuro';

type TemaContextType = {
  tema: Tema;
  alternarTema: () => void;
};

export const TemaContext = createContext<TemaContextType>({
  tema: 'claro',
  alternarTema: () => {},
});

export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>('claro');

  const alternarTema = () => {
    setTema((prev) => (prev === 'claro' ? 'oscuro' : 'claro'));
  };

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
}
