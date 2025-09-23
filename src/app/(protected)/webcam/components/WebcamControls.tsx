'use client'

import { Button } from "@/components/ui/button";

interface WebcamControlsProps {
  mode: 'webcam' | 'qrcode';
  onModeChange: (mode: 'webcam' | 'qrcode') => void;
}

export default function WebcamControls({ mode, onModeChange }: WebcamControlsProps) {
  return (
    <div className="flex gap-2 mb-6">
      <Button
        variant={mode === 'webcam' ? 'default' : 'outline'}
        onClick={() => onModeChange('webcam')}
        className="flex-1"
      >
        📷 Webcam
      </Button>
      <Button
        variant={mode === 'qrcode' ? 'default' : 'outline'}
        onClick={() => onModeChange('qrcode')}
        className="flex-1"
      >
        📱 QR Code
      </Button>
    </div>
  );
}