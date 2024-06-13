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

  @Input() match!: Matches;
  @Input() isPronostiques: boolean = false;
  @Input() disabled: boolean = false;

  protected showLoader: boolean = false;
  protected pronostiqueDone: boolean = false;

  protected userId: number = 0;
  protected userTrigramme: string = '';
  protected halfTimeA: number = 0;
  protected halfTimeB: number = 0;
  protected fullTimeA: number = 0;
  protected fullTimeB: number = 0;
  protected scorer: string = '';
  protected matchOutcome: string = '';
  protected today: Date = new Date();
  protected limitDate!: Date;
  protected closed: boolean = false;

  protected $players!: Observable<Players[]>;
  protected donePronostique!: any;

  ngOnInit(): void {

    this.stateService.userState.subscribe({
      next:(response)=> {
        (response.id)? this.userId = parseInt(response.id) : "";
        (response.last_name)? this.userTrigramme = response.last_name : "";
        if(this.isPronostiques){
          this.verfierMonPronostique();
        }
      }
    })

    if(this.isPronostiques && this.userId !== 0){
      this.verfierMonPronostique();
    }

    let matchDate = new Date(this.match.date)
    this.limitDate = this.subtractHours(matchDate);
    // console.log(`------------------${this.match.id}----------------------`)
    // console.log('match date', matchDate);
    // console.log('limit date', this.limitDate);
    // console.log('today', this.today);
    // console.log('Is today less than two hours away', (this.today > this.limitDate));
    // console.log('--------------------------------------------------------');

    if(this.today > this.limitDate) {
      this.closed = true;
    }

  }

  subtractHours(date: Date): Date {
    const newDate = new Date(date);
    // 15mins
    newDate.setTime(newDate.getTime() - (1 * 15 * 60 * 1000));
    return newDate;
  }

  nationalitySelected(ev: Event):void {
    let selectBox = ev.target as HTMLSelectElement;
    this.$players = this.teamService.getPlayersByTeamName(selectBox.value);
  }

  sendBet(){
    let currentDate = new Date();
    if(currentDate < this.limitDate ) {
      this.showLoader = true;
      let prediction = {
        user: this.userTrigramme,
        game_id: this.match.id,
        halftime_a: this.halfTimeA?.toString(),
        halftime_b: this.halfTimeB?.toString(),
        fulltime_a: this.fullTimeA?.toString(),
        fulltime_b: this.fullTimeB?.toString(),
        scorer: this.scorer,
        winner_draw: this.matchOutcome,
      }

      this.predictionService.sendPrediction(prediction).subscribe({
        next:()=>{
          location.reload();
        },
        error:(error)=>{
          console.log(error);
          location.reload();
          this.showLoader = false;
        }
      })
    } else {
      location.reload();
    }
  }

  verfierMonPronostique(): void {
    this.predictionService.getMyPredictions(this.match.id).subscribe({
      next: (response)=> {
        if(response.length > 0){
          this.pronostiqueDone = true;
          this.donePronostique = response[0];
        } else {
          this.pronostiqueDone = false;
          this.donePronostique = [];
        }
      }
    })
  }
}
