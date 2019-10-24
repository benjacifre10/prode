import { Injectable, Output, EventEmitter } from '@angular/core';

// add imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

const ApiRoutes = {
  tournament: 'tournament/tournament',
  tournaments: 'tournament/tournaments'
};

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {
  @Output() tournamentslist: EventEmitter<any> = new EventEmitter<any>();

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

  public create(tournament: any, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.tournament}`;
    return this.http.post(uri, JSON.stringify(tournament), this.loadHeaders(token));
  }

  public getTournaments(token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.tournaments}`;
    return this.http.get<Array<any>>(uri, this.loadHeaders(token));
  }

  public update(tournament: any, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.tournament}/${tournament.id_tournament}`;
    return this.http.put<any>(uri, JSON.stringify(tournament), this.loadHeaders(token));
  }

  public delete(id: number, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.tournament}/${id}`;
    return this.http.delete<any>(uri, this.loadHeaders(token));
  }

  updateList() {
    this.tournamentslist.emit(true);
  }

  getEmitter() {
    return this.tournamentslist;
  }

}
