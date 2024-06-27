import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultServicosLayoutComponent } from './default-servicos-layout.component';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    DefaultServicosLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DefaultServicosLayoutComponent
  ]
})
export class DefaultServicosLayoutModule { }
