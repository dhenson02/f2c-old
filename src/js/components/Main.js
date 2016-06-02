'use strict';

import React from 'react';
import Relay from 'react-relay';
import socket from '../data/socket';

import Title from './Title';
import Home from './Home';
import Loader from '../Loader';

class Main extends React.Component {
    constructor ( props ) {
        super(props);
        // socket.emit("load league settings");
    }

    render () {
        const { settings, history } = this.props;/*
        if ( !settings || settings.size === 0 ) {
            return <Loader visible={true}/>;
        }*/
        return (
            <div style={{ maxWidth: '960px', margin: '50px auto' }}>
                <Title title={settings.get('name')} />
                <Home settings={settings} history={history} />
                {React.cloneElement(this.props.children, this.props)}
            </div>
        );
    }
}

export default Main;
