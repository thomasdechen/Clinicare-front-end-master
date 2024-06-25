import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + "/login", { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("username", value.name);
        sessionStorage.setItem("id", value.id);
        sessionStorage.setItem("role", value.role);
      })
    );
  }

  signup(name: string, email: string, password: string, role: string, gender: string, codigo?: string | null): Observable<any> {
    const payload: any = { name, email, password, role, gender };
    if (codigo) {
      payload.codigo = codigo;
    }

    return this.httpClient.post<any>(this.apiUrl + "/register", payload).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("username", value.name);
        sessionStorage.setItem("id", value.id);
        sessionStorage.setItem("role", value.role);
      })
    );
  }

  getUserProfile(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + "/profile");
  }

  updateUserProfile(profileData: any): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl + "/profile", profileData);
  }
}
