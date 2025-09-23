'use client'

import { useQRCodeScanner } from "@/hooks/useQRCodeScanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function QRCodeReader() {
  const [autoStart, setAutoStart] = useState(true);
  
  const { 
    result, 
    isScanning, 
    error, 
    lastDetectedAt,
    availableCameras,
    startScanner, 
    stopScanner, 
    switchCamera,
    resetResult 
  } = useQRCodeScanner({
    onResult: (data) => {
      toast.success("QR Code detectado!", {
        description: "Conteúdo copiado automaticamente",
      });
      // Copiar para clipboard automaticamente
      navigator.clipboard.writeText(data).catch(console.error);
    },
    onError: (errorMsg) => {
      toast.error("Erro no scanner", {
        description: errorMsg
      });
    }
  });

  // Auto-iniciar o scanner quando o componente montar
  useEffect(() => {
    if (autoStart && !isScanning && !result) {
      const timer = setTimeout(() => {
        startScanner();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoStart, isScanning, result, startScanner]);

  const handleToggleScanner = () => {
    if (isScanning) {
      stopScanner();
    } else {
      startScanner();
    }
  };

  const handleNewScan = () => {
    resetResult();
    setAutoStart(true);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Scanner Area */}
      <Card className="mb-4">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-center">Scanner QR Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Camera Preview */}
          <div className="relative">
            <div 
              id="qr-reader" 
              className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300"
            />
            
            {/* Overlay quando não está escaneando */}
            {!isScanning && !result && (
              <div className="absolute inset-0 bg-gray-50 bg-opacity-90 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-sm text-gray-600">
                    Toque em Iniciar para começar
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <Button
              onClick={handleToggleScanner}
              className="flex-1"
              variant={isScanning ? "destructive" : "default"}
            >
              {isScanning ? "Parar" : "Iniciar"}
            </Button>
            
            {availableCameras.length > 1 && (
              <Button
                onClick={switchCamera}
                variant="outline"
                disabled={!isScanning}
              >
                Trocar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Result Display */}
      {result && (
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-green-600">QR Code Detectado</CardTitle>
            {lastDetectedAt && (
              <p className="text-xs text-gray-500">
                {formatTimestamp(lastDetectedAt)}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-md border">
              <p className="text-sm break-all">{result}</p>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={() => navigator.clipboard.writeText(result)}
                variant="outline"
                className="flex-1"
                size="sm"
              >
                Copiar
              </Button>
              <Button
                onClick={handleNewScan}
                className="flex-1"
                size="sm"
              >
                Novo Scan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Card className="border-red-200">
          <CardContent className="pt-4">
            <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <div className="text-center text-xs text-gray-500 mt-4">
        <p>Aponte a câmera para um QR Code</p>
        <p>O conteúdo será detectado automaticamente</p>
      </div>
    </div>
  );
}