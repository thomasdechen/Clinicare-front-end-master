import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadeService {
  

  private baseUrl = 'http://localhost:8080/disponibilidade';

  constructor(private http: HttpClient) { }

  getAvailableDates(medicoId: string): Observable<Set<string>> {
    return this.http.get<Set<string>>(`${this.baseUrl}/medico/${medicoId}/dias`);
  }

  getAvailableTimes(medicoId: string, dia: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/medico/${medicoId}/dia/${dia}`);
  }

  atualizarDisponibilidade(medicoId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/atualizar/${medicoId}`, {});
  }

  agendarConsulta(agendamentoData: any): Observable<any> {
    return this.http.post('http://localhost:8080/agendamentos', agendamentoData);
  }

  
}
