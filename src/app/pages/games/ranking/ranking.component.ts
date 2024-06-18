import { Component, inject } from '@angular/core';
import { RankingcalculationService } from '../../../shared/services/core/rankingcalculation.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent {

  private rankCalcSercvice = inject(RankingcalculationService);

  ngOnInit():void {
    this.rankCalcSercvice.startCalcRanking();
  }

}
