import ICam from "@/components/icons/Cam";
import IHome from "@/components/icons/Home";
import IPen from "@/components/icons/Pen";
import IUser from "@/components/icons/User";
import { insumosData } from "@/mock/insumos";
import Image from "next/image";
import Link from "next/link";

export default function MobileSection() {
  return (
    <div className="relative flex flex-col justify-between w-full min-h-screen">
      <Image
        src="/bubbles.png"
        alt="logo"
        width={556}
        height={534}
        className="top-0 right-0 z-0 absolute"
      />
      <main className="flex flex-col px-5 py-14 pb-24 w-full overflow-y-auto">
        <section className="flex flex-col gap-1 mb-6 w-full">
          <h4 className="font-raleway font-bold text-gray-900 text-2xl">Insumos</h4>
          <h5 className="font-raleway font-medium text-gray-600">Leticia</h5>
        </section>

        {/* Tabs */}
        <section className="flex gap-2 mb-6">
          <button className="bg-blue-500 px-4 py-2 rounded-full font-medium text-white text-sm">
            Material
          </button>
          <button className="bg-gray-100 px-4 py-2 rounded-full font-medium text-gray-600 text-sm">
            Tipo Material
          </button>
          <button className="bg-gray-100 px-4 py-2 rounded-full font-medium text-gray-600 text-sm">
            Estoque
          </button>
        </section>

        {/* Cards Grid */}
        <section className="z-2 gap-4 grid grid-cols-2">
          {insumosData.map((insumo) => {
            // Função para determinar as cores do status
            const getStatusColors = (statusColor: string) => {
              switch (statusColor) {
                case 'green':
                  return 'bg-green-40 text-green-100';
                case 'red':
                  return 'bg-red-40 text-red-100';
              }
            };

            return (
              <div key={insumo.id} className="bg-white shadow-[0_1.442px_2.884px_0_rgba(0,0,0,0.12)] p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h6 className="font-medium text-gray-900">{insumo.nome}</h6>
                  <span className={`px-2 py-1 rounded font-medium text-xs ${getStatusColors(insumo.statusColor)}`}>
                    {insumo.status}
                  </span>
                </div>
                <p className="mb-1 text-gray-500 text-xs">Data: {insumo.data}</p>
                <p className="mb-3 text-gray-500 text-xs">{insumo.usuario}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-gray-500 text-xs">Quantidade</p>
                    <p className="font-bold text-gray-900 text-2xl">{insumo.quantidade}</p>
                  </div>
                  <button className="flex justify-center items-center bg-blue-500 p-2 rounded-full">
                    <IPen />
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </main>
      <nav className="bottom-0 fixed bg-[#FFFFFF] shadow-[0_-1px_1px_0_rgba(0,0,0,0.16)] px-8 py-4 w-full">
        <div className="relative flex justify-between items-center">
          <Link href="/dashboard" className="text-primary-100">
            <IHome width={32} height={32} />
          </Link>
          <Link href="/dashboard" className="left-1/2 absolute -translate-x-1/2 transform">
            <div className="bottom-0 left-1/2 absolute bg-primary-100 p-6 rounded-full text-general-30 -translate-x-1/2 transform">
              <ICam width={32} height={32} />
            </div>
          </Link>
          <Link href="/" className="text-primary-100 cursor-pointer">
            <IUser width={32} height={32} />
          </Link>
        </div>
      </nav>
    </div>
  );
}
