import React, {NamedExoticComponent} from 'react';
import type {ComponentPropsWithoutRef } from "react";
import './baseButton.scss';
import {Button} from "@mui/material";

interface IBaseButton{
    useWrapperDiv?: boolean,
    children: React.ReactNode,
    [key: string]: any
}

const BaseButton : NamedExoticComponent<IBaseButton> = React.memo(({ useWrapperDiv = true, children, ...props}) => {
    const renderButton = React.useCallback(() => {
        return <Button className="base-button" href="" {...props}>{children}</Button>
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
