import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

  @Input() showCalcs: boolean = false;
  @Input() showLoader: boolean = false;
  @Output() showLoaderChange = new EventEmitter<boolean>();

  chargingText: string = 'Chargement en cours...'

  ngOnInit(): void {
    if(this.showCalcs){
      this.timeoutText('Calculs des rangs en cours...');
    }
  }

  timeoutText(txt: string) {
    setTimeout(() => {
      this.chargingText = txt;
    }, 4000);
  }
}
