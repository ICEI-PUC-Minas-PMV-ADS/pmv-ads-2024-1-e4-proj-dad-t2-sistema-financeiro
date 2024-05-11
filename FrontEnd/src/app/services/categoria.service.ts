import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { CategoriaDTO } from 'src/app/models/CategoriaDTO';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseURL = environment['endPoint'];

  async ListarCategoriasUsuario(emailUsuario: string) {
    console.log("🚀 ~ CategoriaService ~ ListarCategoriasUsuario ~ this.httpClient.get(`${this.baseURL}/categoria`).toPromise():", this.httpClient.get(`${this.baseURL}/categoria`).toPromise())
    return await this.httpClient.get(`${this.baseURL}/categoria`).toPromise();
  }

  async ObterCategoria(id: number) {
    console.log("🚀 ~ CategoriaService ~ ObterCategoria ~ this.httpClient.get(`${this.baseURL}/categoria`).toPromise():", this.httpClient.get(`${this.baseURL}/categoria`).toPromise())
    return await this.httpClient.get(`${this.baseURL}/categoria`).toPromise();
  }

  async AtualizarCategoria(id: string, categoria: CategoriaDTO) {
    
    return await this.httpClient
      .put<CategoriaDTO>(`${this.baseURL}/categoria/${id}`, categoria)
      .toPromise();
  }

  async AdicionarCategoria(categoria: CategoriaDTO) {
    return await this.httpClient
      .post<CategoriaDTO>(`${this.baseURL}/categoria`, categoria)
      .toPromise();
  } 

  async ExcluirCategoria(id: string) {
    
    return await this.httpClient
      .delete<any>(`${this.baseURL}/categoria/${id}`)
      .toPromise();
  }

  /* async AdicionarCategoria(id: number, nome: string, sistemaId: number) { 
    return await this.httpClient
      .post<any>(`${this.baseURL}/categoria`, {id, nome, sistemaId})
      .toPromise(); 
  } */

}
