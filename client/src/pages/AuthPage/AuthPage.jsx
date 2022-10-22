import React from 'react'

import './authPage.scss';

import {TextField, Button} from '@mui/material'

export const AuthPage = () => {
  return (
    <div className='page auth-page'>
        <div className='auth-page__modal'>
          <div className='auth-page__wrapper'>
            <h1>Добро пожаловать!</h1>
            <div className="auth-form">
              <TextField id="standard-basic" label="E-mail" variant="standard" />
              <TextField id="standard-basic" label="Пароль" type="password" variant="standard" />
            </div>
            <div className='auth-bottom'>
              <Button variant="contained">Войти</Button>
              <Button variant="outlined">Зарегистрироваться</Button>
            </div>
          </div>
        </div>
    </div>
  )
}
