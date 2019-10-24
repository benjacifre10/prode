import { Component, OnInit } from '@angular/core';

// add imports
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../../../services/users/users.service';
import { AlertService } from './../../../services/utils/alert.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private user: any = {};
  private token: string = localStorage.getItem('token');

  constructor(
    private actRoute: ActivatedRoute,
    private usersServ: UsersService,
    private alertServ: AlertService
  ) { }

  async ngOnInit() {
    this.user = {
      id_user: null,
      name: '',
      surname: '',
      email: ''
    };

    this.actRoute.params.subscribe(param => {
      const id: number = param.id;
      this.usersServ.getUser(id, this.token)
        .subscribe(data => {
          this.user = data.results[0];
        });
    });
  }

  async onSave(form: FormGroup) {
    if (form.valid) {
      try {
        const response = await this.usersServ.update(this.user, this.token).toPromise();
        if (response.results > 0) {
          this.alertServ.success(response.message, 'Usuario Actualizado!');
        }
      } catch (error) {
        this.alertServ.error(error, 'Error al Actualizar!');
      }
    }
  }

}
