'use client'

import QRCodeReader from "./components/QRCodeReader";
import { Toaster } from "sonner";

export default function Webcam() {
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--general-30)', fontFamily: 'var(--font-poppins)' }}>
      <Toaster position="top-center" />
      
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--general-100)' }}>
            Scanner QR Code
          </h1>
          <p className="text-sm" style={{ color: 'var(--general-70)' }}>
            Escaneie códigos QR de materiais médicos
          </p>
        </div>
        
        <QRCodeReader />
      </div>
    </div>
  );
}