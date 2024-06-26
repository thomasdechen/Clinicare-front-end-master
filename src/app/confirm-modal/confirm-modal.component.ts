import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Output() confirmed = new EventEmitter<boolean>();

  constructor(public bsModalRef: BsModalRef) {}

  confirm(): void {
    this.confirmed.emit(true);
    this.bsModalRef.hide();
  }

  decline(): void {
    this.confirmed.emit(false);
    this.bsModalRef.hide();
  }
}
