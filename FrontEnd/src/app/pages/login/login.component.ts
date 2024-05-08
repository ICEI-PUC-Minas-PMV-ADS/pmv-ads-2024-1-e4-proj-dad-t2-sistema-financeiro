import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    public authService: AuthService) {

  }

  loginForm: FormGroup;

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group
      (
        {
          email: ['', [Validators.required, Validators.email]],
          senha: ['', [Validators.required]]
        }
      )
  }


  get dadosForm() {
    return this, this.loginForm.controls;
  }


  async loginUser() {
    console.log("cheguei aqui")
  
    try {
      const token = await this.loginService.login(this.dadosForm["email"].value, this.dadosForm["senha"].value);
      this.authService.setToken(token);
      this.authService.setEmailUser(this.dadosForm["email"].value);
      this.authService.UsuarioAutenticado(true);
      await this.router.navigate(['/dashboard']);
    } catch (err) {
      alert('Ocorreu um erro');
    }
  }


}
