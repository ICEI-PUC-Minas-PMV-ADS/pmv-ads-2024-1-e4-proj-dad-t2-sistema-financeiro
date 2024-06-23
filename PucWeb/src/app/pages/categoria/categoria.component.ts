import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../service/categoria.service';
import { Categoria } from '../../models/categoria';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriaSelecionada: any;
  visualizarFormulario: boolean = true;
  adicionarAtualizar: boolean = true;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.getCategorias();
  }

  async getCategorias() {
    try {
      this.categorias = await this.categoriaService.getCategorias();
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  }

  telaInicial() {
    this.visualizarFormulario = !this.visualizarFormulario;
  }

  telaAdicionarCategoria() {
    this.adicionarAtualizar = true;
    this.visualizarFormulario = !this.visualizarFormulario;

    this.categoriaSelecionada = {};
  }

  telaAlterarCategoria(categoria: Categoria) {
    this.adicionarAtualizar = false;
    this.visualizarFormulario = !this.visualizarFormulario;

    this.categoriaSelecionada = { ...categoria };
  }

  async criarOuAtualizarCategoria(form: NgForm) {
    if (this.validateForm(form)) {
      alert('Preencha todos dados CORRETAMENTE!');
    } else {
      try {
        const categoria = this.adicionarAtualizar
          ? await this.categoriaService.createCategoria(form.value)
          : await this.categoriaService.updateCategoria(this.categoriaSelecionada.id, form.value.nome);

        if (this.adicionarAtualizar) {
          this.categorias.push(categoria);
        } else {
          const index = this.categorias.findIndex(c => c.id === this.categoriaSelecionada.id);
          if (index !== -1) {
            this.categorias[index] = categoria;
          }
        }
        this.visualizarFormulario = !this.visualizarFormulario;
        await this.getCategorias();
      } catch (error) {
        console.error("Erro ao criar ou atualizar categoria:", error);
      }
    }
  }

  async deletarCategoria(categoria: Categoria) {
    try {
      await this.categoriaService.deleteCategoria(categoria.id);
      const index = this.categorias.indexOf(categoria);
      if (index > -1) {
        this.categorias.splice(index, 1);
      }
      await this.getCategorias();
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
    }
  }

  validateForm(form: NgForm) {
    return (
      form.value.nome == '' ||
      form.value.nome == null ||
      form.value.nome == undefined
    );
  }
}