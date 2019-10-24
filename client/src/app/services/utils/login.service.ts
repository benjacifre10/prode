import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  private token: string = '';

  constructor() { }

  isLogin() {

    this.token = localStorage.getItem('token');
    if (this.token) {
      this.fireIsLoggedIn.emit(true);
    } else {
      this.fireIsLoggedIn.emit(false);
    }
  }

  getEmitter() {
    return this.fireIsLoggedIn;
  }
}
