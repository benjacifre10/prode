import { Component, OnInit } from '@angular/core';

// add imports
import { Router } from '@angular/router';
import { UserMatchWeeksService } from './../../services/user-match-weeks/user-match-weeks.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('userC'));
  public partidos: Array<any> = [];
  private token: string = localStorage.getItem('token');

  constructor(
    private router: Router,
    private userMWS: UserMatchWeeksService
  ) { }

  async ngOnInit() {
    try {
      const res: Array<any> = await this.userMWS.getUserMatchWeek(2, this.token).toPromise();
      const resultado: any = res;
      this.partidos = resultado.results;
      console.log('resultado', this.partidos);
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userC');
        this.router.navigate(['/']);
      }
    }
  }

}
