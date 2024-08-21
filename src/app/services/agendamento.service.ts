import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento } from '../models/agendamento';
import { map, toArray, mergeMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private baseUrl = 'http://localhost:8080/agendamento';  
  private baseUrl2 = 'http://localhost:8080/disponibilidade'; 

  private availableDatesSubject = new BehaviorSubject<Set<string>>(new Set());
  availableDates$ = this.availableDatesSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAvailableTimes(medicoId: string, dia: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl2}/medico/${medicoId}/dia/${dia}`);
  }

  getAvailableDates(medicoId: string): Observable<Set<string>> {
    return this.http.get<string[]>(`${this.baseUrl2}/medico/${medicoId}/dias`).pipe(
      map(dias => new Set(dias)),
      tap(availableDates => this.availableDatesSubject.next(availableDates))
    );
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

  getHorariosDisponiveis(medicoId: string, data: string, horariosOcupados: string[]): Observable<string[]> {
    // Buscar a lista de horários disponíveis para o médico naquela data
    return this.http.get<string[]>(`${this.baseUrl2}/medico/${medicoId}/dia/${data}`)
      .pipe(
        map(horarios => horarios.filter(horario => !horariosOcupados.includes(horario)))
      );
  }

  getAgendamentosDoPaciente(pacienteId: string): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.baseUrl}/paciente/${pacienteId}`);
  }
  
  getAgendamentosDoMedico(medicoId: string): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.baseUrl}/medico/${medicoId}`);
  }
  
  getAgendamentosDosMedicosDoSecretario(secretarioId: string): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.baseUrl}/secretario/${secretarioId}`);
  }

  cancelarAgendamento(agendamentoId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/cancelar/${agendamentoId}`, {});
  }

}
