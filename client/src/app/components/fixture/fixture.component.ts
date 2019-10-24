import { Component, OnInit } from '@angular/core';

// add imports
import { FormGroup } from '@angular/forms';
import { FixturesService } from './../../services/fixtures/fixtures.service';
import { TournamentsService } from './../../services/tournaments/tournaments.service';
import { AlertService } from './../../services/utils/alert.service';



@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {

  private fixtures: Array<any> = [];
  private tournaments: Array<any> = [];
  private token: string = localStorage.getItem('token');
  private fixture: any = {
    id_fixture: 0,
    id_tournament: 0
  };

  constructor(
    private fixtureServ: FixturesService,
    private tournamentServ: TournamentsService,
    private alertServ: AlertService
  ) { }

  ngOnInit() {
    this.uploadListFixture();
    this.uploadListTournaments();
    this.fixtureServ.getEmitter().subscribe(data => {
      if (data) {
        this.uploadListFixture();
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

  async uploadListFixture() {
    try {
      const result: Array<any> = await this.fixtureServ.getFixtures(this.token).toPromise();
      const resultado: any = result;
      this.fixtures = resultado.results;
    } catch (error) {
      this.alertServ.error(error.response, 'Error al Listar la info!');
    }
  }

  async insertFixture(form: FormGroup) {
    if (form.valid && form.controls.id_tournament.value > 0) {
      try {
        this.fixture.id_tournament = form.controls.id_tournament.value;
        const response: any = await this.fixtureServ.create(this.fixture, this.token).toPromise();
        if (response.value === 0) {
          this.alertServ.warning(response.message, 'Alta de Fixture');
        } else {
          this.alertServ.success(response.message, 'Alta de Fixture');
          this.fixtureServ.updateList();
        }
      } catch (error) {
        this.alertServ.error(error, 'Error al crear el Fixture');
      }
    } else {
      this.alertServ.warning('Debe seleccionar el torneo', 'Elegir Torneo!');
    }
  }

  delete(id: number) {
    try {
      this.fixtureServ.delete(id, this.token)
        .subscribe((res: any) => {
          this.fixtures = this.fixtures.filter(fixture => id !== fixture.id_tournament);
          this.alertServ.error(res.results[0], 'Borrar Fixture!');
        });
    } catch (error) {
      this.alertServ.error(error.response, 'Error al Borrar!');
    }
  }

}
