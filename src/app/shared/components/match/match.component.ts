import { Component, Input, OnInit, inject } from '@angular/core';
import { Matches } from '../../contracts/matches.contract';
import { Observable } from 'rxjs';
import { Players } from '../../contracts/teams.contract';
import { TeamsService } from '../../services/content/teams.service';
import { StateService } from '../../services/core/state.service';
import { Pronostiques } from '../../contracts/pronostiques.contract';
import { PredictionsService } from '../../services/games/predictions.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss'
})
export class MatchComponent implements OnInit{

  teamService = inject(TeamsService);
  predictionService = inject(PredictionsService);
  stateService = inject(StateService);

  protected showLoader: boolean = false;
  protected pronostiqueDone: boolean = false;

  @Input() match!: Matches;
  @Input() isPronostiques: boolean = false;
  @Input() disabled: boolean = false;

  userId: number = 0;
  userTrigramme: string = '';
  halfTimeA: number = 0;
  halfTimeB: number = 0;
  fullTimeA: number = 0;
  fullTimeB: number = 0;
  scorer: string = '';
  matchOutcome: string = '';

  $players!: Observable<Players[]>;

  ngOnInit(): void {
    // To do : disable pronostiques if already done..
  }

  nationalitySelected(ev: Event):void {
    let selectBox = ev.target as HTMLSelectElement;
    this.$players = this.teamService.getPlayersByTeamName(selectBox.value);
  }

  sendBet(){
    this.showLoader = true;

    this.stateService.userState.subscribe({
      next:(response)=> {

        if(response.last_name) {

          let prediction = {
            user: response.last_name,
            game_id: this.match.id,
            halftime_a: this.halfTimeA?.toString(),
            halftime_b: this.halfTimeB?.toString(),
            fulltime_a: this.fullTimeA?.toString(),
            fulltime_b: this.fullTimeB?.toString(),
            scorer: this.scorer,
            winner_draw: this.matchOutcome,
          }

          debugger;

          this.predictionService.sendPrediction(prediction).subscribe({
            next:(response)=>{
              console.log(response);
              this.showLoader = false;
            },
            error:(error)=>{
              console.log(error);
              this.showLoader = false;
            }
          })

        }
      }
    })
  }

  pronostiquesComplete(){

  }
}
