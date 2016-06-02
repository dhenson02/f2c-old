'use strict';

const {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} = require('graphql');

const {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions
} = require('graphql-relay');

const {
    League,
    Standings,
    getAllFranchises,
    getFranchise,
    getSettings,
    getStandings,
    getRoster,
    getPlayer,
    getScore,
    getInjury
} = require('./database');

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
    ( globalId ) => {
        var { type, id } = fromGlobalId(globalId);
        if ( type === 'League' ) {
            return getSettings();
        }
        else if ( type === 'Franchise' ) {
            return getFranchise(id);
        }
        else {
            return null;
        }
    },
    ( obj ) => {
        if ( obj instanceof League ) {
            return leagueType;
        }
        else if ( obj instanceof Franchise ) {
            return standingsType;
        }
        else {
            return null;
        }
    }
);

/*
const statsType = new GraphQLObjectType({
    name: 'Stats',
    description: 'League standings at the current time',
    fields: () => ({
        id: {
            type: GraphQLID
        }
    })
});
*/

const injuryType = new GraphQLObjectType({
    name: 'Injury',
    description: 'Injury data on current player',
    fields: () => ({
        'id': {
            'type': GraphQLID,
            'resolve': injury => injury.get('id')
        },
        'status': {
            'type': GraphQLString,
            'resolve': injury => injury.get('status')
        },
        'details': {
            'type': GraphQLString,
            'resolve': injury => injury.get('details')
        }
    })
});

const playerType = new GraphQLObjectType({
    name: 'Player',
    description: 'Individual player',
    fields: () => ({
        // id: globalIdField('Standings'),
        'id': {
            'type': GraphQLID,
            'resolve': player => player.get('id')
        },
        'name': {
            'type': GraphQLString,
            'description': 'The name of the player',
            'resolve': player => player.get('name')
        },
        'team': {
            'type': GraphQLString,
            'description': 'Current team',
            'resolve': player => player.get('team')
        },
        'position': {
            'type': GraphQLString,
            'description': 'Position played',
            'resolve': player => player.get('position')
        },
        'score': {
            'type': GraphQLInt,
            'description': 'Score achieved',
            'resolve': player => getScore(player.get('id'))
        },
        'injury': {
            'type': injuryType,
            'resolve': player => getInjury(player.get('id'))
        },
        /*args: {
            id: {
                type: GraphQLString
            }
        },
        resolve: ( root, args ) => getPlayer(args.id)*/
    }),
    // interfaces: [ nodeInterface ]
});

const standingsType = new GraphQLObjectType({
    name: 'Standings',
    description: 'League standings at the current time',
    fields: () => ({
        'acct': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('acct')
        },
        'all_play_l': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('all_play_l')
        },
        'all_play_t': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('all_play_t')
        },
        'all_play_w': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('all_play_w')
        },
        'altpwr': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('altpwr')
        },
        'divl': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('divl')
        },
        'divpf': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('divpf')
        },
        'divt': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('divt')
        },
        'divw': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('divw')
        },
        'dp': {
            'type': GraphQLFloat,
            'resolve': stats => stats.get('dp')
        },
        'h2hl': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('h2hl')
        },
        'h2ht': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('h2ht')
        },
        'h2hw': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('h2hw')
        },
        'id': {
            'type': GraphQLID,
            'resolve': stats => stats.get('id')
        },
        'maxpa': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('maxpa')
        },
        'minpa': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('minpa')
        },
        'op': {
            'type': GraphQLFloat,
            'resolve': stats => stats.get('op')
        },
        'pa': {
            'type': GraphQLFloat,
            'resolve': stats => stats.get('pa')
        },
        'pf': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('pf')
        },
        'power_rank': {
            'type': GraphQLFloat,
            'resolve': stats => stats.get('power_rank')
        },
        'pp': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('pp')
        },
        'pwr': {
            'type': GraphQLFloat,
            'resolve': stats => stats.get('pwr')
        },
        'streak_len': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('streak_len')
        },
        'streak_type': {
            'type': GraphQLString,
            'resolve': stats => stats.get('streak_type')
        },
        'vp': {
            'type': GraphQLInt,
            'resolve': stats => stats.get('vp')
        }
    }),
    // interfaces: [ nodeInterface ]
});

const franchiseType = new GraphQLObjectType({
    'name': 'Franchise',
    'description': 'League franchise/team',
    'fields': () => ({
        // id: globalIdField('Standings'),
        'id': {
            'type': GraphQLID,
            'resolve': franchise => franchise.get('id')
        },
        'name': {
            'type': GraphQLString,
            'description': 'The name of the franchise',
            'resolve': franchise => franchise.get('name')
        },
        'roster': {
            'type': new GraphQLList(playerType),
            'resolve': franchise => getRoster(franchise.get('id')).map(player => getPlayer(player)).toArray()
        },
        'standings': {
            'type': standingsType,
            'resolve': franchise => getStandings(franchise.get('id'))
        }
        /*args: {
            id: {
                type: GraphQLString
            }
        },
        resolve: ( franchise, args ) => getFranchise(args.id)*/
    }),
    // interfaces: [ nodeInterface ]
});

