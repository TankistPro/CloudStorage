import React from 'react';
import {useNavigate} from "react-router-dom";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './settingPage.scss';
import AsideMenu from "@SettingComponents/AsideMenu/AsideMenu.jsx";
import BaseButton from "@UI/BaseButton/BaseButton.jsx";
import General from "@SettingComponents/Tabs/General/General.jsx";

const SettingPage = () => {
    const navigate = useNavigate();

    return (
        <main className="main container">
            <div className="back-btn">
                <BaseButton
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                >
                    Назад
                </BaseButton>
            </div>
            <div className="settings">
                <AsideMenu/>
                <div className="settings-section">
                    <General />
                </div>
            </div>
        </main>
    );
};

export default SettingPage;
