import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaDTO } from 'src/app/models/CategoriaDTO';
import { DespesaDTO } from 'src/app/models/Despesa.DTO';
import { SelectModel } from 'src/app/models/SelectModel';
import { SistemaFinanceiroDTO } from 'src/app/models/SistemaFinanceiroDTO';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DespesaService } from 'src/app/services/despesa.service';
import { MenuService } from 'src/app/services/menu.service';
import { SistemaService } from 'src/app/services/sistema.service';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss']
})
export class DespesaComponent {


  tipoTela: number = 1;// 1 listagem, 2 cadastro, 3 edição
  tableListDespesas: Array<DespesaDTO>;
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
    this.despesaForm.reset();
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


  ListarDespesasUsuario() {
    this.tipoTela = 1;

    this.despesaService.ListarDespesasUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<DespesaDTO>) => {

        this.tableListDespesas = response;

      }, (error) => console.error(error),
        () => { })

  }


  constructor(public menuService: MenuService, public formBuilder: FormBuilder,
    public sistemaService: SistemaService, public authService: AuthService,
    public categoriaService: CategoriaService,
    public despesaService: DespesaService) {
  }

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();


  listCategorias = new Array<SelectModel>();
  categoriaSelect = new SelectModel();

  color = 'accent';
  checked = false;
  disabled = false;

  despesaForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 4;

    this.configpag();
    this.ListarDespesasUsuario();

    this.despesaForm = this.formBuilder.group
      (
        {
          name: ['', [Validators.required]],
          valor: ['', [Validators.required]],
          data: ['', [Validators.required]],
          sistemaSelect: ['', [Validators.required]],
          categoriaSelect: ['', [Validators.required]],
        }
      )


    this.ListarCategoriasUsuario();
  }


  dadorForm() {
    return this.despesaForm.controls;
  }

  enviar() {

    var dados = this.dadorForm();

    if (this.itemEdicao) {

      this.itemEdicao.Nome = dados["name"].value;
      this.itemEdicao.Valor = dados["valor"].value;
      this.itemEdicao.Pago = this.checked;
      this.itemEdicao.DataVencimento = dados["data"].value;
      this.itemEdicao.IdCategoria = parseInt(this.categoriaSelect.id);

     

      this.despesaService.AtualizarDespesa(this.itemEdicao)
        .subscribe((response: DespesaDTO) => {

          this.despesaForm.reset();
          this.ListarDespesasUsuario();

        }, (error) => console.error(error),
          () => { })

    }
    else {
      let item = new DespesaDTO();
      item.Nome = dados["name"].value;
      item.Valor = dados["valor"].value;
      item.Pago = this.checked;
      item.DataVencimento = dados["data"].value;
      item.IdCategoria = parseInt(this.categoriaSelect.id);
      item.TipoDespesa = 1;
      this.despesaService.AdicionarDespesa(item)
        .subscribe((response: DespesaDTO) => {

          this.despesaForm.reset();
          this.ListarDespesasUsuario();

        }, (error) => console.error(error),
          () => { })
    }
  }


  handleChangePago(item: any) {
    this.checked = item.checked as boolean;
  }



  ListarCategoriasUsuario(id: number = null) {
    this.categoriaService.ListarCategoriasUsuario(this.authService.getEmailUser())
      .subscribe((reponse: Array<CategoriaDTO>) => {

        var listaCatagorias = [];

        reponse.forEach(x => {
          var item = new SelectModel();
          item.id = x.Id.toString();
          item.name = x.Nome;
          listaCatagorias.push(item);

          if (id && id == x.Id) {
            this.categoriaSelect = item;
          }

        });

        this.listCategorias = listaCatagorias;

      }

      )
  }


  itemEdicao: DespesaDTO;

  edicao(id: number) {
    this.despesaService.ObterDespesa(id)
      .subscribe((reponse: DespesaDTO) => {

        if (reponse) {
          this.itemEdicao = reponse;
          this.tipoTela = 2;

          this.ListarCategoriasUsuario(reponse.IdCategoria);

          var dados = this.dadorForm();
          dados["name"].setValue(this.itemEdicao.Nome)

          var dateToString = reponse.DataVencimento.toString();
          var dateFull = dateToString.split('-');
          var dayFull = dateFull[2].split('T');
          var day = dayFull[0];
          var month = dateFull[1];
          var year = dateFull[0];

          var dateInput = year + '-' + month + '-' + day;

          dados["data"].setValue(dateInput);
          dados["valor"].setValue(reponse.Valor);

          this.checked = reponse.Pago;

        }

      },
        (error) => console.error(error),
        () => {

        })
  }


}