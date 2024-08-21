import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DefaultMedicoDetailLayoutComponent } from './default-medico-detail-layout.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { DatePipe } from '@angular/common';


registerLocaleData(localePtBr);

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
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideNativeDateAdapter(),
    DatePipe
  ]
})
export class DefaultMedicoDetailLayoutModule { }