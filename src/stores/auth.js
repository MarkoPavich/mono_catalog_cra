import { makeObservable, observable, action, runInAction } from 'mobx';
import authServices from './services/authServices';

// TODO - Replace console.logs with proper error handling, maybe something with returning values and messaging

class AuthStore {
  constructor(messages) {
    // Authentication state
    this.authState = {
      isLoading: false,
      isAuthenticated: null,
      token: localStorage.getItem('token'),
      user: null,
    };

    this.messages = messages; // messageStore

    // mobx decorators
    makeObservable(this, {
      authState: observable,

      requestLogin: action,
      requestLogout: action,
      getUser: action,
      requestNewAccount: action,
    });
  }

  // Exchanges auth token with backend for auth credentials
  getUser = async () => {
    if (this.authState.token !== null) {
      this.loading = true;

      try {
        const data = await authServices.validateToken(this.authState.token);
        if (data.status !== 200) this.requestLogout();
        else
          runInAction(() => {
            this.authState = {
              ...this.authState,
              isLoading: false,
              isAuthenticated: true,
              user: data.user,
            };
          });
      } catch (error) {
        this.requestLogout();
        console.log(error);
      }
    } else this.requestLogout();
  };

  // Ensures token is valid, else clears auth state
  validateLogin = async () => {
    if (this.authState.token !== null) {
      try {
        const { status } = await authServices.validateToken(
          this.authState.token
        );
        if (status !== 200) this.requestLogout();
      } catch (error) {
        console.log(error);
        this.requestLogout();
      }
    } else {
      this.requestLogout();
    }
  };

  requestLogin = async (loginData) => {
    this.authState.isLoading = true;

    try {
      const data = await authServices.login(loginData);
      if (data.status === 200) {
        runInAction(() => {
          this.authState = {
            ...this.authState,
            isLoading: false,
            isAuthenticated: true,
            user: data.user,
            token: data.token,
          };
          localStorage.setItem('token', data.token);
          this.messages.commonConfirmation(
            this.messages.commonConfirmations.userLogged,
            data.user.username
          );
        });
      } else {
        this.messages.commonError(this.messages.commonErrors.invalidLogin);
        this.requestLogout();
      }
    } catch (error) {
      console.log(error);
      this.requestLogout();
    }
  };

  requestLogout = async () => {
    this.authState.isLoading = true;

    if (this.authState.token !== null) {
      try {
        const response = await authServices.logout(this.authState.token);
        if (response.status !== 204) console.log('invalid token');
      } catch (error) {
        console.log('Problem logging out', error);
      }
    }

    // Remove clientside credentials regardless of fetch outcome
    runInAction(() => {
      localStorage.clear('token');
      this.authState = {
        ...this.authState,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    });
  };

  requestNewAccount = async (validatedData) => {
    this.authState.isLoading = true;

    try {
      const data = await authServices.registerNewAccount(validatedData);

      if (data.status === 200) {
        runInAction(() => {
          this.authState = {
            ...this.authState,
            isLoading: false,
            isAuthenticated: true,
            user: data.user,
            token: data.token,
          };
          localStorage.setItem('token', data.token);
          this.messages.commonConfirmation(
            this.messages.commonConfirmations.userRegistered,
            data.user.username
          );
        });
      } else {
        runInAction(() => {
          this.isLoading = false;
        });

        if (data.username) {
          this.messages.commonError(this.messages.commonErrors.userExists);
          return 'username';
        }
        if (data.email) {
          this.messages.commonError(this.messages.commonErrors.emailExists);
          return 'email';
        }
      }
    } catch (error) {
      console.log(error);
      this.messages.createError('Something went wrong..');
    }
  };
}

export default AuthStore;
