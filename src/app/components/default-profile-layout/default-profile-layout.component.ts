import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-profile-layout',
  templateUrl: './default-profile-layout.component.html',
  styleUrls: ['./default-profile-layout.component.scss']
})
export class DefaultProfileLayoutComponent implements OnInit {
  @Input() title: string = '';
  @Input() primaryBtnText: string = '';
  @Input() disablePrimaryBtn: boolean = true;
  @Output() onSave = new EventEmitter<void>();
  @Output() onNavigate = new EventEmitter<void>();
  @Output("submit") onSubmit = new EventEmitter<void>();
  @Output("entrar") onEntrar = new EventEmitter<void>();

  userProfile: any = {}; // Objeto para armazenar os dados do perfil do usuário
  isLoggedIn: boolean = false; // Flag para verificar se o usuário está logado

  constructor(private toastr: ToastrService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.fetchUserProfile();
    }
  }

  checkLoginStatus() {
    this.isLoggedIn = !!sessionStorage.getItem('auth-token');
  }

  fetchUserProfile() {
    this.userService.getUserProfile().subscribe(
      (data) => {
        this.userProfile = data;
      },
      (error) => {
        console.error('Erro ao buscar perfil do usuário:', error);
        // Lógica de tratamento de erro, se necessário
      }
    );
  }

  saveProfile() {
    this.onSave.emit();
  }

  logout() {
    sessionStorage.setItem('logout-message', 'Logout realizado com sucesso!');
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
    window.location.href = '/login';
  }

  delete() {
    sessionStorage.setItem('delete-message', 'Conta deletada com sucesso!');
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
    window.location.href = '/login';
  }

  deleteProfile() {
    if (confirm('Tem certeza que deseja deletar sua conta?')) {
      switch (this.userProfile.role) {
        case 'paciente':
          this.userService.deleteUserProfile().subscribe(
            () => {
              //this.toastr.success('Conta deletada com sucesso!');
              this.delete();
            },
            (error) => {
              console.error('Erro ao deletar conta de paciente:', error);
              this.toastr.error('Erro ao deletar conta, digite a senha antes de deletar!');
            }
          );
          break;
        case 'medico':
          this.userService.deleteUserProfile().subscribe(
            () => {
              // this.toastr.success('Conta deletada com sucesso!');
              this.delete();
            },
            (error) => {
              console.error('Erro ao deletar conta de médico:', error);
              this.toastr.error('Erro ao deletar conta, digite a senha antes de deletar!');
            }
          );
          break;
        case 'secretario':
          this.userService.deleteUserProfile().subscribe(
            () => {
              // this.toastr.success('Conta deletada com sucesso!');
              this.delete();
            },
            (error) => {
              console.error('Erro ao deletar conta de secretário:', error);
              this.toastr.error('Erro ao deletar conta, digite a senha antes de deletar!');
            }
          );
          break;
        default:
          console.error('Tipo de usuário desconhecido.');
          break;
      }
    }
  }


  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }

  entrar() {
    this.onEntrar.emit();
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
