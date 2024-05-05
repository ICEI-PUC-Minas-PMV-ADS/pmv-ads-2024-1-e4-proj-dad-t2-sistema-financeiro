
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

    adicionarUsuario(email: string, senha: string, cpf: string) {
        return this.httpClient.post<any>(`${this.baseUrl}/AdicionaUsuario`, { email, senha, cpf });
      }
    
      atualizarUsuario(id: string, email: string, senha: string, cpf: string) {
        return this.httpClient.put<any>(`${this.baseUrl}/AtualizaUsuario/${id}`, { email, senha, cpf });
      }
    
      deletarUsuario(id: string) {
        return this.httpClient.delete<any>(`${this.baseUrl}/DeletaUsuario/${id}`);
      }
    
      listarUsuarios() {
        return this.httpClient.get<Array<UsuarioModel>>(`${this.baseUrl}/ListaUsuarios`);
      }

    

}