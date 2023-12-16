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

const OptionsDropList = ({ toggleOption, isOpenDropListOption }) => {
    
  return (
    <div className='drop-controller'>
        <img className='more-option' src={ moreOption } alt="more" onClick={(event) => toggleOption(event)} />
        <Paper className={`drop-controller__list ${ isOpenDropListOption ? 'open' : '' }`} sx={{ width: 320 }}>
            <MenuList>
                <MenuItem>
                <ListItemIcon>
                    <DriveFileRenameOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Переименовать</ListItemText>
                <Typography variant="body2" color="text.secondary">
                    ⌘X
                </Typography>
                </MenuItem>
                <MenuItem>
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
                <MenuItem>
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

export default OptionsDropList