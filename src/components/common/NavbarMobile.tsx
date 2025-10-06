import Link from "next/link";
import IHome from "@/components/icons/Home";
import ICam from "@/components/icons/Cam";
import IUser from "@/components/icons/User";

export default function NavbarMobile(){
    return(
        <nav className="bottom-0 z-5 fixed bg-[#FFFFFF] shadow-[0_-1px_1px_0_rgba(0,0,0,0.16)] px-8 py-4 w-full">
        <div className="relative flex justify-between items-center">
          <Link href="/dashboard" className="text-primary-100">
            <IHome width={32} height={32} />
          </Link>
          <Link href="/webcam" className="left-1/2 absolute -translate-x-1/2 transform">
            <div className="bottom-0 left-1/2 absolute bg-primary-100 p-6 rounded-full text-general-30 -translate-x-1/2 transform">
              <ICam width={32} height={32} />
            </div>
          </Link>
          <Link href="/" className="text-primary-100 cursor-pointer">
            <IUser width={32} height={32} />
          </Link>
        </div>
      </nav>
    )
}