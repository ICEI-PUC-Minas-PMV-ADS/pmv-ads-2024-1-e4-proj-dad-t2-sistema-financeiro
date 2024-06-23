import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Controle de Despesas';
  logged: boolean = false;
  token: string | null = null;
  auth: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.onRouteChange();
    });
  }

  ngOnInit(): void {
    this.updateAuthStatus();
  }

  onRouteChange() {
    this.updateAuthStatus();
  }
  
  logout() {
    this.loginService.logout();
    this.updateAuthStatus(); 
  }
  private updateAuthStatus() {
    this.logged = this.loginService.loginStatus();
    this.token = this.loginService.getToken();
    this.auth = !!this.token;
  }
}