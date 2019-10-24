import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// add imports
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';

import { AuthGuardService } from './services/guard/auth-guard.service';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { HomeComponent } from './components/home/home.component';
import { UserTypeComponent } from './components/user-type/user-type.component';
import { UserTypeEditComponent } from './components/user-type/user-type-edit/user-type-edit.component';
import { TournamentComponent } from './components/tournament/tournament.component';
import { TeamComponent } from './components/team/team.component';
import { FixtureComponent } from './components/fixture/fixture.component';
import { TeamEditComponent } from './components/team/team-edit/team-edit.component';
import { TournamentEditComponent } from './components/tournament/tournament-edit/tournament-edit.component';
import { WeekComponent } from './components/fixture/week/week.component';
import { MatchWeekComponent } from './components/fixture/week/match-week/match-week.component';
import { MatchWeekEditComponent } from './components/fixture/week/match-week/match-week-edit/match-week-edit.component';
import { UserTokenComponent } from './components/user-token/user-token.component';
import { UserTokenEditComponent } from './components/user-token/user-token-edit/user-token-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    UserRegisterComponent,
    UserDetailsComponent,
    HomeComponent,
    UserTypeComponent,
    UserTypeEditComponent,
    TournamentComponent,
    TeamComponent,
    FixtureComponent,
    TeamEditComponent,
    TournamentEditComponent,
    WeekComponent,
    MatchWeekComponent,
    MatchWeekEditComponent,
    UserTokenComponent,
    UserTokenEditComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
  entryComponents: [
    UserTypeEditComponent,
    TeamEditComponent,
    TournamentEditComponent,
    MatchWeekEditComponent,
    UserTokenEditComponent
  ]
})
export class AppModule { }
