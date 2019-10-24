import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// add imports
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { HomeComponent } from './components/home/home.component';
import { UserTypeComponent } from './components/user-type/user-type.component';
import { TeamComponent } from './components/team/team.component';
import { TournamentComponent } from './components/tournament/tournament.component';
import { FixtureComponent } from './components/fixture/fixture.component';
import { WeekComponent } from './components/fixture/week/week.component';
import { MatchWeekComponent } from './components/fixture/week/match-week/match-week.component';
import { UserTokenComponent } from './components/user-token/user-token.component';


import { AuthGuardService } from './services/guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: UserRegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    component: HomeComponent
  },
  {
    path: 'users',
    canActivate: [AuthGuardService],
    component: UsersComponent
  },
  {
    path: 'users/:id',
    canActivate: [AuthGuardService],
    component: UserDetailsComponent
  },
  {
    path: 'user-token',
    canActivate: [AuthGuardService],
    component: UserTokenComponent
  },
  {
    path: 'user-type',
    canActivate: [AuthGuardService],
    component: UserTypeComponent
  },
  {
    path: 'team',
    canActivate: [AuthGuardService],
    component: TeamComponent
  },
  {
    path: 'tournament',
    canActivate: [AuthGuardService],
    component: TournamentComponent
  },
  {
    path: 'fixture',
    canActivate: [AuthGuardService],
    component: FixtureComponent
  },
  {
    path: 'week/:id',
    canActivate: [AuthGuardService],
    component: WeekComponent
  },
  {
    path: 'match-week/:id',
    canActivate: [AuthGuardService],
    component: MatchWeekComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
