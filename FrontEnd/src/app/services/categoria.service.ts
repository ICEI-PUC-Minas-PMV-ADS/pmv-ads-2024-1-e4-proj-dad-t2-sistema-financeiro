import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { CategoriaDTO } from 'src/app/models/CategoriaDTO';


@Injectable({
    providedIn: 'root'
})

export class CategoriaService {

    constructor( private httpClient : HttpClient)
    {
    }

    private readonly baseURL = environment["endPoint"];

    AdicionarCategoria(categoria:CategoriaDTO)
    {
        return  this.httpClient.post<CategoriaDTO>(`${this.baseURL}/AdicionarCategoria`,
        categoria)
    }

    ListarCategoriasUsuario(emailUsuario:string)
    {
        return  this.httpClient.get(`${this.baseURL}/ListarCategoriasUsuario?emailUsuario=${emailUsuario}`);       
    }

    ObterCategoria(id: number) {
        return this.httpClient.get(`${this.baseURL}/ObterCategoria?id=${id}`);
    }

    AtualizarCategoria(categoria: CategoriaDTO) {
        return this.httpClient.put<CategoriaDTO>(`${this.baseURL}/AtualizarCategoria`,
        categoria)
    }


   
}