import { Component } from '@angular/core';
import { DefaultMedicoDetailLayoutModule } from '../../components/default-medico-detail-layout/default-medico-detail-layout.module';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-medico-detail',
  standalone: true,
  imports: [DefaultMedicoDetailLayoutModule, ReactiveFormsModule],
  templateUrl: './medico-detail.component.html',
  styleUrl: './medico-detail.component.scss'
})
export class MedicoDetailComponent {

}
