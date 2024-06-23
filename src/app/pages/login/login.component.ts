import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface LoginForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
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
    if (logoutMessage) {
      this.toastService.success(logoutMessage, 'Logout');
      sessionStorage.removeItem('logout-message'); // Limpar a mensagem depois de exibir
    }
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
