import { Component, OnInit } from '@angular/core';

// add imports
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { AlertService } from './../../services/utils/alert.service';
import { LoginService } from './../../services/utils/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: any = {};
  private token: string = '';

  constructor(
    private router: Router,
    private usersServ: UsersService,
    private alertServ: AlertService,
    private loginServ: LoginService
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      localStorage.removeItem('token');
      localStorage.removeItem('userC');
      this.loginServ.isLogin();
    }
    this.user = {
      email: '',
      password: ''
    };
  }

  async signin(form: FormGroup) {
    if (form.valid) {
      try {
        const response = await this.usersServ.login(this.user).toPromise();
        const tKey: string = 'token';
        const uKey: string = 'user';
        if (response[tKey]) {
          const token: string = response[tKey];
          localStorage.setItem('token', token);
          const userVal: any = response[uKey];
          localStorage.setItem('userC', JSON.stringify(userVal));
          this.loginServ.isLogin();
          this.router.navigate(['/home']);
          this.alertServ.info('Ha iniciado correctamente sesión', 'Inicio Sesión');
          return;
        } else {
          this.alertServ.error('Datos Incorrectos', 'Error al Iniciar Sesión');
        }
      } catch (error) {
        this.alertServ.error(error, 'Error al Iniciar Sesión');
      }
    } else {
      return this.alertServ.warning('Login invalido', 'Faltan Datos');
    }
  }
}
