import React from 'react';
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import BaseIconButton from "@UI/BaseIconButton/IconButton.jsx";
import {useAutoCloseModal} from "@hooks/useAutoCloseModal.js";

const BaseDropList = React.memo(({ buttonElement, menuItems, width = 320 , typographyElement}) => {
    const [isOpenDropListOption, toggleOption] = React.useState(false);

    useAutoCloseModal('.drop-controller', isOpenDropListOption, toggleOption);

    const openDropListClass = React.useMemo(() => {
        return isOpenDropListOption ? 'open' : ''
    }, [isOpenDropListOption])

    return (
        <div className='baseDropList drop-controller'>
            {!buttonElement ?
                <BaseIconButton
                    aria-label="Настройки"
                    size="small"
                    onClick={React.useCallback((event) => toggleOption(!isOpenDropListOption), [isOpenDropListOption])}
                >
                    <SettingsIcon />
                </BaseIconButton>
                :
                buttonElement
            }

            <Paper className={`drop-controller__list ${openDropListClass}`} sx={{width}}>
                <MenuList>
                    {menuItems.map((item) =>(
                        <MenuItem key={item.text} onClick={item.onClickEvent}>
                            {item?.itemIcon &&
                                <ListItemIcon>
                                    { item.itemIcon }
                                </ListItemIcon>
                            }
                            <ListItemText>{ item.text }</ListItemText>
                            {typographyElement && typographyElement}
                        </MenuItem>
                    ))}
                </MenuList>
            </Paper>
        </div>
    );
});

export default BaseDropList;
