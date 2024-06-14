import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobaltimeService {

  private http = inject(HttpClient);

  getMuTime(): Observable<string> {
    return this.http.get<any>(`http://worldtimeapi.org/api/timezone/Indian/Mauritius`)
  }

}
