'use client'

import { useWebcam } from "@/hooks/useWebcam";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Webcam from "react-webcam";
import { useState } from "react";

export default function WebcamCapture() {
  const { webcamRef, imgSrc, isCapturing, error, facingMode, capture, resetCapture, switchCamera } = useWebcam();
  const [isWebcamReady, setIsWebcamReady] = useState(false);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: facingMode
  };

  return (
    <Card className="p-6 w-full max-w-2xl">
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="relative">
          {!imgSrc ? (
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                onUserMedia={() => setIsWebcamReady(true)}
                onUserMediaError={(err) => console.error('Webcam error:', err)}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgSrc} alt="Captura" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {!imgSrc ? (
            <>
              <Button
                onClick={capture}
                disabled={!isWebcamReady || isCapturing}
                className="flex-1"
              >
                {isCapturing ? 'Capturando...' : '📷 Capturar'}
              </Button>
              <Button
                variant="outline"
                onClick={switchCamera}
                disabled={!isWebcamReady}
              >
                🔄 Trocar Câmera
              </Button>
            </>
          ) : (
            <>
              <Button onClick={resetCapture} variant="outline" className="flex-1">
                🔄 Nova Captura
              </Button>
              <Button 
                onClick={() => {
                  // Aqui poderia implementar download da imagem
                  const link = document.createElement('a');
                  link.download = `captura-${Date.now()}.jpg`;
                  link.href = imgSrc;
                  link.click();
                }}
                className="flex-1"
              >
                💾 Salvar
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}