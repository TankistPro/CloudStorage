import React from 'react';
import {useNavigate} from "react-router-dom";

import {Box, Button, ButtonGroup} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './settingPage.scss';

const SettingPage = () => {
    const navigate = useNavigate();

    return (
        <main className="main container">
            <div className="back-btn">
                <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
                    Назад
                </Button>
            </div>
            <div className="settings">
                <aside className="settings-aside">
                    <Box>
                        <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                        variant="text"
                        sx={{
                            width: '100%'
                        }}
                    >
                        <Button key="one">Общие</Button>
                        <Button key="two">Безопасность</Button>
                    </ButtonGroup>
                    </Box>
                </aside>
                <section className="settings-section">
                    settings-section
                </section>
            </div>
        </main>
    );
};

export default SettingPage;
