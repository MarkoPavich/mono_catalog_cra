import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from 'mobx';
import vehiclesServices from './services/vehiclesServices';
import MessageStore from './MessageStore';
import { PreVehicle, CarsData } from '../types';

// This is a generic store serving vehicles related data
// This store also facilitates communication between component specific stores..
// ..and CRUD related services - a liaison, of sorts..

interface iDataStore {
  carsData: CarsData;
  isLoading: boolean;
  addUpdateVehicle: (vehicleData: PreVehicle, editID?: string) => void;
  deleteVehicle: (id: string) => void;
  setLoading: () => void;
  clearLoading: () => void;
}

class CarsDataStore implements iDataStore {
  @observable
  carsData: CarsData = {
    vehicles: [],
    carMakes: {},
    carModels: {},
    carBodies: {},
    fuelTypes: {},
  };

  @observable internalLoading: boolean = false; // This store is loading data
  @observable externalLoading: boolean = false; // Some other store is loading data

  private messages: MessageStore;

  constructor(messages: MessageStore) {
    this.messages = messages;
    makeObservable(this);
    this.getVehiclesData(); // Initial load data
  }

  @action
  async getVehiclesData() {
    this.internalLoading = true; // mark content loading
    try {
      const vehiclesData = await vehiclesServices.getVehiclesData();
      const vehicles = await vehiclesServices.getVehiclesList();

      runInAction(() => {
        this.carsData = {
          ...this.carsData,
          carMakes: vehiclesData.carMakes,
          carBodies: vehiclesData.bodyTypes,
          fuelTypes: vehiclesData.fuelTypes,
          carModels: vehiclesData.models,
          vehicles,
        };
      });
    } catch (error) {
      console.log(error);
      this.messages.createError('Network error! Please try again later'); // TODO - Make translations
    }
    runInAction(() => {
      this.internalLoading = false; // mark content loaded
    });
  }

  @computed
  get isLoading() {
    // Return false only if everything stopped loading
    return this.internalLoading || this.externalLoading;
  }

  // Proxy data to vehiclesServices, and update store - error handling left to pageStores
  @action
  async addUpdateVehicle(vehicleData: PreVehicle, editID: string = '') {
    const { vehiclesList, updatedModels } = editID
      ? await vehiclesServices.updateVehicle(vehicleData, editID)
      : await vehiclesServices.addNewVehicle(vehicleData);

    runInAction(() => {
      this.carsData = {
        ...this.carsData,
        vehicles: vehiclesList,
        carModels: updatedModels,
      };
    });
  }

  // Proxy deletion ID to vehiclesServices, and update this - error handling left to pageStores
  @action
  async deleteVehicle(id: string) {
    const updatedVehicles = await vehiclesServices.deleteVehicle(id);
    runInAction(() => {
      this.carsData.vehicles = updatedVehicles;
    });
  }

  @action
  setLoading = () => {
    this.externalLoading = true;
  };

  @action
  clearLoading = () => {
    this.externalLoading = false;
  };
}

export default CarsDataStore;
