import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { SistemaFinanceiroDTO } from '../models/SistemaFinanceiroDTO';


@Injectable({
    providedIn: 'root'
})

export class SistemaService {
    private apiUrl = 'https://localhost:7154/api/sistema-financeiro';

    constructor(private http: HttpClient) {}

    private readonly baseURL = environment["endPoint"];

    AdicionarSistemaFinanceiro(sistemaFinanceiro: SistemaFinanceiroDTO) {
        return this.http.post<SistemaFinanceiroDTO>(`${this.baseURL}/sistema-financeiro`,sistemaFinanceiro)
    }
   
    ListaSistemasUsuario(emailUsuario: string) {
        return this.http.get(`${this.baseURL}/sistema-financeiro`);
    }

    DeletarSistemaFinanceiro(id:any, nome:any, mes:any, ano:any, diaFechamento:any) {
        return this.http.delete<any>(`${this.baseURL}/sistema-financeiro/${id}`).toPromise();
    }

    CadastrarUsuarioNoSistema(idSistema: number, emailUsuario: string) {
        return this.http.post<any>(`${this.baseURL}/usuario-sistema-financeiro/cadastrar-usuario-sistema?idSistema=${idSistema}&emailUsuario=${emailUsuario}`, null)
    }

    ExecuteCopiaDespesasSistemafinanceiro() {
        return this.http.post<any>(`${this.baseURL}/ExecuteCopiaDespesasSistemafinanceiro`, null)
    }


    ObterSistemaFinanceiro(id: number) {
        return this.http.get(`${this.baseURL}/sistema-financeiro/obter-sistema-financeiro?id=${id}`);
    }

    AtualizarSistemaFinanceiro(sistemaFinanceiro: SistemaFinanceiroDTO) {
        return this.http.put<SistemaFinanceiroDTO>(`${this.baseURL}/sistema-financeiro/atualizar-sistema-financeiro`,
            sistemaFinanceiro)
    }



}
