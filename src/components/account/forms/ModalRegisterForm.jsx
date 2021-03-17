import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { withNamespaces } from 'react-i18next';
import { useAuthStore, useFormsStore } from '../../../StoreProvider';

function hideModalRegisterForm() {
  const modal = document.querySelector('#a-login-modal-container');
  modal.className = 'a-login-modal-container';
}

const ModalRegisterForm = observer(({ t }) => {
  const { authState } = useAuthStore();
  const {
    registerForm,
    setRegisterForm,
    submitRegister,
    clearRegisterForm,
  } = useFormsStore();
  const { username, email, password, password2, touCheck } = registerForm;

  useEffect(() => {
    clearRegisterForm();
  }, []);

  return (
    <div className="a-login-modal-container" id="a-login-modal-container">
      <div className="a-login-form-container a-register-modal-container">
        <button
          type="button"
          onClick={() => {
            clearRegisterForm();
            hideModalRegisterForm();
          }}
          className="a-login-modal-close-btn"
        >
          X
        </button>
        <header>
          <span>{t('login.registerFormHeader')}:</span>
        </header>
        <form className="a-login-register-form">
          <div
            data-tooltip={username.tooltip}
            className={`a-login-form-input-container ${username.class}`}
          >
            <input
              onChange={setRegisterForm}
              value={username.value}
              name="username"
              placeholder={
                t('common.username')[0].toUpperCase() +
                t('common.username').slice(1)
              }
              className="a-login-form-input-unit input-error"
              data-tooltip="Invalid username"
              type="text"
            />
          </div>
          <div
            data-tooltip={email.tooltip}
            className={`a-login-form-input-container ${email.class}`}
          >
            <input
              onChange={setRegisterForm}
              value={email.value}
              name="email"
              placeholder={
                t('common.email')[0].toUpperCase() + t('common.email').slice(1)
              }
              className="a-login-form-input-unit"
              type="email"
            />
          </div>
          <div
            data-tooltip={password.tooltip}
            className={`a-login-form-input-container ${password.class}`}
          >
            <input
              onChange={setRegisterForm}
              value={password.value}
              name="password"
              placeholder={
                t('common.password')[0].toUpperCase() +
                t('common.password').slice(1)
              }
              className="a-login-form-input-unit"
              type="password"
            />
          </div>
          <div
            data-tooltip={password2.tooltip}
            className={`a-login-form-input-container ${password2.class}`}
          >
            <input
              onChange={setRegisterForm}
              value={password2.value}
              name="password2"
              placeholder={
                t('common.confirmPass')[0].toUpperCase() +
                t('common.confirmPass').slice(1)
              }
              className="a-login-form-input-unit"
              type="password"
            />
          </div>
        </form>
        <div className="a-login-register-form-ToU-notif-box">
          <div
            data-tooltip={touCheck.tooltip}
            className={`tou-box-a-login-form-input-container ${touCheck.class}`}
          >
            <input
              checked={touCheck.value}
              onChange={setRegisterForm}
              name="touCheck"
              type="checkbox"
            />
            <label htmlFor="touCheck">
              <a href="#">{t('login.tou')}</a>
            </label>
          </div>
        </div>
        <div className="a-login-register-form-actions">
          <button type="submit" onClick={submitRegister}>
            {authState.isLoading ? t('common.loading') : t('login.submit')}
          </button>
        </div>
      </div>
    </div>
  );
});

export function showModalRegisterForm(event) {
  event.preventDefault();

  const modal = document.querySelector('#a-login-modal-container');
  modal.className = 'a-login-modal-container modal-form-active';
}

export default withNamespaces()(ModalRegisterForm);
