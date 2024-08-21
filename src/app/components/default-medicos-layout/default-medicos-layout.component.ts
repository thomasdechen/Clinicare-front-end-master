import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MedicoService } from '../../services/medico.service';
import { DisponibilidadeService } from '../../services/disponibilidade.service';

@Component({
    selector: 'app-default-medicos-layout',
    templateUrl: './default-medicos-layout.component.html',
    styleUrls: ['./default-medicos-layout.component.scss']
})
export class DefaultMedicosLayoutComponent implements OnInit {
    @Input() title: string = "";
    @Input() primaryBtnText: string = "";
    @Input() secondaryBtnText: string = "";
    @Input() disablePrimaryBtn: boolean = true;
    @Output("submit") onSubmit = new EventEmitter();
    @Output("navigate") onNavigate = new EventEmitter();
    @Output("entrar") onEntrar = new EventEmitter();

    userProfile: any = {};
    isLoggedIn: boolean = false;

    medicos: any[] = [];
    medicosExibidos: any[] = [];
    mostrarTodosMedicos: boolean = false;

    constructor(
        private toastr: ToastrService,
        private userService: UserService,
        private router: Router,
        private disponibilidadeService: DisponibilidadeService,
        private medicoService: MedicoService
    ) {}

    ngOnInit(): void {
        this.checkLoginStatus();
        if (this.isLoggedIn) {
            this.fetchUserProfile();
        }
        this.carregarMedicos();
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
            }
        );
    }

    carregarMedicos() {
        this.medicoService.buscarMedicos().subscribe(
          (data) => {
            this.medicos = data;
            this.atualizarMedicosExibidos();
            this.atualizarDisponibilidadeMedicos(); // Chamar o método para atualizar a disponibilidade
          },
          (error) => {
            console.error('Erro ao buscar médicos:', error);
          }
        );
      }
      
      atualizarDisponibilidadeMedicos() {
        this.medicos.forEach((medico) => {
          this.disponibilidadeService.atualizarDisponibilidade(medico._id).subscribe(
            () => {
              console.log(`Disponibilidade atualizada para o médico ${medico.name}`);
            },
            (error) => {
              console.error(`Erro ao atualizar a disponibilidade do médico ${medico.name}:`, error);
            }
          );
        });
      }

    buscarMedicosPorNome(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const nomeMedico = inputElement.value.trim().toLowerCase();

        this.medicosExibidos = nomeMedico
            ? this.medicos.filter(medico =>
                medico.name.toLowerCase().includes(nomeMedico)
            )
            : this.medicos.slice(0, 6);
    }

    atualizarMedicosExibidos() {
        this.medicosExibidos = this.mostrarTodosMedicos ? this.medicos : this.medicos.slice(0, 6);
    }

    verTodosMedicos() {
        this.mostrarTodosMedicos = true;
        this.atualizarMedicosExibidos();
    }

    verDetalhesMedico(medico: any) {
        const medicoId = medico._id; 
        console.log('ID do médico:', medicoId);
        
        if (medicoId) {
            this.router.navigate([`/medico-detail/${medicoId}`]);
            this.gotoTop();
        } else {
            console.error('ID do médico é undefined');
        }
    }
    

    gotoTop() {
        const scrollDuration = 500;
    
        const cosParameter = window.scrollY / 2;
        let scrollCount = 0;
        let oldTimestamp = performance.now();
    
        function step(newTimestamp: number) {
            const timestampDiff = newTimestamp - oldTimestamp;
            if (scrollCount >= scrollDuration || window.scrollY === 0) return;
    
            scrollCount += Math.PI * timestampDiff / scrollDuration;
            if (scrollCount >= Math.PI) return window.scrollTo(0, 0);
    
            window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
            oldTimestamp = newTimestamp;
            window.requestAnimationFrame(step);
        }
    
        window.requestAnimationFrame(step);
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
