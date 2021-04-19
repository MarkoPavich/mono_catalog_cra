/* eslint-disable no-param-reassign */
import { ChangeEvent } from 'react';
import {
  makeObservable,
  observable,
  action,
  runInAction,
  computed,
} from 'mobx';
import {
  validateVehicleForm,
  markFields,
} from '../../stores/services/formsValidators';
import { vehicleForm } from '../../stores/templates/forms';
import CarsDataStore from '../../stores/CarsDataStore';
import MessageStore from '../../stores/MessageStore';
import { ValidatedVehicleData, Dict } from '../../types';

export default class AddVehicleFormStore {
  // Instantiate form template
  @observable vehicleForm: typeof vehicleForm = vehicleForm;

  messages: MessageStore;
  dataStore: CarsDataStore;

  @action markFields: typeof markFields = markFields;

  constructor(messages: MessageStore, dataStore: CarsDataStore) {
    this.messages = messages; // Notifications on submissions
    this.dataStore = dataStore; // cars data sets

    // Enable MOBX
    makeObservable(this);
  }

  @computed
  get carsData() {
    return this.dataStore.carsData;
  }

  @computed
  get isLoading() {
    return this.dataStore.isLoading;
  }

  // set* functions control inputs
  @action
  setVehicleForm = (
    event: ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    this.vehicleForm[event.target.name].value = event.target.value;
  };

  @action
  clearVehicleForm = () => {
    this.vehicleForm = vehicleForm;
  };

  @action
  submitAddEditvehicle = async (vehicleID: string) => {
    // Set vehicle data model
    const data: ValidatedVehicleData = {
      make: this.vehicleForm.make.value,
      model: this.vehicleForm.model.value,
      variant: this.vehicleForm.variant.value,
      manufactureDate: this.vehicleForm.manufactureDate.value,
      mileage: this.vehicleForm.mileage.value,
      bodyType: this.vehicleForm.bodyType.value,
      fuelType: this.vehicleForm.fuelType.value,
      img: this.vehicleForm.img.value,
      description: this.vehicleForm.description.value,
      price: this.vehicleForm.price.value,
    };

    const status = validateVehicleForm(data);
    this.markFields(this.vehicleForm, status.tooltips);

    if (status.isValid) {
      const isStored = await this.addVehicle(data, vehicleID);
      if (isStored) {
        runInAction(() => {
          this.vehicleForm = vehicleForm; // Clear form
        });

        // Notify add or edit success
        this.messages.commonConfirmation(
          vehicleID
            ? this.messages.commonConfirmations.vehicleEdited
            : this.messages.commonConfirmations.vehicleAdded
        );
        // Always true at this point
        return isStored; // Everything OK, proceed to navigate away from form
      }
      // Always false at this point
      return isStored; // Something wrong
    }

    this.messages.commonError(this.messages.commonErrors.invalidVehicleForm);

    return status.isValid;
  };

  @action
  setEditMode = (vehicleID: string) => {
    // Get vehicle object
    const vehicle = this.getVehicle(vehicleID);
    if (vehicle) {
      // get make object
      let make = '';
      Object.keys(this.carsData.carMakes).forEach((key) => {
        if (this.carsData.carMakes[key].id === vehicle.make.id) make = key;
      });

      // Adapt data
      const vehicleData: Dict = {
        ...vehicle,
        model: vehicle.model.name,
        bodyType: vehicle.bodyType.id,
        fuelType: vehicle.fuelType.id,
        make,
      };
      // Apply data to form
      Object.keys(this.vehicleForm).forEach((key) => {
        this.vehicleForm[key].value = vehicleData[key];
      });
    }
    // Vehicle with provided ID not found
    else
      this.messages.commonError(this.messages.commonErrors.noMatchingVehicleID);
  };

  @action
  addVehicle = async (
    validatedData: ValidatedVehicleData,
    editID: string = ''
  ) => {
    const make = this.carsData.carMakes[validatedData.make]; // Adapt vehicle make

    // Adapt bodyType and FuelType data for vehicle object model
    const bodyKey =
      Object.keys(this.carsData.carBodies).find(
        (key) => this.carsData.carBodies[key].id === validatedData.bodyType
      ) || '';
    const fuelKey =
      Object.keys(this.carsData.fuelTypes).find(
        (key) => this.carsData.fuelTypes[key].id === validatedData.fuelType
      ) || '';

    // Create new vehicle object with formated params
    if (!bodyKey || !fuelKey) throw new Error();

    const newVehicle = {
      ...validatedData,
      make,
      bodyType: this.carsData.carBodies[bodyKey],
      fuelType: this.carsData.fuelTypes[fuelKey],
    };

    // Save new vehicle or overwrite existing
    try {
      await this.dataStore.addUpdateVehicle(newVehicle, editID);
    } catch (error) {
      this.messages.createError('Some type of error occured'); // TODO - error handling
      return false; // Signal error while storing data
    }
    return true; // Signal data stored OK
  };

  getVehicle = (vehicleID: string) => {
    // Find vehicles array index by vehicle ID
    const index = this.carsData.vehicles.findIndex(
      (vehicle) => vehicle.id === vehicleID
    );
    // Return vehicle object
    return this.carsData.vehicles[index];
  };
}
