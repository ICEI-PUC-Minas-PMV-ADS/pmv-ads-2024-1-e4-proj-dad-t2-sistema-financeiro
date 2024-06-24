import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormaPagamento } from '../models/formaPagamento';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {
  private apiUrl = 'https://apigateway.criadoresdesoftware.com.br:5000/forma-pagamento';

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

  async getFormasPagamento(): Promise<any> {
    try {
      const headers = await this.getHeaders();
      return await this.http.get(this.apiUrl, { headers }).toPromise();
    } catch (error) {
      console.error('Erro ao obter formas de pagamento:', error);
      throw error;
    }
  }

  async getFormaPagamento(id: string): Promise<any> {
    try {
      const headers = await this.getHeaders();
      return await this.http.get(`${this.apiUrl}/${id}`, { headers }).toPromise();
    } catch (error) {
      console.error('Erro ao obter forma de pagamento:', error);
      throw error;
    }
  }

  async createFormaPagamento(formaPagamento: FormaPagamento): Promise<any> {
    try {
      const headers = await this.getHeaders();
      return await this.http.post(this.apiUrl, formaPagamento, { headers }).toPromise();
    } catch (error) {
      console.error('Erro ao criar forma de pagamento:', error);
      throw error;
    }
  }

  async updateFormaPagamento(id: string, nome: string, descricao: string): Promise<any> {
    try {
      const body = {
        id: id,
        nome: nome,
        descricao: descricao
      };
      const headers = await this.getHeaders();
      return await this.http.put(`${this.apiUrl}/${id}`, body, { headers }).toPromise();
    } catch (error) {
      console.error('Erro ao atualizar forma de pagamento:', error);
      throw error;
    }
  }

  async deleteFormaPagamento(id: string): Promise<any> {
    try {
      const headers = await this.getHeaders();
      return await this.http.delete(`${this.apiUrl}/${id}`, { headers }).toPromise();
    } catch (error) {
      console.error('Erro ao deletar forma de pagamento:', error);
      throw error;
    }
  }
}