import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { DespesaDTO } from '../models/Despesa.DTO';

@Injectable({
    providedIn: 'root'
})

export class DespesaService {

    constructor( private httpClient : HttpClient) {}

    private readonly baseURL = environment["endPoint"];

    async ListarDespesas() {
        console.log("🚀 ~ DespesaService ~ ListarDespesas ~ ListarDespesas:")
        try {
            const response = await this.httpClient.get(`${this.baseURL}/despesa`);
            return response;
        } catch (error) {
            console.error("Erro ao listar despesas:", error);
            throw error;
        }
    }
    
    async AdicionarDespesa(despesa: DespesaDTO) {
        console.log("🚀 ~ DespesaService ~ AdicionarDespesa ~ despesa:", despesa)
        try {
            const response = await this.httpClient.post(`${this.baseURL}/despesa`, despesa);
            console.log("🚀 ~ DespesaService ~ AdicionarDespesa ~ response:", response)
            return response;
        } catch (error) {
            console.error("Erro ao adicionar despesa:", error);
            throw error;
        }
    }
    
    async ProcurarDespesa(id: number) {
        console.log("🚀 ~ DespesaService ~ ProcurarDespesa ~ ProcurarDespesa:")
        try {
            const response = await this.httpClient.get(`${this.baseURL}/despesa`);
            return response;
        } catch (error) {
            console.error("Erro ao procurar despesa:", error);
            throw error;
        }
    }
    
    async AtualizarDespesa(despesa: any) {
        console.log("🚀 ~ DespesaService ~ AtualizarDespesa ~ AtualizarDespesa:")
        try {
            const response = await this.httpClient.put(`${this.baseURL}/despesa`, despesa);
            return response;
        } catch (error) {
            console.error("Erro ao atualizar despesa:", error);
            throw error;
        }
    }
    
    async DeletarDespesa(id: string) {
        console.log("🚀 ~ DespesaService ~ DeletarDespesa ~ DeletarDespesa:")
        try {
            const response = await this.httpClient.delete(`${this.baseURL}/despesa/${id}`);
            return response;
        } catch (error) {
            console.error("Erro ao deletar despesa:", error);
            throw error;
        }
    }

    async BuscarCategoria() {
    console.log("🚀 ~ DespesaService ~ BuscarCategoria ~ BuscarCategoria:")
        try {
            const response = await this.httpClient.get(`${this.baseURL}/categoria`);
            return response;
        } catch (error) {
            console.error("Erro ao deletar despesa:", error);
            throw error;
        }
    }
    
    async CarregaGraficos(emailUsuario: string) {
        console.log("🚀 ~ DespesaService ~ CarregaGraficos ~ CarregaGraficos:")
        try {
            const response = await this.httpClient.get(`${this.baseURL}/CarregaGraficos?emailUsuario=${emailUsuario}`);
            return response;
        } catch (error) {
            console.error("Erro ao carregar gráficos:", error);
            throw error;
        }
    }
}