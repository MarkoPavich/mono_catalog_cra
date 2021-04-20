import AuthStore from './AuthStore';
import MessageStore from './MessageStore';
import UIStore from './UIStore';
import LoginFormStore from '../pages/login/LoginFormStore';
import DashboardStore from '../pages/dashboard/DashboardStore';
import AddVehicleStore from '../pages/vehicle/AddVehicleStore';
import CarsDataStore from './CarsDataStore';
import MyVehiclesStore from '../pages/vehicle/MyVehiclesStore';

// init all stores and return as rootStore
export default function createRootStore() {
  const messageStore = new MessageStore();
  const uiStore = new UIStore();
  const authStore = new AuthStore(messageStore);
  const carsDataStore = new CarsDataStore(messageStore);
  const loginFormStore = new LoginFormStore(authStore);
  const dashboardStore = new DashboardStore(messageStore, carsDataStore);
  const addVehicleStore = new AddVehicleStore(messageStore, carsDataStore);
  const myVehiclesStore = new MyVehiclesStore(messageStore, carsDataStore);

  return {
    carsDataStore,
    authStore,
    messageStore,
    uiStore,
    loginFormStore,
    dashboardStore,
    addVehicleStore,
    myVehiclesStore,
  };
}
