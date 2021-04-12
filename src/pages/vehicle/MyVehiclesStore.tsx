import { makeObservable, computed } from 'mobx';
import i18n from '../../i18n';
import MessageStore from '../../stores/MessageStore';
import CarsDataStore from '../../stores/CarsDataStore';

class MyVehiclesStore {
  messages: MessageStore;
  dataStore: CarsDataStore;

  constructor(messages: MessageStore, dataStore: CarsDataStore) {
    this.messages = messages;
    this.dataStore = dataStore;

    makeObservable(this, {
      carsData: computed,
      isLoading: computed,
    });
  }

  get carsData() {
    return this.dataStore.carsData;
  }

  get isLoading() {
    return this.dataStore.isLoading;
  }

  deleteVehicle = async (id: string) => {
    this.dataStore.setLoading();
    try {
      await this.dataStore.deleteVehicle(id);
      this.messages.createSuccess(i18n.t('pageMyVehicles.deleteConfirmation')); // Notify delete success
    } catch (err) {
      this.messages.createError('Something went wrong');
    }
    this.dataStore.clearLoading();
  };
}

export default MyVehiclesStore;
