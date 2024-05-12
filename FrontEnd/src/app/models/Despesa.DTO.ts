export class DespesaDTO {
    id: string;
    nome: string;
    valor: number;
    mes: number;
    ano: number;
    tipoDespesa: string;
    dataCadastro: string;
    dataAlteracao: string;
    dataPagamento: string;
    dataVencimento: string;
    pago: boolean;
    despesaAtrasada: boolean;
    categoriaId: string;
}