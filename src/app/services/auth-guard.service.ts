import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private toastr: ToastrService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = sessionStorage.getItem('auth-token');

    if (authToken) {
      if (state.url === '/login' || state.url === '/signup') {
        this.router.navigate(['/profile']);
        return false;
      }
      return true;
    } else {
      if (state.url === '/login' || state.url === '/signup') {
        return true;
      }
      // Usuário não logado, redirecionar para a página de login
      this.router.navigate(['/login']);
      this.toastr.warning('Por favor, faça login para acessar esta página.', 'Acesso Restrito');
      return false;
    }
  }
}
