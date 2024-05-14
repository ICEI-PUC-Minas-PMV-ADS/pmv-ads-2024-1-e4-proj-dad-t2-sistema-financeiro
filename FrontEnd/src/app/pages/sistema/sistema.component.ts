
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemaFinanceiroDTO } from 'src/app/models/SistemaFinanceiroDTO';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { SistemaService } from 'src/app/services/sistema.service';

import { UsuarioSistemaFinanceiro } from 'src/app/services/usuario-sistema.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent {

  tipoTela: number = 1;// 1 listagem, 2 cadastro, 3 edição
  tableListSistemas: Array<SistemaFinanceiroDTO>;
  id?: any;
  nome?:any;
  mes?:any;
  ano?:any;
  diaFechamento?:any;
  mesCopia?:any;
  anoCopia?:any;


  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10


  tableListUsuariosistema: Array<any>;
  id2: string;
  page2: number = 1;
  config2: any;
  paginacao2: boolean = true;
  itemsPorPagina2: number = 10


  configpag() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina

    };



    this.id2 = this.gerarIdParaConfigDePaginacao();

    this.config2 = {
      id: this.id2,
      currentPage: this.page2,
      itemsPerPage: this.itemsPorPagina2

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
    this.sistemaForm.reset();
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

  mudarItemsPorPage2() {
    this.page2 = 1
    this.config2.currentPage = this.page2;
    this.config2.itemsPerPage = this.itemsPorPagina2;
  }

  mudarPage2(event: any) {
    this.page2 = event;
    this.config2.currentPage = this.page2;
  }


  ListaSistemasUsuario() {
    this.itemEdicao = null;
    this.tipoTela = 1;
    console.log("🚀 ~ SistemaComponent ~ ListaSistemasUsuario ~ this.tipoTela:", this.tipoTela)

    this.sistemaService.ListaSistemasUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<SistemaFinanceiroDTO>) => {

        this.tableListSistemas = response;

      }, (error) => console.error(error),
        () => { })

  }

  constructor(public menuService: MenuService, public formBuilder: FormBuilder,
    public sistemaService: SistemaService, public authService: AuthService,
    public usuarioSistemaFinanceiro: UsuarioSistemaFinanceiro) {
  }

  sistemaForm: FormGroup;
  checked = false;
  gerarCopiaDespesa = 'accent';
  disabled = false;

  ngOnInit() {
    this.menuService.menuSelecionado = 2;

    this.configpag();
    this.ListaSistemasUsuario();

    this.sistemaForm = this.formBuilder.group
      (
        {
          name: ['', [Validators.required]],
          mes: ['', [Validators.required]],
          ano: ['', [Validators.required]],
          diaFechamento: ['', [Validators.required]],
          mesCopia: ['', [Validators.required]],
          anoCopia: ['', [Validators.required]],
        }
      )
  }


  dadorForm() {
    return this.sistemaForm.controls;
  }

  async enviar() {
    try {
      var dados = this.dadorForm();
      if (this.itemEdicao) {
        this.itemEdicao.nome = dados["name"].value;
        this.itemEdicao.mes = dados["mes"].value;
        this.itemEdicao.ano = dados["ano"].value;
        this.itemEdicao.diaFechamento = dados["diaFechamento"].value;
        this.itemEdicao.mesCopia = dados["mesCopia"].value;
        this.itemEdicao.anoCopia = dados["anoCopia"].value;


        const response: SistemaFinanceiroDTO = await this.sistemaService.AtualizarSistemaFinanceiro(this.itemEdicao.id,this.itemEdicao);
        this.sistemaForm.reset();
        await this.ListaSistemasUsuario();
      } else {
        let item = new SistemaFinanceiroDTO();
        item.nome = dados["name"].value;
        item.mes = dados["mes"].value;
        item.ano = dados["ano"].value;
        item.diaFechamento = dados["diaFechamento"].value;
        item.mesCopia = dados["mesCopia"].value;
        item.anoCopia = dados["anoCopia"].value;
       

        const response: SistemaFinanceiroDTO = await this.sistemaService.AdicionarSistemaFinanceiro(item);
        this.sistemaForm.reset();
        await this.ListaSistemasUsuario();
      }
    } catch (error) {
      console.error(error);
    }
  }

  itemEdicao: SistemaFinanceiroDTO;

  edicao(id: number) {
    this.sistemaService.ObterSistemaFinanceiro(id)
      .subscribe((reponse: SistemaFinanceiroDTO) => {

        if (reponse) {
          this.itemEdicao = reponse;
          this.tipoTela = 2;

          var dados = this.dadorForm();
          
          dados["name"].setValue(this.itemEdicao.nome);
          dados["mes"].setValue(this.itemEdicao.mes);
          dados["ano"].setValue(this.itemEdicao.ano);
          dados["diaFechamento"].setValue(this.itemEdicao.diaFechamento);
          this.checked = this.itemEdicao.gerarCopiaDespesa;
          dados["mesCopia"].setValue(this.itemEdicao.mesCopia);
          dados["anoCopia"].setValue(this.itemEdicao.anoCopia);

          this.ListarUsuariosSistema();

        }

      },
        (error) => console.error(error),
        () => {

        })
        
  }

  handleChangePago(item: any) {
    this.checked = item.checked as boolean;
  }



  emailUsuarioSistema: string = "";
  emailUsuarioSistemaValid: boolean = true;
  textValid: string = "Campo Obrigatório!";

  ListarUsuariosSistema() {
    this.usuarioSistemaFinanceiro.ListarUsuariosSistema(this.itemEdicao.id)
      .subscribe((response: Array<any>) => {
        this.tableListUsuariosistema = response
      })
  }

  
  async delete(item: SistemaFinanceiroDTO) {

    console.log("delete")

    this.itemEdicao = item;
    this.tipoTela = 2;
    console.log("🚀 ~ UsuarioComponent ~ edicao ~ this.tipoTela:", this.tipoTela)

    var dados = this.dadorForm();
    dados["name"].setValue(this.itemEdicao.nome);
    dados["mes"].setValue(this.itemEdicao.mes);
    dados["ano"].setValue(this.itemEdicao.ano);
    dados["diaFechamento"].setValue(this.itemEdicao.diaFechamento);
    this.checked = this.itemEdicao.gerarCopiaDespesa;
    dados["mesCopia"].setValue(this.itemEdicao.mesCopia);
    dados["anoCopia"].setValue(this.itemEdicao.anoCopia);
   

    try {
       this.sistemaService.DeletarSistemaFinanceiro(this.itemEdicao.id,this.itemEdicao.nome,this.itemEdicao.ano,this.itemEdicao.mes,this.itemEdicao.diaFechamento,this.itemEdicao.mesCopia,this.itemEdicao.anoCopia) 
      // console.log("🚀 ~ UsuarioComponent ~ enviar ~ response:", response)
      // this.UsuarioForm.reset();
      // await this.ListaUsuariosUsuario();
    } catch (error) {
      console.error(error);
    }
  }



  addUsuarioSistema() {
    this.emailUsuarioSistemaValid = true;

    if (!this.itemEdicao) {
      alert("É necessário cadastrar um sistema antes de adicionar um usuário.");
      return;
    }

    if (!this.emailUsuarioSistema) {
      this.emailUsuarioSistemaValid = false;
    }
    else {
      this.sistemaService.CadastrarUsuarioNoSistema(this.itemEdicao.id, this.emailUsuarioSistema)
        .subscribe((response: any) => {
          if (response) {
            this.edicao(this.itemEdicao.id);
            this.emailUsuarioSistema = "";
          }
        }, (error) => console.error(error),
          () => { });
    }
  }
}
