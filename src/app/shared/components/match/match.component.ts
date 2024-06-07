import { Component, Input } from '@angular/core';
import { Matches } from '../../contracts/matches.contract';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss'
})
export class MatchComponent {

  @Input() match!: Matches;
  @Input() isPronostiques: boolean = false;

  halfTimeA: number = 0;
  halfTimeB: number = 0;
  fullTimeA: number = 0;
  fullTimeB: number = 0;
}
