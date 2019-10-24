import { Injectable } from '@angular/core';

// add imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';


const ApiRoutes = {
  login: 'user/login',
  signup: 'user/signup',
  users: 'user/users',
  usersType: 'user/userstype'
};


@Injectable({
  providedIn: 'root'
})
export class UsersService {

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

  public login(user: any) {
    const uri = `${this.env.api_url}/${ApiRoutes.login}`;
    return this.http.post(uri, JSON.stringify(user), this.loadHeaders());
  }

  public create(user: any) {
    const uri = `${this.env.api_url}/${ApiRoutes.signup}`;
    return this.http.post(uri, JSON.stringify(user), this.loadHeaders());
  }

  public getUsers(token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.users}`;
    return this.http.get<Array<any>>(uri, this.loadHeaders(token));
  }

  public getUser(id: number, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.users}/${id}`;
    return this.http.get<any>(uri, this.loadHeaders(token));
  }

  public getUserByType(id: number, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.usersType}/${id}`;
    return this.http.get<Array<any>>(uri, this.loadHeaders(token));
  }

  public update(user: any, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.users}/${user.id_user}`;
    return this.http.put<any>(uri, JSON.stringify(user), this.loadHeaders(token));
  }

  public delete(id: number, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.users}/${id}`;
    return this.http.delete(uri, this.loadHeaders(token));
  }

}
