import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// add imports
import { TournamentEditComponent } from '../tournament/tournament-edit/tournament-edit.component';
import { TournamentsService } from '../../services/tournaments/tournaments.service';
import { AlertService } from './../../services/utils/alert.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  private tournaments: Array<any> = [];
  private token: string = localStorage.getItem('token');

  private tournament = {
    id_tournament: 0,
    name: ''
  };

  constructor(
    private modalService: NgbModal,
    private tournamentServ: TournamentsService,
    private alertServ: AlertService
  ) { }

  ngOnInit() {
    this.uploadListTournaments();
    this.tournamentServ.getEmitter().subscribe(data => {
      if (data) {
        this.uploadListTournaments();
      }
    });
  }

  async uploadListTournaments() {
    try {
      const result: Array<any> = await this.tournamentServ.getTournaments(this.token).toPromise();
      const resultado: any = result;
      this.tournaments = resultado.results;
    } catch (error) {
      this.alertServ.error(error.response, 'Error al Listar los Torneos!');
    }
  }

  openModal(tournament: any) {
    if (tournament) {
      this.tournament = tournament;
      const modalRef = this.modalService.open(TournamentEditComponent);
      modalRef.componentInstance.tournament = this.tournament;
    } else {
      this.modalService.open(TournamentEditComponent);
    }
  }

  delete(id: number) {
    try {
      this.tournamentServ.delete(id, this.token)
        .subscribe(res => {
          this.tournaments = this.tournaments.filter(tournament => id !== tournament.id_tournament);
          this.alertServ.error('Usted ha borrado un torneo de la lista', 'Torneo Borrado!');
        });
    } catch (error) {
      this.alertServ.error(error.response, 'Error al Borrar!');
    }
  }
}
