# Página de Webcam

## Funcionalidades

### 📷 Captura de Webcam
- Acesso à câmera do dispositivo
- Troca entre câmera frontal e traseira (dispositivos móveis)
- Captura de imagens em alta qualidade (1280x720)
- Download das imagens capturadas
- Tratamento de erros de permissão

### 📱 Leitor de QR Code  
- Scanner automático de QR codes
- Detecção em tempo real
- Exibição do conteúdo decodificado
- Cópia do resultado para clipboard
- Interface adaptativa

## Tecnologias Utilizadas

- **react-webcam**: Captura de webcam compatível com Next.js
- **html5-qrcode**: Leitor QR code robusto e confiável
- **Hooks personalizados**: useWebcam e useQRCodeScanner
- **Design responsivo**: Layouts diferentes para desktop e mobile
- **shadcn/ui**: Componentes UI consistentes com o projeto

## Estrutura de Arquivos

```
src/app/(protected)/webcam/
├── page.tsx                   # Página principal com device detection
├── components/
│   ├── DesktopLayout.tsx      # Layout para desktop
│   ├── MobileLayout.tsx       # Layout para mobile  
│   ├── WebcamCapture.tsx      # Componente de captura
│   ├── QRCodeReader.tsx       # Componente leitor QR
│   └── WebcamControls.tsx     # Controles de navegação

src/hooks/
├── useWebcam.ts               # Hook para lógica da webcam
└── useQRCodeScanner.ts        # Hook para lógica do QR scanner
```

## Como Usar

1. Acesse `/webcam` (requer autenticação)
2. Use os botões para alternar entre "Webcam" e "QR Code"
3. Para webcam: clique em "Capturar" para tirar foto
4. Para QR: clique em "Iniciar Scanner" para começar a leitura
5. Use os controles para gerenciar capturas/resultados

## Permissões Necessárias

- Acesso à câmera do navegador
- Permissões de escrita para download de imagens