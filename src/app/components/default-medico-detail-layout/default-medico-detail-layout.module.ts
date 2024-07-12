import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DefaultMedicoDetailLayoutComponent } from './default-medico-detail-layout.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [DefaultMedicoDetailLayoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatSelectModule
  ],
  exports: [
    DefaultMedicoDetailLayoutComponent
  ]
})
export class DefaultMedicoDetailLayoutModule { }
