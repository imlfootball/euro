import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { StateService, AppState } from './shared/services/core/state.service';
import { TeamsService } from './shared/services/content/teams.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title: string = 'Infomil Euro 2024 Challenge';
  public page: number = 0;
  public showDialog: boolean = false;
  @Input() showLoader: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private stateService: StateService, private euroService: TeamsService){
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        this.internalRoute(event.url.split('/#')[1])
      }
    })
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
      case 'bon-score':
        this.page = 6;
        break;
      case 'bracket':
        this.page = 7;
        break;
      case 'quiz':
        this.page = 8;
        break;
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
