import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  private apiUrl: string = 'http://localhost:8080/servico';

  constructor(private http: HttpClient) { }

  buscarServicos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/servico`);
  }

  criarServico(servicoRequest: any) {
    // Aqui você obtém o ID do médico do sessionStorage
    const medicoId = sessionStorage.getItem('id');

    // Inclui o medicoId no corpo da requisição
    servicoRequest.medicoId = medicoId;
    return this.http.post<any>(`${this.apiUrl}/criar`, servicoRequest);
  }

  buscarServicosPorMedicoId(medicoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/servico/medico/${medicoId}/servicos`);
}

  atualizarServico(servicoId: number, servicoData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/atualizar/${servicoId}`, servicoData);
  }

  excluirServico(servicoId: number): Observable<any> {
    // Exemplo de método para excluir um serviço
    return this.http.delete<any>(`${this.apiUrl}/deletar/${servicoId}`);
    
  }
}
