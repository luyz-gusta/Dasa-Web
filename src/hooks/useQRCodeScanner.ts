'use client'

import { useState, useCallback, useRef, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QRCodeScannerOptions {
  onResult?: (result: string) => void;
  onError?: (error: string) => void;
  fps?: number;
  qrbox?: number | { width: number; height: number };
}

interface QRCodeScannerReturn {
  result: string | null;
  isScanning: boolean;
  error: string | null;
  lastDetectedAt: Date | null;
  availableCameras: MediaDeviceInfo[];
  currentCameraId: string | null;
  startScanner: (deviceId?: string) => Promise<void>;
  stopScanner: () => Promise<void>;
  switchCamera: () => void;
  resetResult: () => void;
}

export function useQRCodeScanner({
  onResult,
  onError,
  fps = 10,
  qrbox = { width: 250, height: 250 }
}: QRCodeScannerOptions = {}): QRCodeScannerReturn {
  const [result, setResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastDetectedAt, setLastDetectedAt] = useState<Date | null>(null);
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [currentCameraId, setCurrentCameraId] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // Buscar câmeras disponíveis
  useEffect(() => {
    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setAvailableCameras(videoDevices);
        
        // Preferir câmera traseira em dispositivos móveis
        const backCamera = videoDevices.find(device => 
          device.label.toLowerCase().includes('back') ||
          device.label.toLowerCase().includes('environment')
        );
        
        if (backCamera) {
          setCurrentCameraId(backCamera.deviceId);
        } else if (videoDevices.length > 0) {
          setCurrentCameraId(videoDevices[0].deviceId);
        }
      } catch (err) {
        setError('Erro ao acessar câmeras do dispositivo');
        console.error('Erro ao listar câmeras:', err);
      }
    };

    getCameras();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const handleScanSuccess = useCallback((decodedText: string) => {
    setResult(decodedText);
    setLastDetectedAt(new Date());
    onResult?.(decodedText);
  }, [onResult]);

  const handleScanError = useCallback((errorMessage: string) => {
    // Só exibe erros relevantes (não os de "não encontrou QR code")
    if (!errorMessage.includes('No QR code found') && 
        !errorMessage.includes('QR code parse error')) {
      setError(errorMessage);
      onError?.(errorMessage);
    }
  }, [onError]);

  const startScanner = useCallback(async (deviceId?: string) => {
    try {
      setIsScanning(true);
      setError(null);

      const targetDeviceId = deviceId || currentCameraId;
      if (!targetDeviceId) {
        throw new Error('Nenhuma câmera disponível');
      }

      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode('qr-reader');
      }

      const scanner = scannerRef.current;
      
      if (scanner.isScanning) {
        await scanner.stop();
      }

      const config = { 
        fps,
        qrbox,
        aspectRatio: 1.0
      };

      await scanner.start(
        targetDeviceId,
        config,
        handleScanSuccess,
        handleScanError
      );
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao inicializar scanner';
      setError(errorMessage);
      setIsScanning(false);
      console.error('Erro ao iniciar scanner:', err);
    }
  }, [fps, qrbox, handleScanSuccess, handleScanError, currentCameraId]);

  const stopScanner = useCallback(async () => {
    try {
      if (scannerRef.current && scannerRef.current.isScanning) {
        await scannerRef.current.stop();
      }
      setIsScanning(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao parar scanner';
      setError(errorMessage);
      console.error('Erro ao parar scanner:', err);
    }
  }, []);

  const switchCamera = useCallback(() => {
    if (availableCameras.length <= 1) return;
    
    const currentIndex = availableCameras.findIndex(cam => cam.deviceId === currentCameraId);
    const nextIndex = (currentIndex + 1) % availableCameras.length;
    const nextCameraId = availableCameras[nextIndex].deviceId;
    
    setCurrentCameraId(nextCameraId);
    
    if (isScanning) {
      startScanner(nextCameraId);
    }
  }, [availableCameras, currentCameraId, isScanning, startScanner]);

  const resetResult = useCallback(() => {
    setResult(null);
    setLastDetectedAt(null);
    setError(null);
  }, []);

  return {
    result,
    isScanning,
    error,
    lastDetectedAt,
    availableCameras,
    currentCameraId,
    startScanner,
    stopScanner,
    switchCamera,
    resetResult
  };
}