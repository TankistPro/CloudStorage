import React from 'react'

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCopy from '@mui/icons-material/ContentCopy';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

import './optionDropList.scss';

import moreOption from '../../../images/more.svg';

import Toast from "../../../components/Toast/Toast";
import { useFileAction } from '../../../hooks/useFileAction';
import {FileAction} from "../../../enums/file.enum";

const OptionsDropList = ({ toggleOption, isOpenDropListOption, file, toggleEdit }) => {
    const { renameFile, removeFile, copyFileLink } = useFileAction();

    const menuHandler = async (event, fc, actionType) => {
        event.stopPropagation();

        if (actionType === FileAction.REMOVE_FILE) {
            const status = await fc(file.name);
            openToast(status);
        }
        if (actionType === FileAction.RENAME) {
            toggleEdit();
        }
        if(actionType === FileAction.COPY_LINK) {
            fc();
        }

        toggleOption(event);
    }

    const openToast = (status) => {
        const toastType = status ? 'success' : 'error';
        const text = status ? "Файл успешно удален!" : "Не удалось удалить файл";

        Toast({
            toastType,
            text
        })
    }

    return (
    <div className='drop-controller'>
        <img className='more-option' src={ moreOption } alt="more" onClick={(event) => toggleOption(event)} />
        <Paper className={`drop-controller__list ${ isOpenDropListOption ? 'open' : '' }`} sx={{ width: 320 }}>
            <MenuList>
                <MenuItem onClick={(event) =>  menuHandler(event, null, FileAction.RENAME)}>
                    <ListItemIcon>
                        <DriveFileRenameOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Переименовать</ListItemText>
                    <Typography variant="body2" color="text.secondary">
                        ⌘X
                    </Typography>
                </MenuItem>
                <MenuItem onClick={(event) => menuHandler(event, copyFileLink, FileAction.COPY_LINK)}>
                    <ListItemIcon>
                        <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Копировать ссылку</ListItemText>
                    <Typography variant="body2" color="text.secondary">
                        ⌘C
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Свойства</ListItemText>
                    <Typography variant="body2" color="text.secondary">
                        ⌘V
                    </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={(event) => menuHandler(event, removeFile, FileAction.REMOVE_FILE)}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Удалить</ListItemText>
                </MenuItem>
            </MenuList>
        </Paper>
    </div>
  )
}

export default OptionsDropList;
