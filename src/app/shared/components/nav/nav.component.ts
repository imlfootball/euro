import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService, AppState } from '../../services/core/state.service';
import { Subscription } from 'rxjs';

interface NavigationItem {
  label: string;
  route: string;
  active: boolean;
  sub?: NavigationItem[];
}

@Component({
  selector: 'cmp-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  public showMenu: boolean = false;
  public navList: NavigationItem[];
  private stateSubscription!: Subscription;

  constructor(private stateService: StateService) {
    this.navList = [
      {
        "label": "Accueil",
        "route": "accueil",
        "active": true
      },
      {
        "label": "Les matchs",
        "route": "les-matchs",
        "active": false
      },
      {
        "label": "Euro 2024",
        "route": "infos",
        "active": false,
        "sub": [
          {
            "label": "Les équipes",
            "route": "les-equipes",
            "active": false
          },
          {
            "label": "Les stades",
            "route": "les-stades",
            "active": false
          }
        ]
      },
      {
        "label": "Les Jeux",
        "route": "jeux",
        "active": false,
        "sub": [
          {
            "label": "Meilleurs Joueurs",
            "route": "meilleur-buteur",
            "active": false
          },
          {
            "label": "Pronostic",
            "route": "pronostiques",
            "active": false
          },
          {
            "label": "Jeu du bracket",
            "route": "bracket",
            "active": false
          },
          {
            "label": "Classement IML",
            "route": "classement",
            "active": false
          }
        ]
      },
      {
        "label": "Faq",
        "route": "faq",
        "active": false
      }
    ];
  }

  ngOnInit() {
    this.stateSubscription = this.stateService.currentState.subscribe((state: AppState) => {
      const currentRoute = state.currentPage;
      this.updateActiveNavItem(currentRoute);
    });
  }


  private updateActiveNavItem(currentRoute: string) {
    this.navList.forEach(item => {
      item.active = item.route === currentRoute;

      if (item.sub) {
        item.sub.forEach(subItem => {
          subItem.active = subItem.route === currentRoute;
          if (subItem.active) {
            item.active = true;
          }
        });
      }
    });
  }

  public navTo(currentRoute: string, pageName: string) {
    this.stateService.updateState({ currentPage: currentRoute });
    location.href = `#${currentRoute}`;
    this.showMenu = false;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnDestroy() {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
  }
}
