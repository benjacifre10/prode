import { Component, OnInit, Input } from '@angular/core';

// add imports
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './../../../services/users/users.service';
import { UserTokensService } from './../../../services/user-tokens/user-tokens.service';
import { AlertService } from './../../../services/utils/alert.service';

@Component({
  selector: 'app-user-token-edit',
  templateUrl: './user-token-edit.component.html',
  styleUrls: ['./user-token-edit.component.css']
})
export class UserTokenEditComponent implements OnInit {

  @Input() usertoken: any;

  private users: Array<any> = [];
  private userType: number = 3;
  private token: string = localStorage.getItem('token');
  public title: string = '';

  constructor(
    public router: Router,
    public userServ: UsersService,
    public userTokenServ: UserTokensService,
    public alertServ: AlertService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    if (!this.usertoken) {
      this.usertoken = {
        id_user: 0,
        name_surname: '',
        update_date: new Date(),
        amount: 0
      };
      this.title = 'Nuevo Token';
    } else {
      this.title = 'Editar Token';
    }
    this.uploadListUsers();
  }

  adjustForTimezone(date: Date): Date {
    const timeOffsetInMS: number = date.getTimezoneOffset() * 60000;
    date.setTime(date.getTime() - timeOffsetInMS);
    return date;
  }

  keyPress(event: any) {
    const pattern = /[0-9.\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  async uploadListUsers() {
    try {
      const result: Array<any> = await this.userServ.getUserByType(this.userType, this.token).toPromise();
      const resultado: any = result;
      this.users = resultado.results;
    } catch (error) {
      this.alertServ.error(error.response, 'Error al Listar los Usuarios');
    }
  }

  async updateOrInsert(form: FormGroup) {
    if (form.valid) {
      const userT: any = {
        id_user: form.controls.id_user.value,
        update_date: this.adjustForTimezone(new Date()),
        amount: form.controls.amount.value
      };
      if (this.usertoken.id_user !== 0) {
        try {
          const response = await this.userTokenServ.update(userT, this.token).toPromise();
          if (response.results > 0) {
            this.alertServ.success(response.message, 'Token del Usuario Actualizado!');
            this.userTokenServ.updateList();
            this.activeModal.close();
          }
        } catch (error) {
          this.alertServ.error(error, 'Error al actualizar el Token del Usuario');
        }
      } else {
        try {
          const response: any = await this.userTokenServ.create(userT, this.token).toPromise();
          if (response.results === -1) {
            this.alertServ.warning(response.message, 'Alta de Token de Usuario');
          } else {
            this.alertServ.success(response.message, 'Alta de Token de Usuario');
            this.userTokenServ.updateList();
          }
          this.activeModal.close();
        } catch (error) {
          this.alertServ.error(error, 'Error al crear el Token del Usuario');
        }
      }
    } else {
      return this.alertServ.warning('Debe ingresar todos los campos', 'Formulario Incompleto');
    }
  }

}
