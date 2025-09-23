'use client'

import { useState, useRef, useCallback } from 'react';
import type Webcam from 'react-webcam';

interface WebcamHookOptions {
  facingMode?: 'user' | 'environment';
  aspectRatio?: number;
  screenshotQuality?: number;
}

interface WebcamHookReturn {
  webcamRef: React.RefObject<Webcam | null>;
  imgSrc: string | null;
  isCapturing: boolean;
  error: string | null;
  facingMode: 'user' | 'environment';
  capture: () => void;
  resetCapture: () => void;
  switchCamera: () => void;
}

export function useWebcam({
  facingMode = 'user'
}: WebcamHookOptions = {}): WebcamHookReturn {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFacingMode, setCurrentFacingMode] = useState(facingMode);

  const capture = useCallback(() => {
    try {
      setIsCapturing(true);
      setError(null);
      
      const imageSrc = webcamRef.current?.getScreenshot({
        width: 1280,
        height: 720
      });
      
      if (imageSrc) {
        setImgSrc(imageSrc);
      } else {
        setError('Erro ao capturar imagem da webcam');
      }
    } catch (err) {
      setError('Erro ao capturar imagem');
      console.error('Webcam capture error:', err);
    } finally {
      setIsCapturing(false);
    }
  }, []);

  const resetCapture = useCallback(() => {
    setImgSrc(null);
    setError(null);
  }, []);

  const switchCamera = useCallback(() => {
    setCurrentFacingMode(prev => 
      prev === 'user' ? 'environment' : 'user'
    );
  }, []);

  return {
    webcamRef,
    imgSrc,
    isCapturing,
    error,
    facingMode: currentFacingMode,
    capture,
    resetCapture,
    switchCamera
  };
}