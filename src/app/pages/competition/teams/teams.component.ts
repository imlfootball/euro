import { Component, Host, OnInit, Optional, inject } from '@angular/core';
import { StateService } from '../../../shared/services/core/state.service';
import { TeamsService } from '../../../shared/services/content/teams.service';
import { Observable, map } from 'rxjs';
import { Team, Player, Coach}  from '../../../shared/contracts/teams.contract';
import { breadCrump } from '../../../shared/components/breadcrump/breadcrump.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})

export class TeamsComponent implements OnInit {

  private euroService = inject(TeamsService);
  private stateService = inject(StateService);

  $teamsData?: Observable<Team[]>;

  breadCrumpDefault: breadCrump[] = [{label: 'Les Equipes', route: 'closeTeamDetails', active: true }];

  breadCrumpData: breadCrump[] = [];

  ngOnInit(){
    this.breadCrumpData = this.breadCrumpDefault;
    this.setTeamsData();
  }

  setTeamsData(): void {
    this.$teamsData = this.euroService.getAllTeams().pipe(
      map((teams: Team[]) => {
        teams.forEach(team => team.showDetails = false);
        // Sorting details of teams by team name
        return teams.sort((a, b) => a.team_name.localeCompare(b.team_name));
      })
    )

    this.$teamsData?.subscribe((teams: Team[]) => {
      console.log(teams);
    });
  }

  showTeam(teamName: string): void {
    this.breadCrumpData = [];
    this.breadCrumpDefault[0].active = false;
    this.breadCrumpData.push(this.breadCrumpDefault[0], {label: teamName, route: '', active: true });
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth' // Optional: Smooth scrolling animation
    });
  }

  resetTeamSelection(ev: string): void {
    if(ev === 'closeTeamDetails') {
      this.breadCrumpData = [];
      this.breadCrumpData.push(this.breadCrumpDefault[0]);
      this.setTeamsData();
    }
  }

}