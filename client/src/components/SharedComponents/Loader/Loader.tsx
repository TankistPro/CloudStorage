import React, {FC} from 'react';
import {CircularProgress} from "@mui/material";

import './loader.scss';

interface ILoader {
    loadingText?: string
}
const Loader : FC<ILoader> = ({ loadingText }) => {
    return (
        <div id="loader">
            <CircularProgress />
            {loadingText &&
                <span>{ loadingText }</span>
            }
        </div>
    );
};

export default Loader;
