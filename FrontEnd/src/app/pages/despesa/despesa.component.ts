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
  itemsPorPagina: number = 10;
  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();
  listCategorias = new Array<SelectModel>();
  categoriaId = new SelectModel();
  color = 'accent';
  checked = false;
  disabled = false;
  despesaForm: FormGroup;

  constructor(public menuService: MenuService, public formBuilder: FormBuilder,
    public sistemaService: SistemaService, public authService: AuthService,
    public categoriaService: CategoriaService,
    public despesaService: DespesaService) {
  }

  ngOnInit() {
    this.menuService.menuSelecionado = 4;
    this.configpag();
    this.ListarDespesasUsuario();
    this.despesaForm = this.formBuilder.group
      (
        {
          id: ['', [Validators.required]],
          nome: ['', [Validators.required]],
          valor: ['', [Validators.required]],
          mes: ['', [Validators.required]],
          ano: ['', [Validators.required]],
          tipoDespesa: ['', [Validators.required]],
          dataCadastro: ['', [Validators.required]],
          dataAlteracao: ['', [Validators.required]],
          dataPagamento: ['', [Validators.required]],
          dataVencimento: ['', [Validators.required]],
          pago: ['', [Validators.required]],
          despesaAtrasada: ['', [Validators.required]],
          categoriaId: ['', [Validators.required]],
        }
      )
    // this.ListarCategoriasUsuario();
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

  async ListarDespesasUsuario() {
    this.tipoTela = 1;
    const response = await this.despesaService.ListarDespesas();
    response.subscribe((data: Array<DespesaDTO>) => {
        this.tableListDespesas = data;
    }, (error) => {
        console.error(error);
    });
}

  dadorForm() {
    return this.despesaForm.controls;
  }

  async enviar() {
    var dados = this.dadorForm();
  
    if (this.itemEdicao) {
      this.itemEdicao.nome = dados["name"].value;
      this.itemEdicao.valor = dados["valor"].value;
      this.itemEdicao.pago = this.checked;
      this.itemEdicao.dataVencimento = dados["data"].value;
      this.itemEdicao.categoriaId = this.categoriaId.id;
  
      try {
        const response = await this.despesaService.AtualizarDespesa(this.itemEdicao);
        this.despesaForm.reset();
        this.ListarDespesasUsuario();
      } catch (error) {
        console.error(error);
      }
    } else {
      let item = new DespesaDTO();

      item.nome = dados["nome"].value;
      item.valor = dados["valor"].value;
      item.mes = dados["mes"].value;
      item.ano = dados["ano"].value;
      item.tipoDespesa = dados["tipoDespesa"].value;
      item.dataCadastro = dados["dataCadastro"].value;
      item.dataAlteracao = dados["dataAlteracao"].value;
      item.dataPagamento = dados["dataPagamento"].value;
      item.dataVencimento = dados["dataVencimento"].value;
      item.pago = this.checked;
      item.despesaAtrasada = this.checked;
      item.categoriaId = dados["categoriaId"].value;
  
      try {
        const response = await this.despesaService.AdicionarDespesa(item);
        response.subscribe((data: Array<DespesaDTO>) => {
          this.despesaForm.reset();
          this.ListarDespesasUsuario();
        })
      } catch (error) {
        console.error(error);
      }
    }
  }

  handleChangePago(item: any) {
    this.checked = item.checked as boolean;
  }

  async excluir(id: string) {
    try {
      let response = await this.despesaService.DeletarDespesa(id);
      response.subscribe((data: Array<DespesaDTO>) => {
        this.ListarDespesasUsuario();
      })
      console.log("🚀 ~ DespesaComponent ~ excluir ~ response:", response)
    } catch (error) {
      console.error(error);
    }
  }

  // BuscarCategoria() {
  //   this.categoriaService.ListarCategoriasUsuario()
  //     .subscribe((reponse: Array<CategoriaDTO>) => {

  //       var listaCatagorias = [];

  //       reponse.forEach(x => {
  //         var item = new SelectModel();
  //         item.id = x.id.toString();
  //         item.name = x.nome;
  //         listaCatagorias.push(item);

  //         if (id && id == x.id) {
  //           this.categoriaId = item;
  //         }

  //       });

  //       this.listCategorias = listaCatagorias;

  //     }

  //     )
  // }

  itemEdicao: DespesaDTO;

  async editar(valoresDespesa: any) {
    console.log("🚀 ~ DespesaComponent ~ editar ~ valoresDespesa:", valoresDespesa)
    this.tipoTela = 2;

    this.despesaForm.get('nome').setValue(valoresDespesa.nome);
    this.despesaForm.get('valor').setValue(valoresDespesa.valor);
    this.despesaForm.get('mes').setValue(valoresDespesa.mes);
    this.despesaForm.get('ano').setValue(valoresDespesa.ano);
    this.despesaForm.get('tipoDespesa').setValue(valoresDespesa.tipoDespesa);
    this.despesaForm.get('dataCadastro').setValue(valoresDespesa.dataCadastro);
    this.despesaForm.get('dataPagamento').setValue(valoresDespesa.dataPagamento);
    this.despesaForm.get('dataVencimento').setValue(valoresDespesa.dataVencimento);

    try {
      const response = await this.despesaService.AtualizarDespesa(valoresDespesa);
      response.subscribe((data: Array<DespesaDTO>) => {
        this.tableListDespesas = data;
       }, (error) => {
           console.error(error);
       });  
    } catch (error) {
      console.error(error);
    }
  }
}