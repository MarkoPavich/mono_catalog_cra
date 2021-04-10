import { makeObservable, computed } from 'mobx';
import i18n from '../../i18n';

class MyVehiclesStore {
  constructor(messages, dataStore) {
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

  deleteVehicle = async (id) => {
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
