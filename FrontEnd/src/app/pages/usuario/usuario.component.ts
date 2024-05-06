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

 

  ListaUsuariosUsuario() {
    this.itemEdicao = null;
    this.tipoTela = 1;

    this.userService.listarUsuarios()
      .subscribe((response: Array<UsuarioModel>) => {
        this.tableListUsuarios = response;
      }, (error) => console.error(error),
        () => { })

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

  enviar() {
    debugger
    var dados = this.dadorForm();

    if (this.itemEdicao) {

      this.itemEdicao.CPF = dados["CPF"].value;
      this.itemEdicao.Email = dados["Email"].value;
      this.itemEdicao.Senha = dados["Senha"].value;
      
      this.userService.atualizarUsuario(this.itemEdicao.UserId,this.itemEdicao.Email,"",this.itemEdicao.CPF)
        .subscribe((response: UsuarioModel) => {

          this.UsuarioForm.reset();
          this.ListaUsuariosUsuario();

        }, (error) => console.error(error),
          () => { })


    }
    else {

      let item = new UsuarioModel();
      item.UserId = "";
      item.Email = dados["Email"].value;
      item.Senha = dados["Senha"].value;
      item.CPF = dados["CPF"].value;
    
      this.userService.adicionarUsuario(item.Email,item.Senha,item.CPF)
        .subscribe((response: UsuarioModel) => {

          this.UsuarioForm.reset();
              this.ListaUsuariosUsuario();        

        }, (error) => console.error(error),
          () => { })

    }

  }

  itemEdicao: UsuarioModel;

  edicao(item: UsuarioModel) {

    this.itemEdicao = item;
    this.tipoTela = 2;

    var dados = this.dadorForm();
    dados["CPF"].setValue(this.itemEdicao.CPF);
    dados["Email"].setValue(this.itemEdicao.Email);
    dados["Senha"].setValue(1234);
  }

  handleChangePago(item: any) {
    this.checked = item.checked as boolean;
  }


  emailUsuarioUsuario: string = "";
  emailUsuarioUsuarioValid: boolean = true;
  textValid: string = "Campo Obrigatório!";


  excluir(id: string) {
    this.userService.deletarUsuario(id)
      .subscribe((reponse: UsuarioModel) => {

        if (reponse) {
          this.edicao(this.itemEdicao)
          this.emailUsuarioUsuario = "";
        }

      },
        (error) => console.error(error),
        () => {

        })
  }


}
