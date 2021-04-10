/* eslint-disable no-param-reassign */
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

export default class AddVehicleFormStore {
  constructor(messages, dataStore) {
    // Instantiate form template
    this.vehicleForm = vehicleForm;

    this.messages = messages; // Notifications on submissions
    this.dataStore = dataStore; // cars data sets

    this.markFields = markFields;

    // MOBX decorators
    makeObservable(this, {
      vehicleForm: observable,

      setVehicleForm: action,
      markFields: action,
      setEditMode: action,
      clearVehicleForm: action,
      submitAddEditvehicle: action,
      addVehicle: action,

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

  // set* functions control inputs
  setVehicleForm = (event) => {
    this.vehicleForm[event.target.name].value = event.target.value;
  };

  clearVehicleForm = () => {
    this.vehicleForm = vehicleForm;
  };

  submitAddEditvehicle = async (vehicleID) => {
    const data = {};

    Object.keys(this.vehicleForm).forEach((key) => {
      data[key] = this.vehicleForm[key].value;
    });

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

  setEditMode = (vehicleID) => {
    // Get vehicle object
    const vehicle = this.getVehicle(vehicleID);
    if (vehicle) {
      // get make object
      let make;
      Object.keys(this.carsData.carMakes).forEach((key) => {
        if (this.carsData.carMakes[key].id === vehicle.make.id) make = key;
      });
      // Adapt data
      const vehicleData = {
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

  addVehicle = async (validatedData, editID) => {
    const make = this.carsData.carMakes[validatedData.make]; // Adapt vehicle make

    // Adapt bodyType and FuelType data for vehicle object model
    const bodyKey = Object.keys(this.carsData.carBodies).find(
      (key) => this.carsData.carBodies[key].id === validatedData.bodyType
    );
    const fuelKey = Object.keys(this.carsData.fuelTypes).find(
      (key) => this.carsData.fuelTypes[key].id === validatedData.fuelType
    );

    // Create new vehicle object with formated params
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

  getVehicle = (vehicleID) => {
    // Find vehicles array index by vehicle ID
    const index = this.carsData.vehicles.findIndex(
      (vehicle) => vehicle.id === vehicleID
    );
    // Return vehicle object
    return this.carsData.vehicles[index];
  };
}
