export interface Disponibilidade {
  id: number;
  medicoId: number;
  dia: string;
  horaInicio: string;
  horaFim: string;
  disponivel: boolean;
}
