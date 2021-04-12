import { makeObservable, action, observable } from 'mobx';
import { Dict } from '../types';

// Handle user alert notifications, success, error, etc..

// TODO - simplify message generation, currently has baggage of multiple differing ideas..

type Message = {
  txt: string;
  type: string;
};

type MessageTypes = {
  success: string;
  error: string;
  info: string;
};

class MessageStore {
  message: Message;
  types: MessageTypes;
  commonErrors: Dict;
  commonConfirmations: Dict;

  constructor() {
    // Default message object
    this.message = {
      txt: '',
      type: '',
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
      noMatchingVehicleID: 'noMatchingVehicleID',
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

  createSuccess = (txt: string) => {
    this.message = {
      txt,
      type: this.types.success,
    };
  };

  // Baggage
  createError = (txt: string) => {
    this.message = {
      txt,
      type: this.types.error,
    };
  };

  createInfo = (txt: string) => {
    this.message = {
      txt,
      type: this.types.info,
    };
  };

  commonError = (type: string) => {
    this.message = {
      txt: '',
      type: this.commonErrors[type],
    };
  };

  commonConfirmation = (type: string, txt: string = '') => {
    this.message = {
      txt: txt,
      type: this.commonConfirmations[type],
    };
  };
}

export default MessageStore;
