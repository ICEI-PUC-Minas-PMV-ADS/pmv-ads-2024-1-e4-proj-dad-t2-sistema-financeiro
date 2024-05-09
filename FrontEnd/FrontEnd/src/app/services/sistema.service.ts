import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { SistemaFinanceiroDTO } from '../models/SistemaFinanceiroDTO';


@Injectable({
    providedIn: 'root'
})

export class SistemaService {

    constructor(private httpClient: HttpClient) {
    }

    private readonly baseURL = environment["endPoint"];

    AdicionarSistemaFinanceiro(sistemaFinanceiro: SistemaFinanceiroDTO) {
        console.log("teste");
        console.log(sistemaFinanceiro);
        console.log(this.httpClient.post<SistemaFinanceiroDTO>(`${this.baseURL}/sistema-financeiro`,sistemaFinanceiro))
        return this.httpClient.post<SistemaFinanceiroDTO>(`${this.baseURL}/sistema-financeiro`,sistemaFinanceiro)
    }

    ListaSistemasUsuario(emailUsuario: string) {
        return this.httpClient.get(`${this.baseURL}/sistema-financeiro`);
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

    AtualizarSistemaFinanceiro(sistemaFinanceiro: SistemaFinanceiroDTO) {
        return this.httpClient.put<SistemaFinanceiroDTO>(`${this.baseURL}/sistema-financeiro/atualizar-sistema-financeiro`,
            sistemaFinanceiro)
    }



}