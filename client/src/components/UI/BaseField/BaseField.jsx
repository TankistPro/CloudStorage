import React from 'react';
import {TextField} from "@mui/material";

import './baseField.scss';

const BaseField = ({fieldId, label, variant, onInput, type, ...props}) => {
    return (
        <div className="base-input">
            <TextField
                id={fieldId}
                label={label}
                variant={variant}
                onInput={onInput}
                type={type}
                {...props}
            />
        </div>
    );
};

export default BaseField;
