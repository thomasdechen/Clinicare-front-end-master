import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Importar o ToastrService

@Component({
  selector: 'app-default-profile-layout',
  templateUrl: './default-profile-layout.component.html',
  styleUrls: ['./default-profile-layout.component.scss'],
  standalone: true
})
export class DefaultProfileLayoutComponent {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() disablePrimaryBtn: boolean = true;
  @Output() onSave = new EventEmitter<void>();
  @Output() onNavigate = new EventEmitter<void>();

  constructor(private toastr: ToastrService) {}

  saveProfile() {
    this.onSave.emit();
  }

  logout() {
    
    sessionStorage.setItem('logout-message', 'Logout realizado com sucesso!');

    // Limpar a session storage
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');

    window.location.href = '/login';
  }
}