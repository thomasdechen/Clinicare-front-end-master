import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { ServicoService } from '../../services/servico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from '../../services/medico.service';
import { AgendamentoService } from '../../services/agendamento.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DisponibilidadeService } from '../../services/disponibilidade.service';
import { AvaliacaoService } from '../../services/avaliacao.service';

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
  paciente: any;
  pacientesExibidos: any[] = [];
  avaliacao: string = '';
  horariosDisponiveis: string[] = [];
  activeSection: string = 'sobre';
  showAgendamento: boolean = false;
  agendamentoForm: FormGroup;

  avaliacoes: any[] = [];
  novaAvaliacao: any = { estrelas: 0, comentario: '' };
  mostrarModalAvaliacao: boolean = false;
  hoveredStar: number = 0;
  isPaciente: boolean = false;
  avaliacaoExistente: boolean = false;
  avaliacoesExibidas: any[] = [];
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  avaliacoesPorPagina: number = 3;

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
    private fb: FormBuilder,
    private avaliacaoService: AvaliacaoService
  ) {
    this.agendamentoForm = this.fb.group({
      dataConsulta: ['']
    });
  }

  ngOnInit(): void {
    this.loadAvailableDates();
    this.atualizarDisponibilidade();
    this.getMedicoDetail();
    this.getPacienteDetail();
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.fetchUserProfile();
    }
    this.verificarRole();
    this.carregarAvaliacoes();
    this.verificarTipoUsuario();
    this.verificarAvaliacaoExistente();
    this.carregarPacientes();
    
  }

  verificarTipoUsuario() {
    this.isPaciente = sessionStorage.getItem('role') === 'paciente';
  }
  
  verificarAvaliacaoExistente() {
    const idPaciente = sessionStorage.getItem('id');
    const idMedico = this.route.snapshot.paramMap.get('id');
    if (idPaciente && idMedico) {
      this.avaliacaoService.verificarAvaliacaoExistente(idPaciente, idMedico).subscribe(
        existe => this.avaliacaoExistente = existe
      );
    }
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

  

  carregarPacientes() {
    this.userService.getUserProfile().subscribe(
        (data) => {
            console.log(data); 
            this.paciente = data; 
        },
        (error) => {
            console.error('Erro ao buscar pacientes:', error);
        }
    );

    this.pacientesExibidos =  this.paciente
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

  getPacienteDetail(): void {
    this.userService.getUserProfile().subscribe(
      data => {
        this.paciente = data;
      },
      error => {
        console.error('Erro ao buscar detalhes do paciente:', error);
      }
    );
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

  carregarAvaliacoes() {
    const medicoId = this.route.snapshot.paramMap.get('id');
    const pacienteLogadoId = sessionStorage.getItem('id');
  
    if (medicoId) {
      this.avaliacaoService.buscarAvaliacoesPorMedicoId(medicoId).subscribe(
        (data) => {
          // Separar a avaliação do paciente logado das outras avaliações
          const avaliacaoPacienteLogado = data.find(av => av.idPaciente === pacienteLogadoId);
          const outrasAvaliacoes = data.filter(av => av.idPaciente !== pacienteLogadoId);
  
          // Inverter a ordem das outras avaliações
          outrasAvaliacoes.reverse();
  
          // Reordenar as avaliações com a do paciente logado em primeiro, seguida pelas outras em ordem inversa
          this.avaliacoes = avaliacaoPacienteLogado ? [avaliacaoPacienteLogado, ...outrasAvaliacoes] : outrasAvaliacoes;
  
          this.carregarFotosPacientes();
          this.totalPaginas = Math.ceil(this.avaliacoes.length / this.avaliacoesPorPagina);
          this.atualizarAvaliacoesExibidas();
        },
        (error) => {
          console.error('Erro ao buscar avaliações:', error);
        }
      );
    }
  }

  carregarFotosPacientes() {
    this.avaliacoes.forEach(avaliacao => {
      this.userService.getPacienteById(avaliacao.idPaciente).subscribe(
        (paciente) => {
          avaliacao.fotoPaciente = paciente.foto || '../../../assets/svg/Médico 1.png';
        },
        (error) => {
          console.error('Erro ao carregar foto do paciente:', error);
          avaliacao.fotoPaciente = '../../../assets/svg/Médico 1.png';
        }
      );
    });
  }

  abrirModalAvaliacao() {
    this.mostrarModalAvaliacao = true;
  }

  fecharModalAvaliacao() {
    this.mostrarModalAvaliacao = false;
    this.novaAvaliacao = { estrelas: 0, comentario: '' };
  }

  criarAvaliacao() {
    if (this.novaAvaliacao.estrelas === 0 || !this.novaAvaliacao.comentario.trim()) {
      this.toastr.error('Por favor, preencha todos os campos da avaliação.');
      return;
    }

    const medicoId = this.route.snapshot.paramMap.get('id');
    const pacienteId = sessionStorage.getItem('id');
    const pacienteName= sessionStorage.getItem('username');
    const pacienteFoto= sessionStorage.getItem('foto');
    
    if (!medicoId || !pacienteId) {
      this.toastr.error('Erro ao identificar médico ou paciente.');
      return;
    }

    this.novaAvaliacao.idMedico = medicoId;
    this.novaAvaliacao.idPaciente = pacienteId;
    this.novaAvaliacao.namePaciente = pacienteName;
    this.novaAvaliacao.fotoPaciente = pacienteFoto;

    this.avaliacaoService.criarAvaliacao(this.novaAvaliacao).subscribe(
      (novaAvaliacaoCriada) => {
        // Recarregar todas as avaliações para garantir a ordem correta
        this.carregarAvaliacoes();
  
        this.toastr.success('Avaliação criada com sucesso!');
        this.fecharModalAvaliacao();
        this.verificarAvaliacaoExistente();
      },
      (error) => {
        console.error('Erro ao criar avaliação:', error);
        this.toastr.error('Erro ao criar avaliação.');
      }
    );
  }

  isAvaliacaoPacienteLogado(avaliacao: any): boolean {
    const pacienteLogadoId = sessionStorage.getItem('id');
    return avaliacao.idPaciente === pacienteLogadoId;
  }

  
  atualizarAvaliacoesExibidas() {
    const pacienteLogadoId = sessionStorage.getItem('id');
    
    // Garantir que a avaliação do paciente logado esteja sempre na primeira página
    const avaliacaoPacienteLogado = this.avaliacoes.find(av => av.idPaciente === pacienteLogadoId);
    
    let inicio = (this.paginaAtual - 1) * this.avaliacoesPorPagina;
    let fim = inicio + this.avaliacoesPorPagina;
  
    if (avaliacaoPacienteLogado && this.paginaAtual === 1) {
      // Se estamos na primeira página e existe uma avaliação do paciente logado
      this.avaliacoesExibidas = [
        avaliacaoPacienteLogado,
        ...this.avaliacoes.filter(av => av.idPaciente !== pacienteLogadoId).slice(0, this.avaliacoesPorPagina - 1)
      ];
    } else {
      // Para outras páginas ou se não houver avaliação do paciente logado
      this.avaliacoesExibidas = this.avaliacoes.slice(inicio, fim);
    }
  }
  
  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarAvaliacoesExibidas();
    }
  }
  
  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.atualizarAvaliacoesExibidas();
    }
  }

  selecionarEstrela(star: number) {
    this.novaAvaliacao.estrelas = star;
  }

  highlightStars(star: number) {
    this.hoveredStar = star;
  }

  resetStars() {
    this.hoveredStar = 0;
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
