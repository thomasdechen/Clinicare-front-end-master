import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultInicioLayoutModule } from '../../components/default-inicio-layout/default-inicio-layout.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [DefaultInicioLayoutModule,
  ReactiveFormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

  constructor(private router: Router) {}

  navigate(){
    this.router.navigate(["login"])
  }

  entrar(){
    this.router.navigate(["login"])
  }


}
