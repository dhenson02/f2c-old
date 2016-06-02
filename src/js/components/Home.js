'use strict';

import React from 'react';
import Loader from '../Loader';

class Home extends React.Component {
    /*shouldComponentUpdate ( nextProps ) {
        return nextProps.settings !== this.props.settings;
    }
     load={id => loadFranchise(teams, id)}
*/
    render () {
        const { settings, history } = this.props;
        if ( !settings || settings.size === 0 ) {
            return <Loader visible={true}/>;
        }
        const teams = settings.get('franchises');
        return (
            <row centered>
                <column cols="12">
                    <form className="forms">
                        <section>
                            <TeamSelector teams={teams}
                                          push={path => history.push(path)}/>
                        </section>
                    </form>
                </column>
            </row>
        );
    }
}

class TeamSelector extends React.Component {
    shouldComponentUpdate ( nextProps ) {
        return nextProps.teams !== this.props.teams;
    }

    handleChange ( e ) {
        let id = e.target.value;
        this.props.push(`/${id}`);
    }

    render () {
        const teams = this.props.teams;
        return (
            <select className="select"
                    onChange={e => this.handleChange(e)}>
                {teams.map(( team, i ) => {
                    return <option key={i}
                                   value={team.id}>
                        {team.name}
                    </option>
                })}
            </select>
        );
    }
}

export default Home;
