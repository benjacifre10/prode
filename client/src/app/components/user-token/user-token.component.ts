import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// add imports
import { UserTokenEditComponent } from '../user-token/user-token-edit/user-token-edit.component';
import { UsersService } from '../../services/users/users.service';
import { UserTokensService } from './../../services/user-tokens/user-tokens.service';
import { AlertService } from './../../services/utils/alert.service';

@Component({
  selector: 'app-user-token',
  templateUrl: './user-token.component.html',
  styleUrls: ['./user-token.component.css']
})
export class UserTokenComponent implements OnInit {

  private usertokens: Array<any> = [];
  private users: Array<any> = [];
  private token: string = localStorage.getItem('token');
  private userType: number = 3;

  private usertoken = {
    id_user: 0,
    name_surname: '',
    update_date: null,
    amount: 0
  };
  private final: Array<any> = [];

  constructor(
    private modalService: NgbModal,
    private usersServ: UsersService,
    private userTokenServ: UserTokensService,
    private alertServ: AlertService
  ) { }

  ngOnInit() {
    this.uploadListUsersType();
    this.userTokenServ.getEmitter().subscribe(data => {
      if (data) {
        this.final = [];
        this.uploadListUsersType();
      }
    });
  }

  async uploadListUsersType() {
    try {
      const resultU: Array<any> = await this.usersServ.getUserByType(this.userType, this.token).toPromise();
      const resultadoU: any = resultU;
      this.users = resultadoU.results;
      const resultT: Array<any> = await this.userTokenServ.getUserTokens(this.token).toPromise();
      const resultadoT: any = resultT;
      this.usertokens = resultadoT.results;
      if (resultadoT.results === -1) {
        this.alertServ.warning(resultadoT.message, 'No hay info para cargar!');
        return;
      }
      this.usertokens.forEach(ut => {
        this.usertoken.id_user = ut.id_user;
        this.usertoken.update_date = ut.update_date;
        this.usertoken.amount = ut.amount;
        this.users.forEach(u => {
          if (this.usertoken.id_user === u.id_user) {
            this.usertoken.name_surname = `${u.name} ${u.surname}`;
          }
        });
        this.final.push(Object.assign({}, this.usertoken));
      });
    } catch (error) {
      this.alertServ.error(error.response, 'Error al Listar los Torneos!');
    }
  }

  openModal(usertoken: any) {
    if (usertoken) {
      this.usertoken = usertoken;
      const modalRef = this.modalService.open(UserTokenEditComponent);
      modalRef.componentInstance.usertoken = this.usertoken;
    } else {
      this.modalService.open(UserTokenEditComponent);
    }
  }

  delete(id: number) {
    try {
      this.userTokenServ.delete(id, this.token)
        .subscribe(res => {
          this.final = this.final.filter(usertoken => id !== usertoken.id_user);
          this.alertServ.error('Usted ha borrado un usuario con token de la lista', 'Usuario con Token Borrado!');
        });
    } catch (error) {
      this.alertServ.error(error.response, 'Error al Borrar!');
    }
  }
}

