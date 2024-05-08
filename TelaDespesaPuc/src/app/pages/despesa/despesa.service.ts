// despesa.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DespesaDTO } from './despesa.model';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {
  private apiUrl = 'https://localhost:7125/api/despesa';

  constructor(private http: HttpClient) {}

  obterDespesas(): Observable<DespesaDTO[]> {
    return this.http.get<DespesaDTO[]>(`${this.apiUrl}/lista-despesa`);
  }

  criarDespesa(despesa: DespesaDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/adicionar-despesa`, despesa);
  }

  atualizarDespesa(despesa: DespesaDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/atualizar-despesa?id=${despesa.Id}`, despesa);
  }

  excluirDespesa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-despesa?id=${id}`);
  }
}
