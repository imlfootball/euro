import { Component, inject } from '@angular/core';
import { MatchesService } from '../../../shared/services/content/matches.service';
import { Observable } from 'rxjs';
import { Matches } from '../../../shared/contracts/matches.contract';
import { map } from 'rxjs/operators';
import { StateService } from '../../../shared/services/core/state.service';

@Component({
  selector: 'app-pronostiques',
  templateUrl: './pronostiques.component.html',
  styleUrl: './pronostiques.component.scss'
})
export class PronostiquesComponent {

  private matchesService = inject(MatchesService);
  private stateService = inject(StateService);
  protected isLoggedIn: boolean = false;

  $groupedMatches!: Observable<{ [key: string]: Matches[] }>;

  ngOnInit(): void {
    this.$groupedMatches = this.matchesService.getAllMatches().pipe(
      map(matches => this.groupMatchesByDate(matches))
    );

    this.stateService.userState.subscribe({
      next: (res) => {
        this.isLoggedIn = !!res.id;
      }
    });
  }

  groupMatchesByDate(matches: Matches[]): { [key: string]: Matches[] } {
    const now = new Date();
    const daysFromNow = new Date();

    // define here interval on which the matches should appear
    daysFromNow.setDate(now.getDate() + 4);

    return matches.reduce((groups, match) => {
      const matchDate = new Date(match.date);
      if (matchDate <= daysFromNow) {
        const dateKey = match.date.split(' ')[0];
        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }
        groups[dateKey].push(match);
      }
      return groups;
    }, {} as { [key: string]: Matches[] });
  }

  getDates(groupedMatches: { [key: string]: Matches[] }): string[] {
    return Object.keys(groupedMatches).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }

}
