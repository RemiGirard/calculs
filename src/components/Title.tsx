import React, { useState } from 'react';

const Title = ({children, style}) => {

    return (<h1 style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: '0px',
        marginBottom: '20px',
        fontSize: '5em',
        ...style
        }}>
        {children}
    </h1>);
}

export default Title;