'use client'

import QRCodeReader from "./components/QRCodeReader";
import { Toaster } from "sonner";

export default function Webcam() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Toaster position="top-center" />
      
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Scanner QR Code
          </h1>
          <p className="text-gray-600 text-sm">
            Escaneie códigos QR de forma rápida e fácil
          </p>
        </div>
        
        <QRCodeReader />
      </div>
    </div>
  );
}