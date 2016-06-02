'use strict';

import React from 'react';
import Loader from '../Loader';

/***
 * Useful for later:
 *
 * [
 {"acct": "Accounting"},
 {"all_play_l": "All-time Losses"},
 {"all_play_t": "All-time Ties"},
 {"all_play_w": "All-time Wins"},
 {"altpwr": "altpwr"},
 {"divl": "Losses (division)"},
 {"divpf": "Points for (division)"},
 {"divt": "Ties (division)"},
 {"divw": "Wins (division)"},
 {"dp": "dp"},
 {"h2hl": "Losses (head-to-head)"},
 {"h2ht": "Ties (head-to-head)"},
 {"h2hw": "Wins (head-to-head)"},
 {"id": "id"},
 {"maxpa": "Points against (maximum)"},
 {"minpa": "Points against (minimum)"},
 {"op": "op"},
 {"pa": "Points against (overall)"},
 {"pf": "Points for (overall)"},
 {"power_rank": "Power Ranking"},
 {"pp": "Potential Points?"},
 {"pwr": "pwr"},
 {"streak_len": "Streak Length"},
 {"streak_type": "Streak Type"},
 {"vp": "vp"}
 ]
 */

class Stats extends React.Component {
    constructor ( props ) {
        super(props);
    }
/*
    shouldComponentUpdate ( nextProps ) {
        return nextProps.franchise.stats !== this.props.franchise.stats;
    }*/

    parseStats ( stats ) {

        let ties = stats.h2ht !== '0' ?
                   <li>Ties: {stats.h2ht}</li> :
                   null;
        let pf = parseInt(stats.pf, 10);
        let pa = parseInt(stats.pa, 10);
        let ratio = Math.round(100 * (pa / pf));
        let ratioClass = ratio < 81 ?
                         'success' :
                         ( ratio < 90 ? 'warning' : 'danger' );
        return {
            ties,
            pf,
            pa,
            ratio,
            ratioClass
        };
    }

    render () {
        let stats = this.props.team.stats;
        const {
            ties,
            pf,
            pa,
            ratio,
            ratioClass
        } = this.parseStats(stats);
        return (
            <ul>
                <li>Wins: {stats.h2hw}</li>
                <li>Losses: {stats.h2hl}</li>
                {ties}
                <li>Points scored: {pf}</li>
                <li>Points against: {pa}</li>
                <li className={`label label-${ratioClass}`}>
                    Reverse Ratio: {ratio}%
                </li>
            </ul>
        );
    }
}

export default Stats;
