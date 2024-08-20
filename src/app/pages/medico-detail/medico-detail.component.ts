import { Component } from '@angular/core';
import { DefaultMedicoDetailLayoutModule } from '../../components/default-medico-detail-layout/default-medico-detail-layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico-detail',
  standalone: true,
  imports: [DefaultMedicoDetailLayoutModule, ReactiveFormsModule],
  templateUrl: './medico-detail.component.html',
  styleUrl: './medico-detail.component.scss'
})
export class MedicoDetailComponent {

  constructor(private router: Router) {}

  navigate(){
    this.router.navigate(["login"])
  }

  navigate_medico(){
    window.location.reload();
  }

  entrar(){
    this.router.navigate(["login"])
  }

}
