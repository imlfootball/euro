import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teams, teamsApi } from '../../contracts/teams.contract';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<Teams[]> {
    return this.http.get<teamsApi>(`https://euro.omediainteractive.net/imleuro/items/teams`).pipe(
      map(response => response.data)
    );
  }

  getTeamByGroup(groupId: number): Observable<Teams[]> {
    return this.http.get<teamsApi>(`https://euro.omediainteractive.net/imleuro/items/teams?filter[group]=${groupId}`).pipe(
      map(response => response.data)
    );
  }
}
