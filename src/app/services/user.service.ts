import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = "http://localhost:8080/user";

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    const token = sessionStorage.getItem('auth-token');
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role'); // Adicione a recuperação do papel do usuário

    if (!token || !id || !role) {
      throw new Error('Token, ID, or Role not found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    let endpoint = '';

    // Determine qual endpoint utilizar baseado no papel do usuário
    switch (role) {
      case 'paciente':
        endpoint = `${this.apiUrl}/paciente/${id}`;
        break;
      case 'medico':
        endpoint = `${this.apiUrl}/medico/${id}`;
        break;
      case 'secretario':
        endpoint = `${this.apiUrl}/secretario/${id}`;
        break;
      default:
        // Caso o papel do usuário não seja nenhum dos esperados
        throw new Error(`Unsupported role: ${role}`);
    }

    return this.http.get<any>(endpoint, { headers });
  }

  updateUserProfile(profileData: any): Observable<any> {
    const token = sessionStorage.getItem('auth-token');
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
  
    if (!token || !id || !role) {
      throw new Error('Token, ID, or Role not found');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    let endpoint = '';
  
    switch (role) {
      case 'paciente':
        endpoint = `${this.apiUrl}/paciente/${id}`;
        break;
      case 'medico':
        endpoint = `${this.apiUrl}/medico/${id}`;
        break;
      case 'secretario':
        endpoint = `${this.apiUrl}/secretario/${id}`;
        break;
      default:
        throw new Error(`Unsupported role: ${role}`);
    }
  
    return this.http.put<any>(endpoint, profileData, { headers });
  }

  // Métodos de atualização específicos para cada tipo de usuário
  updatePacienteProfile(id: number, profileData: any): Observable<any> {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.apiUrl}/paciente/${id}`, profileData, { headers });
  }

  updateMedicoProfile(id: number, profileData: any): Observable<any> {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.apiUrl}/medico/${id}`, profileData, { headers });
  }

  updateSecretarioProfile(id: number, profileData: any): Observable<any> {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.apiUrl}/secretario/${id}`, profileData, { headers });
  }

  deleteUserProfile(): Observable<any> {
    const token = sessionStorage.getItem('auth-token');
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');

    if (!token || !id || !role) {
      throw new Error('Token, ID, or Role not found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    let endpoint = '';

    switch (role) {
      case 'paciente':
        endpoint = `${this.apiUrl}/paciente/${id}`;
        break;
      case 'medico':
        endpoint = `${this.apiUrl}/medico/${id}`;
        break;
      case 'secretario':
        endpoint = `${this.apiUrl}/secretario/${id}`;
        break;
      default:
        throw new Error(`Unsupported role: ${role}`);
    }

    return this.http.delete<any>(endpoint, { headers });
  }
}
