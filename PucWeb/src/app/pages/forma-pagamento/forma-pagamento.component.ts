import { Component, OnInit } from '@angular/core';
import { FormaPagamentoService } from '../../service/forma-pagamento.service';
import { FormaPagamento } from '../../models/formaPagamento';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.scss'],
})
export class FormaPagamentoComponent implements OnInit {
  pagamento: FormaPagamento[] = [];
  pagamentoSelecionado: any;
  visualizarFormulario: boolean = true;
  adicionarAtualizar: boolean = true;

  constructor(private formaPagamentoService: FormaPagamentoService) {}

  async ngOnInit() {
    await this.getFormasPagamento();
  }

  async getFormasPagamento() {
    try {
      this.pagamento = await this.formaPagamentoService.getFormasPagamento();
    } catch (error) {
      console.error('Erro ao obter formas de pagamento:', error);
    }
  }

  telaInicial() {
    this.visualizarFormulario = !this.visualizarFormulario;
  }

  telaAdicionarPagamento() {
    this.adicionarAtualizar = true;
    this.visualizarFormulario = !this.visualizarFormulario;

    this.pagamentoSelecionado = {
      nome: '',
      descricao: '',
    };
  }

  telaAlterarPagamento(pagamento: FormaPagamento) {
    this.adicionarAtualizar = false;
    this.visualizarFormulario = !this.visualizarFormulario;

    this.pagamentoSelecionado = { ...pagamento };
  }

  async criarOuAtualizarPagamento(form: NgForm) {
    if (this.validateForm(form)) {
      alert('Preencha todos dados CORRETAMENTE!');
    } else {
      try {
        if (this.adicionarAtualizar) {
          await this.formaPagamentoService.createFormaPagamento(form.value);
        } else {
          await this.formaPagamentoService.updateFormaPagamento(
            this.pagamentoSelecionado.id,
            form.value.nome,
            form.value.descricao
          );
        }
        await this.getFormasPagamento();
        this.visualizarFormulario = !this.visualizarFormulario;
      } catch (error) {
        console.error('Erro ao criar ou atualizar forma de pagamento:', error);
      }
    }
  }

  async deletarPagamento(pagamento: FormaPagamento) {
    try {
      await this.formaPagamentoService.deleteFormaPagamento(pagamento.id);
      await this.getFormasPagamento();
    } catch (error) {
      console.error('Erro ao deletar forma de pagamento:', error);
    }
  }

  validateForm(form: NgForm) {
    return (
      form.value.nome == '' ||
      form.value.nome == null ||
      form.value.nome == undefined ||
      form.value.descricao == '' ||
      form.value.descricao == null ||
      form.value.descricao == undefined
    );
  }
}