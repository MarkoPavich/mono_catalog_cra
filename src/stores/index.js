import AuthStore from './auth';
import MessageStore from './message';
import UIStore from './ui';
import FormsStore from './forms';
import VehiclesStore from './vehicles';

// init all stores and return as rootStore
export default function createRootStore() {
  const messageStore = new MessageStore();
  const authStore = new AuthStore(messageStore);
  const uiStore = new UIStore();
  const vehiclesStore = new VehiclesStore();
  const formsStore = new FormsStore(authStore, vehiclesStore, messageStore);

  return {
    authStore,
    messageStore,
    uiStore,
    formsStore,
    vehiclesStore,
  };
}
