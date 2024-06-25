import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultServicosLayoutComponent } from './default-servicos-layout.component';

@NgModule({
  declarations: [
    DefaultServicosLayoutComponent
  ],
  imports: [
    CommonModule
    // Importe outros módulos necessários, se houver
  ],
  exports: [
    DefaultServicosLayoutComponent
  ]
})
export class DefaultServicosLayoutModule { }
