'use client'

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function CadastroMaterial() {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const qrData = searchParams.get('data');
  
  // Dados fake do material médico baseado no QR code
  const [materialData] = useState({
    id: qrData || 'N/A',
    nome: 'Luva Médica',
    tipo: 'Equipamento de Proteção Individual',
    categoria: 'Descartável',
    unidade: 'Unidade',
    estoque: 150,
    localizacao: 'Almoxarifado A - Prateleira 3',
    validade: '2025-12-31',
    fabricante: 'MedSupply Brasil',
    lote: 'LST-2024-001'
  });

  useEffect(() => {
    if (!qrData) {
      toast.error("Dados do QR Code não encontrados");
      router.push('/webcam');
    }
  }, [qrData, router]);

  const handleAction = async (action: 'adicionar' | 'retirar') => {
    setLoading(true);
    
    try {
      // Simular chamada para API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const actionText = action === 'adicionar' ? 'adicionado' : 'retirado';
      const newStock = action === 'adicionar' 
        ? materialData.estoque + quantity 
        : materialData.estoque - quantity;
      
      toast.success(`Material ${actionText} com sucesso!`, {
        description: `${quantity} ${materialData.unidade}(s) ${actionText}(s). Estoque atual: ${newStock}`,
      });
      
      // Simular delay e voltar para scanner
      setTimeout(() => {
        router.push('/webcam');
      }, 2000);
      
    } catch {
      toast.error(`Erro ao ${action} material`, {
        description: "Tente novamente mais tarde"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/webcam');
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (!qrData) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center">Carregando...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto pt-4">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            onClick={handleBack}
            variant="outline"
            size="sm"
            className="mr-3"
          >
            ← Voltar
          </Button>
          <h1 className="text-xl font-bold text-gray-900">
            Cadastro de Material
          </h1>
        </div>

        {/* QR Code Info */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">QR Code Detectado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-2 bg-gray-100 rounded text-xs font-mono break-all">
              {qrData}
            </div>
          </CardContent>
        </Card>

        {/* Material Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{materialData.nome}</CardTitle>
            <p className="text-sm text-gray-600">{materialData.tipo}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Categoria:</span>
                <p className="font-medium">{materialData.categoria}</p>
              </div>
              <div>
                <span className="text-gray-500">Estoque Atual:</span>
                <p className="font-medium text-green-600">{materialData.estoque} {materialData.unidade}s</p>
              </div>
              <div>
                <span className="text-gray-500">Localização:</span>
                <p className="font-medium">{materialData.localizacao}</p>
              </div>
              <div>
                <span className="text-gray-500">Validade:</span>
                <p className="font-medium">{new Date(materialData.validade).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <span className="text-gray-500">Fabricante:</span>
                <p className="font-medium">{materialData.fabricante}</p>
              </div>
              <div>
                <span className="text-gray-500">Lote:</span>
                <p className="font-medium">{materialData.lote}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quantity Selector */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Quantidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-4">
              <Button
                onClick={decrementQuantity}
                variant="outline"
                size="sm"
                disabled={quantity <= 1 || loading}
              >
                -
              </Button>
              <span className="text-xl font-bold w-16 text-center">
                {quantity}
              </span>
              <Button
                onClick={incrementQuantity}
                variant="outline"
                size="sm"
                disabled={loading}
              >
                +
              </Button>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              {materialData.unidade}(s)
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => handleAction('adicionar')}
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={loading}
            size="lg"
          >
            {loading ? 'Processando...' : `+ Adicionar ${quantity} ${materialData.unidade}(s)`}
          </Button>
          
          <Button
            onClick={() => handleAction('retirar')}
            variant="destructive"
            className="w-full"
            disabled={loading || quantity > materialData.estoque}
            size="lg"
          >
            {loading ? 'Processando...' : `- Retirar ${quantity} ${materialData.unidade}(s)`}
          </Button>
          
          {quantity > materialData.estoque && (
            <p className="text-sm text-red-500 text-center">
              Quantidade maior que o estoque disponível
            </p>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Sistema de Controle de Estoque</p>
          <p>Material identificado via QR Code</p>
        </div>
      </div>
    </div>
  );
}