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
  tipoTela: number = 1; // 1 listagem, 2 cadastro, 3 edição
  tableListCategoria: Array<CategoriaDTO>;
  id: string;
  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;
  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();
  categoriaForm: FormGroup;
  itemEdicao: CategoriaDTO;

  constructor(public menuService: MenuService, public formBuilder: FormBuilder,
    public sistemaService: SistemaService, public authService: AuthService,
    public categoriaService: CategoriaService) {
  }

  ngOnInit() {
    this.menuService.menuSelecionado = 3;
    this.configpag();
    this.ListarCategoriasUsuario();
    this.categoriaForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      sistemaSelect: ['', Validators.required]
    });
    this.ListaSistemasUsuario();
  }

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
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  mudarItemsPorPage() {
    this.page = 1;
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.itemsPorPagina;
  }

  mudarPage(event: any) {
    this.page = event;
    this.config.currentPage = this.page;
  }

  cadastro() {
    this.tipoTela = 2;
    this.categoriaForm.reset();
  }

  ListaSistemasUsuario(id: number = null) {
    this.sistemaService.ListaSistemasUsuario(this.authService.getEmailUser())
      .subscribe((reponse: Array<SistemaFinanceiroDTO>) => {
        var lisSistemaFinanceiro = [];
        reponse.forEach(x => {
          var item = new SelectModel();
          item.id = x.id.toString();
          item.name = x.nome;
          lisSistemaFinanceiro.push(item);
          if (id && id == x.id) {
            this.sistemaSelect = item;
          }
        });
        this.listSistemas = lisSistemaFinanceiro;
      })
  }

  dadorForm() {
    return this.categoriaForm.controls;
  }

  async ListarCategoriasUsuario() {
    try {
      this.tipoTela = 1;
      const response: any = await this.categoriaService.ListarCategoriasUsuario();
      this.tableListCategoria = response;
      console.log("🚀 ~ CategoriaComponent ~ ListarCategoriasUsuario ~ this.tableListCategoria:", this.tableListCategoria)
    } catch (error) {
      console.error(error);
    }
  }

  async enviar() {
    try {
      var dados = this.dadorForm();
      if (this.itemEdicao) {
        this.itemEdicao.nome = dados["name"].value;
        this.itemEdicao.sistemaId = parseInt(this.sistemaSelect.id)
        // const response: CategoriaDTO = await this.categoriaService.AtualizarCategoria(this.itemEdicao);
        this.categoriaForm.reset();
        await this.ListarCategoriasUsuario();
      } else {
        let item = new CategoriaDTO();
        item.nome = dados["name"].value;
        item.id = 0;
        item.sistemaId = parseInt(this.sistemaSelect.id)
        //const response: CategoriaDTO = await this.categoriaService.AdicionarCategoria(item);
        this.categoriaForm.reset();
        await this.ListarCategoriasUsuario();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async edicao(id: number) {
    try {
      const reponse: any = await this.categoriaService.ObterCategoria(id);
      if (reponse) {
        this.itemEdicao = reponse;
        this.tipoTela = 2;
        var sistema = reponse;
        var dados = this.dadorForm();
        dados["name"].setValue(this.itemEdicao.nome)
        this.ListaSistemasUsuario(reponse.IdSistema)
      }
    } catch (error) {
      console.error(error);
    }
  }
}
