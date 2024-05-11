export class DespesaDTO {
    id: number;
    nome: string;
    valor: number;
    mes: number;
    ano: number;
    tipoDespesa: number;
    dataCadastro: Date;
    dataAlteracao: Date;
    dataPagamento: Date;
    dataVencimento: Date;
    pago: boolean;
    despesaAtrasada: boolean;
    idCategoria: number;
}