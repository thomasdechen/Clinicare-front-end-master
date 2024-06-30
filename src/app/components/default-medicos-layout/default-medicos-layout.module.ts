import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultMedicosLayoutComponent } from './default-medicos-layout.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DefaultMedicosLayoutComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DefaultMedicosLayoutComponent
  ]
})
export class DefaultMedicosLayoutModule { }
