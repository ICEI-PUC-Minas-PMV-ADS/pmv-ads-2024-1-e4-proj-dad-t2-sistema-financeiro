import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { UsuarioComponent } from './usuario.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule(
    {
        providers: [],
        declarations: [UsuarioComponent],
        imports: [
            CommonModule,
            UsuarioRoutingModule,
            NavbarModule,
            SidebarModule,
            ReactiveFormsModule,

            NgxPaginationModule,
            FormsModule,
            NgSelectModule,
            MatIconModule,
            MatSlideToggleModule
            
        ]
    }
)

export class UsuarioModule { }