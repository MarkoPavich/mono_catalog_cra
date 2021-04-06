import AuthStore from './AuthStore';
import MessageStore from './MessageStore';
import UIStore from './UIStore';
import AddVehicleFormStore from '../pages/vehicle/AddVehicleFormStore';
import VehiclesStore from './VehiclesStore';
import LoginFormStore from '../pages/login/LoginFormStore';

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
