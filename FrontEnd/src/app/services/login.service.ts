
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(private httpClient: HttpClient) {
    }

    private readonly baseUrl = environment["endPoint"];

    login(Email: string, Senha: string) {
        return this.httpClient.post<any>(`${this.baseUrl}/auth/login`, { Email: Email, Senha: Senha });
    }

}