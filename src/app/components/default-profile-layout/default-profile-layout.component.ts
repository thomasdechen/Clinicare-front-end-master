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
  showBloodType: boolean = false; // Flag para mostrar ou ocultar o tipo sanguíneo
  showEspecialidade: boolean = false; // Flag para mostrar ou ocultar a especialidade
  buttonLabel: string = 'Meus Agendamentos'; // Texto do botão para agendamentos ou compromissos

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
        this.updateProfileView();
      },
      (error) => {
        console.error('Erro ao buscar perfil do usuário:', error);
        // Lógica de tratamento de erro, se necessário
      }
    );
  }

  updateProfileView() {
    if (this.userProfile.role === 'paciente') {
      this.showBloodType = true;
      this.buttonLabel = 'Meus Agendamentos';
    } else if (this.userProfile.role === 'medico') {
      this.showBloodType = false;
      this.showEspecialidade = true;
      this.buttonLabel = 'Meus Compromissos';
    } else if (this.userProfile.role === 'secretario') {
      this.showBloodType = false;
      this.showEspecialidade = false;
      this.buttonLabel = 'Meus Compromissos';
    }
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
        case 'medico':
        case 'secretario':
          this.userService.deleteUserProfile().subscribe(
            () => {
              this.delete();
            },
            (error) => {
              console.error(`Erro ao deletar conta de ${this.userProfile.role}:`, error);
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
