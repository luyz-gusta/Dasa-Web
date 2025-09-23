export interface Insumo {
  id: string;
  nome: string;
  data: string;
  usuario: string;
  quantidade: number;
  status: 'Entrada' | 'Retirada';
  statusColor: 'green' | 'red';
}

export const insumosData: Insumo[] = [
  {
    id: '1',
    nome: 'Luva',
    data: '05/05/2024, 16:20',
    usuario: 'Tom Anderson',
    quantidade: 12,
    status: 'Entrada',
    statusColor: 'green'
  },
  {
    id: '2',
    nome: 'Máscara',
    data: '04/05/2024, 14:15',
    usuario: 'Maria Silva',
    quantidade: 25,
    status: 'Entrada',
    statusColor: 'green'
  },
  {
    id: '3',
    nome: 'Seringa',
    data: '03/05/2024, 10:30',
    usuario: 'João Santos',
    quantidade: 8,
    status: 'Retirada',
    statusColor: 'red'
  },
  {
    id: '4',
    nome: 'Termômetro',
    data: '02/05/2024, 15:45',
    usuario: 'Ana Costa',
    quantidade: 15,
    status: 'Entrada',
    statusColor: 'green'
  },
  {
    id: '5',
    nome: 'Gaze',
    data: '01/05/2024, 11:20',
    usuario: 'Carlos Lima',
    quantidade: 5,
    status: 'Retirada',
    statusColor: 'red'
  },
  {
    id: '6',
    nome: 'Álcool Gel',
    data: '30/04/2024, 16:10',
    usuario: 'Leticia Rocha',
    quantidade: 20,
    status: 'Entrada',
    statusColor: 'green'
  }
];
