import React from 'react'
import {useNavigate} from "react-router-dom";

import './authPage.scss';

import Toast from "@SharedComponents/Toast/Toast";
import {usePassport} from "@hooks/usePassport";

import BaseField from "@UI/BaseField/BaseField.js";
import BaseButton from "@UI/BaseButton/BaseButton.js";

export const AuthPage = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const navigate = useNavigate();
  const { loginErrors, login, loginAttempts } = usePassport();

  React.useEffect(() => {
    console.log(loginErrors)
    if (loginErrors.status) {
      Toast({
        toastType: 'error',
        text: loginErrors.message || ""
      })
    }
  }, [loginAttempts])

  const loginHandler = React.useCallback(async () => {
    if (email.trim().length && password.trim().length) {
      const status = await login(email, password);

      if (status) {
        navigate("/home");
      }
    }
  }, [email, password])

  return (
    <div className='page auth-page'>
        <div className='auth-page__modal'>
          <div className='auth-page__wrapper'>
            <h1>Добро пожаловать!</h1>
            <div className="auth-form">
              <BaseField
                  id="standard-basic"
                  onInput={React.useCallback((e: any) => setEmail(e.target.value), [email])}
                  label="E-mail"
                  variant="standard"
                  type="text"
              />
              <BaseField
                  id="standard-basic"
                  onInput={React.useCallback((e: any) => setPassword(e.target.value), [password])}
                  label="Пароль"
                  variant="standard"
                  type="password"
              />
            </div>
            <div className='auth-bottom'>
              <BaseButton
                  variant="contained"
                  onClick={loginHandler}
              >
                Войти
              </BaseButton>
              <BaseButton
                  variant="outlined"
              >
                Зарегистрироваться
              </BaseButton>
            </div>
          </div>
        </div>
    </div>
  )
}
