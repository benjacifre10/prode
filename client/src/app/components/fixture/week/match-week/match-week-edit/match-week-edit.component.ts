import { Component, OnInit, Input } from '@angular/core';

// add imports
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatchWeeksService } from './../../../../../services/match-weeks/match-weeks.service';
import { TeamsService } from './../../../../../services/teams/teams.service';
import { AlertService } from './../../../../../services/utils/alert.service';


@Component({
  selector: 'app-match-week-edit',
  templateUrl: './match-week-edit.component.html',
  styleUrls: ['./match-week-edit.component.css']
})
export class MatchWeekEditComponent implements OnInit {
  @Input() matchWeek: any;
  @Input() week: any;

  private teams: Array<any> = [];
  private token: string = localStorage.getItem('token');
  private title: string = '';

  constructor(
    private router: Router,
    private matchServ: MatchWeeksService,
    private teamsServ: TeamsService,
    private alertServ: AlertService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    if (!this.matchWeek) {
      this.matchWeek = {
        id_match_week: 0,
        local: 0,
        visitor: 0,
        goals_for: 0,
        goals_against: 0,
        dateMatch: new Date(),
        id_week: 0
      };
      this.title = 'Nuevo Partido';
    } else {
      this.title = 'Editar Partido';
    }
    this.uploadListTeams();
  }

  adjustForTimezone(date: Date): Date {
    const timeOffsetInMS: number = date.getTimezoneOffset() * 60000;
    date.setTime(date.getTime() - timeOffsetInMS);
    return date;
  }

  async uploadListTeams() {
    try {
      const result: Array<any> = await this.teamsServ.getTeams(this.token).toPromise();
      const resultado: any = result;
      this.teams = resultado.results;
    } catch (error) {
      this.alertServ.error(error.response, 'Error al Listar los Equipos!');
    }
  }

  async updateOrInsert(form: FormGroup) {
    if (form.valid) {
      this.matchWeek.local = form.controls.local.value;
      this.matchWeek.visitor = form.controls.visitor.value;
      this.matchWeek.goals_for = form.controls.goals_for.value;
      this.matchWeek.goals_against = form.controls.goals_against.value;
      this.matchWeek.dateMatch = form.controls.dateMatch.value;
      if (this.matchWeek.id_match_week > 0) {
        try {
          const partido: any = {
            id_match_week: this.matchWeek.id_match_week,
            local: this.matchWeek.local,
            visitor: this.matchWeek.visitor,
            goals_for: this.matchWeek.goals_for,
            goals_against: this.matchWeek.goals_against,
            dateMatch: this.matchWeek.dateMatch,
            id_week: this.matchWeek.id_week
          };
          const response = await this.matchServ.update(partido, this.token).toPromise();
          if (response.results > 0) {
            this.alertServ.success(response.message, 'Partido Actualizado!');
            this.matchServ.updateList();
            this.activeModal.close();
          } else {
            this.alertServ.warning(response.message, 'Partido Sin Actualizar!');
            this.activeModal.close();
          }
        } catch (error) {
          this.alertServ.error(error, 'Error al actualizar el Equipo');
        }
      } else {
        try {
          if (this.matchWeek.local === this.matchWeek.visitor) {
            this.alertServ.warning('No puede elegir dos veces el mismo equipo', 'Alta de Partido');
            return;
          }
          this.matchWeek.id_week = this.week;
          const response: any = await this.matchServ.create(this.matchWeek, this.token).toPromise();
          if (response.value === 0) {
            this.alertServ.warning(response.message, 'Alta de Partido');
            return;
          }
          this.alertServ.success(response.message, 'Alta de Partido');
          this.matchServ.updateList();
          this.activeModal.close();
        } catch (error) {
          this.alertServ.error(error, 'Error al crear el Equipo');
        }
      }

    } else {
      return this.alertServ.warning('Debe ingresar todos los campos', 'Formulario Incompleto');
    }
  }

}
