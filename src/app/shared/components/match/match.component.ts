import { Component, Input } from '@angular/core';
import { Matches } from '../../contracts/matches.contract';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss'
})
export class MatchComponent {

  @Input() match!: Matches;
  
}
