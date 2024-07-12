import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ServicoService } from '../../services/servico.service';

@Component({
  selector: 'app-default-inicio-layout',
  templateUrl: './default-inicio-layout.component.html',
  styleUrl: './default-inicio-layout.component.scss'
})
export class DefaultInicioLayoutComponent implements OnInit {
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
  mostrarModalCriarServico: boolean = false;
  novoServico: any = { nomeServico: '', descricaoServico: '', nomeMedico: '' };
  servicos: any[] = [];
  servicosExibidos: any[] = [];
  mostrarTodosServicos: boolean = false;
  mostrarTodosServicos2: boolean = false;
  mostrarMeusServicos: boolean = false;
  servicosMedico: any[] = [];
  servicosMedicoExibidos: any[] = [];
  servicosMedicoExibidos2: any[] = [];

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private servicoService: ServicoService
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.fetchUserProfile();
    }
    this.carregarServicos();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!sessionStorage.getItem('auth-token');
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

  carregarServicos() {
    this.servicoService.buscarServicos().subscribe(
      (data) => {
        this.servicos = data; // Atualiza a lista de serviços com os dados recebidos do backend
        this.atualizarServicosExibidos();
      },
      (error) => {
        console.error('Erro ao buscar serviços:', error);
        // Lógica de tratamento de erro, se necessário
      }
    );
  }

  buscarServicos() {
    this.servicoService.buscarServicos().subscribe(
      (data) => {
        this.servicos = data;
        this.atualizarServicosExibidos();
      },
      (error) => {
        console.error('Erro ao buscar serviços:', error);
      }
    );
  }

  atualizarServicosExibidos2() {
    this.servicosExibidos = this.mostrarTodosServicos ? this.servicosMedico : this.servicosMedico.slice(0, 6);
  }

  verTodosServicos() {
    this.mostrarTodosServicos = true;
    this.atualizarServicosExibidos();
  }

  verTodosServicos2() {
    this.mostrarTodosServicos2 = true;
    this.atualizarServicosExibidos2();
  }

  visualizarServicosMedico() {
    const medicoId = sessionStorage.getItem('id');
    if (!medicoId) {
      console.error('ID do médico não encontrado.');
      return;
    }

    this.servicoService.buscarServicosPorMedicoId(medicoId).subscribe(
      (data) => {
        this.servicosMedico = data;
        this.mostrarMeusServicos = true; 
        this.atualizarServicosExibidos2();
      },
      (error) => {
        console.error('Erro ao buscar serviços do médico:', error);
      }
    );
  }

  
  atualizarServicosExibidos() {
    this.servicosExibidos = this.mostrarTodosServicos ? this.servicos : this.servicos.slice(0, 6);
  }
  


  submit(){
    this.onSubmit.emit();
  }

  navigate(){
    this.onNavigate.emit();
  }

  entrar(){
    this.onEntrar.emit();
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
