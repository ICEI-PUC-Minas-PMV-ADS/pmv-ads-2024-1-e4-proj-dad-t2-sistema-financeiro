import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service'; 
@Injectable({
  providedIn: 'root'
})
export class DespesaService {
  private apiUrl = 'https://apigateway.criadoresdesoftware.com.br:5000/despesa'; 

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

  async getDespesas(): Promise<any> {
    try {
      const headers = await this.getHeaders();
      const data = await this.http.get(this.apiUrl, { headers }).toPromise();
      return data;
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  }

  async getDespesa(id: string): Promise<any> {
    try {
      const headers = await this.getHeaders();
      return await this.http.get(`${this.apiUrl}/${id}`, { headers }).toPromise();
    } catch (error) {
      console.error('Erro ao obter despesa:', error);
      throw error;
    }
  }

  async createDespesa(despesa: any): Promise<any> {
    try {
      despesa.statusPago = JSON.parse(despesa.statusPago.toLowerCase());
      const headers = await this.getHeaders();
      return await this.http.post(this.apiUrl, despesa, { headers }).toPromise();
    } catch (error) {
      console.error('Erro ao criar despesa:', error);
      throw error;
    }
  }
  
  async updateDespesa(despesa: any): Promise<any> {
    try {
      despesa.statusPago = JSON.parse(despesa.statusPago);
      const body = {
        id: despesa.id,
        nome: despesa.nome,
        valor: despesa.valor,
        dataCompra: despesa.dataCompra,
        dataVencimento: despesa.dataVencimento,
        statusPago: despesa.statusPago,
        formaPagamentoId: despesa.formaPagamentoId,
        categoriaId: despesa.categoriaId
      };
      const headers = await this.getHeaders();
      return await this.http.put(`${this.apiUrl}/${despesa.id}`, body, { headers }).toPromise();
    } catch (error) {
      console.error('Erro ao atualizar despesa:', error);
      throw error;
    }
  }

  async deleteDespesa(id: string): Promise<any> {
    try {
      const headers = await this.getHeaders();
      return await this.http.delete(`${this.apiUrl}/${id}`, { headers }).toPromise();
    } catch (error) {
      console.error('Erro ao deletar despesa:', error);
      throw error;
    }
  }
}