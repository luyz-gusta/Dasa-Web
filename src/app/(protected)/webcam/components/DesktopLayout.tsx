'use client'

import WebcamCapture from "./WebcamCapture";
import QRCodeReader from "./QRCodeReader";
import WebcamControls from "./WebcamControls";
import { useState } from "react";

type ModeType = 'webcam' | 'qrcode';

export default function DesktopLayout() {
  const [mode, setMode] = useState<ModeType>('webcam');

  return (
    <div className="flex flex-col w-full min-h-screen p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Webcam & QR Code</h1>
        <p className="text-gray-600">Capture imagens ou escaneie códigos QR</p>
      </div>

      <WebcamControls mode={mode} onModeChange={setMode} />

      <div className="flex-1 flex justify-center items-center">
        {mode === 'webcam' ? <WebcamCapture /> : <QRCodeReader />}
      </div>
    </div>
  );
}