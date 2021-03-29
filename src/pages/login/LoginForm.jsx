import React from 'react';
import { observer } from 'mobx-react-lite';
import { withNamespaces } from 'react-i18next';
import { showModalRegisterForm } from './ModalRegisterForm';
import { useAuthStore, useLoginFormStore } from '../../StoreProvider';

const LoginForm = observer(({ t }) => {
  const { authState } = useAuthStore();
  const { loginForm, setLoginForm, submitLogin } = useLoginFormStore();
  const { username, password } = loginForm;

  function handleSubmit(event) {
    event.preventDefault();
    submitLogin();
  }

  return (
    <form className="a-login-form">
      <div
        data-tooltip={username.tooltip}
        className={`a-login-form-input-container ${username.class}`}
      >
        <input
          name="username"
          onChange={setLoginForm}
          value={username.value}
          className="a-login-form-input-unit"
          placeholder={
            t('common.username')[0].toUpperCase() +
            t('common.username').slice(1)
          }
          type="text"
        />
      </div>
      <div
        data-tooltip={password.tooltip}
        className={`a-login-form-input-container ${password.class}`}
      >
        <input
          name="password"
          onChange={setLoginForm}
          value={password.value}
          className="a-login-form-input-unit"
          placeholder={
            t('common.password')[0].toUpperCase() +
            t('common.password').slice(1)
          }
          type="password"
        />
      </div>
      <div className="a-login-form-action-button-box">
        <button type="button" onClick={handleSubmit}>
          {authState.isLoading
            ? t('common.loading').toUpperCase()
            : t('common.login')[0].toUpperCase() + t('common.login').slice(1)}
        </button>
      </div>
      <div className="a-login-form-divider-line" />
      <div className="a-login-form-alt-action-button-box">
        <button type="button" onClick={showModalRegisterForm}>
          {t('login.createNewAccount')}
        </button>
      </div>
    </form>
  );
});

export default withNamespaces()(LoginForm);
