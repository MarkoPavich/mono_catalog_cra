import AuthStore from './auth';
import MessageStore from './message';
import UIStore from './ui';
import AddVehicleFormStore from './addVehicleForm';
import VehiclesStore from './vehicles';
import LoginFormStore from './loginForm';

// init all stores and return as rootStore
export default function createRootStore() {
  const messageStore = new MessageStore();
  const authStore = new AuthStore(messageStore);
  const uiStore = new UIStore();
  const vehiclesStore = new VehiclesStore(messageStore);
  const addVehicleFormStore = new AddVehicleFormStore(
    vehiclesStore,
    messageStore
  );
  const loginFormStore = new LoginFormStore(authStore);

  return {
    authStore,
    messageStore,
    uiStore,
    addVehicleFormStore,
    vehiclesStore,
    loginFormStore,
  };
}
