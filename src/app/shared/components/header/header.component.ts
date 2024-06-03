import { Component, Input } from '@angular/core';

@Component({
  selector: 'cmp-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() showLogin: boolean = false;

  public showLoginModal(): void {
    this.showLogin = true;
  }
}
