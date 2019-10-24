import { Injectable, Output, EventEmitter } from '@angular/core';

// add imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

const ApiRoutes = {
  team: 'team/team',
  teams: 'team/teams'
};

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  @Output() teamslist: EventEmitter<any> = new EventEmitter<any>();

  private env = environment;

  constructor(
    private http: HttpClient
  ) { }

  private loadHeaders(token: string = '') {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `${token}`
    });
    return { headers };
  }

  public create(team: any, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.team}`;
    return this.http.post(uri, JSON.stringify(team), this.loadHeaders(token));
  }

  public getTeams(token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.teams}`;
    return this.http.get<Array<any>>(uri, this.loadHeaders(token));
  }

  public update(team: any, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.team}/${team.id_team}`;
    return this.http.put<any>(uri, JSON.stringify(team), this.loadHeaders(token));
  }

  public delete(id: number, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.team}/${id}`;
    return this.http.delete<any>(uri, this.loadHeaders(token));
  }

  updateList() {
    this.teamslist.emit(true);
  }

  getEmitter() {
    return this.teamslist;
  }
}
