import initialRoutes from './initial.routes';
import userRoutes from './user.routes';
import usertypeRoutes from './usertype.routes';
import teamRoutes from './team.routes';
import tournamentRoutes from './tournament.routes';
import fixtureRoutes from './fixture.routes';
import weekRoutes from './week.routes';
import matchweekRoutes from './matchweek.routes';
import usertokenRoutes from './usertoken.routes';
import usermatchweekRoutes from './usermatchweek.routes';

export default class IndexRoutes {
    index: any;

    constructor(index: any) {
        this.index = index;
        this.setRoutes();
    }

    setRoutes(): void {
        this.index.use('/', initialRoutes);
        this.index.use('/user', userRoutes);
        this.index.use('/usertype', usertypeRoutes);
        this.index.use('/team', teamRoutes);
        this.index.use('/tournament', tournamentRoutes);
        this.index.use('/fixture', fixtureRoutes);
        this.index.use('/week', weekRoutes);
        this.index.use('/matchweek', matchweekRoutes);
        this.index.use('/usertoken', usertokenRoutes);
        this.index.use('/usermatchweek', usermatchweekRoutes);
    }
}