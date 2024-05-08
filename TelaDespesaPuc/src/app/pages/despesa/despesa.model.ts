// despesa.model.ts
export interface DespesaDTO {
    Id?: number;
    Nome?: string;
    Valor?: number;
    Mes?: number;
    Ano?: number;
    TipoDespesa?: EnumTipoDespesa;
    DataCadastro?: Date;
    DataAlteracao?: Date;
    DataPagamento?: Date;
    DataVencimento?: Date;
    Pago?: boolean;
    DespesaAntrasada?: boolean;
  }
  
  export enum EnumTipoDespesa {
    Tipo1 = 1,
    Tipo2 = 2,
    Tipo3 = 3
  }
  