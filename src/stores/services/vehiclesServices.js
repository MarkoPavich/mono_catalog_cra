import { nanoid } from 'nanoid';
import { apiBaseUrl, getOptions } from './config';
import vehicles from '../mockup/vehicles';
import { carModels } from '../mockup/carsData';

class VehiclesServices {
  static async getVehiclesList() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const vehiclesList =
      JSON.parse(localStorage.getItem('vehicles')) || vehicles;

    return vehiclesList;
  }

  static async getVehiclesData() {
    // Define requests
    const requests = {
      carMakes: new Request(`${apiBaseUrl}/data/carmakes/`),
      fuelTypes: new Request(`${apiBaseUrl}/data/fueltypes/`),
      bodyTypes: new Request(`${apiBaseUrl}/data/bodytypes/`),
    };

    // Make requests
    const makesResponse = await fetch(
      requests.carMakes,
      JSON.parse(getOptions)
    );
    const fuelTypesResponse = await fetch(
      requests.fuelTypes,
      JSON.parse(getOptions)
    );
    const bodyTypesResponse = await fetch(
      requests.bodyTypes,
      JSON.parse(getOptions)
    );

    // Mockup models for now..
    const models =
      JSON.parse(localStorage.getItem('vehicleModels')) || carModels; // Pull from localStorage or defaut to mockups file

    // Parse json responses and adapt data for frontend
    const carMakes = await makesResponse.json().then((makesData) => {
      const makes = {};
      makesData.forEach((make) => {
        makes[make.abrv] = {
          id: make.id,
          name: make.name,
          abrv: make.abrv,
        };
      });
      return makes;
    });

    const fuelTypes = await fuelTypesResponse.json().then((typesData) => {
      const types = {};
      typesData.forEach((type) => {
        types[type.fuel_type] = {
          id: type.id,
          name: type.fuel_type,
        };
      });
      return types;
    });

    const bodyTypes = await bodyTypesResponse.json().then((typesData) => {
      const types = {};
      typesData.forEach((type) => {
        types[type.body_type] = {
          id: type.id,
          name: type.body_type,
        };
      });
      return types;
    });

    // Return decoded and adapted datasets
    return { carMakes, fuelTypes, bodyTypes, models };
  }

  static async updateVehicle(formatedVehicleData, editID) {
    const vehiclesList = await this.getVehiclesList();
    const { models } = await this.getVehiclesData();
    // Update models data and format model obj for new/updated vehicle
    const { carModel, updatedModels } = this.handleModels(
      formatedVehicleData,
      models
    );

    const updatedVehicle = {
      ...formatedVehicleData,
      id: editID,
      model: carModel, // Apply formated model obj
    };

    // simulate going to server - delay execution
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = vehiclesList.findIndex((vehicle) => vehicle.id === editID);
    vehiclesList[index] = updatedVehicle;

    // Make persistent
    localStorage.setItem('vehicleModels', JSON.stringify(models));
    localStorage.setItem('vehicles', JSON.stringify(vehiclesList));

    return { vehiclesList, updatedModels }; // Return updated lists
  }

  // Same as the above
  static async addNewVehicle(formatedVehicleData) {
    const vehiclesList = await this.getVehiclesList();
    const { models } = await this.getVehiclesData();

    const { carModel, updatedModels } = this.handleModels(
      formatedVehicleData,
      models
    );

    const newVehicle = {
      ...formatedVehicleData,
      id: nanoid(),
      model: carModel,
    };

    // Delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    vehiclesList.push(newVehicle);

    // Make permanent
    localStorage.setItem('vehicleModels', JSON.stringify(updatedModels));
    localStorage.setItem('vehicles', JSON.stringify(vehiclesList));

    return { vehiclesList, updatedModels };
  }

  static async deleteVehicle(id) {
    const vehiclesList = await this.getVehiclesList();
    await new Promise((resolve) => setTimeout(resolve, 500));
    const updatedVehicles = vehiclesList.filter((vehicle) => vehicle.id !== id);

    localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));

    return updatedVehicles;
  }

  // Helper function - this will probably be handled server-side at some point..
  static handleModels(vehicleData, models) {
    const updatedModels = JSON.parse(JSON.stringify(models)); // Deep copy models
    const modelName = vehicleData.model;

    // Find if carMake exists in models
    const modelKey = Object.keys(updatedModels).find(
      (key) => key === vehicleData.make.id
    );

    if (modelKey) {
      // If so, find if model already exists (at this point, it is a simple modelName string comparison)
      const existingModelKey = Object.keys(updatedModels[modelKey]).find(
        (key) => models[modelKey][key].name === modelName
      );
      if (existingModelKey) {
        // If so, just assign it to our vehicle, and return unaltered list
        return {
          carModel: updatedModels[modelKey][existingModelKey],
          updatedModels,
        };
      }
      // Otherwise, create new model object with unique ID, and store in models obj
      const newModelID = nanoid();
      updatedModels[modelKey][newModelID] = { name: modelName };

      return {
        carModel: updatedModels[modelKey][newModelID],
        updatedModels,
      };
    }
    // At this point, carMake has no models associated with it, so we create new association
    // ..and update it with new model
    const newModelID = nanoid();
    const newModel = {};
    newModel[newModelID] = { name: modelName };
    updatedModels[vehicleData.make.id] = newModel;

    return {
      carModel: updatedModels[vehicleData.make.id][newModelID],
      updatedModels,
    };
  }
}
export default VehiclesServices;
