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
    if (!token || !id) {
      throw new Error('Token or ID not found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/profile/${id}`, { headers });
  }

  updateUserProfile(profileData: any): Observable<any> {
    const token = sessionStorage.getItem('auth-token');
    const id = sessionStorage.getItem('id');
    if (!token || !id) {
      throw new Error('Token or ID not found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.apiUrl}/profile/${id}`, profileData, { headers });
  }
}
