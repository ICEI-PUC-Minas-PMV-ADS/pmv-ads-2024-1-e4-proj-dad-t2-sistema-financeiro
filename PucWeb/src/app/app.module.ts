import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { DespesasComponent } from './pages/despesas/despesas.component';
import { FormaPagamentoComponent } from './pages/forma-pagamento/forma-pagamento.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuarioService } from './service/usuario.service';
import { CategoriaService } from './service/categoria.service';
import { FormaPagamentoService } from './service/forma-pagamento.service';
import { DespesaService } from './service/despesa.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoriaComponent,
    DespesasComponent,
    FormaPagamentoComponent,
    UsuarioComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    CardModule,
    FloatLabelModule,
    CheckboxModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
  providers: [
    UsuarioService,
    CategoriaService,
    FormaPagamentoService,
    DespesaService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
