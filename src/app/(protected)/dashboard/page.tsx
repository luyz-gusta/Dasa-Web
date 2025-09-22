import MobileSection from "./components/MobileSection";
import DesktopSection from "./components/DesktopSection";
import { device } from "@/utils/device";

export default async function Dashboard() {
  const { isTablet } = await device();
  return (
    <>
      {isTablet ? <MobileSection /> : <DesktopSection />}
    </>
  );
}
