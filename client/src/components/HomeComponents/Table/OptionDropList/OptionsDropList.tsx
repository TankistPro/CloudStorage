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
import {FileAction} from "@enums/file.enum.js";
import {ModalAction} from "@enums/modalAction.enums";
import {ModalContext} from "@context/useModalContext";
import {DropListContext} from "@HomeComponents/Table/Table";
import {BaseFile} from "../../../../domain/entities.js";
import {FC} from "react";

interface IOptionsDropList {
    file: BaseFile,
    fileIndex: number
}

const OptionsDropList : FC<IOptionsDropList> = ({file, fileIndex}) => {
    const { openModal } = React.useContext(ModalContext);
    const { currentDropListIndex, toggleOptionDropList } = React.useContext(DropListContext);

    const { removeFile } = useFileAction();
    const $element = useRef<any>(null);

    const menuHandler = React.useCallback(async (event: any, fc: ((fileName: string) => Promise<any>) | null, actionType: string) => {
        event.stopPropagation();

        if (actionType === FileAction.REMOVE_FILE && fc != null) {
            const status = await fc(file.name);
            openToast(status);
        }
        if (actionType === FileAction.RENAME) {
            const configModal = {
                title: "Переименовать",
                action: ModalAction.EDIT_FILE,
                payload: { fileName: file.name }
            };
            openModal(configModal);
        }
        if(actionType === FileAction.COPY_LINK && fc != null) {
            // @ts-ignore
            await fc(null);
        }
        toggleOptionDropList(event, -1);
    }, [toggleOptionDropList])

    const isOpenDropListOption = React.useMemo(() => {
        return fileIndex === currentDropListIndex
    }, [currentDropListIndex])

    const openToast = React.useCallback((status: boolean) => {
        const toastType = status ? 'success' : 'error';
        const text = status ? "Файл успешно удален!" : "Не удалось удалить файл";

        Toast({
            toastType,
            text
        })
    }, [])

    React.useEffect(() => {
        if (isOpenDropListOption) {
            const windowHeight = window.innerHeight;
            const elementPosition = $element.current.getBoundingClientRect();
            const listElement = $element.current.querySelector('.drop-controller__list');

            const isOutSideWindow = elementPosition.y + listElement.offsetHeight > windowHeight;

            isOutSideWindow ? listElement.style.bottom = "100%" :  listElement.style.top = "100%";
        }
    }, [isOpenDropListOption])

    const openDropListClass = React.useMemo(() => {
        return isOpenDropListOption ? 'open' : ''
    }, [isOpenDropListOption])

    const moreOptionsIcon = React.useMemo(() => {
        return moreOption
    }, [])

    // @ts-ignore
    return (
    <div className='drop-controller' ref={$element}>
        <img
            className='more-option'
            src={ moreOptionsIcon }
            loading={"lazy"}
            alt="more"
            onClick={React.useCallback((event: any) => toggleOptionDropList(event, fileIndex), [toggleOptionDropList])}
        />
        <Paper className={`drop-controller__list ${ openDropListClass }`} sx={{ width: 320 }}>
            <MenuList>
                <MenuItem
                    onClick={React.useCallback((event: any) =>  menuHandler(event, null, FileAction.RENAME), [])}
                >
                    <ListItemIcon>
                        <DriveFileRenameOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Переименовать</ListItemText>
                    <Typography variant="body2" color="text.secondary">
                        ⌘X
                    </Typography>
                </MenuItem>
                <MenuItem onClick={React.useCallback((event: any) => menuHandler(event, null, FileAction.COPY_LINK), [])}>
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
                <MenuItem onClick={React.useCallback((event: any) => menuHandler(event, removeFile, FileAction.REMOVE_FILE), [])}>
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
