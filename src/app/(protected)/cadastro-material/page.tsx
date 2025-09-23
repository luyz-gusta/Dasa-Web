'use client'

import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import { toast } from 'sonner'

function CadastroMaterialContent() {
  const searchParams = useSearchParams()
  const qrCode = searchParams.get('data') || '523524543636345'
  
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Dados mockados baseados na imagem
  const materialData = {
    insumo: 'Luva Médica',
    responsavel: 'João Vitor',
    data: '22/09/2025',
    tipo: 'EPI - Equipamento de proteção Individual',
    local: 'Hospital São Luiz',
    codigo: qrCode
  }

  const handleAdicionar = () => {
    setQuantity(prev => prev + 1)
    toast.success('Quantidade adicionada!')
  }

  const handleRetirar = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
      toast.success('Quantidade removida!')
    }
  }

  const handleSalvar = async () => {
    setIsLoading(true)
    
    try {
      // Simular salvamento no banco
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Material salvo com sucesso!')
      
    } catch {
      toast.error('Erro ao salvar material')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--general-30)', fontFamily: 'var(--font-poppins)' }}>
      {/* Header */}
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--general-100)' }}>
          Insumo
        </h1>
        <p className="text-lg mt-1" style={{ color: 'var(--general-80)' }}>
          {materialData.responsavel}
        </p>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6 pb-32">
        {/* Data */}
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--general-80)' }}>
            {materialData.data}
          </p>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--general-100)' }}>
            {materialData.insumo}
          </h2>
        </div>

        {/* Tipo de Material */}
        <div className="space-y-2">
          <p className="text-sm font-medium" style={{ color: 'var(--general-80)' }}>
            Tipo de Material
          </p>
          <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: 'var(--primary-30)' }}>
            <p className="text-sm" style={{ color: 'var(--primary-90)' }}>
              {materialData.tipo}
            </p>
          </div>
        </div>

        {/* Local */}
        <div className="space-y-2">
          <p className="text-sm font-medium" style={{ color: 'var(--general-80)' }}>
            Local
          </p>
          <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: 'var(--primary-30)' }}>
            <p className="text-sm" style={{ color: 'var(--primary-90)' }}>
              {materialData.local}
            </p>
          </div>
        </div>

        {/* Código de barras */}
        <div className="space-y-2">
          <p className="text-sm font-medium" style={{ color: 'var(--general-80)' }}>
            Código de barras
          </p>
          <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: 'var(--general-40)' }}>
            <p className="text-sm" style={{ color: 'var(--general-80)' }}>
              {materialData.codigo}
            </p>
          </div>
        </div>

        {/* Quantidade */}
        <div className="space-y-2">
          <p className="text-sm font-medium" style={{ color: 'var(--general-80)' }}>
            Quantidade
          </p>
          <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: 'var(--general-40)' }}>
            <p className="text-sm" style={{ color: 'var(--general-80)' }}>
              Você deixa digitavel
            </p>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex space-x-3 mt-8">
          <button
            onClick={handleAdicionar}
            className="flex-1 py-4 rounded-lg font-medium text-white transition-all"
            style={{ backgroundColor: 'var(--primary-90)' }}
          >
            Adicionar
          </button>
          <button
            onClick={handleRetirar}
            className="flex-1 py-4 rounded-lg font-medium transition-all border"
            style={{ 
              color: 'var(--primary-90)', 
              borderColor: 'var(--primary-90)',
              backgroundColor: 'transparent'
            }}
          >
            Retirar
          </button>
        </div>

        {/* Botão Salvar */}
        <button
          onClick={handleSalvar}
          disabled={isLoading}
          className="w-full py-4 rounded-lg font-medium text-white mt-6 transition-all"
          style={{ backgroundColor: 'var(--primary-90)' }}
        >
          {isLoading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>

      {/* Bottom Navigation Indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-20 flex items-center justify-center" style={{ backgroundColor: 'var(--general-30)' }}>
        <div className="w-32 h-1 rounded" style={{ backgroundColor: 'var(--general-100)' }}></div>
      </div>
    </div>
  )
}

export default function CadastroMaterialPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--general-30)' }}>
        <div className="text-center" style={{ color: 'var(--general-80)' }}>
          <p>Carregando...</p>
        </div>
      </div>
    }>
      <CadastroMaterialContent />
    </Suspense>
  )
}