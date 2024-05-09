import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { SistemaFinanceiroDTO } from '../models/SistemaFinanceiroDTO';

@Injectable({
    providedIn: 'root'
})


export class UsuarioSistemaFinanceiro
{

    constructor(private httpClient: HttpClient)
    {}

    private readonly baseURL = environment["endPoint"];

    CadastrarUsuarioNoSistema(idSistema:number,emailUsuario:string) {
        return this.httpClient.post<SistemaFinanceiroDTO>(`${this.baseURL}/usuario-sistema-financeiro/cadastrar-usuario-sistema?idSistema${idSistema}&emailUsuario=${emailUsuario}`,
            null)
    }

    ListarUsuariosSistema(idSistema: number) {
        return this.httpClient.get(`${this.baseURL}/usuario-sistema-financeiro/listar-usuarios-sistema?idSistema=${idSistema}`);
    }

    DeleteUsuarioSistemaFinanceiro(id: number) {
        return this.httpClient.delete(`${this.baseURL}/usuario-sistema-financeiro/delete-usuario-sistema-financeiro?id=${id}`);
    }


}