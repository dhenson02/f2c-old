'use strict';
const fs = require('fs');
const path = require('path');
const { Map, List } = require('immutable');
const filePath = path.join(__dirname, '..', '/data/rosters.json');

class Rosters {
    constructor ( players ) {
        let file = fs.readFileSync(filePath, { encoding: "utf8" });
        let rosters = JSON.parse(file).franchise;

        this.rosters = rosters.reduce(( rosterMap, roster ) => {
            const playerList = roster.player.reduce(( playerList, player ) => {
                return playerList.push(player);
            }, List());
            players.setupScores(roster.id, roster.player);
            return rosterMap.set(
                roster.id,
                playerList
            );
        }, Map());
    }

    getRoster ( id ) {
        return this.rosters.get(id);
    }
}

module.exports = Rosters;
