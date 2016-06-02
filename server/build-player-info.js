'use strict';
const fs = require('fs');
const path = require('path');
const request = require('request');
const config = require('../config.json');
const { Map } = require('immutable');

class Players {
    constructor () {
        this.setupInjuries();
        this.setupPlayers();
    }

    setupScores ( rosterID, playerList ) {
        const self = this;
        const url = `${config.url}${config.year}/export?TYPE=playerScores&W=YTD&L=${config.league}&JSON=1&PLAYERS=${playerList.join(',')}`;

        const scoreFile = function ( data ) {
            let scoreFilePath = path.join(__dirname, '..', `/data/playerScores-${rosterID}.json`);
            if ( typeof data === 'string' ) {
                fs.writeFile(scoreFilePath, data, { encoding: 'utf8' }, function () {});
                data = JSON.parse(data);
            }
            else {
                fs.writeFile(scoreFilePath, JSON.stringify(data), { encoding: 'utf8' }, function () {});
            }
            let scores = data.playerScores && data.playerScores.playerScore || data.playerScore;
            self.scores = scores.reduce(( scoreMap, score ) => {
                return scoreMap.set(score.id, parseInt(score.score, 10))
            }, Map());
        };

        let scoreFilePath = path.join(__dirname, '..', `/data/playerScores.json`);
        let scoreFileText = fs.readFileSync(scoreFilePath, { encoding: 'utf8' });
        let scores = JSON.parse(scoreFileText);
        scoreFile(scores);
/*
        return (
            new Promise(( resolve, reject ) => {
                request(url, ( error, response, data ) => {
                    if ( error ) {
                        return reject(error);
                    }
                    if ( response.statusCode === 200 ) {

                        resolve();
                    }
                    else {
                        reject(`Something went wrong.  Response: `, response);
                    }
                });
            })
                .then(() => this.setupInjuries())
                .then(() => this.setupPlayers())
                .catch(console.error)
        );*/

    }

    setupInjuries () {
        let injuryFilePath = path.join(__dirname, '..', '/data/injuries.json');
        let injuryFile = fs.readFileSync(injuryFilePath, { encoding: "utf8" });
        let injuries = JSON.parse(injuryFile).injury;
        this.injuries = injuries.reduce(( injuryMap, injury ) => {
            return injuryMap.set(injury.id, Map(injury));
        }, Map());
    }

    setupPlayers () {
        let playersFilePath = path.join(__dirname, '..', '/data/players.json');
        let playersFile = fs.readFileSync(playersFilePath, { encoding: "utf8" });
        let players = JSON.parse(playersFile).player;
        this.players = players.reduce(( playerMap, player ) => {
            let fullPlayer = Map(player).delete('status');
            return playerMap.set(player.id, fullPlayer);
        }, Map());
    }

    getScore ( id ) {
        return this.scores.get(id);
    }

    getInjury ( id ) {
        return this.injuries.get(id);
    }

    getPlayer ( id ) {
        return this.players.get(id);
    }
}

module.exports = Players;
