import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultInicioLayoutComponent } from './default-inicio-layout.component';

@NgModule({
  declarations: [
    DefaultInicioLayoutComponent
  ],
  imports: [
    CommonModule
    // Importe outros módulos necessários, se houver
  ],
  exports: [
    DefaultInicioLayoutComponent
  ]
})
export class DefaultInicioLayoutModule { }
