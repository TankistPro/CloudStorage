import React from 'react'
import { Avatar, IconButton, MenuItem, Menu, Divider, ListItemIcon, Tooltip } from '@mui/material'
import { Settings, Logout, PersonAdd } from '@mui/icons-material'

import './userProfileBage.scss'
import {useSelector} from "react-redux";

export const UserProfileBage = () => {
    const user = useSelector(state => state.user.user);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <div className="user-profile">
          <div className="user-profile__info">
            <p>{ user?.firstName } { user?.lastName }</p>
          </div>
          <div className="user-profile__avatar">
          <Tooltip title="Настройки аккаунта">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem>
                <Avatar /> Мой профиль
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Добавить другой аккаунт
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Настроики
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Выход
              </MenuItem>
            </Menu>
          </div>
        </div>
  )
}
