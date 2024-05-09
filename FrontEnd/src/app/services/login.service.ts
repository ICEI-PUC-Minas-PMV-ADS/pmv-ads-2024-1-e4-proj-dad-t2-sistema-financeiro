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

    async login(Email: string, Senha: string) {
        try {
            return await this.httpClient.post<any>(`${this.baseUrl}/auth/login`, { Email: Email, Senha: Senha }).toPromise();
        } catch (error) {
            console.error(error);
        }
    }
}