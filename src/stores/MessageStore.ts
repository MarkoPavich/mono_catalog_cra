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
  // Default message object
  @observable message: Message = {
    txt: '',
    type: '',
  };
  // Allowed generic message types
  types: MessageTypes = {
    success: 'success',
    error: 'error',
    info: 'info',
  };
  // Common error and confirmation types implemented with translation system
  commonErrors: Dict = {
    userExists: 'userExists',
    emailExists: 'emailExists',
    invalidLogin: 'invalidLogin',
    invalidVehicleForm: 'invalidVehicleForm',
    noMatchingVehicleID: 'noMatchingVehicleID',
  };
  commonConfirmations: Dict = {
    userRegistered: 'userRegistered',
    userLogged: 'userLogged',
    vehicleAdded: 'vehicleAdded',
    vehicleEdited: 'vehicleEdited',
  };

  constructor() {
    // enable MOBX
    makeObservable(this);
  }

  @observable
  createSuccess = (txt: string) => {
    this.message = {
      txt,
      type: this.types.success,
    };
  };

  // Baggage
  @observable
  createError = (txt: string) => {
    this.message = {
      txt,
      type: this.types.error,
    };
  };

  @observable
  createInfo = (txt: string) => {
    this.message = {
      txt,
      type: this.types.info,
    };
  };

  @observable
  commonError = (type: string) => {
    this.message = {
      txt: '',
      type: this.commonErrors[type],
    };
  };

  @observable
  commonConfirmation = (type: string, txt: string = '') => {
    this.message = {
      txt: txt,
      type: this.commonConfirmations[type],
    };
  };
}

export default MessageStore;
