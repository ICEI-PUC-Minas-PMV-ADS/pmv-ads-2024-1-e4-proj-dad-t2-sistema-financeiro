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
  private userId: string | null = null;
  constructor(private http: HttpClient, private router: Router) { }

  setToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }
  getToken(): string | null {
    return this.authToken || localStorage.getItem('authToken');
  }

  setUserId(id: string): void {
    this.userId = id;
    localStorage.setItem('userId', id);
  }
  
  getUserId(): string | null {
    return this.userId || localStorage.getItem('userId');
  }

  login(email: string, senha: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.loginUrl, { email, senha }, { observe: 'response' })
      .pipe(
        tap(response => {
          if (response.status === 200) {
            const token = response.body.token;
            const userId = response.body.userId;
            this.setToken(token);
            this.setUserId(userId);
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
    localStorage.removeItem('userId');
    this.authToken = null;
    this.userId = null;
    this.logged = false;
    this.router.navigate(['/login']);
  }

  loginStatus(): boolean {
    return this.logged;
  }
}