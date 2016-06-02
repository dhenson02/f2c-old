'use strict';

import React from 'react';
import Loader from '../Loader';

class LineUp extends React.Component {
    constructor ( props ) {
        super(props);
    }

    shouldComponentUpdate ( nextProps ) {
        return nextProps.lineup !== this.props.lineup ||
                nextProps.roster !== this.props.roster;
    }

    render () {
        const { roster, lineup } = this.props;
        if ( roster.size === 0 ) {
            return <Loader visible={true}/>;
        }
        if ( lineup.size === 0 ) {
            return <Loader visible={true}/>;
        }

        return (
            <div className="">
                <h2>Line-up</h2>
            </div>
        );
    }
}

export default LineUp;
