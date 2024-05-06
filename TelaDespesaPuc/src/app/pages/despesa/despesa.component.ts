// despesa.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DespesaService } from './despesa.service';
import { DespesaDTO } from './despesa.model';
import { DespesaDialogComponent } from './despesa-dialog/despesa-dialog.component';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css']
})
export class DespesaComponent implements OnInit {
  despesas: DespesaDTO[] = [];

  constructor(
    private despesaService: DespesaService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obterDespesas();
  }

  obterDespesas(): void {
    this.despesaService.obterDespesas().subscribe(despesas => {
      this.despesas = despesas;
    });
  }

  editarDespesa(despesa: DespesaDTO): void {
    const dialogRef = this.dialog.open(DespesaDialogComponent, {
      width: '400px',
      data: { despesa }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.atualizarDespesa(result);
      }
    });
  }

  excluirDespesa(id: number): void {
    this.despesaService.excluirDespesa(id).subscribe(() => {
      this.obterDespesas();
    });
  }

  navegarParaCriarDespesa(): void {
    const dialogRef = this.dialog.open(DespesaDialogComponent, {
      width: '400px',
      data: { despesa: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.criarDespesa(result);
      }
    });
  }

  criarDespesa(despesa: DespesaDTO): void {
    this.despesaService.criarDespesa(despesa).subscribe(() => {
      this.obterDespesas();
    });
  }

  atualizarDespesa(despesa: DespesaDTO): void {
    this.despesaService.atualizarDespesa(despesa).subscribe(() => {
      this.obterDespesas();
    });
  }
}
