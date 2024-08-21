import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Medico {
  id: string;
  name: string;
  email: string;
  gender: string;
  datanasc: string;
  foto: string;
  telefone: string;
  crm: string;
  endereco: string;
  especialidade: string;
  avaliacoes: number[];
}

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }

  buscarMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.apiUrl}/medico`)
      .pipe(
        catchError(this.handleError)
      );
  }

  buscarMedicoPorId(id: string): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}/medico/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      // Erro do lado do servidor
      console.error(
        `Código do erro ${error.status}, ` +
        `Erro: ${error.error}`);
    }
    return throwError('Ocorreu um erro, tente novamente mais tarde.');
  }
}