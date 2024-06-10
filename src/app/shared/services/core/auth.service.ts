import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);
  private cookieService = inject(CookieService);

  // private loginId: string = 'infomil.foot@gmail.com';
  // private secret: string = '1nf0m1l2024';
  // private loginId: string = 'olivier.iml@yopmail.com';
  // private secret: string = 'test123';
  private token: string = '';
  private prodUrl: string = 'https://euro.omediainteractive.net/imleuro';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor() { }
  

  trylogin(login: string, pass: string): Observable<any> {
    let loginDetails = {'email': login, 'password': pass, "mode": "jwt"};
    return this.httpClient.post<any>(`${this.prodUrl}/auth/authenticate`, loginDetails, this.httpOptions);
  }

  tryRefreshToken(token: string){
    let refreshdetails = {'token': token}
    return this.httpClient.post(`${this.prodUrl}auth/refresh`, refreshdetails, this.httpOptions);
  }

  refreshToken(token: string){
    let refreshdetails = {'token': token}
    this.httpClient.post(`${this.prodUrl}auth/refresh`, refreshdetails, this.httpOptions)
      .subscribe(res => {
        let results = res as any;
        this.setTokenCookie(results.data.token);
      })
  }

  setTokenCookie(token: string){
    this.cookieService.set('currentToken', token);
  }

  setUserCookie(user: Object){
    this.cookieService.set('currentUser', user.toString());
  }

  getUsers(token:  string){
    return this.httpClient.get(`${this.prodUrl}users?access_token=${token}`);
  }

  getUserInfos(id: string, token: string){
    return this.httpClient.get(`${this.prodUrl}users/${id}?access_token=${token}`);
  }
}
