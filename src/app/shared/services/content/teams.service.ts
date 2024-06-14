import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teams, Players, playersApiData, teamsApiData } from '../../contracts/teams.contract';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<Teams[]> {
    return this.http.get<teamsApiData>(`https://euro.omediainteractive.net/imleuro/items/teams`).pipe(
      map(response => response.data)
    );
  }

  getTeamByGroup(groupId: number): Observable<Teams[]> {
    return this.http.get<teamsApiData>(`https://euro.omediainteractive.net/imleuro/items/teams?filter[group]=${groupId}`).pipe(
      map(response => response.data)
    );
  }

  getPlayersByTeamName(teamName: string): Observable<Players[]> {
    return this.http.get<playersApiData>(`https://euro.omediainteractive.net/imleuro/items/players?filter[team]=${teamName}`).pipe(
      map(response => response.data)
    );
  }

  getTeamByName(teamName: string): Observable<Teams[]> {
    return this.http.get<any>(`https://euro.omediainteractive.net/imleuro/items/teams?filter[name]=${teamName}`).pipe(
      map(response => response.data)
    );
  }
}
