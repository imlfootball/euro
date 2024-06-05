import { Component, Input, OnInit } from '@angular/core';
import { Teams } from '../../contracts/teams.contract';

@Component({
  selector: 'team-details',
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.scss'
})
export class TeamDetailsComponent implements OnInit {

  @Input() team!: Teams;

  ngOnInit(): void {
    console.log(this.team);
  }
}
