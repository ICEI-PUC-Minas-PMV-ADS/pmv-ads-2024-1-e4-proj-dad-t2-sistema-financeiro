export interface TabelaDespesa {
  id: string;
  valor: number;
  nome: string;
  dataCompra: Date;
  dataPagamento: Date;
  categoriaId: string;
  formaPagamentoId: string;
  statusPago: boolean;
  nomeCategoria: any;
  nomeFormaPagamento: any;
}
