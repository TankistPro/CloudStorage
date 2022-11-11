import React from 'react'
import {useDispatch, useSelector} from "react-redux";

import './authPage.scss';

import {TextField, Button} from '@mui/material'
import {loginAction} from "../../store/actions/auth.action";

export const AuthPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const login = React.useCallback(() => {
    dispatch(loginAction({
      email, password
    }))
  }, [email, password, user])

  return (
    <div className='page auth-page'>
        <div className='auth-page__modal'>
          <div className='auth-page__wrapper'>
            <h1>Добро пожаловать!</h1>
            <div className="auth-form">
              <TextField id="standard-basic" onInput={(e) => setEmail(e.target.value)} label="E-mail" variant="standard" />
              <TextField id="standard-basic" onInput={(e) => setPassword(e.target.value)}  label="Пароль" type="password" variant="standard" />
              <p className='error'>{ user.error.message }</p>
            </div>
            <div className='auth-bottom'>
              <Button variant="contained" onClick={login}>Войти</Button>
              <Button variant="outlined">Зарегистрироваться</Button>
            </div>
          </div>
        </div>
    </div>
  )
}
