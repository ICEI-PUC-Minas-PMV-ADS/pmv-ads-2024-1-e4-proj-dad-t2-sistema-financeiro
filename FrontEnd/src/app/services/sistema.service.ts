import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { SistemaFinanceiroDTO } from '../models/SistemaFinanceiroDTO';


@Injectable({
    providedIn: 'root'
})

export class SistemaService {
    

    constructor(private httpClient: HttpClient) {}

    private readonly baseURL = environment["endPoint"];
    async AdicionarSistemaFinanceiro(sistemaFinanceiro: SistemaFinanceiroDTO) {
        return await this.httpClient
          .post<SistemaFinanceiroDTO>(`${this.baseURL}/sistema-financeiro`, sistemaFinanceiro)
          .toPromise();
      } 

      ListaSistemasUsuario(emailUsuario: string) {
        return this.httpClient.get(`${this.baseURL}/sistema-financeiro`);
    }

    DeletarSistemaFinanceiro(id:any, nome:any, mes:any, ano:any, diaFechamento:any, mesCopia:any, anoCopia:any) {
        return this.httpClient.delete<any>(`${this.baseURL}/sistema-financeiro/${id}`).toPromise();
    }

    CadastrarUsuarioNoSistema(idSistema: number, emailUsuario: string) {
        return this.httpClient.post<any>(`${this.baseURL}/usuario-sistema-financeiro/cadastrar-usuario-sistema?idSistema=${idSistema}&emailUsuario=${emailUsuario}`, null)
    }

    ExecuteCopiaDespesasSistemafinanceiro() {
        return this.httpClient.post<any>(`${this.baseURL}/ExecuteCopiaDespesasSistemafinanceiro`, null)
    }


    ObterSistemaFinanceiro(id: number) {
        return this.httpClient.get(`${this.baseURL}/sistema-financeiro/obter-sistema-financeiro?id=${id}`);
    }

    async AtualizarSistemaFinanceiro(id: any, sistemaFinanceiro: SistemaFinanceiroDTO) {
    
        return await this.httpClient
          .put<SistemaFinanceiroDTO>(`${this.baseURL}/ssitema-financeiro/${id}`, sistemaFinanceiro)
          .toPromise();
    }
}
