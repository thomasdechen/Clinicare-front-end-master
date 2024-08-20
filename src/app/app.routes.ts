import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './services/auth-guard.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { Profile2Component } from './pages/profile2/profile2.component';
import { ServicosComponent } from './pages/servicos/servicos.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MedicosComponent } from './pages/medicos/medicos.component';
import { MedicoDetailComponent } from './pages/medico-detail/medico-detail.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "signup",
        component: SignupComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "user",
        component: UserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "profile2",
        component: Profile2Component,
        canActivate: [AuthGuard]
    },
    {
        path: "servicos",
        component: ServicosComponent
    },
    {
        path: "inicio",
        component: InicioComponent
    },
    {
        path: "medicos",
        component: MedicosComponent
    },
    {
        path: "medico-detail/:id",
        component: MedicoDetailComponent,
        canActivate: [AuthGuard]
    }
];
