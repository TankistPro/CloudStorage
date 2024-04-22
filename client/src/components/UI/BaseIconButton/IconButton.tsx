import React, {FC} from 'react';
import {IconButton} from "@mui/material";

interface  IBaseIconButton {
    children: React.ReactNode,
    ariaLabel?: string,
    color?: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | undefined,
    [key: string]: any
}
const BaseIconButton : FC<IBaseIconButton> = ({ children, ariaLabel, color,  ...props }) => {
    return (
        <IconButton color={color} aria-label={ariaLabel} {...props}>
            { children }
        </IconButton>
    );
};

export default BaseIconButton;
