import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// add imports
import { TeamEditComponent } from './team-edit/team-edit.component';
import { TeamsService } from './../../services/teams/teams.service';
import { AlertService } from './../../services/utils/alert.service';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  private teams: Array<any> = [];
  private token: string = localStorage.getItem('token');

  private team = {
    id_team: 0,
    name: '',
    acronym: '',
    shield: ''
  };

  constructor(
    private modalService: NgbModal,
    private teamsServ: TeamsService,
    private alertServ: AlertService
  ) { }

  ngOnInit() {
    this.uploadListTeams();
    this.teamsServ.getEmitter().subscribe(data => {
      if (data) {
        this.uploadListTeams();
      }
    });
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

  openModal(team: any) {
    if (team) {
      this.team = team;
      const modalRef = this.modalService.open(TeamEditComponent);
      modalRef.componentInstance.team = this.team;
    } else {
      this.modalService.open(TeamEditComponent);
    }
  }

  delete(id: number) {
    try {
      this.teamsServ.delete(id, this.token)
        .subscribe(res => {
          this.teams = this.teams.filter(team => id !== team.id_team);
          this.alertServ.error('Usted ha borrado un equipo de la lista', 'Equipo Borrado!');
        });
    } catch (error) {
      this.alertServ.error(error.response, 'Error al Borrar!');
    }
  }

}
