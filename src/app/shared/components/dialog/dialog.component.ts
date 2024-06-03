import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input() showDialog?: boolean;
  @Input() dialogTitle: string = '';
  @Input() withOverlay: boolean = false;
  @Output() showDialogChange = new EventEmitter<boolean>();

  closeDialog() {
    this.showDialog = false;
    this.showDialogChange.emit(this.showDialog);
  }
}
