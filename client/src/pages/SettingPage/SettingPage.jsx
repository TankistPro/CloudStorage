import React from 'react';

import {Button} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './settingPage.scss';
import {useNavigate} from "react-router-dom";

const SettingPage = () => {
    const navigate = useNavigate();

    return (
        <main className="main container">
            <div className="back-btn">
                <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
                    Назад
                </Button>
            </div>
        </main>
    );
};

export default SettingPage;
