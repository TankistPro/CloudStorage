import React from 'react';
import {TextField} from "@mui/material";

import './baseField.scss';
import {NamedExoticComponent} from "react";

interface IBaseField {
    id?: string
    onInput?: (e: any) => void
    label?: string
    variant?: "outlined" | "standard" | "filled"
    type?: "text" | "password",
    value?: string,
    disabled?: boolean,
    multiline?: boolean,
    placeholder?: string,
    [key: string]: any
}

const BaseField: NamedExoticComponent<IBaseField> = React.memo(({...props}) => {
    // @ts-ignore
    return (
        <div className="base-input">
            <TextField
                {...props}
            />
        </div>
    );
});

export default BaseField;
