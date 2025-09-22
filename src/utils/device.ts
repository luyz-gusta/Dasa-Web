import { headers } from "next/headers";

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceType: "mobile" | "tablet" | "desktop";
  userAgent: string;
}

export async function device(): Promise<DeviceInfo> {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";

  const tabletPatterns = [
    /iPad/i,
    /Android(?=.*\bTablet\b)/i,
    /Windows(?=.*\bTouch\b)(?=.*\bTablet\b)/i,
    /Kindle/i,
    /Silk/i,
    /PlayBook/i,
  ];

  const mobilePatterns = [
    /Android(?!.*Tablet)/i,
    /webOS/i,
    /iPhone/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
    /Opera Mini/i,
    /IEMobile/i,
    /Mobile(?!.*Tablet)/i,
  ];

  const isTablet = tabletPatterns.some((pattern) => pattern.test(userAgent));
  const isMobile =
    !isTablet && mobilePatterns.some((pattern) => pattern.test(userAgent));
  const isDesktop = !isMobile && !isTablet;

  let deviceType: "mobile" | "tablet" | "desktop" = "desktop";
  if (isMobile) deviceType = "mobile";
  else if (isTablet) deviceType = "tablet";

  return {
    isMobile,
    isTablet,
    isDesktop,
    deviceType,
    userAgent,
  };
}
