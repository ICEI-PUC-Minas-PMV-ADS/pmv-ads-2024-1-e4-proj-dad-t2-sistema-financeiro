import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DespesasComponent } from './pages/despesas/despesas.component';
import { LoginComponent } from './pages/login/login.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { FormaPagamentoComponent } from './pages/forma-pagamento/forma-pagamento.component';
import { Erro404Component } from './pages/erro404/erro404.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AuthGuard } from './service/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'despesa', component: DespesasComponent, canActivate: [AuthGuard] },
  { path: 'categoria', component: CategoriaComponent, canActivate: [AuthGuard] },
  { path: 'forma-pagamento', component: FormaPagamentoComponent, canActivate: [AuthGuard] },
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: '**', component: Erro404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }