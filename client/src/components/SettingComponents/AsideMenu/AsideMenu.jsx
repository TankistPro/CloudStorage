import React from 'react';

import './aside.scss';
import {Box, Button, ButtonGroup} from "@mui/material";
import BaseButton from "@UI/BaseButton/BaseButton.jsx";
const AsideMenu = () => {
    return (
        <aside className="settings-aside">
            <Box
            >
                <ButtonGroup
                    orientation="vertical"
                    aria-label="vertical contained button group"
                    variant="text"
                    sx={{
                        width: '100%'
                    }}
                >
                    <BaseButton
                        useWrapperDiv={false}
                        key="one">Общие</BaseButton>
                    <BaseButton
                        useWrapperDiv={false}
                        key="two">Безопасность</BaseButton>
                </ButtonGroup>
            </Box>
        </aside>
    );
};

export default AsideMenu;
