'use client'

import { useQRCodeScanner } from "@/hooks/useQRCodeScanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

export default function QRCodeReader() {
  const { result, isScanning, error, scannerRef, startScanning, stopScanning, resetResult } = useQRCodeScanner({
    onResult: (data) => {
      console.log('QR Code detectado:', data);
    }
  });

  useEffect(() => {
    // Cleanup quando o componente é desmontado
    return () => {
      stopScanning();
    };
  }, [stopScanning]);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>📱 Leitor de QR Code</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            <strong>QR Code detectado:</strong>
            <div className="mt-2 p-2 bg-white rounded border text-sm break-all">
              {result}
            </div>
          </div>
        )}

        <div className="relative mb-4">
          {!result ? (
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              {isScanning ? (
                <div 
                  ref={scannerRef} 
                  id="qr-reader" 
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <p>Clique em &quot;Iniciar Scanner&quot; para começar</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="text-6xl mb-4">✅</div>
                <p>QR Code escaneado com sucesso!</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {!result ? (
            <Button
              onClick={isScanning ? stopScanning : startScanning}
              className="flex-1"
              variant={isScanning ? "destructive" : "default"}
            >
              {isScanning ? '⏹️ Parar Scanner' : '▶️ Iniciar Scanner'}
            </Button>
          ) : (
            <>
              <Button onClick={resetResult} variant="outline" className="flex-1">
                🔄 Novo Scan
              </Button>
              <Button 
                onClick={() => {
                  // Copiar resultado para clipboard
                  navigator.clipboard.writeText(result).then(() => {
                    console.log('QR Code copiado para o clipboard');
                  });
                }}
                className="flex-1"
              >
                📋 Copiar
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}