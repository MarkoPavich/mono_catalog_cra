import { ChangeEvent, MouseEvent } from 'react';
import { makeObservable, observable, action } from 'mobx';
import {
  validateAuthForm,
  markFields,
} from '../../stores/services/formsValidators';
import AuthStore from '../../stores/AuthStore';
import { loginForm, registerForm, Form } from '../../stores/templates/forms';
import { Dict } from '../../types';

export default class LoginFormStore {
  modalRegisterClassNames: Dict = {
    show: 'a-login-modal-container modal-form-active',
    hide: 'a-login-modal-container',
  };

  // Instantiate forms
  @observable loginForm: Form = loginForm;
  @observable registerForm: Form = registerForm;

  @observable modalRegisterStatus = this.modalRegisterClassNames.hide;

  authStore: AuthStore;

  @action markFields: typeof markFields = markFields;

  constructor(authStore: AuthStore) {
    this.authStore = authStore; // Used here for handling auth submissions

    makeObservable(this);
  }

  @action
  showModalRegisterForm = () => {
    this.modalRegisterStatus = this.modalRegisterClassNames.show;
  };

  @action
  hideModalRegisterForm = () => {
    this.modalRegisterStatus = this.modalRegisterClassNames.hide;
  };

  @action
  setLoginForm = (event: ChangeEvent<HTMLInputElement>) => {
    this.loginForm[event.target.name].value = event.target.value;
  };

  @action
  setRegisterForm = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.type !== 'checkbox')
      this.registerForm[event.target.name].value = event.target.value;
    else
      this.registerForm[
        event.target.name
      ].value = event.target.checked.toString();
  };

  @action
  clearRegisterForm = () => {
    this.registerForm = registerForm;
  };

  @action
  submitLogin = () => {
    // Generate data container to reduce dot notaitions a bit..
    const data = {
      username: this.loginForm.username.value,
      password: this.loginForm.password.value,
    };
    // Submit to form validator
    const status = validateAuthForm(data); // Will return an object with isValid and error tooltips
    // Pass form and tooltips to input marking function
    this.markFields(this.loginForm, status.tooltips);

    // If valid, call login method from authStore and clear password input
    if (status.isValid) {
      this.authStore.requestLogin(data);
      this.loginForm.password.value = '';
    }
  };

  // Similar to the above
  @action
  submitRegister = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const data: Dict = {};

    // Longer form so generate data container programmatically
    Object.keys(this.registerForm).forEach((key) => {
      data[key] = this.registerForm[key].value;
    });

    const status = validateAuthForm(data);
    this.markFields(this.registerForm, status.tooltips);
    if (status.isValid) {
      this.authStore.requestNewAccount(data);
    }
  };
}
