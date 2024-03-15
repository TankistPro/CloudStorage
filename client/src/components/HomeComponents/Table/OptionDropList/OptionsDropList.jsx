import React, {useRef} from 'react'

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

import moreOption from '@images/more.svg';

import Toast from "@SharedComponents/Toast/Toast";
import { useFileAction } from '@hooks/useFileAction';
import {FileAction} from "@enums/file.enum";
import {ModalAction} from "@enums/modalAction.enums.js";
import {ModalContext} from "@context/useModalContext.jsx";

const OptionsDropList = ({ toggleOption, isOpenDropListOption, file, toggleEdit }) => {
    const { openModal } = React.useContext(ModalContext);

    const { removeFile, copyFileLink } = useFileAction();
    const $element = useRef(null);

    const menuHandler = async (event, fc, actionType) => {
        event.stopPropagation();

        if (actionType === FileAction.REMOVE_FILE) {
            const status = await fc(file.name);
            openToast(status);
        }
        if (actionType === FileAction.RENAME) {
            // toggleEdit();

            const configModal = {
                title: "Переименовать",
                action: ModalAction.EDIT_FILE,
                payload: { fileName: file.name }
            };
            console.log(configModal);
            openModal(configModal);
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

    React.useEffect(() => {
        if (isOpenDropListOption) {
            const windowHeight = window.innerHeight;
            const elementPosition = $element.current.getBoundingClientRect();
            const listElement = $element.current.querySelector('.drop-controller__list');

            const isOutSideWindow = elementPosition.y + listElement.offsetHeight > windowHeight;

            isOutSideWindow ? listElement.style.bottom = "100%" :  listElement.style.top = "100%";
        }
    }, [isOpenDropListOption])

    return (
    <div className='drop-controller' ref={$element}>
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
