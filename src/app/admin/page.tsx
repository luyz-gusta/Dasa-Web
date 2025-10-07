'use client'

import { useGlobalContext } from "@/hooks/useGlobalContext";
import DesktopSection from "./components/DesktopSection";
import MobileSection from "./components/MobileSection";

export default function Dashboard() {
  const { isTablet } = useGlobalContext();
  return (
    <>
      {isTablet ? <MobileSection /> : <DesktopSection />}
    </>
  );
}
