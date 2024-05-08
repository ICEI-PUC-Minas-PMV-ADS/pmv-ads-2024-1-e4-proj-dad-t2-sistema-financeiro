import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { DespesaComponent } from './despesa.component';
import { DespesaRoutingModule } from './despesa-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';

@NgModule(
    {
        providers: [],
        declarations: [DespesaComponent],
        imports: [
            CommonModule,
            DespesaRoutingModule,
            NavbarModule,
            SidebarModule,

            FormsModule,
            ReactiveFormsModule,
            NgSelectModule,
            MatSlideToggleModule,
            NgxPaginationModule,
            MatIconModule
        ]
    }
)

export class DespesaModule { }