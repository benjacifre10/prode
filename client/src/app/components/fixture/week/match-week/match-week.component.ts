import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// add imports
import { ActivatedRoute } from '@angular/router';
import { MatchWeekEditComponent } from './match-week-edit/match-week-edit.component';
import { MatchWeeksService } from './../../../../services/match-weeks/match-weeks.service';
import { TeamsService } from './../../../../services/teams/teams.service';
import { AlertService } from './../../../../services/utils/alert.service';

@Component({
  selector: 'app-match-week',
  templateUrl: './match-week.component.html',
  styleUrls: ['./match-week.component.css']
})
export class MatchWeekComponent implements OnInit {

  private init: any = {
    fixture: 0,
    week: 0,
    number: 0
  };
  private matchWeeks: Array<any> = [];
  private teams: Array<any> = [];
  private token: string = localStorage.getItem('token');
  private matchWeek: any = {
    id_match_week: 0,
    local: 0,
    localName: '',
    visitor: 0,
    visitorName: '',
    goals_for: 0,
    goals_against: 0,
    dateMatch: null,
    id_week: 0
  };
  private final: Array<any> = [];

  constructor(
    private actRoute: ActivatedRoute,
    private modalServ: NgbModal,
    private matchServ: MatchWeeksService,
    private teamServ: TeamsService,
    private alertServ: AlertService
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe(param => {
      let parameters: Array<any> = [];
      parameters = param.id.split(',');
      this.init.fixture = parameters[0];
      this.init.week = parameters[1];
      this.init.number = parameters[2];
      this.uploadListMatchWeek(this.init.week);
      this.matchServ.getEmitter().subscribe(data => {
        if (data) {
          this.final = [];
          this.uploadListMatchWeek(this.init.week);
        }
      });
    });
  }

  async uploadListMatchWeek(id: number) {
    try {
      const res: Array<any> = await this.matchServ.getMatchWeek(id, this.token).toPromise();
      const resultado: any = res;
      if (resultado.results === -1) {
        this.alertServ.warning(resultado.message, 'No hay info para cargar!');
        return;
      }
      this.matchWeeks = resultado.results;
      const res2: Array<any> = await this.teamServ.getTeams(this.token).toPromise();
      const resultado2: any = res2;
      this.teams = resultado2.results;
      this.matchWeeks.forEach(match => {
        this.matchWeek.id_match_week = match.id_match_week;
        this.matchWeek.local = match.local;
        this.matchWeek.visitor = match.visitor;
        this.matchWeek.goals_for = match.goals_for;
        this.matchWeek.goals_against = match.goals_against;
        this.matchWeek.dateMatch = match.dateMatch;
        this.matchWeek.id_week = match.id_week;
        this.teams.forEach(team => {
          if (this.matchWeek.local === team.id_team) {
            this.matchWeek.localName = team.name;
          }
          if (this.matchWeek.visitor === team.id_team) {
            this.matchWeek.visitorName = team.name;
          }
        });
        this.final.push(Object.assign({}, this.matchWeek));
      });
    } catch (error) {
      this.alertServ.warning('error.error.message', 'No hay info para cargar!');
    }
  }

  openModal(match: any) {
    if (match) {
      this.matchWeek = match;
      const modalRef = this.modalServ.open(MatchWeekEditComponent);
      modalRef.componentInstance.matchWeek = this.matchWeek;
    } else {
      const modalRef = this.modalServ.open(MatchWeekEditComponent);
      modalRef.componentInstance.week = this.init.week;
    }
  }

  delete(id: number) {
    try {
      this.matchServ.delete(id, this.token)
        .subscribe(res => {
          this.final = this.final.filter(match => id !== match.id_match_week);
          this.alertServ.success('Usted ha un partido de la fecha', 'Partido Borrado!');
        });
    } catch (error) {
      this.alertServ.error(error.response, 'Error al Borrar!');
    }
  }

}
