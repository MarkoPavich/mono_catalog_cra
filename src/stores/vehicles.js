import { makeObservable, observable, computed, action } from 'mobx';
import { nanoid } from 'nanoid';
import vehicles from './mockup/vehicles';
import { carMakes, carModels, carBodies, fuelTypes } from './mockup/carsData';
import sortOptions from './mockup/sortOptions';
import filtersForms from './templates/filtersForms';

class VehiclesStore {
  constructor() {
    // Imported datasets
    this.vehicles = JSON.parse(localStorage.getItem('vehicles')) || vehicles;
    this.carMakes = carMakes;
    this.carModels =
      JSON.parse(localStorage.getItem('vehicleModels')) || carModels; // Pull from localStorage or defaut to mockups file
    this.carBodies = carBodies;
    this.fuelTypes = fuelTypes;
    this.sortOptions = sortOptions;

    this.filters = filtersForms(); // Get filtering params forms

    // Pagination config
    this.resultsPerPage = 6;
    this.maxPageNumLinks = 4;
    // Editable observable
    this.currentPage = 1;

    // MOBX
    makeObservable(this, {
      filters: observable,
      vehicles: observable,
      currentPage: observable,

      setBodyParams: action,
      setFuelParams: action,
      setMakeParam: action,
      setSortFilter: action,
      addVehicle: action,
      selectPage: action,

      activeFilters: computed,
      vehiclesList: computed,
    });
  }

  // set* functions control inputs
  setBodyParams = (event) => {
    this.filters.bodyParams[event.target.name] = event.target.checked;
    this.currentPage = 1; // Reset pagination selection
  };

  setFuelParams = (event) => {
    this.filters.fuelParams[event.target.name] = event.target.checked;
    this.currentPage = 1;
  };

  setMakeParam = (event) => {
    this.filters.makeParam = event.target.value;
    this.currentPage = 1;
  };

  setSortFilter = (event) => {
    this.filters.sortFilter =
      sortOptions[event.target.value] || sortOptions.manufDateAsc;
    this.currentPage = 1;
  };

  selectPage = (page) => {
    this.currentPage = page;
  };

  get activeFilters() {
    const make = this.filters.makeParam; // Set filter by make state
    const body = [];
    const fuel = [];

    // Parse bodyType and fuelType params forms and push active to arrays
    Object.keys(this.filters.bodyParams).forEach((key) => {
      if (this.filters.bodyParams[key]) body.push(key);
    });
    Object.keys(this.filters.fuelParams).forEach((key) => {
      if (this.filters.fuelParams[key]) fuel.push(key);
    });

    // Return active (selected) filtering options
    return {
      make,
      body,
      fuel,
    };
  }

  get vehiclesList() {
    // Get vehicles array
    let filtered =
      this.activeFilters.make !== '' // If active, filter by make
        ? this.vehicles.filter(
            (vehicle) => vehicle.make.name === this.activeFilters.make
          )
        : this.vehicles.slice();

    // if any selected, further filter by matching vehicle bodyType in bodyType filters array
    if (this.activeFilters.body.length !== 0)
      filtered = filtered.filter((vehicle) =>
        this.activeFilters.body.includes(vehicle.bodyType)
      );

    // if any selected, further filter by matching vehicle fuelType in fuelType filters array
    if (this.activeFilters.fuel.length !== 0)
      filtered = filtered.filter((vehicle) =>
        this.activeFilters.fuel.includes(vehicle.fuelType)
      );

    const sorted = this.sortVehicles(filtered); // Sort vehicles

    return this.paginateVehicles(sorted); // Paginate, append pagination context, and return
  }

  paginateVehicles = (filteredVehicles) => {
    const results = filteredVehicles.length;
    const pages = Math.ceil(results / this.resultsPerPage);
    const firstIndexInRange =
      (Math.ceil(this.currentPage / this.maxPageNumLinks) - 1) *
        this.maxPageNumLinks +
      1;

    const startIndex =
      this.currentPage * this.resultsPerPage - this.resultsPerPage;
    const endIndex = startIndex + this.resultsPerPage;

    return {
      paginatedVehicles: filteredVehicles.slice(startIndex, endIndex),
      pages,
      results,
      firstIndexInRange,
    };
  };

  sortVehicles = (filteredVehicles) => {
    // simple sort filteredVehicles array by object properties
    switch (this.filters.sortFilter) {
      case this.sortOptions.modelNameAsc:
        return filteredVehicles.sort((a, b) =>
          a.make.name.toLowerCase() > b.make.name.toLowerCase() ? 1 : -1
        );

      case this.sortOptions.modelNameDesc:
        return filteredVehicles.sort((a, b) =>
          a.make.name.toLowerCase() > b.make.name.toLowerCase() ? -1 : 1
        );

      case this.sortOptions.manufDateAsc:
        return filteredVehicles.sort((a, b) =>
          a.manufactureDate > b.manufactureDate ? 1 : -1
        );

      case this.sortOptions.manufDateDesc:
        return filteredVehicles.sort((a, b) =>
          a.manufactureDate > b.manufactureDate ? -1 : 1
        );

      case this.sortOptions.priceAsc:
        return filteredVehicles.sort((a, b) => (a.price > b.price ? 1 : -1));

      case this.sortOptions.priceDesc:
        return filteredVehicles.sort((a, b) => (a.price > b.price ? -1 : 1));

      default:
        return filteredVehicles;
    }
  };

  addVehicle = (validatedData, editID) => {
    // Block below is somewhat a mess, this sort of relational handling is better suited for DB languages
    const carMakeID = this.carMakes[validatedData.make].id;
    let model;
    // Check if carMake has any carModels, if no, create one
    if (!this.carModels[carMakeID]) {
      const modelID = nanoid();
      this.carModels[carMakeID] = {};
      this.carModels[carMakeID][modelID] = { name: validatedData.model };
      model = this.carModels[carMakeID][modelID];
    } else {
      // If some carModels exist, check if this particular model exists
      let found = false;
      Object.keys(this.carModels[carMakeID]).forEach((key) => {
        // If so, assign it to new vehicle
        if (
          this.carModels[carMakeID][key].name === validatedData.model &&
          !found
        ) {
          found = true;
          model = this.carModels[carMakeID][key];
        }
      });
      // Else, create our new carModel
      if (!found) {
        const modelID = nanoid();
        this.carModels[carMakeID][modelID] = { name: validatedData.model };
        model = this.carModels[carMakeID][modelID];
      }
    }
    // Create new object with required parameters
    const newVehicle = {
      ...validatedData,
      id: nanoid(),
      make: this.carMakes[validatedData.make],
      model,
    };

    // Save new vehicle or overwrite existing
    if (editID) {
      const index = this.vehicles.findIndex((vehicle) => vehicle.id === editID);
      this.vehicles[index] = {
        ...newVehicle,
        id: editID,
      };
    } else this.vehicles.push(newVehicle);
    // Make persistent
    localStorage.setItem('vehicles', JSON.stringify(this.vehicles));
    localStorage.setItem('vehicleModels', JSON.stringify(this.carModels));
  };

  getVehicle = (vehicleID) => {
    // Find vehicle index by Ivehicle ID
    const index = this.vehicles.findIndex(
      (vehicle) => vehicle.id === vehicleID
    );
    // Return vehicle object
    return this.vehicles[index];
  };
}

export default VehiclesStore;
