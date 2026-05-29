'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Lang } from '../types';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangCtx>({ lang: 'de', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('de');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('crunkie-lang') as Lang | null;
      if (saved === 'de' || saved === 'en') setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem('crunkie-lang', l); } catch {}
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
