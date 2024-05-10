

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/UsuarioModel';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-Usuario',
  templateUrl: './Usuario.component.html',
  styleUrls: ['./Usuario.component.scss']
})
export class UsuarioComponent {

  tipoTela: number = 1;// 1 listagem, 2 cadastro, 3 edição
  tableListUsuarios: Array<UsuarioModel>;
  id: string;

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10



  configpag() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina

    };

  }

  gerarIdParaConfigDePaginacao() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  cadastro() {
    this.tipoTela = 2;
    this.UsuarioForm.reset();
  }

  mudarItemsPorPage() {
    this.page = 1
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.itemsPorPagina;
  }

  mudarPage(event: any) {
    this.page = event;
    this.config.currentPage = this.page;
  }

 

  async ListaUsuariosUsuario() {
    this.itemEdicao = null;
    this.tipoTela = 1;

    try {
      this.tableListUsuarios = await this.userService.listarUsuarios();
    } catch (error) {
      console.error(error);
    }
  }

  constructor(public menuService: MenuService, public formBuilder: FormBuilder,
    public userService: UserService, public authService: AuthService,
  ) {
  }

  UsuarioForm: FormGroup;
  checked = false;
  gerarCopiaDespesa = 'accent';
  disabled = false;

  ngOnInit() {
    this.menuService.menuSelecionado = 5;

    this.configpag();
    this.ListaUsuariosUsuario();

    this.UsuarioForm = this.formBuilder.group
      (
        {
          Email: ['', [Validators.required]],
          CPF: ['', [Validators.required]],
          Senha: ['', [Validators.required]],
        }
      )
  }


  dadorForm() {
    return this.UsuarioForm.controls;
  }

  async enviar() {
    var dados = this.dadorForm();
    console.log("🚀 ~ UsuarioComponent ~ enviar ~ dados:", dados)

    if (this.itemEdicao) {
    console.log("🚀 ~ UsuarioComponent ~ enviar ~ this.itemEdicao:", this.itemEdicao)

      this.itemEdicao.emailUsuario = dados["Email"].value;

      this.itemEdicao.id=  "663c2c811568c405de64c649";
      this.itemEdicao.emailUsuario=  "663c2c811568c405de64c649";
      this.itemEdicao.administrador=  true;
      this.itemEdicao.sistemaAtual=  true;
      this.itemEdicao.sistemaId= "663c2c811568c405de64c649" ;
      
      
      try {
        let response = await this.userService.atualizarUsuario(this.itemEdicao.id,this.itemEdicao.emailUsuario,this.itemEdicao.administrador,this.itemEdicao.sistemaAtual,this.itemEdicao.sistemaId);
        this.UsuarioForm.reset();
        await this.ListaUsuariosUsuario();
      } catch (error) {
        console.error(error);
      }

    } else {

      let item = new UsuarioModel();
      console.log("🚀 ~ UsuarioComponent ~ enviar ~ item:", item)
      item.sistemaId = "";
      item.emailUsuario = dados["Email"].value;
      console.log(item.emailUsuario)
    
      try {
        let response = await this.userService.adicionarUsuario(item.emailUsuario);
        console.log("🚀 ~ UsuarioComponent ~ enviar ~ response:", response)
        this.UsuarioForm.reset();
        await this.ListaUsuariosUsuario();
      } catch (error) {
        console.error(error);
      }

    }

  }

  itemEdicao: UsuarioModel;

  async edicao(item: UsuarioModel) {

    this.itemEdicao = item;
    this.tipoTela = 2;
    console.log("🚀 ~ UsuarioComponent ~ edicao ~ this.tipoTela:", this.tipoTela)

    var dados = this.dadorForm();
    dados["Email"].setValue(this.itemEdicao.emailUsuario);
    dados["Senha"].setValue(1234);

    item.id=  "663c2c811568c405de64c649";
    item.emailUsuario=  "663c2c811568c405de64c649";
    item.administrador=  true;
    item.sistemaAtual=  true;
    item.sistemaId= "663c2c811568c405de64c649" ;

    console.log("editar:  ", item)

    try {
      let response = await this.userService.atualizarUsuario(item.id,item.emailUsuario,item.administrador,item.sistemaAtual,item.sistemaId);
      // console.log("🚀 ~ UsuarioComponent ~ enviar ~ response:", response)
      // this.UsuarioForm.reset();
      // await this.ListaUsuariosUsuario();
    } catch (error) {
      console.error(error);
    }
  }

  handleChangePago(item: any) {
    this.checked = item.checked as boolean;
  }


  emailUsuarioUsuario: string = "";
  emailUsuarioUsuarioValid: boolean = true;
  textValid: string = "Campo Obrigatório!";


  async excluir(id: string) {
    try {
      let reponse = await this.userService.deletarUsuario(id);
      console.log("🚀 ~ UsuarioComponent ~ excluir ~ reponse:", reponse)

      if (reponse) {
        this.edicao(this.itemEdicao)
        this.emailUsuarioUsuario = "";
      }
    } catch (error) {
      console.error(error);
    }
  }

  async delete(item: UsuarioModel) {

    console.log("delete")

    this.itemEdicao = item;
    this.tipoTela = 2;
    console.log("🚀 ~ UsuarioComponent ~ edicao ~ this.tipoTela:", this.tipoTela)

    var dados = this.dadorForm();
    dados["Email"].setValue(this.itemEdicao.emailUsuario);
    dados["Senha"].setValue(1234);

    try {
      let response = await this.userService.deletarUsuario(item.id);
      // console.log("🚀 ~ UsuarioComponent ~ enviar ~ response:", response)
      // this.UsuarioForm.reset();
      // await this.ListaUsuariosUsuario();
    } catch (error) {
      console.error(error);
    }
  }
}
