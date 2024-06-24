import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultProfileLayoutComponent } from './default-profile-layout.component';

@NgModule({
  declarations: [
    DefaultProfileLayoutComponent
  ],
  imports: [
    CommonModule
    // Importe outros módulos necessários, se houver
  ],
  exports: [
    DefaultProfileLayoutComponent
  ]
})
export class DefaultProfileLayoutModule { }
