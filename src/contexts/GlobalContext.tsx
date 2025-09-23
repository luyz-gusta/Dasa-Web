'use client'
import { createContext, ReactNode, useEffect, useState } from "react";

interface GlobalProviderProps {
  children: ReactNode;
}

export interface GlobalContextType {
  isTablet: boolean;
  setIsTablet: (isTablet: boolean) => void;

  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export default function GlobalProvider({ children }: GlobalProviderProps) {
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Definir valores iniciais apenas no cliente
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
      setIsMobile(window.innerWidth <= 768);
    };

    // Definir valores iniciais
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const values: GlobalContextType = {
    isTablet,
    setIsTablet,
    isMobile,
    setIsMobile
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
}
