import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ServicoService } from '../../services/servico.service';

@Component({
  selector: 'app-default-servicos-layout',
  templateUrl: './default-servicos-layout.component.html',
  styleUrls: ['./default-servicos-layout.component.scss']
})
export class DefaultServicosLayoutComponent implements OnInit {
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

  mostrarModalAlterarServico: boolean = false;
  servicoSelecionado: any = {};

  mostrarTodosMeusServicos: boolean = false; 

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

  buscarServicos2() {
    this.servicoService.buscarServicos().subscribe(
      (data) => {
        this.servicosMedico = data;
        this.atualizarServicosExibidos();
        this.atualizarServicosMedicoExibidos();
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

  verTodosMeusServicos() {
    this.mostrarTodosMeusServicos = true;
    this.atualizarServicosMedicoExibidos();
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
        this.atualizarServicosMedicoExibidos(); 
      },
      (error) => {
        console.error('Erro ao buscar serviços do médico:', error);
      }
    );
  }


  verTodosServicosMedico() {
    this.mostrarTodosServicos2 = true;
    this.atualizarServicosMedicoExibidos();
  }
  

  buscarServicosPorNome(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const nomeServico = inputElement.value.trim().toLowerCase();

    if (this.mostrarMeusServicos) {
      // Filtra os serviços do médico com base no nome do serviço digitado
      this.servicosMedicoExibidos = nomeServico
        ? this.servicosMedico.filter(servico =>
            servico.name.toLowerCase().includes(nomeServico)
          )
        : this.servicosMedico.slice(0, 6);
    } else {
      // Filtra os serviços gerais com base no nome do serviço digitado
      this.servicosExibidos = nomeServico
        ? this.servicos.filter(servico =>
            servico.name.toLowerCase().includes(nomeServico)
          )
        : this.servicos.slice(0, 6);
    }
  }
  
  atualizarServicosExibidos() {
    this.servicosExibidos = this.mostrarTodosServicos ? this.servicos : this.servicos.slice(0, 6);
  }
  
  atualizarServicosMedicoExibidos() {
    this.servicosMedicoExibidos = this.mostrarTodosMeusServicos ? this.servicosMedico : this.servicosMedico.slice(0, 6);
  }
  
  
  

  abrirModalCriarServico() {
    this.mostrarModalCriarServico = true;
  }

  fecharModalCriarServico() {
    this.mostrarModalCriarServico = false;
  }

  criarServico() {
    if (!this.novoServico.nomeServico || !this.novoServico.descricaoServico || 
        this.novoServico.nomeServico.trim().length === 0 || 
        this.novoServico.descricaoServico.trim().length === 0) {
      this.toastr.error('Por favor, preencha o nome e a descrição do serviço.');
      return;
    }
  
    const nomeMedico = sessionStorage.getItem('username');
    this.novoServico.nomeMedico = nomeMedico;
  
    this.servicoService.criarServico(this.novoServico).subscribe(
      (novoServicoCriado) => {
        // Adicionar o serviço criado à lista para atualização dinâmica na tela
        this.servicos.push(novoServicoCriado);
        this.toastr.success('Serviço criado com sucesso!');
        this.fecharModalCriarServico();
        this.atualizarServicosExibidos(); // Atualiza a lista exibida após a criação
      },
      (error) => {
        console.error('Erro ao criar serviço:', error);
        this.toastr.error('Erro ao criar serviço.');
      }
    );
  }

  alterarServico(servico: any) {
    this.servicoSelecionado = { ...servico };
    this.mostrarModalAlterarServico = true;
  }

  fecharModalAlterarServico() {
    this.mostrarModalAlterarServico = false;
    this.servicoSelecionado = {};
  }
  
  atualizarServico() {
    // Validação dos campos
    if (!this.servicoSelecionado.name || !this.servicoSelecionado.descricao || 
        this.servicoSelecionado.name.trim().length === 0 || 
        this.servicoSelecionado.descricao.trim().length === 0) {
      this.toastr.error('Por favor, preencha o nome e a descrição do serviço.');
      return;
    }
  
    const servicoId = this.servicoSelecionado._id;
    const servicoData = { ...this.servicoSelecionado };
  
    this.servicoService.atualizarServico(servicoId, servicoData).subscribe(
      (response) => {
        console.log('Serviço atualizado com sucesso:', response);
        this.toastr.success('Serviço atualizado com sucesso.');
  
        const index = this.servicos.findIndex(s => s._id === servicoId);
        if (index !== -1) {
          this.servicos[index] = response; 
          this.atualizarServicosExibidos();
        }
        this.fecharModalAlterarServico();
        this.visualizarServicosMedico();
      },
      (error) => {
        console.error('Erro ao atualizar serviço:', error);
        this.toastr.error('Erro ao atualizar serviço.');
      }
    );
  }

  excluirServico(servico: any) {
    const confirmacao = window.confirm(`Tem certeza que deseja excluir o serviço ${servico.name}?`);
    if (confirmacao) {
      const servicoId = servico._id; 
      this.servicoService.excluirServico(servicoId).subscribe(
        () => {
          console.log('Serviço excluído com sucesso');
          this.atualizarListaServicosMedico(servicoId);
          this.toastr.success('Serviço excluído com sucesso.');
          this.visualizarServicosMedico();
        },
        error => {
          console.error('Erro ao excluir serviço:', error);
          this.toastr.error('Erro ao excluir serviço.');
        }
      );
    }
  }

  private atualizarListaServicosMedico(servicoIdExcluido: number) {
    this.servicosMedico = this.servicosMedico.filter(servico => servico._id !== servicoIdExcluido);
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
