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
  const [isTablet, setIsTablet] = useState<boolean>(window.innerWidth <= 1024);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
      setIsMobile(window.innerWidth <= 768);
    };

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
