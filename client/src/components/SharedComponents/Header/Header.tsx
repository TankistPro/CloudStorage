import React from 'react'

import './header.scss'

import { UserProfileBage } from './UserProfileBage/UserProfileBage';
import { HeaderSearch } from './HeaderSearch/HeaderSearch';
import { UploadFile } from './UploadFile/UploadFile';

export const Header = () => {
  return (
    <header className='header'>
      <div className="header__wrapper">
        <div className="header__left">
          <HeaderSearch />
          <div className='header__workspace-group'></div>
          <div className="header__upload">
            <UploadFile />
          </div>
        </div>
        <UserProfileBage />
      </div>
    </header>
  )
}
