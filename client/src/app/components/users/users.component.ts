import { Component, OnInit } from '@angular/core';

// add imports
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { AlertService } from './../../services/utils/alert.service';
import { LoginService } from './../../services/utils/login.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private users: Array<any> = [];
  private token: string = localStorage.getItem('token');

  constructor(
    private router: Router,
    private usersServ: UsersService,
    private alertServ: AlertService,
    private loginServ: LoginService
  ) { }

  async ngOnInit() {
    try {
      const result: Array<any> = await this.usersServ.getUsers(this.token).toPromise();
      const resultado: any = result;
      this.users = resultado.results;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('userC');
      this.loginServ.isLogin();
      this.router.navigate(['/login']);
    }
  }

  private delete(id: number) {
    this.usersServ.delete(id, this.token)
      .subscribe(res => {
        this.users = this.users.filter(user => id !== user.id_user);
        this.alertServ.error('Usted ha borrado un usuario de la lista', 'Usuario Borrado!');
        if (this.users.length < 1) {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      });
  }

}
