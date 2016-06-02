'use strict';
const fs = require('fs');
const path = require('path');
const { Map } = require('immutable');

class Standings {
    constructor () {
        let filePath = path.join(__dirname, '..', '/data/leagueStandings.json');
        let file = fs.readFileSync(filePath, { encoding: "utf8" });
        let standings = JSON.parse(file).franchise;
        this.standings = standings.reduce(( statsMap, stats ) => {
            var key;
            var stat;
            for ( key in stats ) {
                if ( !stats.hasOwnProperty(key) ) {
                    continue;
                }
                stat = stats[ key ];
                if ( key !== 'id' &&
                    key !== 'streak_type' ) {

                    if ( key !== 'dp' &&
                        key !== 'op' &&
                        key !== 'pa' &&
                        key !== 'power_rank' &&
                        key !== 'pwr' ) {
                        stat = parseInt(stat, 10);
                    }
                    else {
                        stat = parseFloat(stat);
                    }
                }
                else {
                    continue;
                }
            }
            return statsMap.set(stats.id, Map(stats));
        }, Map());
    }

    getStandings ( id ) {
        return this.standings.get(id);
    }
}

module.exports = Standings;
