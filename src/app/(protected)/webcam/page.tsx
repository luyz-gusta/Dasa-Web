import MobileLayout from "./components/MobileLayout";
import DesktopLayout from "./components/DesktopLayout";
import { device } from "@/utils/device";

export default async function Webcam() {
  const { isTablet } = await device();
  return (
    <>
      {isTablet ? <MobileLayout /> : <DesktopLayout />}
    </>
  );
}