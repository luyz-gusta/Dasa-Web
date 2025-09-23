'use client'

import { useQRCodeScanner } from "@/hooks/useQRCodeScanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function QRCodeReader() {
  const [autoStart, setAutoStart] = useState(true);
  const router = useRouter();
  
  // Funções comentadas para uso futuro (cooldown e link detection)
  // const [cooldownActive, setCooldownActive] = useState(false);
  // const [cooldownTime, setCooldownTime] = useState(0);
  // const [showLinkConfirm, setShowLinkConfirm] = useState(false);
  // const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  
  // Função para verificar se é um URL válido (inativa)
  // const isValidUrl = useCallback((text: string): boolean => {
  //   try {
  //     new URL(text);
  //     return true;
  //   } catch {
  //     return text.startsWith('http://') || 
  //            text.startsWith('https://') || 
  //            text.startsWith('www.');
  //   }
  // }, []);

  // Função para copiar com cooldown (inativa)
  // const copyWithCooldown = useCallback((text: string) => {
  //   if (cooldownActive) return;
    
  //   navigator.clipboard.writeText(text).then(() => {
  //     toast.success("Copiado!", {
  //       description: "Conteúdo copiado para área de transferência",
  //     });
      
  //     // Ativar cooldown de 3 segundos
  //     setCooldownActive(true);
  //     setCooldownTime(3);
      
  //     const interval = setInterval(() => {
  //       setCooldownTime((prev) => {
  //         if (prev <= 1) {
  //           setCooldownActive(false);
  //           clearInterval(interval);
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);
      
  //   }).catch(() => {
  //     toast.error("Erro", {
  //       description: "Não foi possível copiar o conteúdo"
  //     });
  //   });
  // }, [cooldownActive]);

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
        description: "Redirecionando para cadastro...",
      });
      
      // Navegar para página de cadastro com os dados do QR
      setTimeout(() => {
        router.push(`/cadastro-material?data=${encodeURIComponent(data)}`);
      }, 1000);
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
    <div className="w-full max-w-md mx-auto relative">
      {/* Overlay para confirmação de link - INATIVO */}
      {/* {showLinkConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-center text-lg">Link Detectado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-md border text-sm break-all">
                {pendingUrl}
              </div>
              <p className="text-sm text-gray-600 text-center">
                Deseja abrir este link em uma nova aba?
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={handleCancelLink}
                  variant="outline"
                  className="flex-1"
                  size="sm"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleOpenLink}
                  className="flex-1"
                  size="sm"
                >
                  Abrir Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )} */}

      {/* Scanner Area */}
      <Card className="mb-4">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-center">Scanner QR Code</CardTitle>
          <p className="text-sm text-gray-600 text-center">
            Escaneie para cadastrar material médico
          </p>
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
                  <div className="text-4xl mb-2">🏥</div>
                  <p className="text-sm text-gray-600">
                    Toque em Iniciar para escanear
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Material médico
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

      {/* Result Display - Simplificado */}
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
            
            <div className="text-center">
              <p className="text-sm text-blue-600 mb-3">
                Redirecionando para cadastro...
              </p>
              <Button
                onClick={handleNewScan}
                variant="outline"
                size="sm"
              >
                Cancelar
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
        <p>Aponte a câmera para um QR Code de material médico</p>
        <p>O sistema redirecionará automaticamente para o cadastro</p>
      </div>
    </div>
  );
}