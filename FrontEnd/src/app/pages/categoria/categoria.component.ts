import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaDTO } from 'src/app/models/CategoriaDTO';
import { SelectModel } from 'src/app/models/SelectModel';
import { SistemaFinanceiroDTO } from 'src/app/models/SistemaFinanceiroDTO';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MenuService } from 'src/app/services/menu.service';
import { SistemaService } from 'src/app/services/sistema.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {


  tipoTela: number = 1;// 1 listagem, 2 cadastro, 3 edição
  tableListCategoria: Array<CategoriaDTO>;
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
    this.categoriaForm.reset();
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


  ListarCategoriasUsuario() {
    this.tipoTela = 1;

    this.categoriaService.ListarCategoriasUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<CategoriaDTO>) => {

        this.tableListCategoria = response;

      }, (error) => console.error(error),
        () => { })

  }

  constructor(public menuService: MenuService, public formBuilder: FormBuilder,
    public sistemaService: SistemaService, public authService: AuthService,
    public categoriaService: CategoriaService) {
  }

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();

  categoriaForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 3;

    this.configpag();
    this.ListarCategoriasUsuario();

    this.categoriaForm = this.formBuilder.group
      (
        {
          name: ['', [Validators.required]],
          sistemaSelect: ['', Validators.required]
        }
      )

    this.ListaSistemasUsuario();
  }


  dadorForm() {
    return this.categoriaForm.controls;
  }

  enviar() {

    var dados = this.dadorForm();

    if (this.itemEdicao) {

      this.itemEdicao.Nome = dados["name"].value;
      this.itemEdicao.IdSistema = parseInt(this.sistemaSelect.id)
     

      this.categoriaService.AtualizarCategoria(this.itemEdicao)
        .subscribe((response: CategoriaDTO) => {
          this.categoriaForm.reset();
          this.ListarCategoriasUsuario();

        }, (error) => console.error(error),
          () => { })
    }
    else {

      let item = new CategoriaDTO();
      item.Nome = dados["name"].value;
      item.Id = 0;
      item.IdSistema = parseInt(this.sistemaSelect.id)

      this.categoriaService.AdicionarCategoria(item)
        .subscribe((response: CategoriaDTO) => {

          this.categoriaForm.reset();

          this.ListarCategoriasUsuario();

        }, (error) => console.error(error),
          () => { })
    }

  }


  ListaSistemasUsuario(id: number = null) {
    this.sistemaService.ListaSistemasUsuario(this.authService.getEmailUser())
      .subscribe((reponse: Array<SistemaFinanceiroDTO>) => {

        var lisSistemaFinanceiro = [];

        reponse.forEach(x => {
          var item = new SelectModel();
          item.id = x.Id.toString();
          item.name = x.Nome;
          lisSistemaFinanceiro.push(item);

          if (id && id == x.Id) {
            this.sistemaSelect = item;
          }

        });

        this.listSistemas = lisSistemaFinanceiro;

      }

      )
  }


  itemEdicao: CategoriaDTO;

  edicao(id: number) {
    this.categoriaService.ObterCategoria(id)
      .subscribe((reponse: CategoriaDTO) => {

        if (reponse) {
          this.itemEdicao = reponse;
          this.tipoTela = 2;

          var sistema = reponse;

          var dados = this.dadorForm();
          dados["name"].setValue(this.itemEdicao.Nome)
          this.ListaSistemasUsuario(reponse.IdSistema)
        }

      },
        (error) => console.error(error),
        () => {

        })
  }


}