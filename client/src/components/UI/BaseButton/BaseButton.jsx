import React from 'react';

import './baseButton.scss';
import {Button} from "@mui/material";

const BaseButton = React.memo(({ useWrapperDiv = true, children, ...props}) => {
    const renderButton = React.useCallback(() => {
        return <Button className="base-button" {...props}>{children}</Button>
    }, [children, props]);

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
});

export default BaseButton;
