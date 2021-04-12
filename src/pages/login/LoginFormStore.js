import { makeObservable, observable, action } from 'mobx';
import {
  validateAuthForm,
  markFields,
} from '../../stores/services/formsValidators';
import { loginForm, registerForm } from '../../stores/templates/forms';

export default class LoginFormStore {
  constructor(authStore) {
    // Instantiate form
    this.loginForm = loginForm;
    this.registerForm = registerForm;

    this.modalRegisterClassNames = {
      show: 'a-login-modal-container modal-form-active',
      hide: 'a-login-modal-container',
    }

    this.modalRegisterStatus = this.modalRegisterClassNames.hide;

    this.authStore = authStore; // Used here for handling auth submissions

    this.markFields = markFields;

    makeObservable(this, {
      loginForm: observable,
      registerForm: observable,
      modalRegisterStatus: observable,

      setLoginForm: action,
      setRegisterForm: action,
      submitLogin: action,
      markFields: action,
      clearRegisterForm: action,
      showModalRegisterForm: action,
      hideModalRegisterForm: action,
    });
  }

  showModalRegisterForm = () => {
    this.modalRegisterStatus = this.modalRegisterClassNames.show;
  }

  setLoginForm = (event) => {
    this.loginForm[event.target.name].value = event.target.value;
  };

  hideModalRegisterForm = () => {
    this.modalRegisterStatus = this.modalRegisterClassNames.hide;
  }

  setRegisterForm = (event) => {
    if (event.target.type !== 'checkbox')
      this.registerForm[event.target.name].value = event.target.value;
    else this.registerForm[event.target.name].value = event.target.checked;
  };

  clearRegisterForm = () => {
    this.registerForm = registerForm;
  };

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
  submitRegister = (event) => {
    event.preventDefault();
    const data = {};

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
