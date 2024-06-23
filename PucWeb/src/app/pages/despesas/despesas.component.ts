import { Component, OnInit } from '@angular/core';
import { Despesa } from '../../models/despesa';
import { TabelaDespesa } from '../../models/tabelaDespesa';
import { Categoria } from '../../models/categoria';
import { FormaPagamento } from '../../models/formaPagamento';
import { DespesaService } from '../../service/despesa.service';
import { CategoriaService } from '../../service/categoria.service';
import { FormaPagamentoService } from '../../service/forma-pagamento.service';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss'],
})
export class DespesasComponent implements OnInit {
  tabelaDespesa: TabelaDespesa[] = [];
  despesas: Despesa[] = [];
  despesaSelecionada: any;
  visualizarFormulario: boolean = true;
  adicionarAtualizar: boolean = true;
  categoria: Categoria[] = [];
  formaPagamento: FormaPagamento[] = [];

  constructor(
    private despesaService: DespesaService,
    private categoriaService: CategoriaService,
    private formaPagamentoService: FormaPagamentoService
  ) {}

  async ngOnInit() {
    await this.buscarDados();
  }

  async buscarDados() {
    try {
      this.categoria = await this.categoriaService.getCategorias();
      this.formaPagamento = await this.formaPagamentoService.getFormasPagamento();
      this.despesas = await this.despesaService.getDespesas();
      this.tabelaDespesa = this.despesas.map((despesa, index) => {
        const categoriaCorrespondente = this.categoria.find((categoria) => categoria.id === despesa.categoriaId);
        const formaPagamentoCorrespondente = this.formaPagamento.find((formaPagamento) => formaPagamento.id === despesa.formaPagamentoId);

        return {
          ...despesa,
          nomeCategoria: categoriaCorrespondente ? categoriaCorrespondente.nome : null,
          nomeFormaPagamento: formaPagamentoCorrespondente ? formaPagamentoCorrespondente.nome : null,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  formatDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }

  telaInicial() {
    this.visualizarFormulario = !this.visualizarFormulario;
  }

  telaAdicionarDespesa() {
    this.adicionarAtualizar = true;
    this.visualizarFormulario = !this.visualizarFormulario;
    this.despesaSelecionada = {
      id: '',
      valor: '',
      dataCompra: '',
      dataVencimento: '',
      statusPagamento: '',
      nomeCategoria: '',
      iconeCategoria: '',
      nomeFormaPagamento: '',
      statusPago: '',
    };
  }

  telaAlterarDespesa(despesa: Despesa) {
    this.adicionarAtualizar = false;
    this.visualizarFormulario = !this.visualizarFormulario;
    this.despesaSelecionada = { ...despesa };
    this.despesaSelecionada.dataCompra = this.formatDate(this.despesaSelecionada.dataCompra);
    this.despesaSelecionada.dataVencimento = this.formatDate(this.despesaSelecionada.dataVencimento);
  }

  async criarDespesa(form: NgForm) {
    const novaDespesa = await this.despesaService.createDespesa(form);

    this.tabelaDespesa.push(novaDespesa);
    this.visualizarFormulario = !this.visualizarFormulario;
    await this.buscarDados();
  }

  async atualizarDespesa(form: NgForm) {
    const despesaAtualizada = await this.despesaService.updateDespesa(form);

    const index = this.tabelaDespesa.findIndex((despesa) => despesa.id === this.despesaSelecionada.id);
    if (index !== -1) {
      this.tabelaDespesa[index] = despesaAtualizada;
    }
    this.visualizarFormulario = !this.visualizarFormulario;
    await this.buscarDados();
  }

  async deletarDespesa(itemDELETE: TabelaDespesa) {
    const index = this.tabelaDespesa.indexOf(itemDELETE);
    if (index > -1) {
      await this.despesaService.deleteDespesa(itemDELETE.id.toString());
      this.tabelaDespesa.splice(index, 1);
      await this.buscarDados();
    }
  }
}