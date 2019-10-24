import { Component, OnInit, Input } from '@angular/core';

// add imports
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsertypesService } from './../../../services/user-types/usertypes.service';
import { AlertService } from './../../../services/utils/alert.service';

@Component({
  selector: 'app-user-type-edit',
  templateUrl: './user-type-edit.component.html',
  styleUrls: ['./user-type-edit.component.css']
})
export class UserTypeEditComponent implements OnInit {
  @Input() usertype: any;

  private token: string = localStorage.getItem('token');
  private title: string = '';

  constructor(
    public router: Router,
    public usertypeServ: UsertypesService,
    public alertServ: AlertService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    if (!this.usertype) {
      this.usertype = {
        id_user_type: 0,
        name: ''
      };
      this.title = 'Nuevo Tipo Usuario';
    } else {
      this.title = 'Editar Tipo Usuario';
    }
  }

  async updateOrInsert(form: FormGroup) {
    if (form.valid) {
      this.usertype.name = form.controls.name.value;
      if (this.usertype.id_user_type > 0) {
        try {
          const response = await this.usertypeServ.update(this.usertype, this.token).toPromise();
          if (response.results > 0) {
            this.alertServ.success(response.message, 'Tipo Usuario Actualizado!');
            this.activeModal.close();
          }
        } catch (error) {
          this.alertServ.error(error, 'Error al actualizar el Tipo de Usuario');
        }
      } else {
        try {
          const response: any = await this.usertypeServ.create(this.usertype, this.token).toPromise();
          this.alertServ.success(response.message, 'Alta de Tipo de Usuario');
          this.activeModal.close();
          this.usertypeServ.updateList();
          this.router.navigate(['/user-type']);
        } catch (error) {
          this.alertServ.error(error, 'Error al crear el Tipo de Usuario');
        }
      }
    } else {
      return this.alertServ.warning('Debe ingresar todos los campos', 'Formulario Incompleto');
    }
  }

}
