import React from 'react';

import './baseButton.scss';
import {Button} from "@mui/material";

const BaseButton = ({ useWrapperDiv = true, children, ...props}) => {
    const renderButton = () => {
        return <Button className="base-button" {...props}>{children}</Button>
    }
    return (
        <>
            {!useWrapperDiv ?
                renderButton()
                : (
                    <div className="base-button-wrapper">
                        { renderButton() }
                    </div>
                )
            }
        </>
    );
};

export default BaseButton;
