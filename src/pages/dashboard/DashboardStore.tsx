import { makeObservable, observable, action, computed } from 'mobx';
import { ChangeEvent } from 'react';
import sortOptions from '../../stores/mockup/sortOptions';
import filtersForms from '../../stores/templates/filtersForms';
import MessageStore from '../../stores/MessageStore';
import CarsDataStore from '../../stores/CarsDataStore';
import { Vehicle } from '../../types';

class DashboardStore {
  @observable filters: ReturnType<typeof filtersForms> = filtersForms(); // filters templates with editable properties - observable
  @observable currentPage = 1; // pagination observable

  dataStore: CarsDataStore;
  messages: MessageStore;
  sortOptions: typeof sortOptions = sortOptions; // Template with predefined sorting capabilities

  // Pagination config
  resultsPerPage = 6;
  maxPageNumLinks = 4;

  constructor(messages: MessageStore, dataStore: CarsDataStore) {
    // Cars dataSets
    this.dataStore = dataStore;
    this.messages = messages; // MessageStore

    // MOBX
    makeObservable(this);
  }

  @computed
  get carsData() {
    return this.dataStore.carsData;
  }

  // set* functions control inputs
  @action
  setBodyParams = (event: ChangeEvent<HTMLInputElement>) => {
    this.filters.bodyParams[event.target.name] = event.target.checked;
    this.currentPage = 1; // Reset pagination selection
  };

  @action
  setFuelParams = (event: ChangeEvent<HTMLInputElement>) => {
    this.filters.fuelParams[event.target.name] = event.target.checked;
    this.currentPage = 1;
  };

  @action
  setMakeParam = (event: ChangeEvent<HTMLSelectElement>) => {
    this.filters.makeParam = event.target.value;
    this.currentPage = 1;
  };

  @action
  setSortFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    this.filters.sortFilter =
      sortOptions[event.target.value] || sortOptions.manufDateAsc;
    this.currentPage = 1;
  };

  @action
  selectPage = (page: number) => {
    this.currentPage = page;
  };

  @computed
  get activeFilters() {
    const make = this.filters.makeParam; // Set filter by make state
    const body: string[] = [];
    const fuel: string[] = [];

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

  @computed
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

  paginateVehicles = (filteredVehicles: Vehicle[]) => {
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

  sortVehicles = (filteredVehicles: Vehicle[]) => {
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
}

export default DashboardStore;
