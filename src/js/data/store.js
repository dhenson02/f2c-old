'use strict';

import { Map } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';
import * as actions from '../actions/index';
import socket from '../data/socket';

/**
 * For redux devtools in chrome
 */
const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const defaults = {
    settings: Map(),
    franchise: Map()
};

const middleware = routerMiddleware(browserHistory);

const store = createStore(
    rootReducer,
    defaults,
    enhancers,
    applyMiddleware(middleware)
);

const history = syncHistoryWithStore(browserHistory, store);

socket.on('league settings loaded', settings => {
    store.dispatch(actions.loadSettings(settings));
});

export {
    store,
    history
};
