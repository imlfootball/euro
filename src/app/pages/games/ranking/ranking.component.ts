import { Component, inject } from '@angular/core';
import { RankingcalculationService } from '../../../shared/services/core/rankingcalculation.service';
import { Observable, last } from 'rxjs';
import { GlobaltimeService } from '../../../shared/services/core/globaltime.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent {

  private rankCalcSercvice = inject(RankingcalculationService);
  private globalTime = inject(GlobaltimeService);
  private today: Date = new Date();

  protected $ranks!: Observable<any>;

  ngOnInit():void {

    console.log(this.today);
    
    this.$ranks = this.rankCalcSercvice.getCurrentrankings();

    this.$ranks.subscribe({
      next: (response)=>{
        if(response.length < 1){
          this.updateRanks();
        } else {
          let idx = response.length - 1;
          let lastUpdate = new Date(response[idx].modified_on.substring(0, 10));
          console.log(lastUpdate < this.today)
          // console.log(new Date(response[idx].modified_on).toString().substring(0, 15));
        }
      }
    })
  }

  updateRanks(): boolean {
    console.log('Update rankings');
    this.rankCalcSercvice.startCalcRanking();
    return true;
  }

}
