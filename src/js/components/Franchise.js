'use strict';

import React from 'react';
import Loader from '../Loader';
import Team from './Team';
import { find } from 'lodash/collection';

class Franchise extends React.Component {
    constructor ( props ) {
        super(props);
    }

    /*shouldComponentUpdate ( nextProps ) {
        return nextProps.franchise.get('id') !== this.props.franchise.get('id');
    }*/

    render () {
        const id = this.props.params.id;
        const franchises = this.props.settings.get('franchises');
        const franchise = find(franchises, { id });

        return <Team team={franchise}/>;
    }
}

export default Franchise;
