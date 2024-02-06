import React from 'react';
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ContentCopy from "@mui/icons-material/ContentCopy";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import BaseIconButton from "@UI/BaseIconButton/IconButton.jsx";
import {useAutoCloseModal} from "@hooks/useAutoCloseModal.js";

const BaseDropList = ({ buttonElement, menuItems, width = 320 , typographyElement}) => {
    const [isOpenDropListOption, toggleOption] = React.useState(false);

    useAutoCloseModal('.drop-controller', isOpenDropListOption, toggleOption);

    return (
        <div className='baseDropList drop-controller'>
            {!buttonElement ?
                <BaseIconButton aria-label="Настройки" size="small" onClick={(event) => toggleOption(!isOpenDropListOption)}>
                    <SettingsIcon />
                </BaseIconButton>
                :
                buttonElement
            }

            <Paper className={`drop-controller__list ${isOpenDropListOption ? 'open' : ''}`} sx={{width}}>
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

                    {/* ПРИМЕР */}
                    {/*<Divider/>*/}
                    {/*<MenuItem>*/}
                    {/*    <ListItemIcon>*/}
                    {/*        <DeleteIcon fontSize="small"/>*/}
                    {/*    </ListItemIcon>*/}
                    {/*    <ListItemText>Удалить</ListItemText>*/}
                    {/*<Typography variant="body2" color="text.secondary">*/}
                    {/*    ⌘X*/}
                    {/*</Typography>*/}
                    {/*</MenuItem>*/}
                </MenuList>
            </Paper>
        </div>
    );
};

export default BaseDropList;
