import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario'; 
import { LoginService } from './login.service'; 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://apigateway.criadoresdesoftware.com.br:5000/usuario';

  constructor(private http: HttpClient, private loginService: LoginService) { }

  private getHeaders(): HttpHeaders {
    const token = this.loginService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  async getUsuarios(): Promise<Usuario[]> {
    try {
      const response = await this.http.get<Usuario[]>(this.apiUrl, { headers: this.getHeaders() }).toPromise();
      return response || [];
    } catch (error) {
      console.error("Erro ao obter usuários", error);
      throw error;
    }
  }
  
  async getUsuario(id: string): Promise<Usuario> {
    try {
      const response = await this.http.get<Usuario>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).toPromise();
      if (!response) {
        throw new Error(`Usuário com ID ${id} não encontrado.`);
      }
      return response;
    } catch (error) {
      console.error(`Erro ao obter o usuário com ID ${id}`, error);
      throw error;
    }
  }

  async criarUsuario(usuario: Usuario): Promise<Usuario> {
    try {
      const response = await this.http.post<Usuario>(this.apiUrl, usuario, { headers: this.getHeaders() }).toPromise();
      if (!response) {
        throw new Error('Não foi possível criar o usuário. Resposta indefinida.');
      }
      return response;
    } catch (error) {
      console.error('Erro ao criar o usuário', error);
      throw error;
    }
  }

  async updateUsuario(id: string, nome: string, email: string, senha: string): Promise<Usuario> {
    const usuario: Usuario = { id, nome, email, senha };
    try {
      const response = await this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario, { headers: this.getHeaders() }).toPromise();
      if (!response) {
        throw new Error(`Não foi possível atualizar o usuário com ID ${id}. Resposta indefinida.`);
      }
      return response;
    } catch (error) {
      console.error(`Erro ao atualizar o usuário com ID ${id}`, error);
      throw error;
    }
  }

  async deleteUsuario(id: string): Promise<any> {
    try {
      return await this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).toPromise();
    } catch (error) {
      console.error(`Erro ao deletar o usuário com ID ${id}`, error);
      throw error;
    }
  }
}