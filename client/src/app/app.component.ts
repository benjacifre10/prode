import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

// add imports
import { Router } from '@angular/router';
import { LoginService } from './services/utils/login.service';
import { MatchWeeksService } from './services/match-weeks/match-weeks.service';
import { AlertService } from './services/utils/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'Prode';
  private access: boolean = false;
  private token: string = '';
  private user: any = {
    name: '',
    surname: ''
  };

  private $counter: Observable<number>;
  private diff: number;
  private subscription: Subscription;
  private message: string;
  private final: Array<any> = [];

  private nextMatch: any = {
    localTeam: '',
    localShield: '',
    visitorTeam: '',
    visitorShield: '',
    dateMatch: null
  };

  constructor(
    private router: Router,
    private loginServ: LoginService,
    private matchweeksServ: MatchWeeksService,
    private alertServ: AlertService
  ) {}

  dhms(t) {
    let days;
    let hours;
    let minutes;
    let seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
        days + 'd',
        hours + 'h',
        minutes + 'm',
        seconds + 's'
    ].join(' ');
  }

  ngOnInit() {
    const nextMatch = this.getNextMatch();
    this.$counter = interval(1000).pipe(
      map((x) => {
         this.diff = Math.floor((new Date('12/12/2019 10:00 AM').getTime() - new Date().getTime()) / 1000);
         return x;
     }));
    this.subscription = this.$counter
     .subscribe((x) => this.message = this.dhms(this.diff));

    this.loginServ.getEmitter().subscribe(data => {
      if (data) {
        this.access = true;
        this.user = JSON.parse(localStorage.getItem('userC'));
      } else {
        this.access = false;
        this.user = undefined;
      }
    });
    if (!this.access) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('userC'));
      if (this.token) {
        this.access = true;
      }
    }
  }

  toggle() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
  }

  async getNextMatch() {

    return null;
  }

  private logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userC');
    this.loginServ.isLogin();
    this.router.navigate(['/login']);
    this.alertServ.info('Usted ha cerrado sesión', 'Fin Sesión!');
  }

}
