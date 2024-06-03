import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team, Player, Coach } from '../../contracts/teams.contract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private ApiKey: string = '950a2dd5907afd62c1e4d546176d0015057fef44e309b8c980fb36e90e54fbd8'
  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`https://apiv3.apifootball.com/?action=get_teams&league_id=1&APIkey=${this.ApiKey}`);
  }

  getTeam(teamId: number) {
    return this.http.get(`https://apiv3.apifootball.com/?action=get_teams&team_id=${teamId}&APIkey=${this.ApiKey}`)
  }
}
