'use client'

import { useState, Suspense } from 'react'
import { toast } from 'sonner'

function CadastroMaterialContent() {
  // QR code data não é mais usado, geramos código aleatório
  
  const [currentQuantity, setCurrentQuantity] = useState(150) // Estoque atual
  const [inputQuantity, setInputQuantity] = useState(1) // Quantidade a adicionar/retirar
  const [operation, setOperation] = useState<'adicionar' | 'retirar'>('adicionar') // Operação selecionada
  const [isLoading, setIsLoading] = useState(false)

  // Gerar código aleatório para código de barras
  const generateRandomCode = () => {
    return Math.floor(Math.random() * 900000000000) + 100000000000 // Gera número de 12 dígitos
  }

  // Dados mockados baseados na imagem
  const materialData = {
    insumo: 'Luva Médica',
    responsavel: 'João Vitor',
    data: '22/09/2025',
    tipo: 'EPI - Equipamento de proteção Individual',
    local: 'Hospital São Luiz',
    codigo: generateRandomCode().toString()
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    setInputQuantity(Math.max(0, value))
  }

  const handleOperationChange = (newOperation: 'adicionar' | 'retirar') => {
    setOperation(newOperation)
  }

  const handleSalvar = async () => {
    // Validação para operação de retirar
    if (operation === 'retirar' && inputQuantity > currentQuantity) {
      toast.error('Ação não possível!', {
        description: `Não é possível retirar ${inputQuantity} unidades. Estoque atual: ${currentQuantity} unidades.`
      })
      return
    }

    setIsLoading(true)
    
    try {
      // Simular salvamento no banco
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (operation === 'adicionar') {
        setCurrentQuantity(prev => prev + inputQuantity)
        toast.success(`${inputQuantity} unidade(s) adicionada(s)! Estoque atual: ${currentQuantity + inputQuantity}`)
      } else {
        const newQuantity = Math.max(0, currentQuantity - inputQuantity)
        setCurrentQuantity(newQuantity)
        toast.success(`${inputQuantity} unidade(s) retirada(s)! Estoque atual: ${newQuantity}`)
      }
      
      // Reset input
      setInputQuantity(1)
      
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

        {/* Estoque Atual */}
        <div className="space-y-2">
          <p className="text-sm font-medium" style={{ color: 'var(--general-80)' }}>
            Estoque Atual
          </p>
          <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: 'var(--primary-30)' }}>
            <p className="text-sm font-semibold" style={{ color: 'var(--primary-90)' }}>
              {currentQuantity} unidade(s)
            </p>
          </div>
        </div>

        {/* Operação */}
        <div className="space-y-3">
          <p className="text-sm font-medium" style={{ color: 'var(--general-80)' }}>
            Operação
          </p>
          <div className="flex space-x-3">
            <button
              onClick={() => handleOperationChange('adicionar')}
              className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                operation === 'adicionar' ? 'text-white' : ''
              }`}
              style={{ 
                backgroundColor: operation === 'adicionar' ? 'var(--primary-90)' : 'transparent',
                color: operation === 'adicionar' ? 'white' : 'var(--primary-90)',
                border: `1px solid var(--primary-90)`
              }}
            >
              Adicionar
            </button>
            <button
              onClick={() => handleOperationChange('retirar')}
              className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                operation === 'retirar' ? 'text-white' : ''
              }`}
              style={{ 
                backgroundColor: operation === 'retirar' ? 'var(--red-80)' : 'transparent',
                color: operation === 'retirar' ? 'white' : 'var(--red-80)',
                border: `1px solid var(--red-80)`
              }}
            >
              Retirar
            </button>
          </div>
        </div>

        {/* Quantidade */}
        <div className="space-y-2">
          <p className="text-sm font-medium" style={{ color: 'var(--general-80)' }}>
            Quantidade a {operation}
          </p>
          <div 
            className="px-4 py-3 rounded-lg border" 
            style={{ 
              backgroundColor: 'var(--general-40)',
              borderColor: operation === 'retirar' && inputQuantity > currentQuantity ? 'var(--red-70)' : 'transparent'
            }}
          >
            <input
              type="number"
              value={inputQuantity}
              onChange={handleQuantityChange}
              min="1"
              max={operation === 'retirar' ? currentQuantity : undefined}
              className="w-full bg-transparent text-sm font-medium outline-none"
              style={{ color: 'var(--general-100)' }}
              placeholder="Digite a quantidade"
            />
          </div>
          {operation === 'retirar' && inputQuantity > currentQuantity && (
            <p className="text-xs mt-1" style={{ color: 'var(--red-80)' }}>
              Quantidade não pode ser maior que o estoque atual ({currentQuantity} unidades)
            </p>
          )}
        </div>

        {/* Botão Salvar */}
        <button
          onClick={handleSalvar}
          disabled={isLoading || (operation === 'retirar' && inputQuantity > currentQuantity) || inputQuantity <= 0}
          className="w-full py-4 rounded-lg font-medium text-white mt-6 transition-all"
          style={{ 
            backgroundColor: (isLoading || (operation === 'retirar' && inputQuantity > currentQuantity) || inputQuantity <= 0) 
              ? 'var(--general-60)' 
              : 'var(--primary-90)',
            cursor: (isLoading || (operation === 'retirar' && inputQuantity > currentQuantity) || inputQuantity <= 0) 
              ? 'not-allowed' 
              : 'pointer'
          }}
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