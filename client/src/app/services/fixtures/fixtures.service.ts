import { Injectable, Output, EventEmitter } from '@angular/core';

// add imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

const ApiRoutes = {
  fixture: 'fixture/fixture',
  fixtures: 'fixture/fixtures'
};

@Injectable({
  providedIn: 'root'
})
export class FixturesService {
  @Output() fixtureslist: EventEmitter<any> = new EventEmitter<any>();

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

  public create(fixture: any, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.fixture}`;
    return this.http.post(uri, JSON.stringify(fixture), this.loadHeaders(token));
  }

  public getFixtures(token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.fixtures}`;
    return this.http.get<Array<any>>(uri, this.loadHeaders(token));
  }

  public delete(id: number, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.fixture}/${id}`;
    return this.http.delete<any>(uri, this.loadHeaders(token));
  }

  updateList() {
    this.fixtureslist.emit(true);
  }

  getEmitter() {
    return this.fixtureslist;
  }
}
