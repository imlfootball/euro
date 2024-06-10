import { Component, Input, inject } from '@angular/core';
import { Matches } from '../../contracts/matches.contract';
import { Observable } from 'rxjs';
import { Players } from '../../contracts/teams.contract';
import { TeamsService } from '../../services/content/teams.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss'
})
export class MatchComponent {

  teamService = inject(TeamsService);

  @Input() match!: Matches;
  @Input() isPronostiques: boolean = false;
  @Input() disabled: boolean = false;

  halfTimeA: number = 0;
  halfTimeB: number = 0;
  fullTimeA: number = 0;
  fullTimeB: number = 0;
  matchOutcome: string = '';

  $players!: Observable<Players[]>;

  nationalitySelected(ev: Event):void {
    let selectBox = ev.target as HTMLSelectElement;
    this.$players = this.teamService.getPlayersByTeamName(selectBox.value);
  }
}
