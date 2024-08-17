import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultSignupLayoutComponent } from '../../components/default-signup-layout/default-signup-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  passwordConfirm: FormControl<string>;
  role: FormControl<string>;
  gender: FormControl<string>;
  codigo: FormControl<string | null>;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    DefaultSignupLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup<SignupForm>({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
      passwordConfirm: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
      role: new FormControl('paciente', { nonNullable: true, validators: [Validators.required] }),
      gender: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      codigo: new FormControl<string | null>(null)
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const passwordConfirm = group.get('passwordConfirm')?.value;
    return password === passwordConfirm ? null : { passwordMismatch: true };
  }

  submit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.toastService.error("Por favor, preencha todos os campos corretamente.");
      return;
    }
  
    const { name, email, password, role, gender, codigo } = this.signupForm.getRawValue();
    
    this.loginService.signup(name, email, password, role, gender, codigo).subscribe({
      next: () => {
        this.toastService.success("Cadastro realizado com sucesso!");
        this.router.navigate(["/login"]);
      },
      error: (error) => {
        let errorMessage = "Erro inesperado! Tente novamente mais tarde";
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.toastService.error(errorMessage);
      }
    });
  }

  navigate() {
    this.router.navigate(["/login"]);
  }

  entrar() {
    this.router.navigate(["/login"]);
  }
}
