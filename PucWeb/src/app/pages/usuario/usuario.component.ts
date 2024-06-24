import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario = { id: '', nome: '', email: '', senha: '' };
  usuarioSelecionado: any = { id: '', nome: '', email: '', senha: '', confirmarSenha: ''};
  usuarioBackup: Usuario = { id: '', nome: '', email: '', senha: '' };
  visualizarFormulario: boolean = true;
  senhaTemp: string = '';
  confirmacaoSenhaTemp: string = '';
  idUsuario: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService,
  ) {}

  ngOnInit() {
    this.getUsuarios();
  }

  async getUsuarios() {
    try {
      this.idUsuario = this.loginService.getUserId() || '';
      this.usuario = await this.usuarioService.getUsuario(this.idUsuario);
      this.usuarioSelecionado = this.usuario;
      this.usuarioSelecionado.senha = '';
    } catch (error) {
      console.error("Erro ao obter usuários", error);
    }
  }

  telaInicial() {
    this.visualizarFormulario = !this.visualizarFormulario;
    this.usuarioSelecionado = { ...this.usuarioBackup };
  }

  telaAlterarUsuario(usuario: Usuario) {
    this.visualizarFormulario = !this.visualizarFormulario;
    this.usuarioSelecionado = { ...usuario };
    this.usuarioBackup = { ...usuario };
  }

  async atualizarUsuario(form: NgForm) {
    if (form.invalid || !this.validarSenha(form)) {
      alert('Preencha todos os dados corretamente!');
    } else {
      try {
        await this.usuarioService.updateUsuario(
          this.usuarioSelecionado.id,
          form.value.nomeUpdate,
          form.value.emailUpdate,
          form.value.senhaUpdate
        );
        this.getUsuarios();
        this.visualizarFormulario = !this.visualizarFormulario;
      } catch (error) {
        console.error("Erro ao atualizar usuário", error);
      }
    }
  }

  async confirmarExclusao(usuario: Usuario) {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      await this.deletarUsuario(usuario);
    }
  }
  
  async deletarUsuario(usuario: Usuario) {
    try {
      await this.usuarioService.deleteUsuario(usuario.id);
      this.getUsuarios();
    } catch (error) {
      console.error(`Erro ao deletar o usuário com ID ${usuario.id}`, error);
    }
  }

  validarSenha(form: NgForm): boolean {
    const senha = form.value.senhaUpdate;
    const confirmacaoSenha = form.value.confirmacaoSenha;
    if (senha !== confirmacaoSenha) {
      alert('A senha e a confirmação de senha não são iguais.');
      return false;
    }
    return true;
  }
  
}