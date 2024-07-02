import { Component } from '@angular/core';
import { DefaultMedicosLayoutModule } from '../../components/default-medicos-layout/default-medicos-layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [DefaultMedicosLayoutModule, ReactiveFormsModule],
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.scss'
})
export class MedicosComponent {

  constructor(private router: Router) {}

  navigate(){
    this.router.navigate(["login"])
  }

  entrar(){
    this.router.navigate(["login"])
  }

}
