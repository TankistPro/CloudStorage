import React from 'react';
import {TextField} from "@mui/material";

import './baseField.scss';

const BaseField = React.memo(({...props}) => {
    return (
        <div className="base-input">
            <TextField
                {...props}
            />
        </div>
    );
});

export default BaseField;
