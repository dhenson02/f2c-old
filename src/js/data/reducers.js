'use strict';

import { Map } from 'immutable';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const settings = function ( state = Map(), action ) {
    // let franchises;
    switch ( action.type ) {
        case 'SETTINGS_LOADED':
            return Map(action.settings);
        /*case 'STANDINGS_LOADED':
            franchises = state.get('franchises');
            return state.set('franchises', franchises.get(action.id).set('stats', action.standings));
        case 'STANDINGS_LOADED_ALL':
            franchises = state.get('franchises').map(team => team.set('stats', action.standings.get(team.get('id'))));
            return state.set('franchises', franchises);*/
        default:
            return state;
    }
};

const franchise = function ( state = Map(), action ) {
    switch ( action.type ) {
        case 'FRANCHISE_LOADED':
            return Map(action.franchise);
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    settings,
    franchise,
    routing: routerReducer
});

export default rootReducer;
