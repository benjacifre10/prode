import { Injectable, Output, EventEmitter } from '@angular/core';

// add imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

const ApiRoutes = {
  week: 'week/week'
};

@Injectable({
  providedIn: 'root'
})
export class WeeksService {
  @Output() weekslist: EventEmitter<any> = new EventEmitter<any>();

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

  public create(week: any, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.week}`;
    return this.http.post(uri, JSON.stringify(week), this.loadHeaders(token));
  }

  public getWeek(id: number, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.week}/${id}`;
    return this.http.get<Array<any>>(uri, this.loadHeaders(token));
  }

  public delete(id: number, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.week}/${id}`;
    return this.http.delete(uri, this.loadHeaders(token));
  }

  updateList() {
    this.weekslist.emit(true);
  }

  getEmitter() {
    return this.weekslist;
  }
}
