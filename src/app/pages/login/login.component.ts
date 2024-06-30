import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { DefaultLoginLayoutModule } from '../../components/default-login-layout/default-login-layout.module';

interface LoginForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutModule,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
    const logoutMessage = sessionStorage.getItem('logout-message');
    const deleteMessage = sessionStorage.getItem('delete-message');
    if (logoutMessage) {
      this.toastService.success(logoutMessage, 'Logout');
      sessionStorage.removeItem('logout-message'); // Limpar a mensagem depois de exibir
    }

    if (deleteMessage) {
      this.toastService.success(deleteMessage, 'Delete');
      sessionStorage.removeItem('delete-message'); // Limpar a mensagem depois de exibir
    }

    const authToken = sessionStorage.getItem('auth-token');
    if (authToken) {
      // Usuário já está logado, redirecionar para a página de perfil
      this.router.navigate(['/profile']);
    }
  }

  login() {
    // Sua lógica de autenticação aqui
    const token = 'fake-jwt-token';
    sessionStorage.setItem('auth-token', token);
    this.router.navigate(['/profile']);
  }

  submit(){//subscribe pega a resposta da requisição
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
        this.toastService.success("Login feito com sucesso!");
        this.router.navigate(["/profile"]);
      },
      error: () => this.toastService.error("E-mail ou senha incorretos!")
    }) 
    
  }

  navigate(){
    this.router.navigate(["signup"])
  }

  entrar(){
    this.router.navigate(["user"])
  }

}
