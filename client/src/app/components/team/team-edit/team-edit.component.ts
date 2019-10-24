import { Component, OnInit, Input } from '@angular/core';

// add imports
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamsService } from './../../../services/teams/teams.service';
import { AlertService } from './../../../services/utils/alert.service';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {
  @Input() team: any;

  private token: string = localStorage.getItem('token');
  private title: string = '';

  constructor(
    private router: Router,
    private teamsServ: TeamsService,
    private alertServ: AlertService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    if (!this.team) {
      this.team = {
        id_team: 0,
        name: '',
        acronym: '',
        shield: ''
      };
      this.title = 'Nuevo Equipo';
    } else {
      this.title = 'Editar Equipo';
    }
  }

  async updateOrInsert(form: FormGroup) {
    if (form.valid) {
      this.team.name = form.controls.name.value;
      this.team.acronym = form.controls.acronym.value;
      this.team.shield = form.controls.shield.value;
      if (this.team.id_team > 0) {
        try {
          const response = await this.teamsServ.update(this.team, this.token).toPromise();
          if (response.results > 0) {
            this.alertServ.success(response.message, 'Equipo Actualizado!');
            this.activeModal.close();
          }
        } catch (error) {
          this.alertServ.error(error, 'Error al actualizar el Equipo');
        }
      } else {
        try {
          const response: any = await this.teamsServ.create(this.team, this.token).toPromise();
          this.alertServ.success(response.message, 'Alta de Equipo');
          this.activeModal.close();
          this.teamsServ.updateList();
          this.router.navigate(['/team']);
        } catch (error) {
          this.alertServ.error(error, 'Error al crear el Equipo');
        }
      }
    } else {
      return this.alertServ.warning('Debe ingresar todos los campos', 'Formulario Incompleto');
    }
  }

}
