import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from 'mobx';
import vehiclesServices from './services/vehiclesServices';
import sortOptions from './mockup/sortOptions';
import filtersForms from './templates/filtersForms';

class VehiclesStore {
  constructor(messages) {
    // Cars dataSets
    this.carsData = {
      vehicles: [],
      carMakes: {},
      carModels: {},
      carBodies: {},
      fuelTypes: {},
    };

    this.isLoading = true;

    this.sortOptions = sortOptions;
    this.filters = filtersForms();

    this.getVehiclesData(); // Fetch data

    // MessageStore
    this.messages = messages;

    // Pagination config
    this.resultsPerPage = 6;
    this.maxPageNumLinks = 4;
    // Editable observable
    this.currentPage = 1;

    // MOBX
    makeObservable(this, {
      carsData: observable,
      filters: observable,
      currentPage: observable,
      isLoading: observable,

      setBodyParams: action,
      setFuelParams: action,
      setMakeParam: action,
      setSortFilter: action,
      addVehicle: action,
      selectPage: action,
      getVehiclesData: action,
      deleteVehicle: action,

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

  async getVehiclesData() {
    this.isLoading = true; // mark content loading
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
        this.isLoading = false; // Mark content requests complete
      });
    } catch (error) {
      this.messages.createError('Network error! Please try again later'); // TODO - Make translations
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

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
        ? this.carsData.vehicles.filter(
            (vehicle) => vehicle.make.id === this.activeFilters.make
          )
        : this.carsData.vehicles.slice();

    // if any selected, further filter by matching vehicle bodyType in bodyType filters array
    if (this.activeFilters.body.length !== 0)
      filtered = filtered.filter((vehicle) =>
        this.activeFilters.body.includes(vehicle.bodyType.name)
      );

    // if any selected, further filter by matching vehicle fuelType in fuelType filters array
    if (this.activeFilters.fuel.length !== 0)
      filtered = filtered.filter((vehicle) =>
        this.activeFilters.fuel.includes(vehicle.fuelType.name)
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

  deleteVehicle = async (id) => {
    this.isLoading = true;
    try {
      const updatedVehicles = await vehiclesServices.deleteVehicle(id);

      runInAction(() => {
        this.carsData.vehicles = updatedVehicles;
      });
    } catch (error) {
      this.messages.createError('Network error, please try again later'); // TODO - makeTranslations
    }

    runInAction(() => {
      this.isLoading = false;
    });
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
      const { vehiclesList, updatedModels } = editID
        ? await vehiclesServices.updateVehicle(newVehicle, editID)
        : await vehiclesServices.addNewVehicle(newVehicle);

      runInAction(() => {
        this.carsData.vehicles = vehiclesList;
        this.carsData.carModels = updatedModels;
      });
    } catch (error) {
      this.messages.createError('Network error, please try again later'); // TODO - makeTranslations
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

export default VehiclesStore;
