import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DefaultMedicoDetailLayoutComponent } from './default-medico-detail-layout.component';



@NgModule({
  declarations: [DefaultMedicoDetailLayoutComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DefaultMedicoDetailLayoutComponent
  ]
})
export class DefaultMedicoDetailLayoutModule { }
