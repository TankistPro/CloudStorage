import React from 'react'

import './authPage.scss';

import {TextField, Button} from '@mui/material'
import Toast from "../../components/Toast/Toast";
import {usePassport} from "../../hooks/usePassport";

export const AuthPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { loginErrors, login, loginAttempts} = usePassport();

  React.useEffect(() => {
    if (loginErrors.status) {
      Toast({
        toastType: 'error',
        text: loginErrors.message
      })
    }
  }, [loginAttempts])

  const loginHandler = async () => {
    if (email.trim().length && password.trim().length) {
      await login(email, password)
    }
  }

  return (
    <div className='page auth-page'>
        <div className='auth-page__modal'>
          <div className='auth-page__wrapper'>
            <h1>Добро пожаловать!</h1>
            <div className="auth-form">
              <TextField id="standard-basic" onInput={(e) => setEmail(e.target.value)} label="E-mail" variant="standard" />
              <TextField id="standard-basic" onInput={(e) => setPassword(e.target.value)}  label="Пароль" type="password" variant="standard" />
            </div>
            <div className='auth-bottom'>
              <Button variant="contained" onClick={loginHandler}>Войти</Button>
              <Button variant="outlined">Зарегистрироваться</Button>
            </div>
          </div>
        </div>
    </div>
  )
}
