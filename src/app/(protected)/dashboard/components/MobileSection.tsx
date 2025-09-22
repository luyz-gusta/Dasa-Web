import Image from "next/image";

export default function MobileSection() {
  return (
    <div className="relative flex flex-col w-full min-h-screen">
      <Image src="/bubbles.png" alt="logo" width={556} height={534} className="top-0 right-0 absolute" />
      <nav>Header Mobile</nav>
    </div>
  );
}
