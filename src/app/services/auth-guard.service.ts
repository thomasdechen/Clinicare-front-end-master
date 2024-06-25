import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = sessionStorage.getItem('auth-token');

    if (authToken) {
      if (state.url === '/login') {
        this.router.navigate(['/profile']);
        return false;
      }
      if (state.url === '/signup') {
        this.router.navigate(['/profile']);
        return false;
      }
      return true;
    } else {
      if (state.url === '/login') {
        return true;
      }
      if (state.url === '/signup') {
        return true;
      }
      // Usuário não logado, redirecionar para a página de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
