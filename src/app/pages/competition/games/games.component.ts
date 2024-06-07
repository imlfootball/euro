import { Component, OnInit, inject } from '@angular/core';
import { MatchesService } from '../../../shared/services/content/matches.service';
import { Matches } from '../../../shared/contracts/matches.contract';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit{

  private matchesService = inject(MatchesService);

  // $matches!: Observable<Matches[]>;

  $groupedMatches!: Observable<{ [key: string]: Matches[] }>;

  ngOnInit(): void {
    this.$groupedMatches = this.matchesService.getAllMatches().pipe(
      map(matches => this.groupMatchesByDate(matches))
    );
  }

  groupMatchesByDate(matches: Matches[]): { [key: string]: Matches[] } {
    return matches.reduce((groups, match) => {
      const date = match.date.split(' ')[0]; // Extract the date part only
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
