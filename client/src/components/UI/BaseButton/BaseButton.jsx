import React from 'react';

import './baseButton.scss';
import {Button} from "@mui/material";

const BaseButton = ({ variant, onClick, children, ...props}) => {
    return (
        <div className="base-button">
            <Button variant={variant} onClick={onClick} {...props}>{ children }</Button>
        </div>
    );
};

export default BaseButton;
