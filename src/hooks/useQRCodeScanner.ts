'use client'

import { useState, useCallback, useRef, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface QRCodeScannerOptions {
  onResult?: (result: string) => void;
  onError?: (error: string) => void;
  fps?: number;
  qrbox?: number;
}

interface QRCodeScannerReturn {
  result: string | null;
  isScanning: boolean;
  error: string | null;
  scannerRef: React.RefObject<HTMLDivElement | null>;
  startScanning: () => void;
  stopScanning: () => void;
  resetResult: () => void;
}

export function useQRCodeScanner({
  onResult,
  onError,
  fps = 10,
  qrbox = 250
}: QRCodeScannerOptions = {}): QRCodeScannerReturn {
  const [result, setResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCode = useRef<Html5QrcodeScanner | null>(null);

  const handleScan = useCallback((decodedText: string) => {
    setResult(decodedText);
    onResult?.(decodedText);
    setIsScanning(false);
    
    // Para o scanner após encontrar um QR code
    if (html5QrCode.current) {
      html5QrCode.current.clear().catch(console.error);
    }
  }, [onResult]);

  const handleError = useCallback((err: string) => {
    // Só exibe erros relevantes (não os de "não encontrou QR code")
    if (!err.includes('No QR code found')) {
      setError(err);
      onError?.(err);
    }
  }, [onError]);

  const startScanning = useCallback(() => {
    if (!scannerRef.current || isScanning) return;

    setIsScanning(true);
    setError(null);
    
    try {
      html5QrCode.current = new Html5QrcodeScanner(
        scannerRef.current.id || 'qr-reader',
        { 
          fps,
          qrbox: { width: qrbox, height: qrbox },
          aspectRatio: 1.0
        },
        false
      );

      html5QrCode.current.render(handleScan, handleError);
    } catch (err) {
      setError('Erro ao inicializar scanner QR');
      setIsScanning(false);
      console.error('QR Scanner initialization error:', err);
    }
  }, [fps, qrbox, handleScan, handleError, isScanning]);

  const stopScanning = useCallback(() => {
    if (html5QrCode.current) {
      html5QrCode.current.clear().catch(console.error);
      html5QrCode.current = null;
    }
    setIsScanning(false);
  }, []);

  const resetResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (html5QrCode.current) {
        html5QrCode.current.clear().catch(console.error);
      }
    };
  }, []);

  return {
    result,
    isScanning,
    error,
    scannerRef,
    startScanning,
    stopScanning,
    resetResult
  };
}