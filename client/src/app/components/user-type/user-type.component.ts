import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// add imports
import { UserTypeEditComponent } from '../user-type/user-type-edit/user-type-edit.component';
import { UsertypesService } from '../../services/user-types/usertypes.service';
import { AlertService } from './../../services/utils/alert.service';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.css']
})
export class UserTypeComponent implements OnInit {

  private usertypes: Array<any> = [];
  private token: string = localStorage.getItem('token');

  private usertype = {
    id_user_type: 0,
    name: ''
  };

  constructor(
    private modalService: NgbModal,
    private userTypesServ: UsertypesService,
    private alertServ: AlertService
  ) { }

  ngOnInit() {
    this.uploadListUserTypes();
    this.userTypesServ.getEmitter().subscribe(data => {
      if (data) {
        this.uploadListUserTypes();
      }
    });
  }

  async uploadListUserTypes() {
    try {
      const result: Array<any> = await this.userTypesServ.getUserTypes(this.token).toPromise();
      const resultado: any = result;
      this.usertypes = resultado.results;
    } catch (error) {
      this.alertServ.error(error.response, 'Error al Listar los Tipos de Usuarios!');
    }
  }

  openModal(usertype: any) {
    if (usertype) {
      this.usertype = usertype;
      const modalRef = this.modalService.open(UserTypeEditComponent);
      modalRef.componentInstance.usertype = this.usertype;
    } else {
      this.modalService.open(UserTypeEditComponent);
    }
  }

  delete(id: number) {
    try {
      this.userTypesServ.delete(id, this.token)
        .subscribe(res => {
          this.usertypes = this.usertypes.filter(usertype => id !== usertype.id_user_type);
          this.alertServ.error('Usted ha borrado un tipo de usuario de la lista', 'Tipo de Usuario Borrado!');
        });
    } catch (error) {
      this.alertServ.error(error.response, 'Error al Borrar!');
    }
  }

}
