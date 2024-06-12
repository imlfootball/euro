import { Component, OnInit, inject } from '@angular/core';
import { Players, Teams } from '../../../shared/contracts/teams.contract';
import { TeamsService } from '../../../shared/services/content/teams.service';
import { CorrectscorerService, BestPlayer } from '../../../shared/services/games/correctscorer.service';
import { StateService } from '../../../shared/services/core/state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-best-scorer',
  templateUrl: './best-scorer.component.html',
  styleUrl: './best-scorer.component.scss'
})
export class BestScorerComponent implements OnInit {

  private teamsService = inject(TeamsService);
  private correctScorerService = inject(CorrectscorerService);
  private state = inject(StateService);

  protected $goldenBootPlayers!: Observable<Players[]>;
  protected $tournamentPlayers!: Observable<Players[]>;
  protected $players!: Observable<Players[]>;
  protected $teams!: Observable<Teams[]>;
  protected $bestScorer!: Observable<BestPlayer>;
  protected disabled: boolean = false;
  protected goldenScorer!: string;
  protected goals: number = 0;
  protected tournamentPlayer!: string;
  protected userId!: string | null ;
  protected userName!: string | null;

  ngOnInit(): void {

    this.state.userState.subscribe({
      next: (res)=>{
        if(res.id){
          this.disabled = false;
          this.userId = res.id;
          this.userName = res.last_name;
        } else {
          this.disabled = true;
        }
      }
    })

    this.$teams = this.teamsService.getAllTeams();
  }

  checkPlayed(){
    this.$bestScorer = this.correctScorerService.getPronostiqueByUser(this.userName);

    this.correctScorerService.getPronostiqueByUser(this.userName).subscribe({
      next: (response)=>{
        console.log(response);
      }
    });
  }

  nationalitySelected(event: Event, game: string) {
    let nation = event.target as HTMLSelectElement;
    if(game === 'goldenBoot'){
      this.$goldenBootPlayers = this.teamsService.getPlayersByTeamName(nation.value);
    } else {
      this.$tournamentPlayers = this.teamsService.getPlayersByTeamName(nation.value);
    }
  }
}
