import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLoginLayoutComponent } from './default-login-layout.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DefaultLoginLayoutComponent
  ],
  imports: [
    CommonModule
    // Importe outros módulos necessários, se houver
  ],
  exports: [
    DefaultLoginLayoutComponent
  ]
})
export class DefaultLoginLayoutModule { }
