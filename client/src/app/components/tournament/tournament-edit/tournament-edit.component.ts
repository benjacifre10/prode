import { Component, OnInit, Input } from '@angular/core';

// add imports
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TournamentsService } from './../../../services/tournaments/tournaments.service';
import { AlertService } from './../../../services/utils/alert.service';

@Component({
  selector: 'app-tournament-edit',
  templateUrl: './tournament-edit.component.html',
  styleUrls: ['./tournament-edit.component.css']
})
export class TournamentEditComponent implements OnInit {
  @Input() tournament: any;

  private token: string = localStorage.getItem('token');
  private title: string = '';

  constructor(
    public router: Router,
    public tournamentServ: TournamentsService,
    public alertServ: AlertService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    if (!this.tournament) {
      this.tournament = {
        id_tournament: 0,
        name: ''
      };
      this.title = 'Nuevo Torneo';
    } else {
      this.title = 'Editar Torneo';
    }
  }

  async updateOrInsert(form: FormGroup) {
    if (form.valid) {
      this.tournament.name = form.controls.name.value;
      if (this.tournament.id_tournament > 0) {
        try {
          const response = await this.tournamentServ.update(this.tournament, this.token).toPromise();
          if (response.results > 0) {
            this.alertServ.success(response.message, 'Torneo Actualizado!');
            this.activeModal.close();
          }
        } catch (error) {
          this.alertServ.error(error, 'Error al actualizar el Torneo');
        }
      } else {
        try {
          const response: any = await this.tournamentServ.create(this.tournament, this.token).toPromise();
          this.alertServ.success(response.message, 'Alta de Torneo');
          this.activeModal.close();
          this.tournamentServ.updateList();
          this.router.navigate(['/tournament']);
        } catch (error) {
          this.alertServ.error(error, 'Error al crear el Torneo');
        }
      }
    } else {
      return this.alertServ.warning('Debe ingresar todos los campos', 'Formulario Incompleto');
    }
  }

}
