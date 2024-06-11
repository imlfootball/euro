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
  protected isLoggedIn:boolean = false;

  $groupedMatches!: Observable<{ [key: string]: Matches[] }>;


  ngOnInit(): void {
    this.$groupedMatches = this.matchesService.getAllMatches().pipe(
      map(matches => this.groupMatchesByDate(matches))
    )

    this.stateService.userState.subscribe({
      next: (res) => {
        (res.id) ? this.isLoggedIn = true: this.isLoggedIn = false; 
      }
    })
  }

  groupMatchesByDate(matches: Matches[]): { [key: string]: Matches[] } {
    // console.log(matches);
    
    return matches.reduce((groups, match) => {
      const date = match.date.split(' ')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(match);
      return groups;
    }, {} as { [key: string]: Matches[] });
  }

  getDates(groupedMatches: { [key: string]: Matches[] }): string[] {
    return Object.keys(groupedMatches).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }
}
