export interface teamsApiData {
  data: Teams[];
}

export interface playersApiData {
  data: Players[];
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
  information: any;
  showDetails: boolean
}

export interface Players {
  id: number;
  status: string;
  owner: string | null;
  created_on: string | null;
  name: string;
  position: string;
  team: string;
  player_number: number | null;
  image_link: string | null;
}
