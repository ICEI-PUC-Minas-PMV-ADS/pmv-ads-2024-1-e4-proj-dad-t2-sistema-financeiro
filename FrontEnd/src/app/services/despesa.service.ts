import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { DespesaDTO } from '../models/Despesa.DTO';




@Injectable({
    providedIn: 'root'
})

export class DespesaService {

    constructor( private httpClient : HttpClient)
    {
    }

    private readonly baseURL = environment["endPoint"];

    AdicionarDespesa(despesa:DespesaDTO)
    {
        return  this.httpClient.post<DespesaDTO>(`${this.baseURL}/AdicionarDespesa`,
        despesa)
    }


    ListarDespesasUsuario(emailUsuario:string)
    {
        return  this.httpClient.get(`${this.baseURL}/ListarDespesasUsuario?emailUsuario=${emailUsuario}`);       
    }


    ObterDespesa(id: number) {
        return this.httpClient.get(`${this.baseURL}/ObterDespesa?id=${id}`);
    }

    AtualizarDespesa(despesa: DespesaDTO) {
        return this.httpClient.put<DespesaDTO>(`${this.baseURL}/AtualizarDespesa`,
        despesa)
    }


    CarregaGraficos(emailUsuario:string)
    {
        return this.httpClient.get(`${this.baseURL}/CarregaGraficos?emailUsuario=${emailUsuario}`);       
    }


   
}