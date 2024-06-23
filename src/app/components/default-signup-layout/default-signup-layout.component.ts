import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-signup-layout',
  standalone: true,
  imports: [],
  templateUrl: './default-signup-layout.component.html',
  styleUrl: './default-signup-layout.component.scss'
})
export class DefaultSignupLayoutComponent {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Input() disablePrimaryBtn: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();
  @Output("entrar") onEntrar = new EventEmitter();

  submit(){
    this.onSubmit.emit();
  }

  navigate(){
    this.onNavigate.emit();
  }

  entrar(){
    this.onEntrar.emit();
  }
}
