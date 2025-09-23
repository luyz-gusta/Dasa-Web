'use client'

import { useQRCodeScanner } from "@/hooks/useQRCodeScanner";
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
      <div className="mb-6 rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--general-40)', border: '1px solid var(--general-50)' }}>
        <div className="p-6 text-center" style={{ backgroundColor: 'var(--primary-30)' }}>
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--general-100)' }}>Scanner QR Code</h2>
          <p className="text-sm" style={{ color: 'var(--general-70)' }}>
            Escaneie para cadastrar material médico
          </p>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Camera Preview */}
          <div className="relative">
            <div 
              id="qr-reader" 
              className="w-full aspect-square rounded-lg overflow-hidden border-2 border-dashed"
              style={{ backgroundColor: 'var(--general-30)', borderColor: 'var(--general-60)' }}
            />
            
            {/* Overlay quando não está escaneando */}
            {!isScanning && !result && (
              <div className="absolute inset-0 bg-opacity-90 flex items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--general-30)' }}>
                <div className="text-center">
                  <div className="text-4xl mb-2">🏥</div>
                  <p className="text-sm" style={{ color: 'var(--general-70)' }}>
                    Toque em Iniciar para escanear
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--general-60)' }}>
                    Material médico
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={handleToggleScanner}
              className="flex-1 py-3 rounded-lg font-medium text-white transition-all"
              style={{ backgroundColor: isScanning ? 'var(--red-80)' : 'var(--primary-90)' }}
            >
              {isScanning ? "Parar" : "Iniciar"}
            </button>
            
            {availableCameras.length > 1 && (
              <button
                onClick={switchCamera}
                disabled={!isScanning}
                className="px-4 py-3 rounded-lg font-medium border transition-all"
                style={{ 
                  color: 'var(--primary-90)', 
                  borderColor: 'var(--primary-90)',
                  backgroundColor: 'transparent',
                  opacity: !isScanning ? 0.5 : 1
                }}
              >
                Trocar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Result Display - Simplificado */}
      {result && (
        <div className="mb-6 rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--green-30)', border: '1px solid var(--green-50)' }}>
          <div className="p-4 text-center" style={{ backgroundColor: 'var(--green-40)' }}>
            <h3 className="text-base font-semibold" style={{ color: 'var(--green-90)' }}>QR Code Detectado</h3>
            {lastDetectedAt && (
              <p className="text-xs mt-1" style={{ color: 'var(--green-70)' }}>
                {formatTimestamp(lastDetectedAt)}
              </p>
            )}
          </div>
          
          <div className="p-4 space-y-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--general-30)' }}>
              <p className="text-sm break-all" style={{ color: 'var(--general-80)' }}>{result}</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm mb-3" style={{ color: 'var(--primary-80)' }}>
                Redirecionando para cadastro...
              </p>
              <button
                onClick={handleNewScan}
                className="px-4 py-2 rounded-lg font-medium border transition-all"
                style={{ 
                  color: 'var(--general-80)', 
                  borderColor: 'var(--general-60)',
                  backgroundColor: 'transparent'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-4 rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--red-30)', border: '1px solid var(--red-50)' }}>
          <div className="p-4">
            <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--red-40)', color: 'var(--red-90)' }}>
              {error}
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center text-xs mt-6 space-y-1" style={{ color: 'var(--general-60)' }}>
        <p>Aponte a câmera para um QR Code de material médico</p>
        <p>O sistema redirecionará automaticamente para o cadastro</p>
      </div>
    </div>
  );
}