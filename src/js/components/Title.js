'use strict';

import React from 'react';

class Title extends React.Component {
    shouldComponentUpdate ( nextProps ) {
        return nextProps.title !== this.props.title;
    }

    render () {
        return (
            <row>
                <column cols="12">
                    <h1 className="title"
                        style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-all',
                            maxWidth: '100%',
                            width: '100%',
                            display: 'inline'
                        }}>
                        {`${this.props.title}`}
                    </h1>
                </column>
            </row>
        );
    }
}

export default Title;
