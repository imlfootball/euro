import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { StateService, AppState, user } from './shared/services/core/state.service';
import { AuthService } from './shared/services/core/auth.service';
import { TeamsService } from './shared/services/content/teams.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  @Input() showLoader: boolean = true;
  public title: string = 'Infomil Euro 2024 Challenge';
  public page: number = 0;
  public showDialog: boolean = false;

  private cookieToken!: string;
  private cookieUser!: string;
  private currentUser!: user;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private stateService: StateService, 
    private euroService: TeamsService,
    private authService: AuthService,
    private cookieService: CookieService
  ){
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        this.internalRoute(event.url.split('/#')[1])
      }
    })
  }

  ngOnInit(): void {
    this.cookieToken = this.cookieService.get('currentToken');
    this.cookieUser = this.cookieService.get('currentUser');

    if(this.cookieToken !== '' && this.cookieUser !== ''){
      this.handleAlreadylogged();
    } else {
      this.showLoader = false;
    }
  }

  handleAlreadylogged(): void {
    this.authService.tryRefreshToken(this.cookieToken)
    .pipe(
      catchError(err => this.handleError(err))
    )
    .subscribe(() =>{
      this.authService.getUserInfos(this.cookieUser, this.cookieToken).subscribe((res: any)=> {
        this.stateService.updateUser(res.data);
        this.showLoader = false;
      })
    });
  }

  handleError(Err:any): Observable<Response> {
    if(Err.error.error.message){
      console.clear();
      this.cookieService.delete('currentToken');
      this.cookieService.delete('currentUser');
    }
    return throwError(Err);
  }

  internalRoute(route: string):void {
    switch (route) {
      case 'les-matchs':
        this.page = 1;
        break;
      case 'les-equipes':
        this.page = 2;
        break;
      case 'les-stades':
        this.page = 3;
        break;
      case 'statistiques':
        this.page = 4;
        break;
      case 'meilleur-buteur':
        this.page = 5;
        break;
      case 'pronostiques':
        this.page = 6;
        break;
      case 'bracket':
        this.page = 7;
        break;
      // case 'quiz':
      //   this.page = 8;
      //   break;
      case 'classement':
        this.page = 9;
        break;
      case 'faq':
        this.page = 10;
        break;
      case 'accueil':
        this.page = 0;
        break;
      case undefined:
        this.page = 0;
        route = "accueil"
        break;
      default:
        this.page = 11;
        break;
    }
    this.stateService.updateState({ currentPage: route });
  }
}
