import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  private apiUrl: string = 'http://localhost:8080/avaliacao';

  constructor(private http: HttpClient) { }

  criarAvaliacao(avaliacaoRequest: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/criar`, avaliacaoRequest);
  }

  buscarAvaliacoesPorMedicoId(medicoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/medico/${medicoId}`);
  }

  

  verificarAvaliacaoExistente(idPaciente: string, idMedico: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verificar/${idPaciente}/${idMedico}`);
  }

  
}