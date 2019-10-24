"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const initial_routes_1 = __importDefault(require("./initial.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const usertype_routes_1 = __importDefault(require("./usertype.routes"));
const team_routes_1 = __importDefault(require("./team.routes"));
const tournament_routes_1 = __importDefault(require("./tournament.routes"));
const fixture_routes_1 = __importDefault(require("./fixture.routes"));
const week_routes_1 = __importDefault(require("./week.routes"));
const matchweek_routes_1 = __importDefault(require("./matchweek.routes"));
const usertoken_routes_1 = __importDefault(require("./usertoken.routes"));
const usermatchweek_routes_1 = __importDefault(require("./usermatchweek.routes"));
class IndexRoutes {
    constructor(index) {
        this.index = index;
        this.setRoutes();
    }
    setRoutes() {
        this.index.use('/', initial_routes_1.default);
        this.index.use('/user', user_routes_1.default);
        this.index.use('/usertype', usertype_routes_1.default);
        this.index.use('/team', team_routes_1.default);
        this.index.use('/tournament', tournament_routes_1.default);
        this.index.use('/fixture', fixture_routes_1.default);
        this.index.use('/week', week_routes_1.default);
        this.index.use('/matchweek', matchweek_routes_1.default);
        this.index.use('/usertoken', usertoken_routes_1.default);
        this.index.use('/usermatchweek', usermatchweek_routes_1.default);
    }
}
exports.default = IndexRoutes;
