export class DespesaDTO
{
    Id: number;
    Nome: string;
    Valor: number;
    Mes: number;
    Ano: number;
    TipoDespesa: number;
    DataCadastro: Date;
    DataAlteracao: Date;
    DataPagamento: Date;
    DataVencimento: Date;
    Pago: boolean;
    DespesaAtrasada: boolean;
    IdCategoria: number;

   
}