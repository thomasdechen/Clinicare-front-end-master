import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento } from '../models/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private baseUrl = 'http://localhost:8080/agendamento';  
  private baseUrl2 = 'http://localhost:8080/disponibilidade'; 

  constructor(private http: HttpClient) { }

  getAvailableDates(medicoId: string): Observable<Set<string>> {
    return this.http.get<Set<string>>(`${this.baseUrl2}/medico/${medicoId}/dias`);
  }

  getAvailableTimes(medicoId: string, dia: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl2}/medico/${medicoId}/dia/${dia}`);
  }

  agendarConsulta(agendamentoData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/criar`, agendamentoData);
  }

  criarAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(`${this.baseUrl}/criar`, agendamento);
  }

  getAgendamentosDoMedicoPorData(medicoId: string, data: string): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.baseUrl}/medico/${medicoId}/data/${data}`);
  }
}
