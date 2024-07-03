import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { ServicoService } from '../../services/servico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from '../../services/medico.service';
import { AgendamentoService } from '../../services/agendamento.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DisponibilidadeService } from '../../services/disponibilidade.service';

@Component({
  selector: 'app-default-medico-detail-layout',
  templateUrl: './default-medico-detail-layout.component.html',
  styleUrls: ['./default-medico-detail-layout.component.scss']
})
export class DefaultMedicoDetailLayoutComponent implements OnInit {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Input() disablePrimaryBtn: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();
  @Output("entrar") onEntrar = new EventEmitter();

  availableDates: Set<string> = new Set();
  availableTimes: string[] = [];
  selectedDate: string = '';
  userProfile: any = {};
  isLoggedIn: boolean = false;
  isMedico: boolean = false;
  selectedTime: string = '';

  medico: any;
  avaliacao: string = '';
  horariosDisponiveis: string[] = [];
  activeSection: string = 'sobre';
  showAgendamento: boolean = false;
  agendamentoForm: FormGroup;

  myFilter = (d: Date | null): boolean => {
    const date = (d || new Date()).toISOString().split('T')[0];
    return this.availableDates.has(date);
  };

  constructor(
    private route: ActivatedRoute,
    private medicoService: MedicoService,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private servicoService: ServicoService,
    private agendamentoService: AgendamentoService,
    private disponibilidadeService: DisponibilidadeService,
    private fb: FormBuilder
  ) {
    this.agendamentoForm = this.fb.group({
      dataConsulta: ['']
    });
  }

  ngOnInit(): void {
    this.getMedicoDetail();
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.fetchUserProfile();
    }
    this.verificarRole();
    this.loadAvailableDates();
    this.atualizarDisponibilidade();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!sessionStorage.getItem('auth-token');
  }

  verificarRole() {
    const role = sessionStorage.getItem('role');
    this.isMedico = role === 'medico';
  }

  fetchUserProfile() {
    this.userService.getUserProfile().subscribe(
      (data) => {
        this.userProfile = data;
      },
      (error) => {
        console.error('Erro ao buscar perfil do usuário:', error);
      }
    );
  }

  getMedicoDetail(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.medicoService.buscarMedicoPorId(id).subscribe(
        data => {
          this.medico = data;
          this.loadAvailableDates();
        },
        error => {
          console.error('Erro ao buscar detalhes do médico:', error);
        }
      );
    }
  }

  loadAvailableDates() {
    const medicoId = this.route.snapshot.paramMap.get('id');
    if (medicoId) {
      this.agendamentoService.getAvailableDates(medicoId).subscribe(
        dates => {
          this.availableDates = new Set(dates);
        },
        error => {
          console.error('Erro ao carregar datas disponíveis:', error);
        }
      );
    }
  }

  onDateChange(event: any) {
    const date = event.value.toISOString().split('T')[0];
    this.selectedDate = date;
    this.loadAvailableTimes(date);
  }

  onDateSelected(date: string): void {
    this.selectedDate = date;
    this.loadAvailableTimes(date);
  }

  loadAvailableTimes(date: string): void {
    const medicoId = this.route.snapshot.paramMap.get('id');
    if (medicoId) {
      this.disponibilidadeService.getAvailableTimes(medicoId, date).subscribe(
        data => {
          this.availableTimes = data;
        },
        error => {
          console.error('Erro ao carregar horários disponíveis:', error);
        }
      );
    }
  }

  selecionarHorario(horario: string): void {
    this.selectedTime = horario;
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  
  submitForm() {
    const medicoId = this.medico._id;
    const pacienteId = this.userProfile._id;
    const dataConsulta = this.selectedDate;
    const horaConsulta = this.selectedTime;
  
    // Verifique se dataConsulta não está vazio
    if (!dataConsulta || dataConsulta.trim() === '') {
      this.toastr.error('Por favor, selecione uma data para a consulta.');
      return;
    }
  
    // Verifique se horaConsulta não está vazio
    if (!horaConsulta || horaConsulta.trim() === '') {
      this.toastr.error('Por favor, selecione um horário para a consulta.');
      return;
    }
  
    // Construa o objeto de agendamento
    const agendamentoData = {
      medico: { id: medicoId },
      paciente: { id: pacienteId },
      dia: dataConsulta, // Certifique-se de que dataConsulta está preenchido corretamente
      hora: horaConsulta,
      // Adicione outros campos conforme necessário (preço, local, etc.)
    };
  
    // Envie a requisição para agendar a consulta
    this.agendamentoService.agendarConsulta(agendamentoData).subscribe(
      (response) => {
        this.toastr.success('Consulta agendada com sucesso!');
        // Lógica adicional após o agendamento
      },
      (error) => {
        console.error('Erro ao agendar consulta:', error);
        this.toastr.error('Erro ao agendar consulta.');
      }
    );
  }
  

  goToMedicoDetail(medicoId: string): void {
    this.router.navigate(['/medicos', medicoId]);
  }

  switchSection(section: string): void {
    this.activeSection = section;
    this.showAgendamento = section === 'agendamento';
  }

  atualizarDisponibilidade(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.disponibilidadeService.atualizarDisponibilidade(id).subscribe(
        () => {
          console.log('Disponibilidade atualizada com sucesso');
        },
        error => {
          console.error('Erro ao atualizar disponibilidade:', error);
        }
      );
    }
  }

  selectTime(time: string) {
    this.selectedTime = time;
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

  showAgendamentoSection() {
    this.showAgendamento = true;
  }
}
