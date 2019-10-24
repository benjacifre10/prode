import { Component, OnInit } from '@angular/core';

// add imports
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../../../services/users/users.service';
import { AlertService } from './../../../services/utils/alert.service';
import { LoginService } from './../../../services/utils/login.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

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
      password: '',
      name: '',
      surname: '',
      id_user_type: 3
    };
  }

  async signup(form: FormGroup) {
    if (form.valid) {
      try {
        const response = await this.usersServ.create(this.user).toPromise();
        this.alertServ.success('Usuario creado correctamente', 'Alta de Usuario');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        return;
      } catch (error) {
        this.alertServ.error(error, 'Error al crear Usuario');
      }
    } else {
      return this.alertServ.warning('Debe ingresar todos los campos', 'Formulario Incompleto');
    }
  }

}
