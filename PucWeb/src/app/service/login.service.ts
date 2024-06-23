import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://apigateway.criadoresdesoftware.com.br:5000/usuario';
  private loginUrl = `${this.apiUrl}/login`;
  private logged: boolean = false;
  private authToken: string | null = null;
  private userId: string | null = null; // Adicionado para armazenar o ID do usuário

  constructor(private http: HttpClient, private router: Router) { }

  setToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }
  getToken(): string | null {
    return this.authToken || localStorage.getItem('authToken');
  }

  setUserId(id: string): void { // Método para definir o ID do usuário
    this.userId = id;
    console.log("🚀 ~ LoginService ~ setUserId ~ this.userId:", this.userId)
    localStorage.setItem('userId', id); // Armazena o ID do usuário no localStorage
  }
  
  getUserId(): string | null { // Método para obter o ID do usuário
    return this.userId || localStorage.getItem('userId');
  }

  login(email: string, senha: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.loginUrl, { email, senha }, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response.status === 200) {
            const token = response.body.token;
            console.log("🚀 ~ LoginService ~ login ~ response.body:", response.body)
            const userId = response.body.userId; // Supondo que o ID do usuário esteja na resposta
            this.setToken(token);
            this.setUserId(userId); // Define o ID do usuário
            this.logged = true;
            this.router.navigate(['/despesa']);
          }
        }),
        catchError(error => {
          let errorMessage = 'Erro desconhecido';
          if (error.status === 400) {
            if (error.error.title) {
              errorMessage = error.error.title;
              const errors = error.error.errors;
              for (const key in errors) {
                errorMessage += ` ${errors[key].join(' ')}`;
              }
            } else {
              errorMessage = error.error || 'Erro de validação';
            }
          } else if (error.status === 401) {
            errorMessage = error.error || 'Credenciais inválidas.';
          }
          return throwError(errorMessage);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId'); // Remove o ID do usuário do localStorage
    this.authToken = null;
    this.userId = null; // Limpa o ID do usuário
    this.logged = false;
    this.router.navigate(['/login']);
  }

  loginStatus(): boolean {
    return this.logged;
  }
}