const genericObjectType = function ( name, fields ) {
    return new GraphQLObjectType({
        name,
        'fields': () => fields.reduce(( fieldObj, field ) => {
            fieldObj[ field.name ] = {
                type: field.type,
                resolve: root => root[ field.name ] || root.get && root.get(field.name)
            };
            return fieldObj;
        }, {})
    });
}

const leagueType = new GraphQLObjectType({
    'name': 'League',
    'description': 'League settings and contents',
    'fields': () => ({
        'baseURL': {
            'type': GraphQLString,
            'resolve': league => league.get('baseURL')
        },
        'currentWaiverType': {
            'type': GraphQLString,
            'resolve': league => league.get('currentWaiverType')
        },
        'divisions': {
            'type': new GraphQLList(genericObjectType('Division', [
                { 'name': 'id', 'type': GraphQLID },
                { 'name': 'name', 'type': GraphQLString }
            ])),
            'resolve': league => league.get('divisions').division
        },
        'endWeek': {
            'type': GraphQLString,
            'resolve': league => league.get('endWeek')
        },
        'franchises': {
            'type': new GraphQLList(franchiseType),
            'resolve': ( league, args ) => getAllFranchises().toArray()
        },
        'h2h': {
            'type': GraphQLString,
            'resolve': league => league.get('h2h')
        },
        'history': {
            'type': new GraphQLList(genericObjectType('History', [
                { 'name': 'url', 'type': GraphQLString },
                { 'name': 'year', 'type': GraphQLString }
            ])),
            'resolve': league => league.get('history').league
        },
        'id': {
            'type': GraphQLID,
            'resolve': league => league.get('id')
        },
        'injuredReserve': {
            'type': GraphQLString,
            'resolve': league => league.get('injuredReserve')
        },
        'lastRegularSeasonWeek': {
            'type': GraphQLString,
            'resolve': league => league.get('lastRegularSeasonWeek')
        },
        'loadRosters': {
            'type': GraphQLString,
            'resolve': league => league.get('loadRosters')
        },
        'lockout': {
            'type': GraphQLString,
            'resolve': league => league.get('lockout')
        },
        'name': {
            'type': GraphQLString,
            'resolve': league => league.get('name')
        },
        'nflPoolEndWeek': {
            'type': GraphQLString,
            'resolve': league => league.get('nflPoolEndWeek')
        },
        'nflPoolStartWeek': {
            'type': GraphQLString,
            'resolve': league => league.get('nflPoolStartWeek')
        },
        'nflPoolType': {
            'type': GraphQLString,
            'resolve': league => league.get('nflPoolType')
        },
        'playerLimitUnit': {
            'type': GraphQLString,
            'resolve': league => league.get('playerLimitUnit')
        },
        'precision': {
            'type': GraphQLString,
            'resolve': league => league.get('precision')
        },
        'rosterLimits': {
            'type': new GraphQLList(genericObjectType('RosterLimits', [
                { 'name': 'name', 'type': GraphQLString },
                { 'name': 'limit', 'type': GraphQLString }
            ])),
            'resolve': league => league.get('rosterLimits').position
        },
        'rosterSize': {
            'type': GraphQLString,
            'resolve': league => league.get('rosterSize')
        },
        'rostersPerPlayer': {
            'type': GraphQLString,
            'resolve': league => league.get('rostersPerPlayer')
        },
        'standingsSort': {
            'type': GraphQLString,
            'resolve': league => league.get('standingsSort')
        },
        'startWeek': {
            'type': GraphQLString,
            'resolve': league => league.get('startWeek')
        },
        'starters': {
            'type': new GraphQLList(genericObjectType('Starters', [
                { 'name': 'name', 'type': GraphQLString },
                { 'name': 'limit', 'type': GraphQLString }
            ])),
            'resolve': league => league.get('starters').position
        },
        'survivorPool': {
            'type': GraphQLString,
            'resolve': league => league.get('survivorPool')
        },
        'survivorPoolEndWeek': {
            'type': GraphQLString,
            'resolve': league => league.get('survivorPoolEndWeek')
        },
        'survivorPoolStartWeek': {
            'type': GraphQLString,
            'resolve': league => league.get('survivorPoolStartWeek')
        },
        'taxiSquad': {
            'type': GraphQLString,
            'resolve': league => league.get('taxiSquad')
        },
        'tiebreaker': {
            'type': GraphQLString,
            'resolve': league => league.get('tiebreaker')
        }
        // args: connectionArgs,
        // resolve: ( _, args ) => connectionFromArray(getSettings(), args)
    }),
    // interfaces: [ nodeInterface ]
});

/*const {
    connectionType: standingsConnection
} = connectionDefinitions({
    name: 'League',
    nodeType: leagueType
});*/

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const queryType = new GraphQLObjectType({
    'name': 'Query',
    'fields': () => ({
        // node: nodeField,
        'league': {
            'type': leagueType,
            'resolve': () => getSettings()
        },
        'franchise': {
            'type': franchiseType,
            'args': {
                'id': {
                    'type': GraphQLID
                }
            },
            'resolve': ( root, args ) => getFranchise(args.id)
        }
    })
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
const mutationType = new GraphQLObjectType({
    'name': 'Mutation',
    'fields': () => ({
        // Add your own mutations here
    })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
module.exports = new GraphQLSchema({
    'query': queryType
    // Uncomment the following after adding some mutation fields:
    // mutation: mutationType
});
