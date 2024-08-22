import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AgendamentoService } from '../../services/agendamento.service';
import { MedicoService } from '../../services/medico.service';
import { Agendamento } from '../../models/agendamento';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-default-profile-layout',
  templateUrl: './default-profile-layout.component.html',
  styleUrls: ['./default-profile-layout.component.scss']
})
export class DefaultProfileLayoutComponent implements OnInit {
  @Input() title: string = '';
  @Input() primaryBtnText: string = '';
  @Input() disablePrimaryBtn: boolean = true;
  @Output() onSave = new EventEmitter<void>();
  @Output() onNavigate = new EventEmitter<void>();
  @Output("submit") onSubmit = new EventEmitter<void>();
  @Output("entrar") onEntrar = new EventEmitter<void>();
  @Output() onProfileUpdated = new EventEmitter<void>();

  userProfile: any = {};
  isLoggedIn: boolean = false;
  showBloodType: boolean = false;
  showEspecialidade: boolean = false;
  buttonLabel: string = 'Meus Agendamentos';

  activeSection: string = 'info';

  agendamentos: Agendamento[] = [];
  mediaAvaliacoes: number = 0;
  numAvaliacoes: number = 0;

  constructor(private toastr: ToastrService, private userService: UserService, private router: Router, private agendamentoService: AgendamentoService,
    private medicoService: MedicoService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.fetchUserProfile();
      this.fetchAgendamentos();
    }
    //this.agendamentos_reverse();
  }

  agendamentos_reverse() {
    this.agendamentos = this.agendamentos
      .map(agendamento => ({
        ...agendamento,
        status: this.checkAgendamentoStatus(agendamento)
      }))
      .reverse();
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  checkLoginStatus() {
    this.isLoggedIn = !!sessionStorage.getItem('auth-token');
  }

  fetchAgendamentos() {
    const userId = sessionStorage.getItem('id');
    const userRole = sessionStorage.getItem('role');
  
    if (userId && userRole) {
      switch (userRole) {
        case 'paciente':
          this.fetchAgendamentosDoPaciente(userId);
          break;
        case 'medico':
          this.fetchAgendamentosDoMedico(userId);
          break;
        case 'secretario':
          this.fetchAgendamentosDosMedicosDoSecretario(userId);
          break;
        default:
          console.error('Função de usuário não reconhecida');
          this.toastr.error('Função de usuário não reconhecida');
          break;
      }
    } else {
      console.error('Usuário não logado. Não é possível buscar os agendamentos.');
      this.toastr.error('Usuário não logado');
    }
  }
  

  fetchAgendamentosDoPaciente(pacienteId: string) {
    this.agendamentoService.getAgendamentosDoPaciente(pacienteId).subscribe(
      (agendamentos) => {
        this.agendamentos = agendamentos
          .map(agendamento => ({
            ...agendamento,
            dia: this.formatarData(agendamento.dia),
            status: this.checkAgendamentoStatus(agendamento)
          }))
          //.reverse();
  
        this.calcularMediaENumeroAvaliacoes(this.agendamentos);
      },
      (error) => {
        console.error('Erro ao buscar agendamentos do paciente:', error);
        this.toastr.error('Erro ao buscar agendamentos');
      }
    );
  }
  
  fetchAgendamentosDoMedico(medicoId: string) {
    this.agendamentoService.getAgendamentosDoMedico(medicoId).subscribe(
      (agendamentos) => {
        this.agendamentos = agendamentos
          .map(agendamento => ({
            ...agendamento,
            dia: this.formatarData(agendamento.dia),
            status: this.checkAgendamentoStatus(agendamento)
          }))
          .reverse();
      },
      (error) => {
        console.error('Erro ao buscar agendamentos do médico:', error);
        this.toastr.error('Erro ao buscar agendamentos');
      }
    );
  }
  
  fetchAgendamentosDosMedicosDoSecretario(secretarioId: string) {
    this.userService.getMedicoIdFromSecretario(secretarioId).subscribe(
      (medicoId) => {
        if (medicoId) {
          this.agendamentoService.getAgendamentosDosMedicosDoSecretario(medicoId.toString()).subscribe(
            (agendamentos) => {
              this.agendamentos = agendamentos
                .map(agendamento => ({
                  ...agendamento,
                  dia: this.formatarData(agendamento.dia),
                  status: this.checkAgendamentoStatus(agendamento)
                }))
                .reverse();
            },
            (error) => {
              console.error('Erro ao buscar agendamentos dos médicos do secretário:', error);
              this.toastr.error('Erro ao buscar agendamentos');
            }
          );
        } else {
          console.error('Não foi possível obter o ID do médico vinculado ao secretário.');
          this.toastr.error('Não foi possível obter o ID do médico vinculado ao secretário.');
        }
      },
      (error) => {
        console.error('Erro ao obter o ID do médico vinculado ao secretário:', error);
        this.toastr.error('Erro ao obter o ID do médico vinculado ao secretário.');
      }
    );
  }
  
  formatarData(data: string): string {
    const date = new Date(data);
    const dia = (date.getDate() + 1).toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const ano = date.getFullYear().toString();
    return `${dia}/${mes}/${ano}`;
  }



  checkAgendamentoStatus(agendamento: Agendamento): string {
    const now = new Date();
    const agendamentoDate = new Date(agendamento.dia + 'T' + agendamento.hora);

    if (agendamento.status === 'Cancelado') {
      return 'Cancelado';
    } else if (agendamentoDate < now) {
      return 'Concluído';
    } else {
      return 'Agendado';
    }
  }

  cancelarConsulta(agendamentoId: number) {
    this.agendamentoService.cancelarAgendamento(agendamentoId).subscribe();
    this.cdr.detectChanges();

    const agendamento = this.agendamentos.find(a => a.id === agendamentoId);
    if (agendamento) {
      agendamento.status = 'Cancelado';
    }
    this.toastr.success('Consulta cancelada com sucesso');

  }

  calcularMediaENumeroAvaliacoes(agendamentos: Agendamento[]) {
    let somaEstrelas = 0;
    let numAvaliacoes = 0;

    agendamentos.forEach((agendamento) => {
      this.medicoService.buscarMedicoPorId(agendamento.idMedico.toString()).subscribe(
        (medico) => {
          medico.avaliacoes.forEach((avaliacao) => {
            somaEstrelas += avaliacao;
            numAvaliacoes++;
          });
          this.mediaAvaliacoes = numAvaliacoes > 0 ? somaEstrelas / numAvaliacoes : 0;
          this.numAvaliacoes = numAvaliacoes;
        },
        (error) => {
          console.error('Erro ao buscar informações do médico:', error);
          // Lógica de tratamento de erro, se necessário
        }
      );
    });
  }

  fetchUserProfile() {
    this.userService.getUserProfile().subscribe(
      (data) => {
        this.userProfile = data;
        this.updateProfileView();
      },
      (error) => {
        console.error('Erro ao buscar perfil do usuário:', error);
        // Lógica de tratamento de erro, se necessário
      }
    );
  }

  updateProfileView() {
    if (this.userProfile.role === 'paciente') {
      this.showBloodType = true;
      this.buttonLabel = 'Meus Agendamentos';
    } else if (this.userProfile.role === 'medico') {
      this.showBloodType = false;
      this.showEspecialidade = true;
      this.buttonLabel = 'Meus Compromissos';
    } else if (this.userProfile.role === 'secretario') {
      this.showBloodType = false;
      this.showEspecialidade = false;
      this.buttonLabel = 'Meus Compromissos';
    }
  }

  saveProfile() {
    this.fetchUserProfile();
    this.onSave.emit();
    this.fetchUserProfile();
    this.fetchUserProfile();
    this.fetchUserProfile();
    this.fetchUserProfile();
    this.fetchUserProfile();
    this.fetchUserProfile();
  }

  logout() {
    sessionStorage.setItem('logout-message', 'Logout realizado com sucesso!');
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
    window.location.href = '/login';
  }

  delete() {
    sessionStorage.setItem('delete-message', 'Conta deletada com sucesso!');
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
    window.location.href = '/login';
  }

  deleteProfile() {
    if (confirm('Tem certeza que deseja deletar sua conta?')) {
      switch (this.userProfile.role) {
        case 'paciente':
        case 'medico':
        case 'secretario':
          this.userService.deleteUserProfile().subscribe(
            () => {
              this.delete();
            },
            (error) => {
              console.error(`Erro ao deletar conta de ${this.userProfile.role}:`, error);
              this.toastr.error('Erro ao deletar conta, digite a senha antes de deletar!');
            }
          );
          break;
        default:
          console.error('Tipo de usuário desconhecido.');
          break;
      }
    }
  }

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }

  entrar() {
    this.onEntrar.emit();
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
