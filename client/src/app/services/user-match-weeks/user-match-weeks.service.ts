import { Injectable, Output, EventEmitter } from '@angular/core';

// add imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

const ApiRoutes = {
  usermatchweek: 'usermatchweek/usermatchweek'
};

@Injectable({
  providedIn: 'root'
})
export class UserMatchWeeksService {
  @Output() usermatchweekslist: EventEmitter<any> = new EventEmitter<any>();

  private env = environment;

  constructor(
    private http: HttpClient
  ) { }

  private loadHeaders(token: string = '') {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `${token}`
    });
    return { headers };
  }

  public getUserMatchWeek(id: number, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.usermatchweek}/${id}`;
    return this.http.get<Array<any>>(uri, this.loadHeaders(token));
  }

  updateList() {
    this.usermatchweekslist.emit(true);
  }

  getEmitter() {
    return this.usermatchweekslist;
  }
}
