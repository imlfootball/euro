export interface teamsApi {
  data: Teams[];
}

export interface Teams {
  id: number;
  status: string;
  sort: null | any;
  owner: number;
  created_on: Date;
  modified_by: number;
  modified_on: Date;
  name: string;
  group: string;
  group_points: number;
  won: number;
  draw: number;
  lost: number;
  flag_url: string;
  badge_url: string;
  showDetails: boolean
}