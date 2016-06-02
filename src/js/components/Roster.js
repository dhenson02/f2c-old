'use strict';

import React from 'react';
import Loader from '../Loader';

class Roster extends React.Component {
    constructor ( props ) {
        super(props);
    }

    /*shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps !== this.props;
    }*/

    render () {
        if ( this.props.roster.size === 0 ){
            return <Loader visible={true}/>;
        }
        return (
            <div className="">
                Roster

                {this.props.children ?
                 React.cloneElement(this.props.children, this.props) :
                 null}
            </div>
        );
    }
}

export default Roster;
