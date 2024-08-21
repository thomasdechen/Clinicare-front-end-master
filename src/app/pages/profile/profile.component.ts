import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { UserService } from '../../services/user.service';
import { LoginResponse } from '../../types/login-response';
import { DefaultProfileLayoutComponent } from '../../components/default-profile-layout/default-profile-layout.component';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { DefaultProfileLayoutModule } from '../../components/default-profile-layout/default-profile-layout.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
    NgxMaskDirective,
    NgxMaskPipe,
    PrimaryInputComponent,
    DefaultProfileLayoutModule
  ],
  providers: [provideNgxMask()]
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  loggedInUser: LoginResponse | null = null;

  constructor(
    private userService: UserService,
    private toastService: ToastrService,
    private router: Router
  ) {
    this.profileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
      role: new FormControl(''),
      gender: new FormControl(''),
      cpf: new FormControl('', [Validators.pattern(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/)]),
      telefone: new FormControl(''),
      datanasc: new FormControl(''),
      sangue: new FormControl(''),
      foto: new FormControl(''),
      crm: new FormControl(''),
      endereco: new FormControl(''),
      especialidade: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (profile) => {
        this.loggedInUser = profile;
        this.profileForm.patchValue({
          name: profile.name,
          email: profile.email,
          role: profile.role,
          gender: profile.gender,
          cpf: profile.cpf,  
          telefone: profile.telefone,
          datanasc: profile.datanasc,
          sangue: profile.sangue,
          foto: profile.foto,
          crm: profile.crm,
          endereco: profile.endereco,
          especialidade: profile.especialidade 
        });
      },
      error: (err) => {
        this.toastService.error('Erro ao carregar perfil');
      }
    });
  }
  
  

  updateProfile(): void {
    const profileData = this.profileForm.value;
    if (!profileData.password) {
      delete profileData.password;
    }
    
    const oldEmail = this.loggedInUser?.email;
    
    this.userService.updateUserProfile(profileData).subscribe({
      next: (updatedUser) => {
        this.toastService.success('Perfil atualizado com sucesso!');
        
        if (oldEmail !== updatedUser.email) {
          this.handleEmailChange(updatedUser.email);
        } 
        else {
          setTimeout(() => {
            window.location.reload();
            
          }, 1000);
          
        }
      },
      error: () => {
        this.toastService.error('Erro ao atualizar perfil, digite a senha corretamente!');
      }
      
    });
    
  }
  
  handleEmailChange(newEmail: string): void {
    this.logout_email();
    
    this.toastService.info('E-mail alterado. Por favor, faça login novamente.');
    
  }

  navigateToHome(): void {
    // Implementar a navegação para outra página (por exemplo, página inicial)
  }

  logout(): void {
    // Limpar session storage
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('role');

    // Armazenar a mensagem de logout na sessionStorage
    sessionStorage.setItem('logout-message', 'Logout realizado com sucesso!');

    // Redirecionar para a página de login
    this.router.navigate(['/login']);
  }

  logout_email(): void {
    // Limpar session storage
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('role');

    // Redirecionar para a página de login
    this.router.navigate(['/login']);
  }

  navigate(): void {
    this.router.navigate(["signup"]);
  }
}