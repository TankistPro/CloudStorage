import React from 'react';
import {CircularProgress} from "@mui/material";

import './loader.scss';
const Loader = ({ loadingText }) => {
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
