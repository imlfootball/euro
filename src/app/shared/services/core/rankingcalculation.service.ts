import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MatchesService } from '../content/matches.service';
import { Matches } from '../../contracts/matches.contract';
import { Pronostiques, pronostiquesApiData } from '../../contracts/pronostiques.contract';
import { PredictionsService } from '../games/predictions.service';

interface result {
  id: number;
  phase: string;
  team_a: string;
  team_b: string;
  fulltime_a: number;
  fulltime_b: number;
  halftime_a: number;
  halftime_b: number;
  scorer: string;
  winner_point: number;
  halftime_point: number;
  fulltime_point: number;
  scorer_point: number;
}

@Injectable({
  providedIn: 'root'
})
export class RankingcalculationService {

  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private matchService = inject(MatchesService);
  private predictionService = inject(PredictionsService);

  calcRankings(): Observable<Matches[]> {

    let results:Observable<Matches[]>;

    results = this.matchService.getPlayedMatches();

    results.subscribe({
      next: (results) =>{
        results.forEach((result)=>{
          console.log('Result for :', result.id, result.phase, result.team_a, result.fulltime_a, result.team_b, result.fulltime_b, result.winner_point, result.fulltime_point, result.halftime_point,  result.scorer_point);
        })
      }
    });

    return results;
  }

  getUsersPronostique(): Observable<Pronostiques[]> {
    return this.http.get<pronostiquesApiData>(`https://euro.omediainteractive.net/imleuro/items/pronostiques `).pipe(
      map(response => response.data)
    );
  }

}
