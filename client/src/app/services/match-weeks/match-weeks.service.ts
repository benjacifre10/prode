import { Injectable, Output, EventEmitter } from '@angular/core';

// add imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

const ApiRoutes = {
  matchweek: 'matchweek/matchweek'
};

@Injectable({
  providedIn: 'root'
})
export class MatchWeeksService {
  @Output() matchweekslist: EventEmitter<any> = new EventEmitter<any>();

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

  public getMatchWeek(id: number, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.matchweek}/${id}`;
    return this.http.get<Array<any>>(uri, this.loadHeaders(token));
  }

  public create(matchWeek: any, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.matchweek}`;
    return this.http.post(uri, JSON.stringify(matchWeek), this.loadHeaders(token));
  }

  public update(matchWeek: any, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.matchweek}/${matchWeek.id_match_week}`;
    return this.http.put<any>(uri, JSON.stringify(matchWeek), this.loadHeaders(token));
  }

  public delete(id: number, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.matchweek}/${id}`;
    return this.http.delete<any>(uri, this.loadHeaders(token));
  }

  updateList() {
    this.matchweekslist.emit(true);
  }

  getEmitter() {
    return this.matchweekslist;
  }


}
