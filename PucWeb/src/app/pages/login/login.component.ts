import { Usuario } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service'
import { UsuarioService } from '../../service/usuario.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  viewLogin: boolean = true;
  viewCriarConta: boolean = false;
  viewEsqueceuSenha: boolean = false;
  usuarios: Usuario[] = [];
  submitted = false;
  acaoAtual: string = 'login';

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
  }

  toggleView(view: string) {
    if (view === 'login') {
      this.viewLogin = true;
      this.viewCriarConta = false;
      this.viewEsqueceuSenha = false;
    } else if (view === 'criarConta') {
      this.viewLogin = false;
      this.viewCriarConta = true;
      this.viewEsqueceuSenha = false;
    } else if (view === 'esqueceuSenha') {
      this.viewLogin = false;
      this.viewCriarConta = false;
      this.viewEsqueceuSenha = true;
    }
  }

  async onSubmit(form: any) {
    try {
      if (this.acaoAtual === 'criarConta') {
        const resposta = await this.usuarioService.criarUsuario(form.value);
        alert('Conta criada com sucesso!');
        this.toggleView('login');
      } else if (this.acaoAtual === 'login') {
        const resposta = await this.loginService.login(form.value.email, form.value.senha).toPromise();
        this.submitted = true;
      }
    } catch (error) {
      alert(error);
    }
  }
}