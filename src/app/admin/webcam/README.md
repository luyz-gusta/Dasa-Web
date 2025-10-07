# Scanner de QR Code - Mobile First

## Funcionalidades

### � Scanner de QR Code em Tempo Real
- Detecção automática e contínua de QR codes via webcam
- Troca automática entre câmeras frontal e traseira
- Cópia automática do resultado para clipboard
- Interface minimalista otimizada para dispositivos móveis
- Feedback em tempo real com toast notifications
- Auto-inicialização do scanner

## Design Principles

- **Mobile First**: Interface otimizada para smartphones
- **Minimalista**: Design clean sem ícones desnecessários  
- **Acessível**: Controles grandes e fáceis de usar
- **Responsivo**: Adapta-se a diferentes tamanhos de tela

## Tecnologias Utilizadas

- **html5-qrcode**: Scanner QR robusto e performático
- **sonner**: Toast notifications elegantes
- **Hooks personalizados**: useQRCodeScanner para lógica reutilizável
- **TypeScript**: Tipagem segura em toda aplicação
- **shadcn/ui**: Componentes UI consistentes

## Estrutura Simplificada

```
src/app/(protected)/webcam/
├── page.tsx                   # Página principal otimizada para mobile
├── components/
│   └── QRCodeReader.tsx       # Componente principal do scanner
└── README.md                  # Documentação

src/hooks/
└── useQRCodeScanner.ts        # Hook com lógica do scanner
```

## Como Usar

1. Acesse `/webcam` (requer autenticação)
2. O scanner inicia automaticamente
3. Aponte a câmera para um QR Code
4. O conteúdo é detectado e copiado automaticamente
5. Use "Trocar" para alternar entre câmeras (se disponível)
6. Use "Novo Scan" para escanear outro código

## Funcionalidades Automáticas

- **Auto-start**: Scanner inicia automaticamente ao carregar
- **Auto-copy**: Resultado copiado para clipboard automaticamente
- **Auto-detect**: Detecção contínua sem necessidade de captura manual
- **Smart camera**: Prefere câmera traseira em dispositivos móveis

## Permissões Necessárias

- Acesso à câmera do navegador
- Permissão para usar clipboard (cópia automática)