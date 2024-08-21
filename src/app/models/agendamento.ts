export interface Agendamento {
    id?: number;
    idMedico: number;
    idPaciente: number;
    dia: string;
    hora: string;
    status: string;
    local: string;
    especialidadeMedico: string;
    preco: number;
    medicoTelefone: string;
    medicoNome: string;
    pacienteNome: string;
    pacienteTelefone: string;
  }

  