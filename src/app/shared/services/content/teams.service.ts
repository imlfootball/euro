import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team, Player, Coach } from '../../contracts/teams.contract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private ApiKey: string = '57bdd079639acaa7a00f1e66d996cf226ffa7f08bc2fc1239407341e92c244de'
  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`https://apiv3.apifootball.com/?action=get_teams&league_id=1&APIkey=${this.ApiKey}`);
  }

  getTeam(teamId: number) {
    return this.http.get(`https://apiv3.apifootball.com/?action=get_teams&team_id=${teamId}&APIkey=${this.ApiKey}`)
  }
}
