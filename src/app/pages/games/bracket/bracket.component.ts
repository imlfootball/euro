import { Component } from '@angular/core';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrl: './bracket.component.scss'
})
export class BracketComponent {

  winnerR161: string = '-';
  winnerR162: string = '-';
  winnerR163: string = '-';
  winnerR164: string = '-';
  winnerR165: string = '-';
  winnerR166: string = '-';
  winnerR167: string = '-';
  winnerR168: string = '-';

  winnerR41: string = '-';
  winnerR42: string = '-';
  winnerR43: string = '-';
  winnerR44: string = '-';

  winnerSemi1: string = '-';
  winnerSemi2: string = '-';

  winnerEuro: string = '-';

  selectedWinner(phase: string, selected: Event):void {
    console.log(phase, selected.target);
  }
}
