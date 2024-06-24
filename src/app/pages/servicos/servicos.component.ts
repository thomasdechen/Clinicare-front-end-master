import { Component } from '@angular/core';
import { DefaultServicosLayoutComponent } from '../../components/default-servicos-layout/default-servicos-layout.component';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [DefaultServicosLayoutComponent],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.scss'
})
export class ServicosComponent {

}
