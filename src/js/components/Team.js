'use strict';

import React from 'react';
import Relay from 'react-relay';
import { PureComponent } from 'react-pure-render';
import Stats from './Stats';

class Team extends PureComponent {
    constructor ( props ) {
        super(props);
    }

    render () {
        let team = this.props.team;
        return (
            <div className="jumbotron">
                <h2>
                    <_TeamIcon /> {team.name}
                </h2>
                <Stats team={team}/>
            </div>
        );
    }
}

class TeamIcon extends PureComponent {
    constructor ( props ) {
        super(props);
    }

    componentWillMount () {
        let icon = this.props.team.icon ?
                   true :
                   false;
        this.setState({
            icon
        });
    }

    handleIconError () {
        // Something else
        this.setState({
            icon: false
        });
    }

    render () {
        let iconClass = this.props.icon ?
                        "img-circle" :
                        "img-circle icon-missing";
        return (
            <span className={iconClass}>
                <img className="img-circle"
                     width="48"
                     height="48"
                     onError={() => this.handleIconError()}
                     src={this.props.icon}/>
            </span>
        );
    }
}

const _TeamIcon = Relay.createContainer(TeamIcon, {
    fragments: {
        icon: () => Relay.QL`
            fragment on Franchise {

            }
        `
    }
});

export default Team;
