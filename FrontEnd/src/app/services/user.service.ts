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

    async adicionarUsuario(email: string, senha: string, cpf: string) {
        return await this.httpClient.post<any>(`${this.baseUrl}/usuario-sistema-financeiro`, { email, senha, cpf }).toPromise();
    }
  
    async atualizarUsuario(id: string, email: string, senha: string, cpf: string) {
      return await this.httpClient.put<any>(`${this.baseUrl}/usuario-sistema-financeiro/${id}`, { email, senha, cpf }).toPromise();
    }
  
    async deletarUsuario(id: string) {
      return await this.httpClient.delete<any>(`${this.baseUrl}/usuario-sistema-financeiro/${id}`).toPromise();
    }
  
    async listarUsuarios() {
      return await this.httpClient.get<Array<UsuarioModel>>(`${this.baseUrl}/usuario-sistema-financeiro`).toPromise();
    }

}