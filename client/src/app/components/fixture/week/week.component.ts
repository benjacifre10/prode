import { Component, OnInit } from '@angular/core';

// add imports
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { WeeksService } from './../../../services/weeks/weeks.service';
import { AlertService } from './../../../services/utils/alert.service';


@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

  private weeks: Array<any> = [];
  private token: string = localStorage.getItem('token');
  private week: any = {
    id_week: 0,
    number: 0,
    id_fixture: 0
  };

  constructor(
    private actRoute: ActivatedRoute,
    private weekServ: WeeksService,
    private alertServ: AlertService
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe(param => {
      this.week.id_fixture = param.id;
      this.uploadListWeek(this.week.id_fixture);
      this.weekServ.getEmitter().subscribe(data => {
        if (data) {
          this.uploadListWeek(this.week.id_fixture);
        }
      });
    });
  }

  async uploadListWeek(id: number) {
    try {
      const result: Array<any> = await this.weekServ.getWeek(id, this.token).toPromise();
      const resultado: any = result;
      if (resultado.results === -1) {
        this.alertServ.warning(resultado.message, 'No hay info para cargar!');
        return;
      }
      this.weeks = resultado.results;
    } catch (error) {
      this.alertServ.warning(error.response, 'No hay info para cargar!');
    }
  }

  async insertWeek(form: FormGroup) {
    if (form.valid && form.controls.number.value > 0) {
      try {
        this.week.number = form.controls.number.value;
        const response: any = await this.weekServ.create(this.week, this.token).toPromise();
        if (response.value === 0) {
          this.alertServ.warning(response.message, 'Alta de Fecha');
        } else {
          this.alertServ.success(response.message, 'Alta de Fecha');
          this.weekServ.updateList();
        }
      } catch (error) {
        this.alertServ.error(error, 'Error al crear la Fecha');
      }
    } else {
      this.alertServ.warning('Debe ingresar un número válido', 'Ingresar Fecha!');
    }
  }

  delete(id: number) {
    try {
      this.weekServ.delete(id, this.token)
        .subscribe((res: any) => {
          if (res.results === -1) {
            this.alertServ.warning(res.message, 'Borrar Fecha!');
            return;
          }
          this.weeks = this.weeks.filter(week => id !== week.id_week);
          this.alertServ.error(res.message, 'Borrar Fecha!');
        });
    } catch (error) {
      this.alertServ.error(error.response, 'Error al Borrar!');
    }
  }

}
