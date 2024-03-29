import React from 'react'
import {useNavigate} from "react-router-dom";

import './authPage.scss';

import Toast from "@components/SharedComponents/Toast/Toast";
import {usePassport} from "@hooks/usePassport";

import BaseField from "@components/UI/BaseField/BaseField.jsx";
import BaseButton from "@UI/BaseButton/BaseButton.jsx";

export const AuthPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();
  const { loginErrors, login, loginAttempts} = usePassport();

  React.useEffect(() => {
    if (loginErrors.status) {
      Toast({
        toastType: 'error',
        text: loginErrors.message
      })
    }
  }, [loginErrors.status])

  const loginHandler = async () => {
    if (email.trim().length && password.trim().length) {
      const status = await login(email, password);

      if (status) {
        navigate("/home");
      }
    }
  }

  return (
    <div className='page auth-page'>
        <div className='auth-page__modal'>
          <div className='auth-page__wrapper'>
            <h1>Добро пожаловать!</h1>
            <div className="auth-form">
              <BaseField
                  id="standard-basic"
                  onInput={(e) => setEmail(e.target.value)}
                  label="E-mail"
                  variant="standard"
                  type="text"
              />
              <BaseField
                  id="standard-basic"
                  onInput={(e) => setPassword(e.target.value)}
                  label="Пароль"
                  variant="standard"
                  type="password"
              />
            </div>
            <div className='auth-bottom'>
              <BaseButton
                  variant="contained"
                  onClick={loginHandler}>
                Войти
              </BaseButton>
              <BaseButton
                  variant="outlined">
                Зарегистрироваться
              </BaseButton>
            </div>
          </div>
        </div>
    </div>
  )
}
