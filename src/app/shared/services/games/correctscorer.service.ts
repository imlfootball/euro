import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, switchMap, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export interface BestPlayer {
  user: string;
  bestScorer: string;
  bestPlayer: string;
  goals: number;
}

@Injectable({
  providedIn: 'root'
})
export class CorrectscorerService {

  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  getPronostiqueByUser(user: string | null): Observable<BestPlayer>{
    let token = this.cookieService.get('currentToken');
    let currentUserData = JSON.parse(this.cookieService.get('currentUser'));

    if (token && user) {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.get<any>(`https://euro.omediainteractive.net/imleuro/items/meilleur_jouers?filter[last_name]=${user}`, httpOptions)
    } else {
      return throwError('No token or User found');
    }

  }
}
