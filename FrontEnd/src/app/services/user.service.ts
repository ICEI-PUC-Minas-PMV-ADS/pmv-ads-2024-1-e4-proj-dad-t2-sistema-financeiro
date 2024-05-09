import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { UsuarioModel } from '../models/UsuarioModel';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private httpClient: HttpClient) {
    }

    private readonly baseUrl = environment["endPoint"];

    async adicionarUsuario(emailUsuario: string) {
        return await this.httpClient.post<any>(`${this.baseUrl}/usuario-sistema-financeiro`, { emailUsuario }).toPromise();
    }
  
    async atualizarUsuario(id: string, emailUsuario: string, administrador: boolean ,sistemaAtual: boolean ,sistemaId: string ) {
      console.log("chegueiiii")
      console.log(id, "\n\n", emailUsuario)
      return await this.httpClient.put<any>(`${this.baseUrl}/usuario-sistema-financeiro/${id}`, { id, emailUsuario, administrador, sistemaAtual, sistemaId }).toPromise();
    }
  
    async deletarUsuario(id: string) {
      return await this.httpClient.delete<any>(`${this.baseUrl}/usuario-sistema-financeiro/${id}`).toPromise();
    }
  
    async listarUsuarios() {
      return await this.httpClient.get<Array<UsuarioModel>>(`${this.baseUrl}/usuario-sistema-financeiro`).toPromise();
    }

}