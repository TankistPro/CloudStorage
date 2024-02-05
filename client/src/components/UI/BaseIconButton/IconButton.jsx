import React from 'react';
import {IconButton} from "@mui/material";
const BaseIconButton = ({ children, ariaLabel, color,  ...props }) => {
    return (
        <IconButton color={color} aria-label={ariaLabel} {...props}>
            { children }
        </IconButton>
    );
};

export default BaseIconButton;
