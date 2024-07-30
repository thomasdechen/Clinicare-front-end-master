import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultProfileLayoutComponent } from './default-profile-layout.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    DefaultProfileLayoutComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [
    DefaultProfileLayoutComponent
  ]
})
export class DefaultProfileLayoutModule { }
