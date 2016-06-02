'use strict';
const fs = require('fs');
const path = require('path');
const { Map, List } = require('immutable');

class League {
    constructor () {
        const filePath = path.join(__dirname, '..', '/data/league.json');
        const file = fs.readFileSync(filePath, { encoding: "utf8" });
        this.settings = Map(JSON.parse(file));
    }

    getAllFranchises () {
        return this.settings
            .get('franchises')
            .franchise
            .reduce(( franchiseList, franchise ) => {
                return franchiseList.push(Map(franchise));
            }, List());
    }

    getFranchise ( id ) {
        const array = this.settings.get('franchises').franchise;
        const count = array.length;
        let i = 0;
        let current;
        for ( ; i < count; ++i ) {
            current = array[ i ];
            if ( current.id === id ) {
                return Map(current);
            }
        }
    }

    getSettings () {
        return this.settings;
    }
}

module.exports = League;
