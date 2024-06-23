import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'https://apigateway.criadoresdesoftware.com.br:5000/categoria';

  constructor(private http: HttpClient, private loginService: LoginService) { }

  private async getHeaders(): Promise<HttpHeaders> {
    try {
      const token = await this.loginService.getToken();
      

      let headers = new HttpHeaders();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    } catch (error) {
      console.error("Erro ao obter cabeçalhos:", error);
      throw error;
    }
  }

  async getCategorias(): Promise<any> {
    try {
      const headers = await this.getHeaders();
      return this.http.get(this.apiUrl, { headers }).toPromise();
    } catch (error) {
      console.error("Erro ao obter categorias:", error);
      throw error;
    }
  }

  async getCategoria(id: string): Promise<any> {
    try {
      const headers = await this.getHeaders();
      return this.http.get(`${this.apiUrl}/${id}`, { headers }).toPromise();
    } catch (error) {
      console.error("Erro ao obter categoria:", error);
      throw error;
    }
  }

  async createCategoria(categoria: string): Promise<any> {
    try {
      const headers = await this.getHeaders();
      return this.http.post(this.apiUrl, categoria, { headers }).toPromise();
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      throw error;
    }
  }

  async updateCategoria(id: string, nome: string): Promise<any> {
    try {
      const headers = await this.getHeaders();
      const body = {
        id: id,
        nome: nome
      };
      return this.http.put(`${this.apiUrl}/${id}`, body, { headers }).toPromise();
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      throw error;
    }
  }

  async deleteCategoria(id: string): Promise<any> {
    try {
      const headers = await this.getHeaders();
      return this.http.delete(`${this.apiUrl}/${id}`, { headers }).toPromise();
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      throw error;
    }
  }
}