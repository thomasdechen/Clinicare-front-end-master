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
    PrimaryInputComponent,
    DefaultProfileLayoutComponent
  ]
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
      password: new FormControl(''),
      role: new FormControl(''),
      gender: new FormControl('')
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
          gender: profile.gender
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
    this.userService.updateUserProfile(profileData).subscribe({
      next: () => {
        this.toastService.success('Perfil atualizado com sucesso!');
      },
      error: () => {
        this.toastService.error('Erro ao atualizar perfil');
      }
    });
  }

  navigateToHome(): void {
    // Implementar a navegação para outra página (por exemplo, página inicial)
  }

  logout(): void {
    // Limpar session storage
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');

    // Redirecionar para a página de login
    this.router.navigate(['/login']);
  }
}
