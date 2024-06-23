import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-profile-layout',
  templateUrl: './default-profile-layout.component.html',
  styleUrls: ['./default-profile-layout.component.scss'],
  standalone: true
})
export class DefaultProfileLayoutComponent {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() disablePrimaryBtn: boolean = true;
  @Output() onSave = new EventEmitter<void>();
  @Output() onNavigate = new EventEmitter<void>();

  constructor() {}

  saveProfile() {
    this.onSave.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }
}
