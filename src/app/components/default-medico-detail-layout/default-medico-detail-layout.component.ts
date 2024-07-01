import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { ServicoService } from '../../services/servico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from '../../services/medico.service';


@Component({
  selector: 'app-default-medico-detail-layout',
  templateUrl: './default-medico-detail-layout.component.html',
  styleUrl: './default-medico-detail-layout.component.scss'
})
export class DefaultMedicoDetailLayoutComponent implements OnInit {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Input() disablePrimaryBtn: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();
  @Output("entrar") onEntrar = new EventEmitter();

  userProfile: any = {};
  isLoggedIn: boolean = false;
  isMedico: boolean = false;

  medico: any;
  avaliacao: string = '';
  horariosDisponiveis: string[] = []; 

  constructor(
    private route: ActivatedRoute,
    private medicoService: MedicoService,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private servicoService: ServicoService
  ) { }

  ngOnInit(): void {
    this.getMedicoDetail();

    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.fetchUserProfile();
      
    }
    this.verificarRole();
    
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
        // Lógica de tratamento de erro, se necessário
      }
    );
  }

  getMedicoDetail(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.medicoService.buscarMedicoPorId(id).subscribe(
        data => {
          this.medico = data;
        },
        error => {
          console.error('Erro ao buscar detalhes do médico:', error);
        }
      );
    }
  }

  postarAvaliacao(): void {
    // Lógica para postar avaliação
    console.log('Avaliacao postada:', this.avaliacao);
  }

  agendarConsulta(): void {
    // Lógica para agendar consulta
    console.log('Consulta agendada');
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
