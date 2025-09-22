import { useGlobalContext } from "@/hooks/useGlobalContext";
import MobileSection from "./components/MobileSection";
import DesktopSection from "./components/DesktopSection";

export default function Dashboard() {
  const { isTablet } = useGlobalContext();
  return (
    <>
      {isTablet ? <MobileSection /> : <DesktopSection />}
    </>
  );
}
