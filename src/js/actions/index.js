'use strict';

import { find } from 'lodash/collection';

export const loadSettings = function ( settings ) {
    return {
        type: 'SETTINGS_LOADED',
        settings
    };
};

export const loadFranchise = function ( franchises, id ) {
    const franchise = Array.isArray(franchises) ?
                      find(franchises, { id }) :
                      franchises;
    return {
        type: 'FRANCHISE_LOADED',
        franchise
    };
};

export const loadStandings = function ( standings ) {
    return {
        type: 'STANDINGS_LOADED',
        standings: Map(standings)
    };
};
