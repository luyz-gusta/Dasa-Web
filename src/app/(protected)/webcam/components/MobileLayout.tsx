'use client'

import Image from "next/image";
import WebcamCapture from "./WebcamCapture";
import QRCodeReader from "./QRCodeReader";
import WebcamControls from "./WebcamControls";
import { useState } from "react";

type ModeType = 'webcam' | 'qrcode';

export default function MobileLayout() {
  const [mode, setMode] = useState<ModeType>('webcam');

  return (
    <div className="relative flex flex-col w-full min-h-screen">
      <Image 
        src="/bubbles.png" 
        alt="background" 
        width={556} 
        height={534} 
        className="top-0 right-0 absolute opacity-20" 
      />
      
      <div className="relative z-10 flex flex-col h-full p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-1">Webcam & QR</h1>
          <p className="text-sm text-gray-600">Capture ou escaneie</p>
        </div>

        <WebcamControls mode={mode} onModeChange={setMode} />

        <div className="flex-1 flex justify-center items-center">
          {mode === 'webcam' ? <WebcamCapture /> : <QRCodeReader />}
        </div>
      </div>
    </div>
  );
}