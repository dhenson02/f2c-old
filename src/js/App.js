'use strict';

import React from 'react';
import Relay from 'react-relay';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';

import Main from './components/Main';
import Franchise from './components/Franchise';
import Roster from './components/Roster';
import LineUp from './components/LineUp';

/***
 *
 * Full Query:
 *
 *   query {
        league{
            baseURL
            currentWaiverType
            divisions {
                id
                name
            }
            endWeek
            h2h
            history {
                url
                year
            }
            id
            injuredReserve
            lastRegularSeasonWeek
            loadRosters
            lockout
            name
            nflPoolEndWeek
            nflPoolStartWeek
            nflPoolType
            playerLimitUnit
            precision
            rosterLimits {
                name
                limit
            }
            rosterSize
            rostersPerPlayer
            standingsSort
            startWeek
            starters{
                name
                limit
            }
            survivorPool
            survivorPoolEndWeek
            survivorPoolStartWeek
            taxiSquad
            tiebreaker
            franchises {
                name
                roster {
                    id
                    name
                    position
                    team
                    score
                    injury {
                        status
                        details
                    }
                }
            }
        }
    }
 *
 */

const App = (
    <Router history={history}>
        <Route path="/" component={Main}>
            <Route path="/:id" component={Franchise} />
            <Route path="/:id/roster" component={Roster}/>
            <Route path="/:id/roster/lineup/:week" component={LineUp}/>
        </Route>
    </Router>
);

const AppContainer = Relay.createContainer(App, {
    fragments: {
        league: () => Relay.QL`
            fragment on League {
                league {
                    baseURL
                    franchises {
                        id
                        name
                    }
                    name
                }
            }
        `
    }
});

class QueryRoute extends Relay.Route {
    static routeName = 'League';
    static queries = {
        league: ( Component ) => Relay.QL`
            query league {
                ${Component.getFragment('league')}
            },
        `
    };
    /*static queries = {
     league: ( Component ) => Relay.QL`
     query league {
     baseURL {
     ${Component.getFragment('baseURL')}
     }
     currentWaiverType {
     ${Component.getFragment('currentWaiverType')}
     }
     divisions {
     ${Component.getFragment('divisions')}
     }
     endWeek {
     ${Component.getFragment('endWeek')}
     }
     franchises {
     ${Component.getFragment('franchises')}
     }
     h2h {
     ${Component.getFragment('h2h')}
     }
     history {
     ${Component.getFragment('history')}
     }
     id {
     ${Component.getFragment('id')}
     }
     injuredReserve {
     ${Component.getFragment('injuredReserve')}
     }
     lastRegularSeasonWeek {
     ${Component.getFragment('lastRegularSeasonWeek')}
     }
     loadRosters {
     ${Component.getFragment('loadRosters')}
     }
     lockout {
     ${Component.getFragment('lockout')}
     }
     name {
     ${Component.getFragment('name')}
     }
     nflPoolEndWeek {
     ${Component.getFragment('nflPoolEndWeek')}
     }
     nflPoolStartWeek {
     ${Component.getFragment('nflPoolStartWeek')}
     }
     nflPoolType {
     ${Component.getFragment('nflPoolType')}
     }
     playerLimitUnit {
     ${Component.getFragment('playerLimitUnit')}
     }
     precision {
     ${Component.getFragment('precision')}
     }
     rosterLimits {
     ${Component.getFragment('rosterLimits')}
     }
     rosterSize {
     ${Component.getFragment('rosterSize')}
     }
     rostersPerPlayer {
     ${Component.getFragment('rostersPerPlayer')}
     }
     standingsSort {
     ${Component.getFragment('standingsSort')}
     }
     startWeek {
     ${Component.getFragment('startWeek')}
     }
     starters {
     ${Component.getFragment('starters')}
     }
     survivorPool {
     ${Component.getFragment('survivorPool')}
     }
     survivorPoolEndWeek {
     ${Component.getFragment('survivorPoolEndWeek')}
     }
     survivorPoolStartWeek {
     ${Component.getFragment('survivorPoolStartWeek')}
     }
     taxiSquad {
     ${Component.getFragment('taxiSquad')}
     }
     tiebreaker {
     ${Component.getFragment('tiebreaker')}
     }
     }
     `,
     }*/
}

render(
    <Relay.RootContainer
        Component={AppContainer}
        route={new QueryRoute()}
    />,
    document.getElementById("main")
);
