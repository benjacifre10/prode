import { Injectable, Output, EventEmitter } from '@angular/core';

// add imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

const ApiRoutes = {
  usertoken: 'usertoken/usertoken',
  usertokens: 'usertoken/usertokens'
};

@Injectable({
  providedIn: 'root'
})
export class UserTokensService {

  @Output() usertokenslist: EventEmitter<any> = new EventEmitter<any>();

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

  public create(usertoken: any, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.usertoken}`;
    return this.http.post(uri, JSON.stringify(usertoken), this.loadHeaders(token));
  }

  public getUserTokens(token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.usertokens}`;
    return this.http.get<Array<any>>(uri, this.loadHeaders(token));
  }

  public getUserToken(id: number, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.usertoken}/${id}`;
    return this.http.get<any>(uri, this.loadHeaders(token));
  }

  public update(usertoken: any, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.usertoken}/${usertoken.id_user}`;
    return this.http.put<any>(uri, JSON.stringify(usertoken), this.loadHeaders(token));
  }

  public delete(id: number, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.usertoken}/${id}`;
    return this.http.delete<any>(uri, this.loadHeaders(token));
  }

  updateList() {
    this.usertokenslist.emit(true);
  }

  getEmitter() {
    return this.usertokenslist;
  }
}
