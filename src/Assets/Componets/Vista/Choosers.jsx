import React, { useState } from 'react';

const Chooser = ({ elegido }) => {
    return <div>{elegido}</div>;
};

const Choosers = ({ chosen }) => {
    return (
        <div>
            {chosen && <Chooser elegido={chosen} />}
        </div>
    );
};

export default Choosers;
