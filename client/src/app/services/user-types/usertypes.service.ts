import { Injectable, Output, EventEmitter } from '@angular/core';

// add imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';


const ApiRoutes = {
  usertype: 'usertype/usertype',
  usertypes: 'usertype/usertypes'
};

@Injectable({
  providedIn: 'root'
})
export class UsertypesService {
  @Output() usertypeslist: EventEmitter<any> = new EventEmitter<any>();

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

  public create(usertype: any, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.usertype}`;
    return this.http.post(uri, JSON.stringify(usertype), this.loadHeaders(token));
  }

  public getUserTypes(token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.usertypes}`;
    return this.http.get<Array<any>>(uri, this.loadHeaders(token));
  }

  public update(usertype: any, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.usertype}/${usertype.id_user_type}`;
    return this.http.put<any>(uri, JSON.stringify(usertype), this.loadHeaders(token));
  }

  public delete(id: number, token: string = '') {
    const uri = `${this.env.api_url}/${ApiRoutes.usertype}/${id}`;
    return this.http.delete<any>(uri, this.loadHeaders(token));
  }

  updateList() {
    this.usertypeslist.emit(true);
  }

  getEmitter() {
    return this.usertypeslist;
  }
}
