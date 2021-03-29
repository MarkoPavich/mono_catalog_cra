/* eslint-disable no-param-reassign */
import { makeObservable, observable, action, runInAction } from 'mobx';
import { validateVehicleForm, markFields } from './services/formsValidators';
import { vehicleForm } from './templates/forms';

export default class AddVehicleFormStore {
  constructor(vehiclesStore, messages) {
    // Instantiate form template
    this.vehicleForm = vehicleForm;

    this.vehiclesStore = vehiclesStore; // used to submit new vehicles
    this.messages = messages; // Notifications on submissions

    this.markFields = markFields;

    // MOBX decorators
    makeObservable(this, {
      vehicleForm: observable,

      setVehicleForm: action,
      markFields: action,
      setEditMode: action,
      clearVehicleForm: action,
      submitAddEditvehicle: action,
    });
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
      const isStored = await this.vehiclesStore.addVehicle(data, vehicleID);
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
      return isStored; // Something wrong, but handled in vehiclesStore
    }

    this.messages.commonError(this.messages.commonErrors.invalidVehicleForm);

    return status.isValid;
  };

  setEditMode = (vehicleID) => {
    // Get vehicle object
    const vehicle = this.vehiclesStore.getVehicle(vehicleID);
    // get make object
    let make;
    Object.keys(this.vehiclesStore.carsData.carMakes).forEach((key) => {
      if (this.vehiclesStore.carsData.carMakes[key].id === vehicle.make.id)
        make = key;
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
  };
}
