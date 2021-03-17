import { makeObservable, action, observable } from 'mobx';

// Handle user alert notifications, success, error, etc..

// TODO - simplify message generation, currently has baggage of multiple differing ideas..

class MessageStore {
  constructor() {
    // Default message object
    this.message = {
      txt: '',
      type: null,
    };

    // Allowed generic message types
    this.types = {
      success: 'success',
      error: 'error',
      info: 'info',
    };

    // Common error and confirmation types implemented with translation system
    this.commonErrors = {
      userExists: 'userExists',
      emailExists: 'emailExists',
      invalidLogin: 'invalidLogin',
      invalidVehicleForm: 'invalidVehicleForm',
    };

    this.commonConfirmations = {
      userRegistered: 'userRegistered',
      userLogged: 'userLogged',
      vehicleAdded: 'vehicleAdded',
      vehicleEdited: 'vehicleEdited',
    };

    // MOBX decorators
    makeObservable(this, {
      message: observable,

      createSuccess: action,
      createInfo: action,
      createError: action,
      commonError: action,
      commonConfirmation: action,
    });
  }

  createSuccess = (txt) => {
    this.message = {
      txt,
      type: this.types.success,
    };
  };

  // Baggage
  createError = (txt) => {
    this.message = {
      txt,
      type: this.types.error,
    };
  };

  createInfo = (txt) => {
    this.message = {
      txt,
      type: this.types.info,
    };
  };

  commonError = (type) => {
    this.message = {
      txt: '',
      type: this.commonErrors[type],
    };
  };

  commonConfirmation = (type, txt) => {
    this.message = {
      txt: txt || '',
      type: this.commonConfirmations[type],
    };
  };
}

export default MessageStore;
