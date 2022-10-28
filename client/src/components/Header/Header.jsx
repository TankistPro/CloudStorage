import React from 'react'
import { Button } from '@mui/material'

import './header.scss'

import { UserProfileBage } from './UserProfileBage/UserProfileBage';
import { WorkspaceBage } from './WorkspaceBage/WorkspaceBage';
import { HeaderSearch } from './HeaderSearch/HeaderSearch';

export const Header = () => {
  return (
    <header className='header'>
      <div className="header__wrapper">
        <div className="header__left">
          <HeaderSearch />
          <div className='header__workspace-group'>
            <WorkspaceBage />
          </div>
          <div className="header__upload">
            <Button variant="contained" component="label">
              Загрузить
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </div>
        </div>
        <UserProfileBage />
      </div>
    </header>
  )
}
