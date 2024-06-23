export interface Despesa {
  id: string;
  valor: number;
  nome: string;
  dataCompra: Date;
  dataPagamento: Date;
  categoriaId: string;
  formaPagamentoId: string;
  statusPago: boolean;
}
