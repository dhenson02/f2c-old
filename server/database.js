'use strict';

const Players = require('./build-player-info');
const Results = require('./build-weekly-results');
const Rosters = require('./build-rosters');
const Standings = require('./build-standings');
const League = require('./build-league');
const LiveScoring = require('./build-live-scoring');

const standings = new Standings();
const league = new League();
const players = new Players();
const rosters = new Rosters(players);

module.exports = {
    League,
    Standings,
    Players,
    Results,
    Rosters,
    LiveScoring,
    getAllFranchises: () => league.getAllFranchises(),
    getFranchise: id => league.getFranchise(id),
    getSettings: () => league.getSettings(),
    getStandings: id => standings.getStandings(id),
    getRoster: id => rosters.getRoster(id),
    getPlayer: id => players.getPlayer(id),
    getScore: id => players.getScore(id),
    getInjury: id => players.getInjury(id)
};
